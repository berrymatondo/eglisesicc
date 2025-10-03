"use client";

import { useState, useMemo } from "react";
import { ArrowLeft, Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { CountryCard } from "./country-card";
import { useRouter } from "next/navigation";

export interface Country {
  id: string;
  name: string;
  flag: string;
  cities: number;
  churches: number;
  group?: string;
}

interface CountriesPageProps {
  continent: string;
}

// Sample data for countries by continent
const countriesData: Record<string, Country[]> = {
  afrique: [
    {
      id: "nigeria",
      name: "Nigeria",
      flag: "/nigeria-flag.png",
      cities: 25,
      churches: 120,
      group: "Ouest",
    },
    {
      id: "kenya",
      name: "Kenya",
      flag: "/kenyan-flag.png",
      cities: 18,
      churches: 95,
      group: "Est",
    },
    {
      id: "south-africa",
      name: "Afrique du Sud",
      flag: "/south-africa-flag.png",
      cities: 32,
      churches: 150,
      group: "Sud",
    },
    {
      id: "ghana",
      name: "Ghana",
      flag: "/ghana-flag.png",
      cities: 15,
      churches: 80,
      group: "Ouest",
    },
    {
      id: "ethiopia",
      name: "Éthiopie",
      flag: "/ethiopia-flag.jpg",
      cities: 12,
      churches: 60,
      group: "Est",
    },
  ],
  asie: [
    {
      id: "china",
      name: "Chine",
      flag: "/china-flag.png",
      cities: 45,
      churches: 200,
      group: "Est",
    },
    {
      id: "india",
      name: "Inde",
      flag: "/india-flag.png",
      cities: 38,
      churches: 180,
      group: "Sud",
    },
    {
      id: "japan",
      name: "Japon",
      flag: "/japan-flag.png",
      cities: 22,
      churches: 95,
      group: "Est",
    },
  ],
  europe: [
    {
      id: "france",
      name: "France",
      flag: "/france-flag.png",
      cities: 28,
      churches: 120,
      group: "Ouest",
    },
    {
      id: "germany",
      name: "Allemagne",
      flag: "/germany-flag.png",
      cities: 25,
      churches: 110,
      group: "Centre",
    },
    {
      id: "uk",
      name: "Royaume-Uni",
      flag: "/uk-flag.png",
      cities: 30,
      churches: 140,
      group: "Ouest",
    },
  ],
  amerique: [
    {
      id: "usa",
      name: "États-Unis",
      flag: "/american-flag-waving.png",
      cities: 85,
      churches: 450,
      group: "Nord",
    },
    {
      id: "canada",
      name: "Canada",
      flag: "/canada-flag.png",
      cities: 35,
      churches: 180,
      group: "Nord",
    },
    {
      id: "mexico",
      name: "Mexique",
      flag: "/mexico-flag.png",
      cities: 42,
      churches: 220,
      group: "Centre",
    },
    {
      id: "brazil",
      name: "Brésil",
      flag: "/brazil-flag.png",
      cities: 55,
      churches: 280,
      group: "Sud",
    },
    {
      id: "argentina",
      name: "Argentine",
      flag: "/argentina-flag.png",
      cities: 28,
      churches: 140,
      group: "Sud",
    },
  ],
  oceanie: [
    {
      id: "australia",
      name: "Australie",
      flag: "/australia-flag.jpg",
      cities: 45,
      churches: 220,
      group: "Pacifique",
    },
    {
      id: "new-zealand",
      name: "Nouvelle-Zélande",
      flag: "/new-zealand-flag.jpg",
      cities: 18,
      churches: 95,
      group: "Pacifique",
    },
    {
      id: "fiji",
      name: "Fidji",
      flag: "/fiji-flag.jpg",
      cities: 8,
      churches: 42,
      group: "Pacifique",
    },
  ],
};

const continentNames: Record<string, string> = {
  afrique: "Afrique",
  asie: "Asie",
  europe: "Europe",
  amerique: "Amérique",
  oceanie: "Océanie",
};

export function CountriesPage({ continent }: CountriesPageProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCountry, setEditingCountry] = useState<Country | null>(null);
  const [deletingCountry, setDeletingCountry] = useState<Country | null>(null);
  const [newCountry, setNewCountry] = useState({
    name: "",
    flag: "",
    group: "",
  });

  const countries = countriesData[continent] || [];
  const continentName = continentNames[continent] || "Continent";

  // Get unique groups
  const groups = useMemo(() => {
    const uniqueGroups = new Set(countries.map((c) => c.group).filter(Boolean));
    return Array.from(uniqueGroups);
  }, [countries]);

  // Filter countries
  const filteredCountries = useMemo(() => {
    return countries.filter((country) => {
      const matchesSearch = country.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesGroup =
        selectedGroup === "all" || country.group === selectedGroup;
      return matchesSearch && matchesGroup;
    });
  }, [countries, searchQuery, selectedGroup]);

  const handleSaveCountry = () => {
    if (editingCountry) {
      console.log("[v0] Editing country:", {
        ...editingCountry,
        ...newCountry,
      });
    } else {
      console.log("[v0] Adding country:", {
        ...newCountry,
        continent,
      });
    }
    setIsDialogOpen(false);
    setEditingCountry(null);
    setNewCountry({ name: "", flag: "", group: "" });
  };

  const handleEditCountry = (country: Country) => {
    setEditingCountry(country);
    setNewCountry({
      name: country.name,
      flag: country.flag,
      group: country.group || "",
    });
    setIsDialogOpen(true);
  };

  const handleDeleteCountry = (country: Country) => {
    setDeletingCountry(country);
  };

  const confirmDelete = () => {
    if (deletingCountry) {
      console.log("[v0] Deleting country:", deletingCountry);
      // Here you would typically delete from your data source
    }
    setDeletingCountry(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      {/*       <header className="sticky top-16 z-10 bg-background border-b border-border">
        <div className="flex items-center justify-center relative px-4 py-4">

          <div className="absolute left-4" onClick={() => router.back()}>
            <ArrowLeft className="h-6 w-6 text-foreground" />
          </div>
          <h1 className="text-xl font-bold text-foreground">Pays</h1>
          <Link href={`/groupes/${continent}`} className="absolute right-4">
            <Button variant="outline" size="sm">
              Gérer les groupes
            </Button>
          </Link>
        </div>
      </header> */}

      <header className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="flex items-center gap-4 px-4 py-4">
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold text-foreground">Pays</h1>
          <Link href={`/groupes/${continent}`} className="absolute right-4">
            <Button variant="outline" size="sm">
              Gérer les groupes
            </Button>
          </Link>
        </div>
      </header>

      {/* Search and Filter */}
      <div className="px-4 py-4 space-y-4">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Rechercher un pays"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background"
            />
          </div>
          <Select value={selectedGroup} onValueChange={setSelectedGroup}>
            <SelectTrigger className="w-[180px] bg-background">
              <SelectValue placeholder="Tous les groupes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les groupes</SelectItem>
              {groups.map((group) => (
                <SelectItem key={group} value={group!}>
                  {group}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Continent Section */}
      <div className="px-4 pb-4">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          {continentName}
        </h2>

        <div className="space-y-3">
          {filteredCountries.map((country) => (
            <CountryCard
              key={country.id}
              country={country}
              continent={continent}
              onEdit={handleEditCountry}
              onDelete={handleDeleteCountry}
            />
          ))}
        </div>

        {filteredCountries.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            Aucun pays trouvé
          </div>
        )}
      </div>

      {/* Add Country Button */}
      <div className="fixed bottom-6 left-4 right-4">
        <Button
          onClick={() => {
            setEditingCountry(null);
            setNewCountry({ name: "", flag: "", group: "" });
            setIsDialogOpen(true);
          }}
          className="w-full h-14 text-base font-semibold bg-primary hover:bg-primary/90"
        >
          <Plus className="h-5 w-5 mr-2" />
          Ajouter un pays
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editingCountry ? "Modifier le pays" : "Ajouter un pays"}
            </DialogTitle>
            <DialogDescription>
              {editingCountry
                ? `Modifier les informations de ${editingCountry.name}.`
                : `Créer un nouveau pays dans ${continentName}. Remplissez tous les champs ci-dessous.`}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nom du pays</Label>
              <Input
                id="name"
                placeholder="Ex: France"
                value={newCountry.name}
                onChange={(e) =>
                  setNewCountry({ ...newCountry, name: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="flag">URL du drapeau</Label>
              <Input
                id="flag"
                placeholder="Ex: /france-flag.png"
                value={newCountry.flag}
                onChange={(e) =>
                  setNewCountry({ ...newCountry, flag: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="group">Groupe</Label>
              <Select
                value={newCountry.group}
                onValueChange={(value) =>
                  setNewCountry({ ...newCountry, group: value })
                }
              >
                <SelectTrigger id="group">
                  <SelectValue placeholder="Sélectionner un groupe" />
                </SelectTrigger>
                <SelectContent>
                  {groups.map((group) => (
                    <SelectItem key={group} value={group!}>
                      {group}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsDialogOpen(false);
                setEditingCountry(null);
              }}
            >
              Annuler
            </Button>
            <Button onClick={handleSaveCountry} disabled={!newCountry.name}>
              {editingCountry ? "Enregistrer" : "Ajouter"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={!!deletingCountry}
        onOpenChange={() => setDeletingCountry(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer {deletingCountry?.name} ? Cette
              action est irréversible et supprimera également toutes les villes
              et églises associées.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
