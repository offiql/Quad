"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, FileText, Upload } from "lucide-react";
import { FaHospitalUser } from "react-icons/fa6";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutGrid,
  },
  {
    name: "Records",
    href: "/records",
    icon: FileText,
  },
  {
    name: "Upload Documents",
    href: "/upload-documents",
    icon: Upload,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: FaHospitalUser,
  }
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex  h-full w-20 flex-col items-center bg-[#3B0764] py-8">
      <div className="flex flex-shrink-0 items-center">
        <span className="text-2xl font-extralight text-white">Quad</span>
      </div>
      <nav className="mt-12 flex flex-1 flex-col gap-y-4">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex flex-col items-center gap-1 p-2 text-sm ${
              pathname === item.href
                ? "bg-white/10 text-white"
                : "text-white/60 hover:bg-white/10 hover:text-white"
            }`}
          >
            <item.icon className="h-6 w-6" />
            <span className="text-xs text-center">{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
