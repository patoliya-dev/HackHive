import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  Calendar,
  TrendingUp,
  Activity,
} from "lucide-react";

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
];

interface StoredImage {
  id: number;
  file: File;
  name: string;
  embedding?: number[];
}

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className="bg-gradient-card border-border shadow-soft hover:shadow-medium transition-all duration-300"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg bg-${stat.color}/10`}>
                  <Icon className={`h-4 w-4 text-${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {stat.value}
                </div>
                <p
                  className={`text-xs ${
                    stat.changeType === "positive"
                      ? "text-success"
                      : "text-destructive"
                  }`}
                >
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Additional Dashboard Content */}
      <Card className="bg-card border-border shadow-soft">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                action: "User John Doe logged in",
                time: "2 minutes ago",
                status: "success",
              },
              {
                action: "New file uploaded by Admin",
                time: "5 minutes ago",
                status: "info",
              },
              {
                action: "Attendance record updated",
                time: "10 minutes ago",
                status: "warning",
              },
              {
                action: "System backup completed",
                time: "1 hour ago",
                status: "success",
              },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      activity.status === "success"
                        ? "bg-success"
                        : activity.status === "warning"
                        ? "bg-warning"
                        : "bg-primary"
                    }`}
                  />
                  <span className="text-sm text-foreground">
                    {activity.action}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
