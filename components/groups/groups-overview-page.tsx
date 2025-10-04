"use client"

import { Card } from "@/components/ui/card"
import { Globe } from "lucide-react"
import Link from "next/link"

const continents = [
  {
    id: "afrique",
    name: "Afrique",
    image: "/africa-continent-map-illustration.jpg",
    groups: ["Ouest", "Est", "Sud", "Nord", "Centre"],
  },
  {
    id: "amerique",
    name: "Amérique",
    image: "/north-america-continent-map-illustration.jpg",
    groups: ["Nord", "Centre", "Sud"],
  },
  {
    id: "asie",
    name: "Asie",
    image: "/asia-continent-map-illustration.jpg",
    groups: ["Est", "Sud-Est", "Sud", "Ouest", "Centre"],
  },
  {
    id: "europe",
    name: "Europe",
    image: "/europe-continent-map-illustration.jpg",
    groups: ["Ouest", "Est", "Nord", "Sud"],
  },
  {
    id: "oceanie",
    name: "Océanie",
    image: "/south-america-continent-map-illustration.jpg",
    groups: ["Pacifique"],
  },
]

export function GroupsOverviewPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <Globe className="h-8 w-8" />
            Gestion des Groupes
          </h1>
          <p className="text-muted-foreground">Sélectionnez un continent pour gérer ses groupes de pays</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {continents.map((continent) => (
            <Link key={continent.id} href={`/groupes/${continent.id}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={continent.image || "/placeholder.svg"}
                    alt={continent.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{continent.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    {continent.groups.length} groupe{continent.groups.length > 1 ? "s" : ""}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {continent.groups.map((group) => (
                      <span key={group} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md">
                        {group}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
