"use client"

import Link from "next/link"
import { Globe, Map, Building2, Church, Users } from "lucide-react"
import { cn } from "@/lib/utils"

interface BottomNavigationProps {
  active: "continents" | "countries" | "cities" | "churches" | "departments"
}

export function BottomNavigation({ active }: BottomNavigationProps) {
  const navItems = [
    { id: "continents", label: "Continents", icon: Globe, href: "/" },
    { id: "countries", label: "Pays", icon: Map, href: "/" },
    { id: "cities", label: "Villes", icon: Building2, href: "/" },
    { id: "churches", label: "Églises", icon: Church, href: "/" },
    { id: "departments", label: "Départements", icon: Users, href: "/" },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = active === item.id
          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className="h-6 w-6" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
