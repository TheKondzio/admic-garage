import type { Service } from "@/types";
import { ServiceTile } from "@/components/services/ServiceTile";

export function ServiceGrid({ services, size = "md" }: { services: Service[]; size?: "md" | "lg" }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <ServiceTile key={service.slug} service={service} size={size} />
      ))}
    </div>
  );
}
