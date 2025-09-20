import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Camera, Upload, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface AddUserModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddUser: (user: any) => void
}

export default function AddUserModal({ open, onOpenChange, onAddUser }: AddUserModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    designation: "",
    type: "",
    image: null as File | null
  })
  console.log("form-->", formData)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [showCamera, setShowCamera] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const { toast } = useToast()

  const departments = [
    "Engineering", "Marketing", "Sales", "HR", "Finance", "Operations"
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFormData(prev => ({ ...prev, image: file }))
      const reader = new FileReader()
      reader.onload = (e) => setImagePreview(e.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
      }
      setShowCamera(true)
    } catch (error) {
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please check permissions.",
        variant: "destructive"
      })
    }
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current
      const video = videoRef.current
      const context = canvas.getContext('2d')
      
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      context?.drawImage(video, 0, 0)
      
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' })
          setFormData(prev => ({ ...prev, image: file }))
          setImagePreview(canvas.toDataURL())
          stopCamera()
        }
      }, 'image/jpeg', 0.8)
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    setShowCamera(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.department || !formData.designation || !formData.type) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      })
      return
    }

    const newUser = {
      name: formData.name,
      email: formData.email,
      type: formData.type === "admin" ? "ADMIN" : "EMPLOYEE",
      status: "Active",
      photo: formData.image,
      department: formData.department,
      designation: formData.designation,
    }

    onAddUser(newUser)
    toast({
      title: "Success",
      description: "User has been added successfully."
    })
    handleClose()
  }

  const handleClose = () => {
    setFormData({
      name: "",
      email: "",
      department: "",
      designation: "",
      type: "",
      image: null
    })
    setImagePreview(null)
    stopCamera()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter full name"
              required
            />
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="Enter email address"
              required
            />
          </div>

          {/* Department Dropdown */}
          <div className="space-y-2">
            <Label>Department *</Label>
            <Select value={formData.department} onValueChange={(value) => handleInputChange("department", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Designation Field */}
          <div className="space-y-2">
            <Label htmlFor="designation">Designation *</Label>
            <Input
              id="designation"
              value={formData.designation}
              onChange={(e) => handleInputChange("designation", e.target.value)}
              placeholder="Enter job designation"
              required
            />
          </div>

          {/* Type Dropdown */}
          <div className="space-y-2">
            <Label>User Type *</Label>
            <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select user type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="user">User</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Image Upload Section */}
          <div className="space-y-2">
            <Label>Profile Picture</Label>
            
            {/* Image Preview */}
            {imagePreview && (
              <div className="relative w-24 h-24 mx-auto">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="w-full h-full object-cover rounded-full border-2 border-border"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                  onClick={() => {
                    setImagePreview(null)
                    setFormData(prev => ({ ...prev, image: null }))
                  }}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}

            {/* Camera Section */}
            {showCamera && (
              <div className="space-y-2">
                <video 
                  ref={videoRef}
                  className="w-full max-w-xs mx-auto rounded-lg border border-border"
                  autoPlay
                  muted
                />
                <div className="flex gap-2 justify-center">
                  <Button type="button" onClick={capturePhoto} size="sm">
                    Capture Photo
                  </Button>
                  <Button type="button" variant="outline" onClick={stopCamera} size="sm">
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {/* Upload Buttons */}
            {!showCamera && !imagePreview && (
              <div className="flex gap-2 justify-center">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={startCamera}
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Camera
                </Button>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>

          {/* Form Actions */}
          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={handleClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-gradient-primary hover:opacity-90">
              Add User
            </Button>
          </div>
        </form>

        <canvas ref={canvasRef} className="hidden" />
      </DialogContent>
    </Dialog>
  )
}