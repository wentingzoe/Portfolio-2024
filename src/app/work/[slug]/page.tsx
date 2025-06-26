import { notFound } from "next/navigation";
import { projects } from "@/utils/projects-data";
import WorkLayout from "../WorkLayout";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = projects.find((p) => p.slug === params.slug);
  return { title: project?.name ?? "Project" };
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
