import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CONTRACT_LIBRARY } from "@/lib/contracts-engine";
import type { ContractType } from "@/types/contracts";

export const metadata: Metadata = {
  title: "Contract Templates Catalog | Make My Contract",
  description:
    "Browse every attorney-style contract template available inside Make My Contract. Explore real estate, finance, employment, and policy agreements before subscribing.",
  openGraph: {
    title: "Contract Templates Catalog | Make My Contract",
    description:
      "See every contract template Make My Contract includes—leases, NDAs, consulting agreements, policies, and more.",
  },
};

type TemplateDisplay = {
  id: ContractType;
  label: string;
  description: string;
  checklist: string[];
  seoTitle: string;
};

type CategorySection = {
  id: string;
  label: string;
  templates: TemplateDisplay[];
};

const templateSectionsRecord = Object.entries(CONTRACT_LIBRARY).reduce<
  Record<string, CategorySection>
>((acc, [id, template]) => {
  const templateInfo: TemplateDisplay = {
    id: id as ContractType,
    label: template.label,
    description: template.description,
    checklist: template.checklist,
    seoTitle: template.seoTitle,
  };

  if (!acc[template.category]) {
    acc[template.category] = {
      id: template.category,
      label: template.categoryLabel,
      templates: [],
    };
  }

  acc[template.category]!.templates.push(templateInfo);
  return acc;
}, {});

const templateSections: CategorySection[] = Object.values(templateSectionsRecord)
  .map((section) => ({
    ...section,
    templates: [...section.templates].sort((a, b) => a.label.localeCompare(b.label)),
  }))
  .sort((a, b) => a.label.localeCompare(b.label));

const totalTemplates = Object.keys(CONTRACT_LIBRARY).length;

export default function ContractsCatalogPage() {
  return (
    <main className="bg-slate-50 px-4 pb-20 pt-10 text-slate-800">
      <article className="mx-auto max-w-6xl space-y-12">
        <header className="rounded-[36px] border border-slate-200 bg-white p-10 shadow-2xl">
          <Badge>Contract catalog</Badge>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Explore every contract template included with Make My Contract.
          </h1>
          <p className="mt-4 text-lg text-slate-700">
            Browse {totalTemplates} attorney-grade templates covering real estate, finance, employment, policy,
            and intellectual property workflows. Each agreement mirrors U.S. counsel standards and becomes a PDF
            inside your dashboard the moment you subscribe.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/pricing">Compare plans</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/signup">Create your account</Link>
            </Button>
          </div>
          <nav className="mt-8 flex flex-wrap gap-3 text-sm text-slate-600" aria-label="Template categories">
            {templateSections.map((section) => (
              <Link
                key={section.id}
                href={`#${section.id}`}
                className="rounded-full border border-slate-200 px-4 py-2 font-medium text-slate-700 hover:border-blue-200 hover:text-blue-700"
              >
                {section.label}
              </Link>
            ))}
          </nav>
        </header>

        {templateSections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl"
            aria-labelledby={`${section.id}-heading`}
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-blue-700">Category</p>
                <h2 id={`${section.id}-heading`} className="text-3xl font-semibold text-slate-900">
                  {section.label}
                </h2>
                <p className="mt-2 text-slate-700">
                  Templates built for the most common {section.label.toLowerCase()} workflows.
                </p>
              </div>
              <Button asChild variant="secondary">
                <Link href="/pricing" className="text-sm font-semibold">
                  Unlock all templates
                </Link>
              </Button>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {section.templates.map((template) => (
                <Card key={template.id} aria-label={template.seoTitle}>
                  <div className="flex flex-col gap-4">
                    <header>
                      <p className="text-xs uppercase tracking-[0.2em] text-blue-700">{section.label}</p>
                      <h3 className="mt-2 text-2xl font-semibold text-slate-900">{template.label}</h3>
                      <p className="mt-2 text-sm text-slate-600">{template.description}</p>
                    </header>
                    <ul className="space-y-2 text-sm">
                      {template.checklist.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-slate-700">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-600" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <Button asChild>
                      <Link href="/pricing">Get this template</Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </article>
    </main>
  );
}
