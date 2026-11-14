import { PROJECTS } from "../data.js";
import { Heading } from "../components/bits.jsx";
import ProjectCard from "../components/ProjectCard.jsx";

// Projects page: cards are dealt in like playing cards
export default function Projects() {
  return (
    <>
      <div className="page-head">
        <p className="eyebrow">Projects</p>
        <Heading d={0.1} as="h1">Things I've built</Heading>
      </div>
      <div className="project-grid">
        {PROJECTS.map((p, i) => <ProjectCard key={p.slug} project={p} i={i} deal />)}
      </div>
    </>
  );
}
