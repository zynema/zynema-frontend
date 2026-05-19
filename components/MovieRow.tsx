"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

interface Movie {
  id: number;
  title: string;
  poster: string;
  imdb_score?: string;
  genre?: string;
}

interface MovieRowProps {
  title: string;
  movies: Movie[];
  isLoading?: boolean;
}

export default function MovieRow({ title, movies, isLoading }: MovieRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = (direction: "left" | "right") => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollAmount = clientWidth * 0.75; // Scroll 75% of the visible width
      
      const scrollTo = direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const onScroll = () => {
    if (rowRef.current) {
      setIsScrolled(rowRef.current.scrollLeft > 0);
    }
  };

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className="w-full py-4 group/row">
      <div className="container mx-auto px-4 mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-foreground">{title}</h2>
      </div>
        
      {/* Scroll container wrapper */}
      <div className="relative px-4 container mx-auto">
        
        {/* Left Arrow */}
        {isScrolled && (
          <button 
            onClick={() => handleScroll("left")}
            className="absolute left-4 top-2 bottom-6 z-40 w-12 bg-black/50 opacity-0 group-hover/row:opacity-100 hover:bg-black/80 transition-all flex items-center justify-center backdrop-blur-sm rounded-l-md"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-8 h-8 text-white" />
          </button>
        )}

        {/* Scroll container */}
        <div 
          ref={rowRef}
          onScroll={onScroll}
          className="flex gap-4 overflow-x-auto pb-6 pt-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] snap-x"
        >
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="relative flex-none w-[150px] md:w-[200px] aspect-[2/3] rounded-lg overflow-hidden animate-pulse bg-muted snap-start"
                />
              ))
            : movies.map((movie) => (
                <div 
                  key={movie.id} 
                  className="relative flex-none w-[150px] md:w-[200px] aspect-[2/3] rounded-lg overflow-hidden group/item snap-start cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:z-30 shadow-md"
                >
                  <Image
                    src={movie.poster}
                    alt={movie.title}
                    fill
                    sizes="(max-width: 768px) 150px, 200px"
                    className="object-cover rounded-lg"
                  />
                  
                  {/* IMDB Score Badge */}
                  {movie.imdb_score && (
                    <div className="absolute top-0 right-0">
                      <div className="bg-yellow-500/90 text-black font-bold px-2 py-1 text-xs shadow-lg rounded-bl-lg flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" />
                        {movie.imdb_score}
                      </div>
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                    <p className="text-white font-bold text-sm line-clamp-2">
                      {capitalize(movie.title)}
                    </p>
                    {movie.genre && (
                      <p className="text-primary text-xs font-medium mt-1">
                        {capitalize(movie.genre)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
        </div>

        {/* Right Arrow */}
        <button 
          onClick={() => handleScroll("right")}
          className="absolute right-4 top-2 bottom-6 z-40 w-12 bg-black/50 opacity-0 group-hover/row:opacity-100 hover:bg-black/80 transition-all flex items-center justify-center backdrop-blur-sm rounded-r-md"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-8 h-8 text-white" />
        </button>
      </div>
    </div>
  );
}
