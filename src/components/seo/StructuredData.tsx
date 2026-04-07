interface StructuredDataProps {
  condition?: {
    name: string;
    description: string;
    url: string;
    lastReviewed: string;
  };
}

export default function StructuredData({ condition }: StructuredDataProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gipatienthub.ca";

  const jsonLd = condition
    ? {
        "@context": "https://schema.org",
        "@type": "MedicalWebPage",
        name: condition.name,
        description: condition.description,
        url: condition.url,
        inLanguage: "en-CA",
        specialty: {
          "@type": "MedicalSpecialty",
          name: "Gastroenterology",
        },
        audience: {
          "@type": "PatientAudience",
        },
        lastReviewed: condition.lastReviewed,
        medicalAudience: {
          "@type": "PatientAudience",
          audienceType: "Patient",
        },
      }
    : {
        "@context": "https://schema.org",
        "@type": "MedicalWebPage",
        name: "GI Patient Hub",
        description:
          "Evidence-based patient education for gastrointestinal conditions. Created by a Canadian gastroenterologist.",
        url: baseUrl,
        inLanguage: "en-CA",
        specialty: {
          "@type": "MedicalSpecialty",
          name: "Gastroenterology",
        },
        audience: {
          "@type": "PatientAudience",
        },
      };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
