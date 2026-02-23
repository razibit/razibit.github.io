import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Publications from "./components/Publications";
import ResearchInterests from "./components/ResearchInterests";
import Awards from "./components/Awards";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <ThemeProvider>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Publications />
        <ResearchInterests />
        <Awards />
        <Contact />
      </main>
      <Footer />
    </ThemeProvider>
  );
}
