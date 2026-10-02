import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceGrid } from "@/components/services/ServiceGrid";
import type { Service } from "@/types";

export function RelatedServices({ services }: { services: Service[] }) {
  if (services.length === 0) return null;

  return (
    <div>
      <SectionHeading eyebrow="Powiązane usługi" title="Może Cię zainteresować" />
      <div className="mt-8">
        <ServiceGrid services={services} />
      </div>
    </div>
  );
}
