import { notFound } from "next/navigation";
import { projects } from "@/utils/projects-data";
import WorkLayout from "../WorkLayout";

export async function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export default function Page({
  params,
}: {
  params: { slug: string };
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  return <WorkLayout project={project} />;
}
