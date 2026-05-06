import { Hero } from "./components/hero";
import { Projects } from "./components/projects";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <Projects />
    </main>
  );
}
