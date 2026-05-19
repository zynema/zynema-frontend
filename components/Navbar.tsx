"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
        isScrolled ? "bg-background shadow-md" : "bg-transparent bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-primary font-bold text-3xl tracking-tighter">
            ZYNEMA
          </Link>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-muted-foreground">
            <Link href="#" className="text-foreground hover:text-primary transition-colors">Beranda</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Serial</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Film</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Game</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Baru & Populer</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Daftar Saya</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Telusuri menurut Bahasa</Link>
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <button aria-label="Search" className="text-foreground hover:text-primary transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button aria-label="Notifications" className="text-foreground hover:text-primary transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full"></span>
          </button>
          
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <Avatar className="w-8 h-8 rounded-sm cursor-pointer border border-transparent hover:border-primary transition-colors">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-background border-border">
              <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profil</DropdownMenuItem>
              <DropdownMenuItem>Pengaturan</DropdownMenuItem>
              <DropdownMenuItem>Keluar</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
