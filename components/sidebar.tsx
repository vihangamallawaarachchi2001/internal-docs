"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Book, FileText, FolderKanban, Home, Menu, Search, Tag, X } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "./theme-toggle"

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "All Documents", href: "/documents", icon: FileText },
  { name: "Categories", href: "/categories", icon: FolderKanban },
  { name: "Tags", href: "/tags", icon: Tag },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed left-4 top-4 z-40 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      <div
        className={cn("fixed inset-0 z-30 bg-background/80 backdrop-blur-sm md:hidden", isOpen ? "block" : "hidden")}
        onClick={() => setIsOpen(false)}
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 w-64 bg-background border-r transition-transform duration-300 md:translate-x-0 md:static md:h-screen",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center border-b px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-blue-600 text-white">
              <Book className="h-5 w-5" />
            </div>
            <span className="font-bold text-lg">DocPortal</span>
          </Link>
        </div>
        <div className="px-4 py-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search..."
              className="w-full rounded-md border border-input bg-background pl-8 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
        </div>
        <nav className="space-y-1 px-2 py-4">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href))

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                    : "text-foreground hover:bg-muted hover:text-accent-foreground",
                )}
                onClick={() => setIsOpen(false)}
              >
                <Icon className={cn("h-4 w-4", isActive ? "text-blue-600 dark:text-blue-400" : "")} />
                {item.name}
              </Link>
            )
          })}
        </nav>
        <div className="absolute bottom-4 left-4">
          <ThemeToggle />
        </div>
      </aside>
    </>
  )
}
