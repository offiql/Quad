"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, FileText, Upload, FileImage } from "lucide-react";
import { FaHospitalUser } from "react-icons/fa6";
import { MdFamilyRestroom } from "react-icons/md";
import { Urbanist } from "next/font/google";

const urbanist = Urbanist({ subsets: ["latin"] });

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
    name: "My Relations",
    href: "/my-relations",
    icon: MdFamilyRestroom,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: FaHospitalUser,
  },
];
const adminNavigation = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutGrid,
  },
  {
    name: "Documents",
    href: "/admin/documents",
    icon: FileText,
  },
  {
    name: "Decoded Document",
    href: "/admin/decoded-document",
    icon: FileImage,
  },
  {
    name: "Team",
    href: "/admin/team",
    icon: MdFamilyRestroom,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin") ? adminNavigation : navigation;
  return (
    <div className="hidden md:flex  h-full w-20 flex-col items-center bg-[#3B0764] py-8">
      <div className="flex flex-shrink-0 items-center">
        <span
          className={`text-2xl font-bold text-white  tracking-widest ${urbanist.className}`}
        >
          Quad
        </span>
      </div>
      <nav className="mt-12 flex flex-1 flex-col gap-y-4">
        {isAdmin.map((item) => (
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
