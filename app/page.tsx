import Hero from "@/components/hero";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#070707] text-zinc-50">
      <Navbar />
      <Hero />
    </div>
  );
}
