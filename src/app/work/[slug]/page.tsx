import { notFound } from "next/navigation";
import { projects } from "@/utils/projects-data";
import WorkLayout from "../WorkLayout";

export async function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

type WorkPageProps = {
  params: { slug: string };
  searchParams?: Record<string, string | string[] | undefined>;
};

export default async function WorkPage({ params }: WorkPageProps) {
  const { slug } = params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) notFound();

  return <WorkLayout project={project} />;
}
