import { DashboardLayout } from "@/components/layout/dashboard-layout";
import AdminDashboard from "@/components/dashboard/admin-dashboard";
import { Activity, AlertCircle, BarChart, Brain, HeartPulse, Hospital, Settings, Users } from "lucide-react";

const navItems = [
  { href: "/admin/dashboard", icon: Activity, label: "Real-time Dashboard", active: true },
  { href: "#", icon: BarChart, label: "Analytics" },
  { href: "#", icon: HeartPulse, label: "Cardiology", isSubItem: true },
  { href: "#", icon: Brain, label: "Neurology", isSubItem: true },
  { href: "#", icon: Hospital, label: "General", isSubItem: true },
  { href: "#", icon: Users, label: "Staff" },
  { href: "#", icon: AlertCircle, label: "Alerts", badge: 3 },
  { href: "#", icon: Settings, label: "Settings" },
];

export default function AdminDashboardPage() {
  return (
    <DashboardLayout title="Admin Dashboard" navItems={navItems}>
      <AdminDashboard />
    </DashboardLayout>
  );
}
