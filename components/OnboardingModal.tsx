"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { getCategories } from "@/services/categories/api";
import { Category } from "@/services/categories/type";

const GENRE_POSTERS: Record<string, string> = {
  action: "https://m.media-amazon.com/images/M/MV5BYzMwNjVjNTEtZDVhOC00NzQzLTg0MGYtMGI1Yzc0Nzg2MjNmXkEyXkFqcGc@._V1_SX300.jpg",
  adventure: "https://m.media-amazon.com/images/M/MV5BMjMzODc2NzU5MV5BMl5BanBnXkFtZTgwNTMwMTE3NjM@._V1_SX300.jpg",
  animation: "https://m.media-amazon.com/images/M/MV5BMWQxOGE1NDctMTMyNC00YzZiLThmMjYtMTYxNGU4ZTlhNWRmXkEyXkFqcGc@._V1_SX300.jpg",
  comedy: "https://m.media-amazon.com/images/M/MV5BYmI3ZDU2ODQtODBjYy00NDZiLTg4ZWEtMjAzZDI1OTY1OGY4XkEyXkFqcGc@._V1_SX300.jpg",
  documentary: "https://m.media-amazon.com/images/M/MV5BZDEzODFjZDUtYjFhMy00OTdiLThiMzctYzg5Yjc4ZTVkMmQ3XkEyXkFqcGc@._V1_SX300.jpg",
  drama: "https://m.media-amazon.com/images/M/MV5BMWMyMmUwYTktNmNjYS00YzU2LWJmYTQtMzRiZDc3ZGY0Njk0XkEyXkFqcGc@._V1_SX300.jpg",
  family: "https://m.media-amazon.com/images/M/MV5BM2ZjNWFmNzItNmVhMS00Yzg4LTk0NjQtY2Q4OTY0YTczMzFjXkEyXkFqcGc@._V1_SX300.jpg",
  fantasy: "https://m.media-amazon.com/images/M/MV5BMTcyNzk5NDg1Nl5BMl5BanBnXkFtZTgwNTM5MDQxNDM@._V1_SX300.jpg",
  horror: "https://m.media-amazon.com/images/M/MV5BNGMzNGE1YTEtNjg1NS00N2Q3LWJhOWItZDFmOWE2NjU4OGY3XkEyXkFqcGc@._V1_SX300.jpg",
  musical: "https://m.media-amazon.com/images/M/MV5BY2ViN2NkY2QtNTU2Yy00MjE0LTgxZWEtMmNmYTZmOTU4ODJjXkEyXkFqcGc@._V1_SX300.jpg",
  mystery: "https://m.media-amazon.com/images/M/MV5BYmI5MTM0ZDgtMTAzMy00YzQ5LWIyZWQtNTU1NDJhYzg5MjY0XkEyXkFqcGc@._V1_SX300.jpg",
  other: "https://m.media-amazon.com/images/M/MV5BMTAyMjY3MjkyNzZeQTJeQWpwZ15BbWU4MDY4MjUzODYz._V1_SX300.jpg",
  romance: "https://m.media-amazon.com/images/M/MV5BZWQ2ZWIzNmEtNTI1Ni00NTlmLWEwMGEtMzNjMzc5NzlkZmQwXkEyXkFqcGc@._V1_SX300.jpg",
  scifi: "https://m.media-amazon.com/images/M/MV5BNTZiMDBhODAtN2Y4Mi00ZThjLTg0ODItN2M1ZGJkZWI1N2YxXkEyXkFqcGc@._V1_SX300.jpg",
  war: "https://m.media-amazon.com/images/M/MV5BMDFmNGUwYTMtNDMyMC00YWM2LWEwOTktNTM1YWI0NDRiMDY3XkEyXkFqcGc@._V1_SX300.jpg",
  western: "https://m.media-amazon.com/images/M/MV5BOTc0MzZjYTktYzBlZC00MmViLTgyNDYtNjljNTcxMzdjODRkXkEyXkFqcGc@._V1_SX300.jpg",
};

export default function OnboardingModal() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const hasOnboarded = localStorage.getItem("zynema_onboarded");
    if (!hasOnboarded) {
      setOpen(true);
    }
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const catResponse = await getCategories();
      setCategories(catResponse.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load categories");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchCategories();
    }
  }, [open]);

  const toggleGenre = (id: number) => {
    setSelected((prev) => {
      if (prev.includes(id)) {
        return prev.filter((g) => g !== id);
      }
      if (prev.length < 3) {
        return [...prev, id];
      }
      return prev;
    });
  };

  const handleContinue = () => {
    if (selected.length > 0) {
      // Map selected IDs to category names
      const selectedNames = categories
        .filter((c) => selected.includes(c.id))
        .map((c) => c.name);

      localStorage.setItem("zynema_onboarded", "true");
      localStorage.setItem("zynema_categories", JSON.stringify(selected));
      localStorage.setItem("zynema_category_names", JSON.stringify(selectedNames));
      setOpen(false);

      // Notify other components that onboarding is complete
      window.dispatchEvent(new Event("zynema_onboarding_complete"));
    }
  };

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  const getPoster = (genreName: string) =>
    GENRE_POSTERS[genreName.toLowerCase()] || "/the-northman.webp";

  return (
    <Dialog open={open}>
      <DialogContent 
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        className="max-w-4xl max-h-[90vh] bg-popover border-border p-0 flex flex-col gap-0 rounded-2xl overflow-hidden shadow-2xl [&>button]:hidden"
      >
        <div className="p-6 md:p-8 flex-shrink-0 border-b border-border/50 text-center">
          <DialogTitle className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Pilih genre favorit Anda
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm md:text-base">
            Pilih 1 - 3 genre untuk membantu kami merekomendasikan film terbaik untuk Anda.
          </DialogDescription>
        </div>

        {/* Scrollable grid */}
        <div className="p-6 md:p-8 overflow-y-auto flex-1 custom-scrollbar">
          {isLoading && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-2 animate-pulse">
                  <div className="w-full aspect-[2/3] rounded-xl bg-muted" />
                  <div className="h-4 w-2/3 mx-auto rounded bg-muted" />
                </div>
              ))}
            </div>
          )}

          {error && (
            <div className="flex flex-col items-center justify-center gap-4 py-16">
              <div className="bg-destructive/10 text-destructive rounded-full p-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <p className="text-muted-foreground text-center text-sm max-w-xs">
                {error}
              </p>
              <Button 
                variant="outline" 
                onClick={fetchCategories}
                className="rounded-full"
              >
                Coba lagi
              </Button>
            </div>
          )}

          {!isLoading && !error && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {categories.map((category) => {
                const isSelected = selected.includes(category.id);
                return (
                  <div 
                    key={category.id} 
                    className="flex flex-col gap-2 cursor-pointer group"
                    onClick={() => toggleGenre(category.id)}
                  >
                    <div className={`relative w-full aspect-[2/3] rounded-xl overflow-hidden transition-all duration-300 ${
                      isSelected ? "ring-4 ring-primary scale-95" : "group-hover:scale-105"
                    }`}>
                      <Image
                        src={getPoster(category.name)}
                        alt={category.name}
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className={`object-cover transition-all duration-300 ${isSelected ? "opacity-60 brightness-75" : "opacity-100"}`}
                      />
                      {/* Genre label overlay at bottom */}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 pt-8">
                        <p className={`text-center font-bold text-sm md:text-base transition-colors ${isSelected ? "text-primary" : "text-white group-hover:text-primary"}`}>
                          {capitalize(category.name)}
                        </p>
                      </div>
                      {isSelected && (
                        <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                          <div className="bg-primary text-black rounded-full p-2 shadow-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-6 bg-popover border-t border-border/50 flex-shrink-0 flex justify-center shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.5)]">
          <Button 
            size="lg" 
            onClick={handleContinue} 
            disabled={selected.length === 0 || isLoading || !!error}
            className="w-full max-w-md font-bold text-lg rounded-full py-6 transition-all"
          >
            {selected.length === 0 
              ? "Pilih 1 - 3 genre" 
              : `Lanjutkan (${selected.length}/3)`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
