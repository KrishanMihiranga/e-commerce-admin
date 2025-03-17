import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <div className="flex h-screen">
                <AppSidebar />
                <main className="flex-1 p-4 overflow-auto">{children}</main>
            </div>
        </SidebarProvider>
    )
}
