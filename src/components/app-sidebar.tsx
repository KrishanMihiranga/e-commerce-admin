import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Copyright, Home, SendToBack } from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import logo from "../../public/images/address-logo-dark.webp";

interface SubItemsProps {
    title: string;
    url: string;
}

interface ItemsProps {
    title: string;
    url: string;
    icon: any;
    subItems?: SubItemsProps[];
}

const items: ItemsProps[] = [
    { title: "Dashboard", url: "/", icon: Home },
];
const manageItems: ItemsProps[] = [
    { title: "Manage Products", url: "/manage-products", icon: SendToBack },
    { title: "Manage Colors", url: "/manage-colors", icon: SendToBack },
    { title: "Manage Sizes", url: "/manage-sizes", icon: SendToBack },
    { title: "Manage Categories", url: "/manage-categories", icon: SendToBack },
]

export function AppSidebar() {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeMenu, setActiveMenu] = useState<string | null>(null);

    const handleMenuClick = (url: string, hasSubItems: boolean) => {
        if (!hasSubItems) {
            setActiveMenu(null);
        } else {
            setActiveMenu((prev) => (prev === url ? null : url));
        }
        navigate(url);
    };

    return (
        <Sidebar className="h-screen bg-gray-100 text-black flex flex-col">

            <SidebarHeader className="p-4 flex items-start justify-center border-b">
                <a href="/">
                    <img src={logo} alt="User Avatar" className="h-7 w-auto" />
                </a>
            </SidebarHeader>


            <SidebarContent className="flex-1 gap-0">
                <SidebarGroup>
                    <SidebarGroupLabel className="text-gray-600 uppercase text-xs font-semibold">
                        Monitoring
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-1">
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title} className="group">
                                    {item.subItems ? (
                                        <Collapsible open={activeMenu === item.url}>
                                            <CollapsibleTrigger asChild>
                                                <SidebarMenuButton
                                                    onClick={() => handleMenuClick(item.url, true)}
                                                    className="w-full flex items-center gap-3 px-4 py-2 rounded-md transition-all hover:bg-gray-100"
                                                >
                                                    <item.icon
                                                        className={`w-5 h-5 ${location.pathname.includes(item.url)
                                                            ? "text-black"
                                                            : "text-gray-600 group-hover:text-black"
                                                            }`}
                                                    />
                                                    <span className="text-sm">{item.title}</span>
                                                </SidebarMenuButton>
                                            </CollapsibleTrigger>
                                            <CollapsibleContent>
                                                <SidebarMenuSub className="ml-6 space-y-1">
                                                    {item.subItems.map((subItem) => (
                                                        <SidebarMenuSubItem key={subItem.title}>
                                                            <button
                                                                onClick={() =>
                                                                    handleMenuClick(subItem.url, false)
                                                                }
                                                                className={`block w-full text-left px-4 py-2 text-sm rounded-md transition-all ${location.pathname === subItem.url
                                                                    ? "text-black bg-gray-200"
                                                                    : "text-gray-600 hover:text-black hover:bg-gray-100"
                                                                    }`}
                                                            >
                                                                {subItem.title}
                                                            </button>
                                                        </SidebarMenuSubItem>
                                                    ))}
                                                </SidebarMenuSub>
                                            </CollapsibleContent>
                                        </Collapsible>
                                    ) : (
                                        <SidebarMenuButton asChild>
                                            <button
                                                onClick={() => handleMenuClick(item.url, false)}
                                                className={`w-full flex items-center gap-3 px-4 py-2 rounded-md transition-all hover:bg-gray-100 ${location.pathname === item.url
                                                    ? "text-black bg-gray-200"
                                                    : "text-gray-600 group-hover:text-black"
                                                    }`}
                                            >
                                                <item.icon className="w-5 h-5" />
                                                <span className="text-sm">{item.title}</span>
                                            </button>
                                        </SidebarMenuButton>
                                    )}
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel className="text-gray-600 uppercase text-xs font-semibold">
                        Manage
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-1">
                            {manageItems.map((item) => (
                                <SidebarMenuItem key={item.title} className="group">
                                    {item.subItems ? (
                                        <Collapsible open={activeMenu === item.url}>
                                            <CollapsibleTrigger asChild>
                                                <SidebarMenuButton
                                                    onClick={() => handleMenuClick(item.url, true)}
                                                    className="w-full flex items-center gap-3 px-4 py-2 rounded-md transition-all hover:bg-gray-100"
                                                >
                                                    <item.icon
                                                        className={`w-5 h-5 ${location.pathname.includes(item.url)
                                                            ? "text-black"
                                                            : "text-gray-600 group-hover:text-black"
                                                            }`}
                                                    />
                                                    <span className="text-sm">{item.title}</span>
                                                </SidebarMenuButton>
                                            </CollapsibleTrigger>
                                            <CollapsibleContent>
                                                <SidebarMenuSub className="ml-6 space-y-1">
                                                    {item.subItems.map((subItem) => (
                                                        <SidebarMenuSubItem key={subItem.title}>
                                                            <button
                                                                onClick={() =>
                                                                    handleMenuClick(subItem.url, false)
                                                                }
                                                                className={`block w-full text-left px-4 py-2 text-sm rounded-md transition-all ${location.pathname === subItem.url
                                                                    ? "text-black bg-gray-200"
                                                                    : "text-gray-600 hover:text-black hover:bg-gray-100"
                                                                    }`}
                                                            >
                                                                {subItem.title}
                                                            </button>
                                                        </SidebarMenuSubItem>
                                                    ))}
                                                </SidebarMenuSub>
                                            </CollapsibleContent>
                                        </Collapsible>
                                    ) : (
                                        <SidebarMenuButton asChild>
                                            <button
                                                onClick={() => handleMenuClick(item.url, false)}
                                                className={`w-full flex items-center gap-3 px-4 py-2 rounded-md transition-all hover:bg-gray-100 ${location.pathname === item.url
                                                    ? "text-black bg-gray-200"
                                                    : "text-gray-600 group-hover:text-black"
                                                    }`}
                                            >
                                                <item.icon className="w-5 h-5" />
                                                <span className="text-sm">{item.title}</span>
                                            </button>
                                        </SidebarMenuButton>
                                    )}
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="p-4 border-t text-gray-600 text-xs text-center">
                <div className="flex items-center justify-center gap-1">
                    <Copyright className="w-4 h-4" />
                    2024 Your Company. All rights reserved.
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}
