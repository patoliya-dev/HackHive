import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Calendar, TrendingUp, Activity, Upload, Camera, FileImage, Video } from "lucide-react"
import { useState } from "react"

const stats = [
  {
    title: "Total Users",
    value: "2,847",
    change: "+12%",
    changeType: "positive" as const,
    icon: Users,
    color: "stat-blue",
  },
  {
    title: "Active Sessions",
    value: "1,234",
    change: "+5%",
    changeType: "positive" as const,
    icon: Activity,
    color: "stat-green",
  },
  {
    title: "Attendance Rate",
    value: "94.2%",
    change: "-2%",
    changeType: "negative" as const,
    icon: Calendar,
    color: "stat-orange",
  },
  {
    title: "Growth Rate",
    value: "18.5%",
    change: "+8%",
    changeType: "positive" as const,
    icon: TrendingUp,
    color: "stat-green",
  },
]

export default function Dashboard() {
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
  const [cameraActive, setCameraActive] = useState(false)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newFiles = Array.from(files).map(file => file.name)
      setUploadedFiles(prev => [...prev, ...newFiles])
    }
  }

  const toggleCamera = () => {
    setCameraActive(!cameraActive)
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="bg-gradient-card border-border shadow-soft hover:shadow-medium transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg bg-${stat.color}/10`}>
                  <Icon className={`h-4 w-4 text-${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className={`text-xs ${
                  stat.changeType === 'positive' 
                    ? 'text-success' 
                    : 'text-destructive'
                }`}>
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                multiple
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
                accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
              />
              <Button 
                onClick={() => document.getElementById('file-upload')?.click()}
                className="bg-gradient-primary hover:opacity-90"
              >
                Choose Files
              </Button>
            </div>
            
            {uploadedFiles.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-foreground">Uploaded Files:</h4>
                <div className="max-h-32 overflow-y-auto space-y-1">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm text-muted-foreground bg-muted/50 p-2 rounded">
                      <FileImage className="h-4 w-4" />
                      <span>{file}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
              {cameraActive && (
                <Button variant="outline">
                  Capture
                </Button>
              )}
            </div>
            
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Camera permissions required</p>
              <p>• Supports HD video recording</p>
              <p>• Secure connection established</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Dashboard Content */}
      <Card className="bg-card border-border shadow-soft">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: "User John Doe logged in", time: "2 minutes ago", status: "success" },
              { action: "New file uploaded by Admin", time: "5 minutes ago", status: "info" },
              { action: "Attendance record updated", time: "10 minutes ago", status: "warning" },
              { action: "System backup completed", time: "1 hour ago", status: "success" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.status === 'success' ? 'bg-success' :
                    activity.status === 'warning' ? 'bg-warning' : 
                    'bg-primary'
                  }`} />
                  <span className="text-sm text-foreground">{activity.action}</span>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}