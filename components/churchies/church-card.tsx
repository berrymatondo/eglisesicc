"use client";

import type React from "react";
import { Card } from "@/components/ui/card";
import { Trash2, Pencil, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Church } from "./churches-page";

interface ChurchCardProps {
  church: Church;
  continent: string;
  country: string;
  city: string;
  onEdit: (church: Church) => void;
  onDelete: (church: Church) => void;
}

export function ChurchCard({
  church,
  continent,
  country,
  city,
  onEdit,
  onDelete,
}: ChurchCardProps) {
  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onEdit(church);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(church);
  };

  return (
    <Link href={`/departements/${continent}/${country}/${city}/${church.id}`}>
      <Card className="p-4 hover:bg-accent/50 transition-colors cursor-pointer">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Header with Image and Action Buttons */}
          <div className="flex gap-3 sm:gap-4">
            {/* Church Image - smaller on mobile */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden shrink-0 border border-border relative">
              <Image
                src={church.imageUrl || "/placeholder.svg"}
                alt={church.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Title and City - visible on mobile */}
            <div className="flex-1 min-w-0 sm:hidden">
              <h3 className="text-base font-semibold text-foreground mb-0.5 line-clamp-2">
                {church.name}
              </h3>
              <p className="text-sm text-muted-foreground">{church.city}</p>
            </div>

            {/* Action Buttons - positioned top right on mobile */}
            <div className="flex items-start gap-1 shrink-0 sm:hidden">
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
            </div>
          </div>

          {/* Content - full width on mobile, flex-1 on larger screens */}
          <div className="flex-1 min-w-0 space-y-2">
            {/* Title and City - hidden on mobile, visible on larger screens */}
            <div className="hidden sm:block">
              <h3 className="text-lg font-semibold text-foreground mb-1">
                {church.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                {church.city}
              </p>
            </div>

            {/* Contact Information - stacked vertically for better mobile display */}
            <div className="space-y-1.5">
              <p className="text-sm font-medium text-foreground">
                {church.responsible}
              </p>

              {church.address && (
                <div className="flex items-start gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                  <span className="break-words">{church.address}</span>
                </div>
              )}

              {church.email && (
                <div className="flex items-start gap-1.5 text-xs text-muted-foreground">
                  <Mail className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                  <span className="break-all">{church.email}</span>
                </div>
              )}

              {church.phone && (
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Phone className="h-3.5 w-3.5 shrink-0" />
                  <span>{church.phone}</span>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons - hidden on mobile, visible on larger screens */}
          <div className="hidden sm:flex items-start gap-2 shrink-0">
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
          </div>
        </div>
      </Card>
    </Link>
  );
}
