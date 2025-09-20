import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./components/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Attendance from "./pages/Attendance";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  // TODO: may be used later.
  // <QueryClientProvider client={queryClient}>
  //   <TooltipProvider>
  //     <Toaster />
  //     <Sonner />
  //     <BrowserRouter>
  //       <Routes>
  //         <Route path="/login" element={<Login />} />
  //         <Route path="/*" element={
  //           <DashboardLayout>
  //             <Routes>
  //               <Route path="/" element={<Dashboard />} />
  //               <Route path="/users" element={<Users />} />
  //               <Route path="/attendance" element={<Attendance />} />
  //               <Route path="/settings" element={<Settings />} />
  //               {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
  //               <Route path="*" element={<NotFound />} />
  //             </Routes>
  //           </DashboardLayout>
  //         } />
  //       </Routes>
  //     </BrowserRouter>
  //   </TooltipProvider>
  // </QueryClientProvider>
  <QueryClientProvider client={queryClient}>
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          {/* Protected routes */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/attendance" element={<Attendance />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </TooltipProvider>
</QueryClientProvider>

);

export default App;