"use client";

import type React from "react";

import { useState } from "react";
import {
  ArrowLeft,
  Phone,
  Mail,
  ChevronRight,
  Pencil,
  Trash2,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BottomNavigation } from "../bottom-navigation";

interface DepartmentDetails {
  id: string;
  name: string;
  acronym: string;
  email: string;
  responsible: {
    name: string;
    email: string;
    phone: string;
  };
  coResponsible: {
    name: string;
    email: string;
    phone: string;
  };
  financeResponsible: {
    name: string;
    email: string;
    phone: string;
  };
  poles: Array<{
    id: string;
    name: string;
  }>;
}

interface DepartmentDetailsPageProps {
  continent: string;
  country: string;
  city: string;
  church: string;
  department: string;
}

export function DepartmentDetailsPage({
  continent,
  country,
  city,
  church,
  department: departmentId,
}: DepartmentDetailsPageProps) {
  const router = useRouter();

  // Mock data - in a real app, this would come from an API or database
  const [department, setDepartment] = useState<DepartmentDetails>({
    id: departmentId,
    name: "Ministère de la Jeunesse",
    acronym: "MJ",
    email: "jeunesse@eglise.com",
    responsible: {
      name: "Pasteur David",
      email: "david@eglise.com",
      phone: "+1 234 567 890",
    },
    coResponsible: {
      name: "Sœur Sarah",
      email: "sarah@eglise.com",
      phone: "+1 987 654 321",
    },
    financeResponsible: {
      name: "Frère Michel",
      email: "michel@eglise.com",
      phone: "+1 555 123 456",
    },
    poles: [
      { id: "worship", name: "Équipe de Louange" },
      { id: "leaders", name: "Leaders de Jeunesse" },
      { id: "media", name: "Équipe Média" },
      { id: "prayer", name: "Équipe de Prière" },
    ],
  });

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editedDepartment, setEditedDepartment] =
    useState<DepartmentDetails>(department);

  const [isPoleDialogOpen, setIsPoleDialogOpen] = useState(false);
  const [isPoleDeleteDialogOpen, setIsPoleDeleteDialogOpen] = useState(false);
  const [editingPole, setEditingPole] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [poleToDelete, setPoleToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [poleName, setPoleName] = useState("");

  const handleEdit = () => {
    setEditedDepartment(department);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    setDepartment(editedDepartment);
    setIsEditDialogOpen(false);
  };

  const handleDelete = () => {
    // In a real app, this would call an API to delete the department
    setIsDeleteDialogOpen(false);
    router.push(`/departements/${continent}/${country}/${city}/${church}`);
  };

  const handleAddPole = () => {
    setEditingPole(null);
    setPoleName("");
    setIsPoleDialogOpen(true);
  };

  const handleEditPole = (
    pole: { id: string; name: string },
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setEditingPole(pole);
    setPoleName(pole.name);
    setIsPoleDialogOpen(true);
  };

  const handleSavePole = () => {
    if (editingPole) {
      // Edit existing pole
      setDepartment({
        ...department,
        poles: department.poles.map((p) =>
          p.id === editingPole.id ? { ...p, name: poleName } : p
        ),
      });
    } else {
      // Add new pole
      const newPole = {
        id: `pole-${Date.now()}`,
        name: poleName,
      };
      setDepartment({
        ...department,
        poles: [...department.poles, newPole],
      });
    }
    setIsPoleDialogOpen(false);
    setPoleName("");
    setEditingPole(null);
  };

  const handleDeletePoleClick = (
    pole: { id: string; name: string },
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setPoleToDelete(pole);
    setIsPoleDeleteDialogOpen(true);
  };

  const handleConfirmDeletePole = () => {
    if (poleToDelete) {
      setDepartment({
        ...department,
        poles: department.poles.filter((p) => p.id !== poleToDelete.id),
      });
    }
    setIsPoleDeleteDialogOpen(false);
    setPoleToDelete(null);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="flex items-center gap-4 px-4 h-14">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="shrink-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-center flex-1">
            Détails du Département
          </h1>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={handleEdit}>
              <Pencil className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* Department Information Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">
            Informations du Département
          </h2>
          <Card className="p-6 space-y-6">
            {/* Department Name */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Nom du Département
              </p>
              <p className="text-lg font-semibold">{department.name}</p>
            </div>

            <div className="border-t border-border" />

            {/* Acronym */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Acronyme</p>
              <p className="text-lg font-semibold">{department.acronym}</p>
            </div>

            <div className="border-t border-border" />

            {/* Department Email */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Email du Département
              </p>
              <p className="text-lg font-semibold">{department.email}</p>
            </div>

            <div className="border-t border-border" />

            {/* Responsible */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Responsable</p>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-lg font-semibold mb-1">
                    {department.responsible.name}
                  </p>
                  <p className="text-sm text-muted-foreground mb-1">
                    {department.responsible.email}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {department.responsible.phone}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-primary hover:text-primary/80"
                    onClick={() =>
                      window.open(`tel:${department.responsible.phone}`)
                    }
                  >
                    <Phone className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-primary hover:text-primary/80"
                    onClick={() =>
                      window.open(`mailto:${department.responsible.email}`)
                    }
                  >
                    <Mail className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="border-t border-border" />

            {/* Co-Responsible */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Co-Responsable</p>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-lg font-semibold mb-1">
                    {department.coResponsible.name}
                  </p>
                  <p className="text-sm text-muted-foreground mb-1">
                    {department.coResponsible.email}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {department.coResponsible.phone}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-primary hover:text-primary/80"
                    onClick={() =>
                      window.open(`tel:${department.coResponsible.phone}`)
                    }
                  >
                    <Phone className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-primary hover:text-primary/80"
                    onClick={() =>
                      window.open(`mailto:${department.coResponsible.email}`)
                    }
                  >
                    <Mail className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="border-t border-border" />

            {/* Finance Responsible */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Responsable des Finances
              </p>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-lg font-semibold mb-1">
                    {department.financeResponsible.name}
                  </p>
                  <p className="text-sm text-muted-foreground mb-1">
                    {department.financeResponsible.email}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {department.financeResponsible.phone}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-primary hover:text-primary/80"
                    onClick={() =>
                      window.open(`tel:${department.financeResponsible.phone}`)
                    }
                  >
                    <Phone className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-primary hover:text-primary/80"
                    onClick={() =>
                      window.open(
                        `mailto:${department.financeResponsible.email}`
                      )
                    }
                  >
                    <Mail className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Poles Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Pôles</h2>
          <div className="space-y-3">
            {department.poles.map((pole) => (
              <Link
                key={pole.id}
                href={`/pole/${continent}/${country}/${city}/${church}/${departmentId}/${pole.id}`}
              >
                <Card className="p-4 hover:bg-accent/50 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-medium">{pole.name}</p>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => handleEditPole(pole, e)}
                        className="h-8 w-8"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => handleDeletePoleClick(pole, e)}
                        className="h-8 w-8"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
          <Button onClick={handleAddPole} className="w-full mt-4" size="lg">
            <Plus className="h-5 w-5 mr-2" />
            Ajouter un Pôle
          </Button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation active="departments" />

      <Dialog open={isPoleDialogOpen} onOpenChange={setIsPoleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingPole ? "Modifier le Pôle" : "Ajouter un Pôle"}
            </DialogTitle>
            <DialogDescription>
              {editingPole
                ? "Modifiez le nom du pôle. Cliquez sur Enregistrer pour sauvegarder."
                : "Entrez le nom du nouveau pôle. Cliquez sur Ajouter pour créer le pôle."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="pole-name">Nom du Pôle</Label>
              <Input
                id="pole-name"
                value={poleName}
                onChange={(e) => setPoleName(e.target.value)}
                placeholder="Ex: Équipe de Louange"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsPoleDialogOpen(false)}
            >
              Annuler
            </Button>
            <Button onClick={handleSavePole} disabled={!poleName.trim()}>
              {editingPole ? "Enregistrer" : "Ajouter"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={isPoleDeleteDialogOpen}
        onOpenChange={setIsPoleDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer le pôle ?</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer le pôle "{poleToDelete?.name}"
              ? Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDeletePole}
              className="bg-destructive text-destructive-foreground"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Modifier le Département</DialogTitle>
            <DialogDescription>
              Modifiez les informations du département. Cliquez sur Enregistrer
              pour sauvegarder les modifications.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            {/* Department Basic Info */}
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Nom du Département</Label>
                <Input
                  id="edit-name"
                  value={editedDepartment.name}
                  onChange={(e) =>
                    setEditedDepartment({
                      ...editedDepartment,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-acronym">Acronyme</Label>
                <Input
                  id="edit-acronym"
                  value={editedDepartment.acronym}
                  onChange={(e) =>
                    setEditedDepartment({
                      ...editedDepartment,
                      acronym: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-email">Email du Département</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={editedDepartment.email}
                  onChange={(e) =>
                    setEditedDepartment({
                      ...editedDepartment,
                      email: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            {/* Responsible */}
            <div className="space-y-2">
              <h3 className="font-semibold">Responsable</h3>
              <div className="grid gap-2">
                <Label htmlFor="edit-resp-name">Nom</Label>
                <Input
                  id="edit-resp-name"
                  value={editedDepartment.responsible.name}
                  onChange={(e) =>
                    setEditedDepartment({
                      ...editedDepartment,
                      responsible: {
                        ...editedDepartment.responsible,
                        name: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-resp-email">Email</Label>
                <Input
                  id="edit-resp-email"
                  type="email"
                  value={editedDepartment.responsible.email}
                  onChange={(e) =>
                    setEditedDepartment({
                      ...editedDepartment,
                      responsible: {
                        ...editedDepartment.responsible,
                        email: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-resp-phone">Téléphone</Label>
                <Input
                  id="edit-resp-phone"
                  type="tel"
                  value={editedDepartment.responsible.phone}
                  onChange={(e) =>
                    setEditedDepartment({
                      ...editedDepartment,
                      responsible: {
                        ...editedDepartment.responsible,
                        phone: e.target.value,
                      },
                    })
                  }
                />
              </div>
            </div>

            {/* Co-Responsible */}
            <div className="space-y-2">
              <h3 className="font-semibold">Co-Responsable</h3>
              <div className="grid gap-2">
                <Label htmlFor="edit-coresp-name">Nom</Label>
                <Input
                  id="edit-coresp-name"
                  value={editedDepartment.coResponsible.name}
                  onChange={(e) =>
                    setEditedDepartment({
                      ...editedDepartment,
                      coResponsible: {
                        ...editedDepartment.coResponsible,
                        name: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-coresp-email">Email</Label>
                <Input
                  id="edit-coresp-email"
                  type="email"
                  value={editedDepartment.coResponsible.email}
                  onChange={(e) =>
                    setEditedDepartment({
                      ...editedDepartment,
                      coResponsible: {
                        ...editedDepartment.coResponsible,
                        email: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-coresp-phone">Téléphone</Label>
                <Input
                  id="edit-coresp-phone"
                  type="tel"
                  value={editedDepartment.coResponsible.phone}
                  onChange={(e) =>
                    setEditedDepartment({
                      ...editedDepartment,
                      coResponsible: {
                        ...editedDepartment.coResponsible,
                        phone: e.target.value,
                      },
                    })
                  }
                />
              </div>
            </div>

            {/* Finance Responsible */}
            <div className="space-y-2">
              <h3 className="font-semibold">Responsable des Finances</h3>
              <div className="grid gap-2">
                <Label htmlFor="edit-finresp-name">Nom</Label>
                <Input
                  id="edit-finresp-name"
                  value={editedDepartment.financeResponsible.name}
                  onChange={(e) =>
                    setEditedDepartment({
                      ...editedDepartment,
                      financeResponsible: {
                        ...editedDepartment.financeResponsible,
                        name: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-finresp-email">Email</Label>
                <Input
                  id="edit-finresp-email"
                  type="email"
                  value={editedDepartment.financeResponsible.email}
                  onChange={(e) =>
                    setEditedDepartment({
                      ...editedDepartment,
                      financeResponsible: {
                        ...editedDepartment.financeResponsible,
                        email: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-finresp-phone">Téléphone</Label>
                <Input
                  id="edit-finresp-phone"
                  type="tel"
                  value={editedDepartment.financeResponsible.phone}
                  onChange={(e) =>
                    setEditedDepartment({
                      ...editedDepartment,
                      financeResponsible: {
                        ...editedDepartment.financeResponsible,
                        phone: e.target.value,
                      },
                    })
                  }
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Annuler
            </Button>
            <Button onClick={handleSaveEdit} disabled={!editedDepartment.name}>
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer le département ?</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer le département "
              {department.name}" ? Cette action est irréversible et supprimera
              également tous les pôles associés.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
