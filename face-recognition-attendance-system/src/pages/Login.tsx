import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Shield, User } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate()
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    if (
      formData.email === "admin@gmail.com" &&
      formData.password === "admin"
    ) {
      login(formData.email, formData.password);
    } else {
        alert("Invalid creds!!")
    }
    console.log("Login attempt:", formData);
  }

  return (
    <div className="min-h-screen bg-dashboard-bg flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mb-4 shadow-medium">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Sign in to your account</p>
        </div>

        {/* Login Card */}
        <Card className="bg-gradient-card shadow-large border-0">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-xl font-semibold">Welcome Back</CardTitle>
            <CardDescription>
              Enter your credentials to access the admin panel
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="pl-10 h-11 transition-smooth focus:ring-2 focus:ring-admin-primary/20"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="pr-10 h-11 transition-smooth focus:ring-2 focus:ring-admin-primary/20"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    className="rounded border-input bg-background ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
                  />
                  <span className="text-muted-foreground">Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-sm text-admin-primary hover:text-admin-primary/80 transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-gradient-primary hover:opacity-90 text-white font-medium shadow-soft transition-smooth"
              >
                Sign In
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <button className="text-admin-primary hover:text-admin-primary/80 font-medium transition-colors">
                  Contact Administrator
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-muted-foreground">
            © 2024 Admin Dashboard. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}