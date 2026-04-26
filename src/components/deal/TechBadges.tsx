import { Battery, Flame, Sun, ThermometerSun } from "lucide-react";
import type { Technology } from "@/lib/types";
import { TECH_LABELS } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";

const ICONS: Record<Technology, typeof Sun> = {
  solar_pv: Sun,
  battery_storage: Battery,
  air_source_heat_pump: ThermometerSun,
  tankless_water_heater: Flame,
};

export function TechBadges({ techs }: { techs: Technology[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {techs.map((t) => {
        const Icon = ICONS[t];
        return (
          <Badge key={t} tone="muted" className="gap-1">
            <Icon className="h-3 w-3" strokeWidth={1.75} />
            {TECH_LABELS[t]}
          </Badge>
        );
      })}
    </div>
  );
}
