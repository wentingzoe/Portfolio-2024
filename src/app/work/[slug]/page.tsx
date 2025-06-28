import { notFound } from "next/navigation";
import { projects } from "@/utils/projects-data";
import WorkLayout from "../WorkLayout";

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams?: Record<string, string | string[] | undefined>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return <WorkLayout project={project} />;
}
