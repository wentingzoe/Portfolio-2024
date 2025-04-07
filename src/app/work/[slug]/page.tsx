import { notFound } from "next/navigation";
import { projects } from "@/utils/projects-data";
import WorkLayout from "../WorkLayout";

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default function WorkPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return <WorkLayout project={project} />;
}
