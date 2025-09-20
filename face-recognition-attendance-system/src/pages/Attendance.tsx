import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { 
  Search, 
  Calendar as CalendarIcon, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Download,
  Filter
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import type { DateRange } from "react-day-picker"

// Sample attendance data
const initialAttendance = [
  {
    id: 1,
    name: "John Doe",
    date: "2024-01-20",
    clockIn: "09:00 AM",
    clockOut: "05:30 PM",
    status: "Present",
    hoursWorked: 8.5,
    overtime: 0.5,
    avatar: "JD"
  },
  {
    id: 2,
    name: "Sarah Wilson",
    date: "2024-01-20",
    clockIn: "08:45 AM",
    clockOut: "05:15 PM",
    status: "Present",
    hoursWorked: 8.5,
    overtime: 0.5,
    avatar: "SW"
  },
  {
    id: 3,
    name: "Michael Chen",
    date: "2024-01-20",
    clockIn: "09:15 AM",
    clockOut: "05:00 PM",
    status: "Late",
    hoursWorked: 7.75,
    overtime: 0,
    avatar: "MC"
  },
  {
    id: 4,
    name: "Emma Davis",
    date: "2024-01-20",
    clockIn: "-",
    clockOut: "-",
    status: "Absent",
    hoursWorked: 0,
    overtime: 0,
    avatar: "ED"
  },
  {
    id: 5,
    name: "Robert Johnson",
    date: "2024-01-20",
    clockIn: "08:30 AM",
    clockOut: "06:00 PM",
    status: "Present",
    hoursWorked: 9.5,
    overtime: 1.5,
    avatar: "RJ"
  },
  {
    id: 6,
    name: "Lisa Anderson",
    date: "2024-01-20",
    clockIn: "09:30 AM",
    clockOut: "01:00 PM",
    status: "Half Day",
    hoursWorked: 3.5,
    overtime: 0,
    avatar: "LA"
  }
]

export default function Attendance() {
  const [attendance, setAttendance] = useState(initialAttendance)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined)
  const [showDateFilter, setShowDateFilter] = useState(false)
  
  const filteredAttendance = attendance.filter(record => {
    const matchesSearch = record.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || record.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesDateRange = !dateRange?.from || !dateRange?.to || 
      (new Date(record.date) >= dateRange.from && new Date(record.date) <= dateRange.to)
    return matchesSearch && matchesStatus && matchesDateRange
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Present":
        return "bg-success text-success-foreground"
      case "Absent":
        return "bg-destructive text-destructive-foreground"
      case "Late":
        return "bg-warning text-warning-foreground"
      case "Half Day":
        return "bg-admin-primary text-white"
      default:
        return "bg-secondary text-secondary-foreground"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Present":
        return <CheckCircle className="h-4 w-4" />
      case "Absent":
        return <XCircle className="h-4 w-4" />
      case "Late":
        return <AlertCircle className="h-4 w-4" />
      case "Half Day":
        return <Clock className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const totalPresent = attendance.filter(a => a.status === "Present").length
  const totalAbsent = attendance.filter(a => a.status === "Absent").length
  const totalLate = attendance.filter(a => a.status === "Late").length
  const attendanceRate = ((totalPresent / attendance.length) * 100).toFixed(1)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Attendance Management</h2>
          <p className="text-muted-foreground">Track and monitor employee attendance</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-gradient-primary hover:opacity-90">
            <Calendar className="h-4 w-4 mr-2" />
            Mark Attendance
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-card border-border shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-success">{totalPresent}</div>
                <p className="text-sm text-muted-foreground">Present Today</p>
              </div>
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-destructive">{totalAbsent}</div>
                <p className="text-sm text-muted-foreground">Absent Today</p>
              </div>
              <XCircle className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-warning">{totalLate}</div>
                <p className="text-sm text-muted-foreground">Late Arrivals</p>
              </div>
              <AlertCircle className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-admin-primary">{attendanceRate}%</div>
                <p className="text-sm text-muted-foreground">Attendance Rate</p>
              </div>
              <Calendar className="h-8 w-8 text-admin-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Table */}
      <Card className="bg-card border-border shadow-soft">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle>Daily Attendance - January 20, 2024</CardTitle>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="present">Present</SelectItem>
                  <SelectItem value="absent">Absent</SelectItem>
                  <SelectItem value="late">Late</SelectItem>
                  <SelectItem value="half day">Half Day</SelectItem>
                </SelectContent>
              </Select>
              <Popover open={showDateFilter} onOpenChange={setShowDateFilter}>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    {dateRange?.from ? (
                      dateRange?.to ? (
                        `${format(dateRange.from, "MMM dd")} - ${format(dateRange.to, "MMM dd")}`
                      ) : (
                        format(dateRange.from, "MMM dd, yyyy")
                      )
                    ) : (
                      "Date Range"
                    )}
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
                        setDateRange(undefined)
                        setShowDateFilter(false)
                      }}
                      className="w-full"
                    >
                      Clear Filter
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Employee</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Clock In</TableHead>
                  <TableHead>Clock Out</TableHead>
                  <TableHead>Hours Worked</TableHead>
                  <TableHead>Overtime</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAttendance.map((record) => (
                  <TableRow key={record.id} className="hover:bg-muted/20 transition-colors">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-medium text-sm">
                          {record.avatar}
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{record.name}</div>
                          <div className="text-sm text-muted-foreground">ID: {record.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(record.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-foreground">{record.clockIn}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-foreground">{record.clockOut}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-foreground">
                        {record.hoursWorked}h
                      </span>
                    </TableCell>
                    <TableCell>
                      {record.overtime > 0 ? (
                        <span className="text-admin-primary font-medium">
                          +{record.overtime}h
                        </span>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(record.status)} flex items-center space-x-1 w-fit`}>
                        {getStatusIcon(record.status)}
                        <span>{record.status}</span>
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredAttendance.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No attendance records found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}