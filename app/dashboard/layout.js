// app/dashboard/layout.js
import RequireAuth from "@/components/RequireAuth"
import DashboardLayout from "@/components/DashboardLayout"

export default function DashboardRootLayout({ children }) {
  return (
    // <RequireAuth>
      <DashboardLayout>{children}</DashboardLayout>
    // </RequireAuth>
  )
}
