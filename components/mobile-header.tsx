"use client";

import { Menu, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import ProfileSection from "./profile-section";
import Notifications from "./notifications";
import KidsVacinations from "./KidsVacinations";
import Sidebar from "./mobile-sidebar";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export default function MobileHeader() {
  const pathname = usePathname();

  const getTitle = () => {
    switch (pathname) {
      case "/dashboard":
        return "Dashboard Overview";
      case "/records":
        return "Medical Records";
      case "/upload-documents":
        return "Upload Documents";
      case "/profile":
        return "Profile";
      default:
        return "Dashboard";
    }
  };

  return (
    <div className="flex items-center justify-between p-4 md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 p-0">
          <VisuallyHidden asChild>
            <SheetTitle>Navigation Menu</SheetTitle>
          </VisuallyHidden>
          <div className="overflow-y-auto h-full hide-scrollbar">
            <Sidebar />
          </div>
        </SheetContent>
      </Sheet>

      <span className="font-semibold">{getTitle()}</span>

      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="ghost" className="rounded-full">
            <span className="grid h-8 w-8 place-content-center rounded-full bg-purple-100 text-sm font-medium text-purple-700">
              AS
            </span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-full max-w-xs p-0">
          <VisuallyHidden asChild>
            <SheetTitle>User Profile</SheetTitle>
          </VisuallyHidden>
          <div className="overflow-y-auto p-6 h-full hide-scrollbar">
            <ProfileSection />
            <Notifications />
            <KidsVacinations />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
