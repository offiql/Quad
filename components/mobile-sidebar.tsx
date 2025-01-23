'use client'

import Link from "next/link"
import { usePathname } from 'next/navigation'
import { LayoutGrid, FileText, Upload } from 'lucide-react'
import { cn } from "@/lib/utils"
import { FaHospitalUser } from "react-icons/fa6"

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
  },
]

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Sidebar({ className, ...props }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className={cn("flex h-full flex-col py-8", className)} {...props}>
      <div className="flex flex-shrink-0 items-center justify-center">
        <span className="text-2xl font-bold ">Quad</span>
      </div>
      <nav className="mt-12 flex flex-1 flex-col gap-y-4 px-4">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-3 rounded-lg p-2 text-sm ${
              pathname === item.href
                ? "bg-white/10"
                : " hover:bg-white/10 "
            }`}
          >
            <item.icon className="h-6 w-6" />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}

