import type { Metadata } from "next";
import Link from "next/link";

import { AsciiArrow } from "@/components/AsciiArrow";

import { DevPortrait } from "./dev-portrait";
import { getLinkPreview } from "./link-preview";
import { ProjectPreview } from "./project-preview";
import { projects } from "./projects";

export const metadata: Metadata = {
  title: "Michael Sipes | Development",
  description:
    "Education, experience, and selected software projects by Michael Sipes.",
};

const experience = [
  {
    company: "RingCentral",
    role: "AI Software Engineering Intern",
    dates: "June 2024 - August 2024",
    bullets: [
      "Built a retrieval-augmented generation system to detect and consolidate duplicate content across a knowledge base of 2,000+ articles.",
      "Conducted interviews with article writers, understood their workflow challenges, and defined technical requirements for the solution.",
      "Implemented the solution by generating semantic embeddings with OpenAI and storing them in Supabase (pgvector extension) to enable similarity search.",
    ],
  },
  {
    company: "Active Owners Fund",
    role: "Financial Analyst Intern",
    dates: "May 2023 - August 2023",
    bullets: [
      "Performed credit analysis through sophisticated financial modeling to support debt fund analysts.",
      "Developed machine learning models using cross-validation, linear and logistic regression, regularization, clustering, random forests, gradient descent, and neural networks.",
      "Learned PyTorch for deep learning, covering neural network classification, computer vision, custom datasets, transfer learning, and model deployment.",
    ],
  },
];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="border-b border-sipes-green pb-2 text-lg font-semibold tracking-normal">
      {children}
    </h2>
  );
}

export default async function DevPortfolio() {
  const previews = await Promise.all(
    projects.map((project) => getLinkPreview(project.githubUrl)),
  );

  return (
    <main className="flex-1 px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
      <div className="mx-auto max-w-6xl space-y-12">
        <header className="grid items-start gap-8 lg:grid-cols-[400px_minmax(0,1fr)] lg:gap-14">
          <div className="flex justify-center lg:justify-start">
            <DevPortrait />
          </div>
          <div>
            <h1 className="text-4xl font-semibold tracking-normal sm:text-5xl">
              Michael Sipes
            </h1>
            <nav className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
              <Link className="hover:text-sipes-green" href="https://github.com/mjsipes">
                GitHub
              </Link>
              <span className="text-muted-foreground">|</span>
              <Link className="hover:text-sipes-green" href="https://www.linkedin.com/in/mjsipes/">
                LinkedIn
              </Link>
              <span className="text-muted-foreground">|</span>
              <Link
                className="hover:text-sipes-green"
                href="/dev/michael-sipes-resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Resume
              </Link>
              <span className="text-muted-foreground">|</span>
              <Link className="hover:text-sipes-green" href="mailto:mjsipes@gmail.com">
                mjsipes@gmail.com
              </Link>
            </nav>
            <div className="mt-7 max-w-2xl space-y-3 text-sm leading-6 text-muted-foreground sm:text-base">
              <p>B.S./M.S. in Computer Science, University of Southern California.</p>
              <p>Interested in computer systems, algorithms, databases, and machine learning.</p>
              <p>
                My projects are original work - guided by curiosity and built with a mix of
                hand-written code and natural language programming with AI.
              </p>
            </div>
          </div>
        </header>

        <section className="space-y-5">
          <SectionTitle>Education</SectionTitle>
          <div className="space-y-4 text-sm leading-6 sm:text-base">
            <div>
              <h3 className="font-semibold">University of Southern California</h3>
              <div className="mt-1 space-y-1 italic text-muted-foreground">
                <p className="flex flex-col justify-between gap-1 sm:flex-row">
                  <span>M.S. in Computer Science</span>
                  <span className="not-italic">2025 - 2026</span>
                </p>
                <p className="flex flex-col justify-between gap-1 sm:flex-row">
                  <span>B.S. in Computer Science</span>
                  <span className="not-italic">2021 - 2025</span>
                </p>
              </div>
            </div>
            <p>
              <span className="font-semibold">Relevant Coursework: </span>
              <span className="text-muted-foreground">
                Machine Learning, Natural Language Processing, Analysis of Algorithms,
                Data Structures, Computer Systems, Operating Systems, Internetworking,
                Web Technologies, Software Engineering, Database Systems
              </span>
            </p>
          </div>
        </section>

        <section className="space-y-7">
          <SectionTitle>Experience</SectionTitle>
          {experience.map((item) => (
            <article key={item.company} className="text-sm leading-6 sm:text-base">
              <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                <div>
                  <h3 className="font-semibold">{item.company}</h3>
                  <p className="italic text-muted-foreground">{item.role}</p>
                </div>
                <p className="shrink-0 text-sm text-muted-foreground">{item.dates}</p>
              </div>
              <ul className="mt-3 space-y-1.5 pl-5 text-muted-foreground">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="list-disc pl-1 marker:text-sipes-green">
                    {bullet}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section className="space-y-6">
          <SectionTitle>Projects</SectionTitle>
          <div className="grid auto-rows-fr grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <Link
                key={project.githubUrl}
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col border border-transparent hover:border-sipes-blue dark:hover:border-sipes-orange"
              >
                <ProjectPreview
                  project={project}
                  preview={previews[index]}
                  priority={index < 3}
                />
                <div className="flex h-16 shrink-0 items-center justify-center px-3 text-center">
                  <h3 className="line-clamp-2 text-sm font-medium group-hover:text-sipes-green">
                    <span className="opacity-0 group-hover:opacity-100">
                      <AsciiArrow direction="right" />
                    </span>
                    {project.name}
                    <span className="opacity-0 group-hover:opacity-100">
                      <AsciiArrow direction="left" />
                    </span>
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
