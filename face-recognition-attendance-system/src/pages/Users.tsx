import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Mail,
  Phone,
  MoreHorizontal,
  Calendar as CalendarIcon,
  Filter,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// cSpell: ignore vladmandic
import Human from "@vladmandic/human";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import AddUserModal from "@/components/AddUserModal";
import type { DateRange } from "react-day-picker";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { addUser, fetchAllEmployees } from "@/service/employee";
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

// Sample user data
const initialUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@company.com",
    phone: "+1 (555) 123-4567",
    role: "Admin",
    status: "Active",
    joinDate: "2023-01-15",
    avatar: "JD",
  },
  {
    id: 2,
    name: "Sarah Wilson",
    email: "sarah.wilson@company.com",
    phone: "+1 (555) 234-5678",
    role: "Manager",
    status: "Active",
    joinDate: "2023-02-20",
    avatar: "SW",
  },
  {
    id: 3,
    name: "Michael Chen",
    email: "michael.chen@company.com",
    phone: "+1 (555) 345-6789",
    role: "Employee",
    status: "Inactive",
    joinDate: "2023-03-10",
    avatar: "MC",
  },
  {
    id: 4,
    name: "Emma Davis",
    email: "emma.davis@company.com",
    phone: "+1 (555) 456-7890",
    role: "Employee",
    status: "Active",
    joinDate: "2023-04-05",
    avatar: "ED",
  },
  {
    id: 5,
    name: "Robert Johnson",
    email: "robert.johnson@company.com",
    phone: "+1 (555) 567-8901",
    role: "Manager",
    status: "Active",
    joinDate: "2023-05-12",
    avatar: "RJ",
  },
  {
    id: 6,
    name: "Lisa Anderson",
    email: "lisa.anderson@company.com",
    phone: "+1 (555) 678-9012",
    role: "Employee",
    status: "Pending",
    joinDate: "2023-06-18",
    avatar: "LA",
  },
];

export default function Users() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [human, setHuman] = useState(null);
    const { toast } = useToast()
    const [dataChange, setDataChange] = useState(false);
    const [count, setCounts] = useState(0)

  const filteredUsers = users?.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())

    // const matchesDateRange =
    //   !dateRange?.from ||
    //   !dateRange?.to ||
    //   (new Date(user.joinDate) >= dateRange.from &&
    //     new Date(user.joinDate) <= dateRange.to);

    return matchesSearch;
    // return matchesSearch && matchesDateRange;
  });

   useEffect(() => {
      const initHuman = async () => {
        const h = new Human(humanConfig);
        await h.load();
        setHuman(h);
      };
      initHuman();
    }, []);

  const handleAddUser = async (newUser: any) => {
    const formData = new FormData();

    formData.append("name", newUser.name)
    formData.append("email", newUser.email)
    formData.append("department", newUser.department)
    formData.append("designation", newUser.designation)
    formData.append("photo", newUser.photo)
    formData.append("type", newUser.type)
    

    const img = new Image();
    img.src = URL.createObjectURL(newUser.photo);
    await img.decode();

    const res = await human.detect(img);
    if (res.face.length > 0) {
      const embedding = res.face[0].embedding;
      formData.append("embedding", embedding)
    }
    URL.revokeObjectURL(img.src);
    
    const response = await addUser(formData);
    if(response.success) {
      setDataChange(!dataChange)
      toast({
        title: response.message,
        variant: "default"
      })
    }
    setShowAddModal(false);
  };

  useEffect(() => {
    fetchAllEmployees().then((res) => {
      setUsers(res.employees);
      setCounts(res.count)
    });
  }, [dataChange]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-success text-success-foreground";
      case "Inactive":
        return "bg-destructive text-destructive-foreground";
      case "Pending":
        return "bg-warning text-warning-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin":
        return "bg-primary text-primary-foreground";
      case "Manager":
        return "bg-admin-primary text-white";
      case "Employee":
        return "bg-secondary text-secondary-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            User Management
          </h2>
          <p className="text-muted-foreground">
            Manage user accounts and permissions
          </p>
        </div>
        <Button
          className="bg-gradient-primary hover:opacity-90"
          onClick={() => setShowAddModal(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New User
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Users", value: count || users.length, color: "stat-blue" },
        ].map((stat, index) => (
          <Card
            key={index}
            className="bg-gradient-card border-border shadow-soft"
          >
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-foreground">
                {stat.value}
              </div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filters */}
      <Card className="bg-card border-border shadow-soft">
        <CardHeader>
          <CardTitle>User Directory</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search users by name, email, or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            {/* <Popover open={showDateFilter} onOpenChange={setShowDateFilter}>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  {dateRange?.from
                    ? dateRange?.to
                      ? `${format(dateRange.from, "MMM dd")} - ${format(
                          dateRange.to,
                          "MMM dd"
                        )}`
                      : format(dateRange.from, "MMM dd, yyyy")
                    : "Filter by date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                  className="pointer-events-auto"
                />
                <div className="p-3 border-t border-border">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setDateRange(undefined);
                      setShowDateFilter(false);
                    }}
                    className="w-full"
                  >
                    Clear Filter
                  </Button>
                </div>
              </PopoverContent>
            </Popover> */}
          </div>

          {/* Users Table */}
          <div className="rounded-md border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Department</TableHead>
                  {/* <TableHead>Status</TableHead> */}
                  {/* <TableHead>Join Date</TableHead> */}
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow
                    key={user.id}
                    className="hover:bg-muted/20 transition-colors"
                  >
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-medium text-sm">
                          {
                            <img
                              src={`data:image/jpeg;base64,${user?.imageFile?.data}`}
                              className="rounded-full w-10 h-10 object-cover"
                            />
                          }
                        </div>
                        <div>
                          <div className="font-medium text-foreground">
                            {user.name}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            ID: {user._id}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-foreground">
                          <Mail className="h-3 w-3 mr-1 text-muted-foreground" />
                          {user.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getRoleColor(user.role)}>
                        {user.department}
                      </Badge>
                    </TableCell>

                    {/* <TableCell className="text-muted-foreground">
                      {new Date(user.joinDate).toLocaleDateString()}
                    </TableCell> */}
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit User
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                No users found matching your search.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <AddUserModal
        open={showAddModal}
        onOpenChange={setShowAddModal}
        onAddUser={handleAddUser}
      />
    </div>
  );
}
