import { notFound } from "next/navigation";
import { projects } from "@/utils/projects-data";
import WorkLayout from "../WorkLayout";

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return <WorkLayout project={project} />;
}
