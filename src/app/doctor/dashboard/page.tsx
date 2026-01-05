import { DashboardLayout } from "@/components/layout/dashboard-layout";
import DoctorDashboard from "@/components/dashboard/doctor-dashboard";
import { Calendar, Settings, User, Video } from "lucide-react";

const navItems = [
  { href: "/doctor/dashboard", icon: Calendar, label: "My Schedule", active: true },
  { href: "#", icon: User, label: "My Patients" },
  { href: "#", icon: Video, label: "Virtual Consultations" },
  { href: "#", icon: Settings, label: "Settings" },
];

export default function DoctorDashboardPage() {
  return (
    <DashboardLayout title="Doctor's Dashboard" navItems={navItems}>
      <DoctorDashboard />
    </DashboardLayout>
  );
}
