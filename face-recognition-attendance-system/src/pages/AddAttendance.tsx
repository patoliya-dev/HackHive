import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Camera, FileImage, Video } from "lucide-react";
import { useEffect, useRef, useState } from "react";
// cSpell: ignore vladmandic
import Human from "@vladmandic/human";
import { fetchAllEmployees } from "@/service/employee";
import { markAttendance } from "@/service/attendance";
import { useToast } from "@/hooks/use-toast";

const humanConfig: any = {
  modelBasePath: "/models",
  face: {
    enabled: true,
    detector: { rotation: true },
    mesh: {}, // object instead of boolean
    emotion: true,
  },
  body: { enabled: true },
  hand: { enabled: true },
};

export default function AddAttendance() {
  const [cameraActive, setCameraActive] = useState(false);
  const [employeeList, setEmployeeList] = useState([]);
  const [human, setHuman] = useState(null);
  const imgRef = useRef(null);
  const { toast } = useToast();

  const getAllEmployees = async () => {
    const employees = await fetchAllEmployees();
    if (Array.isArray(employees) && employees.length > 0)
      setEmployeeList(employees);
  };

  useEffect(() => {
    const initHuman = async () => {
      const h = new Human(humanConfig);
      await h.load();
      setHuman(h);
    };
    initHuman();
    getAllEmployees();
  }, []);

  const euclideanDistance = (a: number[], b: number[]) => {
    let sum = 0;
    for (let i = 0; i < a.length; i++) sum += (a[i] - b[i]) ** 2;
    return Math.sqrt(sum);
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file || !human || employeeList.length === 0) return;

    const img = new Image();
    img.src = URL.createObjectURL(file);
    await img.decode();

    const res = await human.detect(img);

    const uploadedEmbedding = res.face[0].embedding;
    const threshold = 0.6;

    for (const employee of employeeList) {
      const dataArray = new Float32Array(
        employee?.embedding[0]?.split(",").map(Number)
      );
      const dataArrayNormal = Array.from(dataArray); // convert to number[]
      const distance = euclideanDistance(uploadedEmbedding, dataArrayNormal);
      if (distance < threshold) {
        const response: any = markAttendance(employee?._id);
        if (response.success) {
          toast({
            title: `Attendance marked successfully for ${employee?.name}`,
            variant: "default",
          });
        }
      }
    }

    URL.revokeObjectURL(img.src);
  };

  const toggleCamera = () => {
    setCameraActive(!cameraActive);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-background p-4">
      {/* Header */}
      <header className="w-full max-w-6xl mb-8 text-center">
        <h1 className="text-3xl font-bold text-foreground">Mark Attendance</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Upload images or use live camera to mark attendance
        </p>
      </header>

      {/* Main Content Sections */}
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <Card className="bg-card border-border shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Upload className="h-5 w-5 text-primary" />
              <span>File Upload Center</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
              <FileImage className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                Upload Files
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Drag and drop files here or click to browse
              </p>
              <input
                type="file"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
                accept="image/*"
              />
              <img ref={imgRef} alt="Uploaded" style={{ display: "none" }} />
              <Button
                onClick={() => document.getElementById("file-upload")?.click()}
                className="bg-gradient-primary hover:opacity-90"
              >
                Choose Files
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Camera Section */}
        <Card className="bg-card border-border shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Camera className="h-5 w-5 text-primary" />
              <span>Camera Controls</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted/30 rounded-lg p-8 text-center">
              {cameraActive ? (
                <div className="space-y-4">
                  <div className="w-full h-48 bg-muted/50 rounded-lg flex items-center justify-center border-2 border-success">
                    <Video className="h-16 w-16 text-success animate-pulse" />
                  </div>
                  <p className="text-sm text-success font-medium">
                    Camera is active and recording
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <Camera className="h-16 w-16 text-muted-foreground mx-auto" />
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      Camera Access
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Activate camera for monitoring or capture
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex space-x-2">
              <Button
                onClick={toggleCamera}
                variant={cameraActive ? "destructive" : "default"}
                className="flex-1"
              >
                {cameraActive ? "Stop Camera" : "Start Camera"}
              </Button>
              {cameraActive && <Button variant="outline">Capture</Button>}
            </div>

            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Camera permissions required</p>
              <p>• Supports HD video recording</p>
              <p>• Secure connection established</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
