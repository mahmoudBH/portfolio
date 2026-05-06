import Hero from "@/components/ui/Hero";
import SelectedWorks from "@/components/ui/SelectedWorks";
import Expertise from "@/components/ui/Expertise";
import Contact from "@/components/ui/Contact";
import Experience from "@/components/ui/Experience";
import Footer from "@/components/ui/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col w-full overflow-hidden">
      <Hero />
      <SelectedWorks />
      <Experience />
      <Expertise />
      <Contact />
      <Footer />
    </main>
  );
}
