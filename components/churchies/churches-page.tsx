"use client";

import { useState } from "react";
import { ChevronLeft, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
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
import { ChurchCard } from "./church-card";

export interface Church {
  id: string;
  name: string;
  city: string;
  imageUrl: string;
  responsible: string;
  address: string;
  email: string;
  phone: string;
}

interface ChurchesPageProps {
  continent: string;
  country: string;
  city: string;
}

export function ChurchesPage({ continent, country, city }: ChurchesPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedChurch, setSelectedChurch] = useState<Church | null>(null);

  const [newChurchName, setNewChurchName] = useState("");
  const [newChurchImageUrl, setNewChurchImageUrl] = useState("");
  const [newChurchResponsible, setNewChurchResponsible] = useState("");
  const [newChurchAddress, setNewChurchAddress] = useState("");
  const [newChurchEmail, setNewChurchEmail] = useState("");
  const [newChurchPhone, setNewChurchPhone] = useState("");

  const [churches, setChurches] = useState<Church[]>([
    {
      id: "1",
      name: "Église St. Mary",
      city: "Berlin",
      imageUrl: "/white-church-with-steeple.jpg",
      responsible: "Pasteur Jean Dupont",
      address: "123 Rue de l'Église, 75001 Paris",
      email: "stmary@church.com",
      phone: "+33 1 23 45 67 89",
    },
    {
      id: "2",
      name: "Église Trinity",
      city: "Berlin",
      imageUrl: "/stone-church-building.jpg",
      responsible: "Pasteur Marie Martin",
      address: "456 Avenue de la Foi, 75002 Paris",
      email: "trinity@church.com",
      phone: "+33 1 98 76 54 32",
    },
    {
      id: "3",
      name: "Église St. Peter",
      city: "Berlin",
      imageUrl: "/modern-church-with-cross.jpg",
      responsible: "Pasteur Pierre Dubois",
      address: "789 Boulevard de l'Espoir, 75003 Paris",
      email: "stpeter@church.com",
      phone: "+33 1 11 22 33 44",
    },
    {
      id: "4",
      name: "Église St. Paul",
      city: "Berlin",
      imageUrl: "/red-brick-church.jpg",
      responsible: "Pasteur Sophie Bernard",
      address: "321 Place de la Paix, 75004 Paris",
      email: "stpaul@church.com",
      phone: "+33 1 55 66 77 88",
    },
  ]);

  const filteredChurches = churches.filter((church) =>
    church.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddChurch = () => {
    if (
      newChurchName.trim() &&
      newChurchResponsible.trim() &&
      newChurchEmail.trim()
    ) {
      const newChurch: Church = {
        id: Date.now().toString(),
        name: newChurchName,
        city: "Berlin",
        imageUrl: newChurchImageUrl || "/classic-stone-church.png",
        responsible: newChurchResponsible,
        address: newChurchAddress,
        email: newChurchEmail,
        phone: newChurchPhone,
      };
      setChurches([...churches, newChurch]);
      resetForm();
      setIsAddDialogOpen(false);
    }
  };

  const handleEditChurch = (church: Church) => {
    setSelectedChurch(church);
    setNewChurchName(church.name);
    setNewChurchImageUrl(church.imageUrl);
    setNewChurchResponsible(church.responsible);
    setNewChurchAddress(church.address);
    setNewChurchEmail(church.email);
    setNewChurchPhone(church.phone);
    setIsEditDialogOpen(true);
  };

  const handleUpdateChurch = () => {
    if (
      selectedChurch &&
      newChurchName.trim() &&
      newChurchResponsible.trim() &&
      newChurchEmail.trim()
    ) {
      setChurches(
        churches.map((church) =>
          church.id === selectedChurch.id
            ? {
                ...church,
                name: newChurchName,
                imageUrl: newChurchImageUrl,
                responsible: newChurchResponsible,
                address: newChurchAddress,
                email: newChurchEmail,
                phone: newChurchPhone,
              }
            : church
        )
      );
      resetForm();
      setSelectedChurch(null);
      setIsEditDialogOpen(false);
    }
  };

  const resetForm = () => {
    setNewChurchName("");
    setNewChurchImageUrl("");
    setNewChurchResponsible("");
    setNewChurchAddress("");
    setNewChurchEmail("");
    setNewChurchPhone("");
  };

  const handleDeleteChurch = (church: Church) => {
    setSelectedChurch(church);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedChurch) {
      setChurches(churches.filter((church) => church.id !== selectedChurch.id));
      setSelectedChurch(null);
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="flex items-center gap-4 p-4">
          <Link href={`/villes/${continent}/${country}`}>
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold flex-1 text-center mr-10">
            Églises
          </h1>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* City Title */}
        <h2 className="text-2xl font-bold">Églises à {city}</h2>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            type="text"
            placeholder="Rechercher une église..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Churches List */}
        <div className="space-y-3">
          {filteredChurches.map((church) => (
            <ChurchCard
              key={church.id}
              church={church}
              continent={continent}
              country={country}
              city={city}
              onEdit={handleEditChurch}
              onDelete={handleDeleteChurch}
            />
          ))}
        </div>

        {filteredChurches.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            Aucune église trouvée
          </div>
        )}
      </div>

      {/* Add Church Button */}
      <div className="fixed bottom-6 left-6 right-6">
        <Button
          onClick={() => setIsAddDialogOpen(true)}
          className="w-full h-14 text-lg font-semibold"
          size="lg"
        >
          <Plus className="mr-2 h-6 w-6" />
          Ajouter une Église
        </Button>
      </div>

      {/* Add Church Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Ajouter une Église</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="church-name">Nom de l'Église *</Label>
              <Input
                id="church-name"
                placeholder="Ex: Église St. Mary"
                value={newChurchName}
                onChange={(e) => setNewChurchName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="church-responsible">Responsable *</Label>
              <Input
                id="church-responsible"
                placeholder="Ex: Pasteur Jean Dupont"
                value={newChurchResponsible}
                onChange={(e) => setNewChurchResponsible(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="church-address">Adresse Postale</Label>
              <Input
                id="church-address"
                placeholder="Ex: 123 Rue de l'Église, 75001 Paris"
                value={newChurchAddress}
                onChange={(e) => setNewChurchAddress(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="church-email">Email *</Label>
              <Input
                id="church-email"
                type="email"
                placeholder="Ex: contact@church.com"
                value={newChurchEmail}
                onChange={(e) => setNewChurchEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="church-phone">Numéro de Téléphone</Label>
              <Input
                id="church-phone"
                type="tel"
                placeholder="Ex: +33 1 23 45 67 89"
                value={newChurchPhone}
                onChange={(e) => setNewChurchPhone(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="church-image">URL de l'Image</Label>
              <Input
                id="church-image"
                placeholder="https://example.com/image.jpg"
                value={newChurchImageUrl}
                onChange={(e) => setNewChurchImageUrl(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Annuler
            </Button>
            <Button
              onClick={handleAddChurch}
              disabled={
                !newChurchName.trim() ||
                !newChurchResponsible.trim() ||
                !newChurchEmail.trim()
              }
            >
              Ajouter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Church Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Modifier l'Église</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-church-name">Nom de l'Église *</Label>
              <Input
                id="edit-church-name"
                placeholder="Ex: Église St. Mary"
                value={newChurchName}
                onChange={(e) => setNewChurchName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-church-responsible">Responsable *</Label>
              <Input
                id="edit-church-responsible"
                placeholder="Ex: Pasteur Jean Dupont"
                value={newChurchResponsible}
                onChange={(e) => setNewChurchResponsible(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-church-address">Adresse Postale</Label>
              <Input
                id="edit-church-address"
                placeholder="Ex: 123 Rue de l'Église, 75001 Paris"
                value={newChurchAddress}
                onChange={(e) => setNewChurchAddress(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-church-email">Email *</Label>
              <Input
                id="edit-church-email"
                type="email"
                placeholder="Ex: contact@church.com"
                value={newChurchEmail}
                onChange={(e) => setNewChurchEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-church-phone">Numéro de Téléphone</Label>
              <Input
                id="edit-church-phone"
                type="tel"
                placeholder="Ex: +33 1 23 45 67 89"
                value={newChurchPhone}
                onChange={(e) => setNewChurchPhone(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-church-image">URL de l'Image</Label>
              <Input
                id="edit-church-image"
                placeholder="https://example.com/image.jpg"
                value={newChurchImageUrl}
                onChange={(e) => setNewChurchImageUrl(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Annuler
            </Button>
            <Button
              onClick={handleUpdateChurch}
              disabled={
                !newChurchName.trim() ||
                !newChurchResponsible.trim() ||
                !newChurchEmail.trim()
              }
            >
              Enregistrer
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
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer l'église "
              {selectedChurch?.name}" ? Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
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
