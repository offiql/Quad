import { Home, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Header() {
  return (
    <header className="sticky top-0">
      <div className="flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground flex items-center gap-2">
            <Home className="text-black pb-0.5" size={"1.2rem"} /> /
          </span>
          <span className="text-sm font-medium">Dashboard</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input type="search" placeholder="Search" className="pl-8" />
          </div>
        </div>
      </div>
    </header>
  );
}
