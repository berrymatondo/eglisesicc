"use client";

import type React from "react";

import { Card } from "@/components/ui/card";
import { MapPin, ShoppingBag, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { City } from "./cities-page";

interface CityCardProps {
  city: City;
  continent: string;
  country: string;
  onEdit: (city: City) => void;
  onDelete: (city: City) => void;
}

export function CityCard({
  city,
  continent,
  country,
  onEdit,
  onDelete,
}: CityCardProps) {
  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onEdit(city);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(city);
  };

  return (
    <Link
      href={`/continents/${continent}/countries/${country}/cities/${city.id}`}
    >
      <Card className="mb-2 p-4 hover:bg-accent/50 transition-colors cursor-pointer">
        <div className="flex items-start gap-4">
          {/* Location Icon */}
          <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
            <MapPin className="w-7 h-7 text-blue-500" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 ">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {city.name}
                </h3>
                <p className="text-sm text-muted-foreground">{city.country}</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground mb-1">
                  {city.churches}
                </div>
                <div className="text-sm text-muted-foreground">Églises</div>
              </div>
              {/*               <div className="flex items-center gap-2 shrink-0 ml-2">
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
                <ShoppingBag className="w-5 h-5 text-red-500" />
              </div> */}
            </div>

            {/* Stats */}
            <div className="flex  items-end gap-8">
              {/*               <div className="text-center">
                <div className="text-2xl font-bold text-foreground mb-1">
                  {city.churches}
                </div>
                <div className="text-sm text-muted-foreground">Églises</div>
              </div> */}

              <div className="w-full flex justify-end items-center gap-2 shrink-0 ml-2">
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
                  className="h-8 w-8 text-red-500 hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              {/*               <div className="text-center">
                <div className="text-2xl font-bold text-foreground mb-1">
                  {city.departments}
                </div>
                <div className="text-sm text-muted-foreground">
                  Départements
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
