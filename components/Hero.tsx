import Image from "next/image";
import { Play, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <div className="relative w-full h-[85vh] min-h-[650px] flex flex-col justify-center">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/the-northman.webp"
          alt="The Northman"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent w-[80%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10 w-full mt-16 md:mt-24">
        <div className="max-w-2xl">
          {/* Logo or Title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-4 font-serif uppercase tracking-widest text-white drop-shadow-lg">
            THE NORTHMAN
          </h1>
          
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl text-balance drop-shadow-md font-medium">
            Seorang pangeran Viking muda bertekad membalaskan dendam ayahnya yang dibunuh, menyelamatkan ibunya, dan merebut kembali takhta yang menjadi haknya.
          </p>

          <div className="flex items-center gap-4">
            <Button size="lg" className="bg-white text-black hover:bg-white/80 font-bold px-8 text-lg rounded-md transition-all">
              <Play className="mr-2 w-6 h-6 fill-current" />
              Putar
            </Button>
            <Button size="lg" variant="secondary" className="bg-gray-500/50 text-white hover:bg-gray-500/70 font-bold px-8 text-lg rounded-md backdrop-blur-sm border-none transition-all">
              <Info className="mr-2 w-6 h-6" />
              Selengkapnya
            </Button>
          </div>
        </div>
      </div>

      {/* Age Rating Badge - fixed to the right edge */}
      <div className="absolute right-0 bottom-1/4 hidden md:flex items-center bg-black/60 border-l-4 border-primary px-4 py-2 text-white font-medium backdrop-blur-sm shadow-xl z-20">
        16+
      </div>
    </div>
  );
}
