import { notFound } from "next/navigation";
import { projects } from "@/data/portfolio";
import { CaseStudyClient } from "@/components/CaseStudyClient";

export function generateStaticParams() {
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
    const { slug } = await params;

    const currentIndex = projects.findIndex((p) => p.slug === slug);
    const project = projects[currentIndex];

    if (!project) {
        notFound();
    }

    const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
    const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

    // Grab 3 other projects randomly or sequentially
    const relatedProjects = projects
        .filter(p => p.slug !== slug)
        .slice(0, 3);

    return (
        <CaseStudyClient
            project={project}
            prevProject={prevProject}
            nextProject={nextProject}
            relatedProjects={relatedProjects}
        />
    );
}
