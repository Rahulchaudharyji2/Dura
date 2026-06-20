
import Hero from "@/components/Hero";
import About from "@/app/about/page";
import Footer from "@/components/Footer";


export default function Home() {
  return (
    <main className="min-h-screen flex flex-col gap-6 pt-32 md:pt-36 pb-12">
    

      <Hero />
      
      <About />
      <Footer />
    </main>
  );
}