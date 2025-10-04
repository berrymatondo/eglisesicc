"use client";

import type React from "react";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Country } from "./countries-page";

interface CountryCardProps {
  country: Country;
  continent: string;
  onEdit?: (country: Country) => void;
  onDelete?: (country: Country) => void;
}

export function CountryCard({
  country,
  continent,
  onEdit,
  onDelete,
}: CountryCardProps) {
  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onEdit?.(country);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete?.(country);
  };

  return (
    /*     <Link href={`/villes/${continent}/${country.id}`}>
<Link href={`/continents/${continentSlug}`}>
 */ <Link href={`/continents/${continent}/countries/${country.id}`}>
      <Card className="mb-2 p-4 hover:bg-accent/50 transition-colors cursor-pointer">
        <div className="flex items-center gap-4">
          {/* Flag Icon */}
          <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 border border-border">
            <Image
              src={country.flag || "/placeholder.svg"}
              alt={`${country.name} flag`}
              width={56}
              height={56}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-foreground mb-1">
              {country.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {country.cities} Villes, {country.churches} Églises
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleEdit}
              className="h-9 w-9 text-muted-foreground hover:text-foreground"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDelete}
              className="h-9 w-9 text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  );
}
