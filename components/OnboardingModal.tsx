"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { getCategories } from "@/services/categories/api";
import { Category } from "@/services/categories/type";
import { getDirectors } from "@/services/directors/api";
import { getYears } from "@/services/years/api";

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
  const [step, setStep] = useState(0); // 0: Genre, 1: Year/Director
  const [selected, setSelected] = useState<number[]>([]);
  const [selectedActor, setSelectedActor] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [directorSearch, setDirectorSearch] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [allDirectors, setAllDirectors] = useState<string[]>([]);
  const [yearOptions, setYearOptions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const hasOnboarded = localStorage.getItem("zynema_onboarded");
    if (!hasOnboarded) {
      setOpen(true);
    }
  }, []);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [catResponse, dirResponse, yearResponse] = await Promise.all([
        getCategories(),
        getDirectors(),
        getYears(),
      ]);
      setCategories(catResponse.data);
      if (dirResponse.status === "success" && Array.isArray(dirResponse.data)) {
        setAllDirectors(dirResponse.data);
      }
      if (yearResponse.status === "success" && Array.isArray(yearResponse.data)) {
        setYearOptions(yearResponse.data.map(String));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (open) {
      fetchData();
    }
  }, [open]);

  const filteredDirectors = useMemo(() => {
    if (!directorSearch.trim()) return allDirectors;
    return allDirectors.filter((d) =>
      d.toLowerCase().includes(directorSearch.toLowerCase())
    );
  }, [directorSearch, allDirectors]);

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

  const handleNext = () => {
    if (selected.length > 0) {
      setStep(1);
    }
  };

  const handleFinish = () => {
    const selectedNames = categories
      .filter((c) => selected.includes(c.id))
      .map((c) => c.name);

    localStorage.setItem("zynema_onboarded", "true");
    localStorage.setItem("zynema_categories", JSON.stringify(selected));
    localStorage.setItem("zynema_category_names", JSON.stringify(selectedNames));

    if (selectedActor) {
      localStorage.setItem("zynema_director", selectedActor);
    }
    if (selectedYear) {
      localStorage.setItem("zynema_year", selectedYear);
    }

    setOpen(false);
    window.dispatchEvent(new Event("zynema_onboarding_complete"));
  };

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  const getPoster = (genreName: string) =>
    GENRE_POSTERS[genreName.toLowerCase()] || "/the-northman.webp";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        className="max-w-4xl max-h-[90vh] bg-popover border-border p-0 flex flex-col gap-0 rounded-2xl overflow-hidden shadow-2xl [&>button]:hidden"
      >
        <div className="p-6 md:p-8 flex-shrink-0 border-b border-border/50 text-center">
          <DialogTitle className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            {step === 0 ? "Pilih genre favorit Anda" : "Sempurnakan preferensi Anda"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm md:text-base">
            {step === 0
              ? "Pilih 1 - 3 genre untuk membantu kami merekomendasikan film terbaik untuk Anda."
              : "Pilih tahun rilis atau sutradara favorit (Opsional)."}
          </DialogDescription>
        </div>

        {/* Scrollable content */}
        <div className="p-6 md:p-8 overflow-y-auto flex-1 custom-scrollbar">
          {step === 0 ? (
            <>
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
                    onClick={fetchData}
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
            </>
          ) : (
            <div className="flex flex-col gap-12 py-8 max-w-2xl mx-auto">
              {/* Step 1: Pilih Tahun */}
              <section>
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm">1</span>
                  Pilih Tahun
                </h3>
                <div className="flex flex-wrap gap-3">
                  {yearOptions.map((year) => (
                    <div
                      key={year}
                      onClick={() => setSelectedYear(selectedYear === year ? null : year)}
                      className={`px-6 py-3 rounded-full border-2 transition-all cursor-pointer font-bold text-base ${
                        selectedYear === year
                          ? "border-primary bg-primary text-black"
                          : "border-border bg-card hover:border-primary/50 text-foreground"
                      }`}
                    >
                      {year}
                    </div>
                  ))}
                </div>
              </section>

              {/* Step 2: Cari Sutradara */}
              <section>
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm">2</span>
                  Cari Sutradara
                </h3>
                <div className="relative mb-4">
                  <svg
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Cari nama sutradara..."
                    value={directorSearch}
                    onChange={(e) => setDirectorSearch(e.target.value)}
                    className="w-full pl-11 pr-10 py-3 rounded-xl border-2 border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                  {directorSearch && (
                    <button
                      onClick={() => {
                        setDirectorSearch("");
                        setSelectedActor(null);
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  )}
                </div>
                <div className="flex flex-col gap-2 max-h-56 overflow-y-auto custom-scrollbar pr-1">
                  {filteredDirectors.length === 0 ? (
                    <p className="text-muted-foreground text-sm text-center py-6">
                      Sutradara tidak ditemukan.
                    </p>
                  ) : (
                    filteredDirectors.map((director) => (
                      <div
                        key={director}
                        onClick={() =>
                          setSelectedActor(selectedActor === director ? null : director)
                        }
                        className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between group ${
                          selectedActor === director
                            ? "border-primary bg-primary/10 shadow-lg shadow-primary/10"
                            : "border-border bg-card hover:border-primary/50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                              selectedActor === director
                                ? "bg-primary text-black"
                                : "bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary"
                            }`}
                          >
                            {director
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)
                              .toUpperCase()}
                          </div>
                          <span className="font-semibold">{director}</span>
                        </div>
                        {selectedActor === director && (
                          <div className="text-primary flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </section>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-6 bg-popover border-t border-border/50 flex-shrink-0 flex gap-4 justify-center shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.5)]">
          {step === 1 && (
            <Button
              variant="outline"
              size="lg"
              onClick={() => setStep(0)}
              className="rounded-full px-8 font-bold"
            >
              Kembali
            </Button>
          )}
          <Button
            size="lg"
            onClick={step === 0 ? handleNext : handleFinish}
            disabled={(step === 0 && selected.length === 0) || isLoading || !!error}
            className={`w-full font-bold text-lg rounded-full py-6 transition-all ${step === 0 ? "max-w-md" : "flex-1"}`}
          >
            {step === 0
              ? selected.length === 0
                ? "Pilih 1 - 3 genre"
                : "Selanjutnya"
              : "Selesai"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
