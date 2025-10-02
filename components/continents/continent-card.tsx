import { ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Continent } from "./continentsList";

interface ContinentCardProps {
  continent: Continent;
}

export function ContinentCard({ continent }: ContinentCardProps) {
  const continentSlug = continent.name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");

  return (
    <Link href={`/pays/${continentSlug}`}>
      <Card className="p-4 hover:bg-accent/50 transition-colors cursor-pointer">
        <div className="flex items-center gap-4">
          {/* Icon */}
          <div
            className={`w-14 h-14 rounded-full ${continent.color} flex items-center justify-center overflow-hidden shrink-0`}
          >
            <Image
              src={continent.icon || "/placeholder.svg"}
              alt={`${continent.name} map`}
              width={56}
              height={56}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-foreground mb-1">
              {continent.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {continent.countries} Pays, {continent.churches} Églises
            </p>
          </div>

          {/* Arrow */}
          <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
        </div>
      </Card>
    </Link>
  );
}
