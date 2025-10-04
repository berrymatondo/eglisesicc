"use client";

import type React from "react";

import { Card } from "@/components/ui/card";
import { ChevronRight, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Department } from "./departments-page";

interface DepartmentCardProps {
  department: Department;
  continent: string;
  country: string;
  city: string;
  church: string;
  onEdit: (department: Department) => void;
  onDelete: (department: Department) => void;
}

export function DepartmentCard({
  department,
  continent,
  country,
  city,
  church,
  onEdit,
  onDelete,
}: DepartmentCardProps) {
  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onEdit(department);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(department);
  };

  return (
    <Link
      href={`/departement/${continent}/${country}/${city}/${church}/${department.id}`}
    >
      <Card className="p-4 hover:bg-accent/50 transition-colors cursor-pointer">
        <div className="flex items-center gap-4">
          {/* Icon Placeholder */}
          <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center shrink-0">
            <span className="text-2xl text-muted-foreground">📋</span>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-foreground mb-1">
              {department.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              {department.poles} Pôles
            </p>
            <p className="text-sm text-muted-foreground">
              Responsable: {department.responsible}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleEdit}
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDelete}
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <ChevronRight className="h-5 w-5 text-muted-foreground ml-2" />
          </div>
        </div>
      </Card>
    </Link>
  );
}
