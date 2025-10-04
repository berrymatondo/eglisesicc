"use client";

import { useState, useMemo } from "react";
import { ArrowLeft, MapPin, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import { CityCard } from "./city-card";

export interface City {
  id: string;
  name: string;
  country: string;
  churches: number;
  departments: number;
}

interface CitiesPageProps {
  continent: string;
  country: string;
}

// Sample city data for different countries
const citiesData: Record<string, City[]> = {
  nigeria: [
    {
      id: "1",
      name: "Lagos",
      country: "Nigeria",
      churches: 45,
      departments: 120,
    },
    {
      id: "2",
      name: "Abuja",
      country: "Nigeria",
      churches: 28,
      departments: 85,
    },
    {
      id: "3",
      name: "Kano",
      country: "Nigeria",
      churches: 18,
      departments: 52,
    },
    {
      id: "4",
      name: "Ibadan",
      country: "Nigeria",
      churches: 22,
      departments: 68,
    },
  ],
  kenya: [
    {
      id: "1",
      name: "Nairobi",
      country: "Kenya",
      churches: 32,
      departments: 95,
    },
    {
      id: "2",
      name: "Mombasa",
      country: "Kenya",
      churches: 18,
      departments: 54,
    },
    {
      id: "3",
      name: "Kisumu",
      country: "Kenya",
      churches: 12,
      departments: 38,
    },
  ],
  "afrique-du-sud": [
    {
      id: "1",
      name: "Johannesburg",
      country: "Afrique du Sud",
      churches: 42,
      departments: 125,
    },
    {
      id: "2",
      name: "Le Cap",
      country: "Afrique du Sud",
      churches: 38,
      departments: 110,
    },
    {
      id: "3",
      name: "Durban",
      country: "Afrique du Sud",
      churches: 28,
      departments: 82,
    },
    {
      id: "4",
      name: "Pretoria",
      country: "Afrique du Sud",
      churches: 25,
      departments: 75,
    },
  ],
  ghana: [
    { id: "1", name: "Accra", country: "Ghana", churches: 35, departments: 95 },
    {
      id: "2",
      name: "Kumasi",
      country: "Ghana",
      churches: 22,
      departments: 62,
    },
    {
      id: "3",
      name: "Tamale",
      country: "Ghana",
      churches: 15,
      departments: 45,
    },
  ],
  ethiopie: [
    {
      id: "1",
      name: "Addis-Abeba",
      country: "Éthiopie",
      churches: 28,
      departments: 78,
    },
    {
      id: "2",
      name: "Dire Dawa",
      country: "Éthiopie",
      churches: 15,
      departments: 42,
    },
    {
      id: "3",
      name: "Mekele",
      country: "Éthiopie",
      churches: 12,
      departments: 35,
    },
  ],
  chine: [
    { id: "1", name: "Pékin", country: "Chine", churches: 25, departments: 85 },
    {
      id: "2",
      name: "Shanghai",
      country: "Chine",
      churches: 32,
      departments: 105,
    },
    {
      id: "3",
      name: "Guangzhou",
      country: "Chine",
      churches: 22,
      departments: 72,
    },
  ],
  inde: [
    {
      id: "1",
      name: "Mumbai",
      country: "Inde",
      churches: 38,
      departments: 115,
    },
    { id: "2", name: "Delhi", country: "Inde", churches: 35, departments: 108 },
    {
      id: "3",
      name: "Bangalore",
      country: "Inde",
      churches: 28,
      departments: 88,
    },
  ],
  japon: [
    { id: "1", name: "Tokyo", country: "Japon", churches: 18, departments: 65 },
    { id: "2", name: "Osaka", country: "Japon", churches: 15, departments: 52 },
    { id: "3", name: "Kyoto", country: "Japon", churches: 12, departments: 42 },
  ],
  france: [
    {
      id: "1",
      name: "Paris",
      country: "France",
      churches: 45,
      departments: 135,
    },
    { id: "2", name: "Lyon", country: "France", churches: 28, departments: 82 },
    {
      id: "3",
      name: "Marseille",
      country: "France",
      churches: 25,
      departments: 75,
    },
  ],
  allemagne: [
    {
      id: "1",
      name: "Berlin",
      country: "Allemagne",
      churches: 32,
      departments: 98,
    },
    {
      id: "2",
      name: "Munich",
      country: "Allemagne",
      churches: 28,
      departments: 85,
    },
    {
      id: "3",
      name: "Hambourg",
      country: "Allemagne",
      churches: 22,
      departments: 68,
    },
  ],
  "royaume-uni": [
    {
      id: "1",
      name: "Londres",
      country: "Royaume-Uni",
      churches: 52,
      departments: 145,
    },
    {
      id: "2",
      name: "Manchester",
      country: "Royaume-Uni",
      churches: 28,
      departments: 82,
    },
    {
      id: "3",
      name: "Birmingham",
      country: "Royaume-Uni",
      churches: 22,
      departments: 68,
    },
  ],
  "etats-unis": [
    {
      id: "1",
      name: "New York",
      country: "États-Unis",
      churches: 15,
      departments: 45,
    },
    {
      id: "2",
      name: "Los Angeles",
      country: "États-Unis",
      churches: 12,
      departments: 38,
    },
    {
      id: "3",
      name: "Chicago",
      country: "États-Unis",
      churches: 8,
      departments: 25,
    },
    {
      id: "4",
      name: "Houston",
      country: "États-Unis",
      churches: 9,
      departments: 28,
    },
  ],
  canada: [
    {
      id: "1",
      name: "Toronto",
      country: "Canada",
      churches: 32,
      departments: 95,
    },
    {
      id: "2",
      name: "Montréal",
      country: "Canada",
      churches: 28,
      departments: 85,
    },
    {
      id: "3",
      name: "Vancouver",
      country: "Canada",
      churches: 22,
      departments: 68,
    },
  ],
  mexique: [
    {
      id: "1",
      name: "Mexico",
      country: "Mexique",
      churches: 42,
      departments: 125,
    },
    {
      id: "2",
      name: "Guadalajara",
      country: "Mexique",
      churches: 28,
      departments: 82,
    },
    {
      id: "3",
      name: "Monterrey",
      country: "Mexique",
      churches: 22,
      departments: 68,
    },
  ],
  australie: [
    {
      id: "1",
      name: "Sydney",
      country: "Australie",
      churches: 35,
      departments: 105,
    },
    {
      id: "2",
      name: "Melbourne",
      country: "Australie",
      churches: 32,
      departments: 98,
    },
    {
      id: "3",
      name: "Brisbane",
      country: "Australie",
      churches: 22,
      departments: 68,
    },
  ],
  "nouvelle-zelande": [
    {
      id: "1",
      name: "Auckland",
      country: "Nouvelle-Zélande",
      churches: 18,
      departments: 55,
    },
    {
      id: "2",
      name: "Wellington",
      country: "Nouvelle-Zélande",
      churches: 12,
      departments: 38,
    },
  ],
  fidji: [
    { id: "1", name: "Suva", country: "Fidji", churches: 8, departments: 25 },
    {
      id: "2",
      name: "Lautoka",
      country: "Fidji",
      churches: 5,
      departments: 18,
    },
  ],
};

export function CitiesPage({ continent, country }: CitiesPageProps) {
  console.log(continent, country);

  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [cities, setCities] = useState<City[]>(citiesData[country] || []);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingCity, setEditingCity] = useState<City | null>(null);
  const [cityToDelete, setCityToDelete] = useState<City | null>(null);
  const [newCity, setNewCity] = useState({
    name: "",
    country: "",
  });

  const countryName = decodeURIComponent(country).replace(/-/g, " ");

  const filteredCities = useMemo(() => {
    if (!searchQuery.trim()) return cities;

    const query = searchQuery.toLowerCase();
    return cities.filter((city) => city.name.toLowerCase().includes(query));
  }, [cities, searchQuery]);

  const handleAddCity = () => {
    if (editingCity) {
      setCities(
        cities.map((city) =>
          city.id === editingCity.id
            ? {
                ...city,
                name: newCity.name,
                country: newCity.country,
              }
            : city
        )
      );
    } else {
      const city: City = {
        id: Date.now().toString(),
        name: newCity.name,
        country: newCity.country,
        churches: 0,
        departments: 0,
      };
      setCities([...cities, city]);
    }
    setIsDialogOpen(false);
    setEditingCity(null);
    setNewCity({ name: "", country: "" });
  };

  const handleEditCity = (city: City) => {
    setEditingCity(city);
    setNewCity({
      name: city.name,
      country: city.country,
    });
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (city: City) => {
    setCityToDelete(city);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (cityToDelete) {
      setCities(cities.filter((city) => city.id !== cityToDelete.id));
      setCityToDelete(null);
    }
    setIsDeleteDialogOpen(false);
  };

  const handleOpenDialog = () => {
    setEditingCity(null);
    setNewCity({ name: "", country: countryName });
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}

      <header className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="flex items-center gap-4 px-4 py-4">
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-semibold text-foreground">Villes</h1>
        </div>
      </header>

      {/* Content */}
      <main className="px-4 py-6 pb-24">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Input
              type="text"
              placeholder="Rechercher une ville..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base"
            />
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          </div>
        </div>

        {/* Cities List */}
        <div className="space-y-4">
          {filteredCities.length > 0 ? (
            filteredCities.map((city) => (
              <CityCard
                key={city.id}
                city={city}
                continent={continent}
                country={country}
                onEdit={handleEditCity}
                onDelete={handleDeleteClick}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Aucune ville trouvée</p>
            </div>
          )}
        </div>
      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6">
        <Button
          size="lg"
          onClick={handleOpenDialog}
          className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-shadow"
          aria-label="Ajouter une ville"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </div>

      {/* Add/Edit City Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingCity ? "Modifier la ville" : "Ajouter une ville"}
            </DialogTitle>
            <DialogDescription>
              {editingCity
                ? "Modifiez les informations de la ville ci-dessous."
                : `Créer une nouvelle ville dans ${countryName}. Remplissez tous les champs ci-dessous.`}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nom de la ville</Label>
              <Input
                id="name"
                placeholder="Ex: Paris"
                value={newCity.name}
                onChange={(e) =>
                  setNewCity({ ...newCity, name: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="country">Pays</Label>
              <Input
                id="country"
                placeholder="Ex: France"
                value={newCity.country}
                onChange={(e) =>
                  setNewCity({ ...newCity, country: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleAddCity} disabled={!newCity.name}>
              {editingCity ? "Modifier" : "Ajouter"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action supprimera définitivement la ville &quot;
              {cityToDelete?.name}&quot;. Cette action ne peut pas être annulée.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
