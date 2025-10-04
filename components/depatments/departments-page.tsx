"use client";

import { useState } from "react";
import { ArrowLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { useRouter } from "next/navigation";
import { DepartmentCard } from "./department-card";

export interface Department {
  id: string;
  name: string;
  poles: number;
  responsible: string;
}

interface DepartmentsPageProps {
  continent: string;
  country: string;
  city: string;
  church: string;
}

export function DepartmentsPage({
  continent,
  country,
  city,
  church,
}: DepartmentsPageProps) {
  const router = useRouter();
  const cityName = decodeURIComponent(city).replace(/-/g, " ");

  const [departments, setDepartments] = useState<Department[]>([
    {
      id: "evangelism",
      name: "Ministère d'Évangélisation",
      poles: 5,
      responsible: "Emily Jones",
    },
    {
      id: "children",
      name: "Ministère des Enfants",
      poles: 4,
      responsible: "Sarah Brown",
    },
    {
      id: "youth",
      name: "Ministère des Jeunes",
      poles: 3,
      responsible: "John Doe",
    },
    {
      id: "men",
      name: "Ministère des Hommes",
      poles: 3,
      responsible: "David Williams",
    },
    {
      id: "teaching",
      name: "Ministère d'Enseignement",
      poles: 3,
      responsible: "Robert Garcia",
    },
    {
      id: "women",
      name: "Ministère des Femmes",
      poles: 2,
      responsible: "Jane Smith",
    },
    {
      id: "family",
      name: "Ministère de la Famille",
      poles: 2,
      responsible: "Michael Johnson",
    },
    {
      id: "outreach",
      name: "Ministère de Sensibilisation",
      poles: 2,
      responsible: "Linda Martinez",
    },
  ]);

  const [sortBy, setSortBy] = useState<string>("poles");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(
    null
  );
  const [departmentToDelete, setDepartmentToDelete] =
    useState<Department | null>(null);
  const [newDepartment, setNewDepartment] = useState({
    name: "",
    poles: "",
    responsible: "",
  });

  const sortedDepartments = [...departments].sort((a, b) => {
    if (sortBy === "poles") {
      return b.poles - a.poles;
    }
    return a.name.localeCompare(b.name);
  });

  const handleAddDepartment = () => {
    if (editingDepartment) {
      // Edit mode
      setDepartments(
        departments.map((dept) =>
          dept.id === editingDepartment.id
            ? {
                ...dept,
                name: newDepartment.name,
                poles: Number.parseInt(newDepartment.poles) || 0,
                responsible: newDepartment.responsible,
              }
            : dept
        )
      );
    } else {
      // Add mode
      const department: Department = {
        id: newDepartment.name.toLowerCase().replace(/\s+/g, "-"),
        name: newDepartment.name,
        poles: Number.parseInt(newDepartment.poles) || 0,
        responsible: newDepartment.responsible,
      };
      setDepartments([...departments, department]);
    }
    setIsDialogOpen(false);
    setEditingDepartment(null);
    setNewDepartment({ name: "", poles: "", responsible: "" });
  };

  const handleEditDepartment = (department: Department) => {
    setEditingDepartment(department);
    setNewDepartment({
      name: department.name,
      poles: department.poles.toString(),
      responsible: department.responsible,
    });
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (department: Department) => {
    setDepartmentToDelete(department);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (departmentToDelete) {
      setDepartments(
        departments.filter((dept) => dept.id !== departmentToDelete.id)
      );
      setDepartmentToDelete(null);
    }
    setIsDeleteDialogOpen(false);
  };

  const handleOpenDialog = () => {
    setEditingDepartment(null);
    setNewDepartment({ name: "", poles: "", responsible: "" });
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
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
          <h1 className="text-xl font-semibold text-foreground">
            Départements
          </h1>
        </div>
      </header>

      {/* Sort Dropdown */}
      <div className="flex justify-end px-4 py-4">
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Trier par" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="poles">Trier par Pôles</SelectItem>
            <SelectItem value="name">Trier par Nom</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Departments List */}
      <div className="px-4 space-y-3">
        {sortedDepartments.map((department) => (
          <DepartmentCard
            key={department.id}
            department={department}
            continent={continent}
            country={country}
            city={city}
            church={church}
            onEdit={handleEditDepartment}
            onDelete={handleDeleteClick}
          />
        ))}
      </div>

      {/* Add Department Button */}
      <div className="fixed bottom-6 left-4 right-4">
        <Button
          onClick={handleOpenDialog}
          className="w-full h-14 text-base font-semibold bg-primary hover:bg-primary/90"
        >
          <Plus className="h-5 w-5 mr-2" />
          Ajouter un département
        </Button>
      </div>

      {/* Add/Edit Department Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingDepartment
                ? "Modifier le département"
                : "Ajouter un département"}
            </DialogTitle>
            <DialogDescription>
              {editingDepartment
                ? "Modifiez les informations du département ci-dessous."
                : `Créer un nouveau département dans ${cityName}. Remplissez tous les champs ci-dessous.`}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nom du département</Label>
              <Input
                id="name"
                placeholder="Ex: Ministère d'Évangélisation"
                value={newDepartment.name}
                onChange={(e) =>
                  setNewDepartment({ ...newDepartment, name: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="poles">Nombre de pôles</Label>
              <Input
                id="poles"
                type="number"
                placeholder="Ex: 5"
                value={newDepartment.poles}
                onChange={(e) =>
                  setNewDepartment({ ...newDepartment, poles: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="responsible">Responsable</Label>
              <Input
                id="responsible"
                placeholder="Ex: Emily Jones"
                value={newDepartment.responsible}
                onChange={(e) =>
                  setNewDepartment({
                    ...newDepartment,
                    responsible: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Annuler
            </Button>
            <Button
              onClick={handleAddDepartment}
              disabled={!newDepartment.name}
            >
              {editingDepartment ? "Modifier" : "Ajouter"}
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
              Cette action supprimera définitivement le département &quot;
              {departmentToDelete?.name}
              &quot;. Cette action ne peut pas être annulée.
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
