import { About } from "./components/about";
import { Contact } from "./components/contact";
import { Experience } from "./components/experience";
import { Footer } from "./components/footer";
import { Hero } from "./components/hero";
import { Projects } from "./components/projects";

export default function Home() {
  return (
    <>
      <main className="flex-1">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
