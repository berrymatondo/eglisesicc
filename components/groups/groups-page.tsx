"use client"

import { useState, useMemo } from "react"
import { ArrowLeft, Search, Plus, Pencil, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"

export interface Group {
  id: string
  name: string
  description?: string
  countriesCount: number
}

interface GroupsPageProps {
  continent: string
}

// Sample data for groups by continent
const groupsData: Record<string, Group[]> = {
  afrique: [
    { id: "ouest", name: "Ouest", description: "Pays d'Afrique de l'Ouest", countriesCount: 2 },
    { id: "est", name: "Est", description: "Pays d'Afrique de l'Est", countriesCount: 2 },
    { id: "sud", name: "Sud", description: "Pays d'Afrique Australe", countriesCount: 1 },
  ],
  asie: [
    { id: "est", name: "Est", description: "Pays d'Asie de l'Est", countriesCount: 2 },
    { id: "sud", name: "Sud", description: "Pays d'Asie du Sud", countriesCount: 1 },
  ],
  europe: [
    { id: "ouest", name: "Ouest", description: "Pays d'Europe de l'Ouest", countriesCount: 2 },
    { id: "centre", name: "Centre", description: "Pays d'Europe Centrale", countriesCount: 1 },
  ],
  amerique: [
    { id: "nord", name: "Nord", description: "Pays d'Amérique du Nord", countriesCount: 2 },
    { id: "centre", name: "Centre", description: "Pays d'Amérique Centrale", countriesCount: 1 },
    { id: "sud", name: "Sud", description: "Pays d'Amérique du Sud", countriesCount: 2 },
  ],
  oceanie: [{ id: "pacifique", name: "Pacifique", description: "Pays du Pacifique", countriesCount: 3 }],
}

const continentNames: Record<string, string> = {
  afrique: "Afrique",
  asie: "Asie",
  europe: "Europe",
  amerique: "Amérique",
  oceanie: "Océanie",
}

export function GroupsPage({ continent }: GroupsPageProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingGroup, setEditingGroup] = useState<Group | null>(null)
  const [deletingGroup, setDeletingGroup] = useState<Group | null>(null)
  const [newGroup, setNewGroup] = useState({
    name: "",
    description: "",
  })

  const groups = groupsData[continent] || []
  const continentName = continentNames[continent] || "Continent"

  // Filter groups
  const filteredGroups = useMemo(() => {
    return groups.filter((group) => {
      const matchesSearch =
        group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        group.description?.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesSearch
    })
  }, [groups, searchQuery])

  const handleSaveGroup = () => {
    if (editingGroup) {
      console.log("[v0] Editing group:", {
        ...editingGroup,
        ...newGroup,
      })
    } else {
      console.log("[v0] Adding group:", {
        ...newGroup,
        continent,
      })
    }
    setIsDialogOpen(false)
    setEditingGroup(null)
    setNewGroup({ name: "", description: "" })
  }

  const handleEditGroup = (group: Group) => {
    setEditingGroup(group)
    setNewGroup({
      name: group.name,
      description: group.description || "",
    })
    setIsDialogOpen(true)
  }

  const handleDeleteGroup = (group: Group) => {
    setDeletingGroup(group)
  }

  const confirmDelete = () => {
    if (deletingGroup) {
      console.log("[v0] Deleting group:", deletingGroup)
    }
    setDeletingGroup(null)
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-16 z-10 bg-background border-b border-border">
        <div className="flex items-center justify-center relative px-4 py-4">
          <Link href={`/pays/${continent}`} className="absolute left-4">
            <ArrowLeft className="h-6 w-6 text-foreground" />
          </Link>
          <h1 className="text-xl font-bold text-foreground">Groupes</h1>
        </div>
      </header>

      {/* Search */}
      <div className="px-4 py-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Rechercher un groupe"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-background"
          />
        </div>
      </div>

      {/* Groups Section */}
      <div className="px-4 pb-4">
        <h2 className="text-2xl font-bold text-foreground mb-4">Groupes de {continentName}</h2>

        <div className="space-y-3">
          {filteredGroups.map((group) => (
            <Card key={group.id} className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-foreground mb-1">{group.name}</h3>
                  {group.description && (
                    <p className="text-sm text-muted-foreground mb-2 break-words">{group.description}</p>
                  )}
                  <p className="text-sm text-muted-foreground">
                    {group.countriesCount} {group.countriesCount === 1 ? "pays" : "pays"}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button variant="ghost" size="icon" onClick={() => handleEditGroup(group)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteGroup(group)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredGroups.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">Aucun groupe trouvé</div>
        )}
      </div>

      {/* Add Group Button */}
      <div className="fixed bottom-6 left-4 right-4">
        <Button
          onClick={() => {
            setEditingGroup(null)
            setNewGroup({ name: "", description: "" })
            setIsDialogOpen(true)
          }}
          className="w-full h-14 text-base font-semibold bg-primary hover:bg-primary/90"
        >
          <Plus className="h-5 w-5 mr-2" />
          Ajouter un groupe
        </Button>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingGroup ? "Modifier le groupe" : "Ajouter un groupe"}</DialogTitle>
            <DialogDescription>
              {editingGroup
                ? `Modifier les informations du groupe ${editingGroup.name}.`
                : `Créer un nouveau groupe pour ${continentName}. Remplissez tous les champs ci-dessous.`}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nom du groupe</Label>
              <Input
                id="name"
                placeholder="Ex: Ouest"
                value={newGroup.name}
                onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description (optionnel)</Label>
              <Input
                id="description"
                placeholder="Ex: Pays d'Afrique de l'Ouest"
                value={newGroup.description}
                onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsDialogOpen(false)
                setEditingGroup(null)
              }}
            >
              Annuler
            </Button>
            <Button onClick={handleSaveGroup} disabled={!newGroup.name}>
              {editingGroup ? "Enregistrer" : "Ajouter"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deletingGroup} onOpenChange={() => setDeletingGroup(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer le groupe {deletingGroup?.name} ? Cette action est irréversible. Les
              pays de ce groupe ne seront pas supprimés mais n'auront plus de groupe assigné.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive hover:bg-destructive/90">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
