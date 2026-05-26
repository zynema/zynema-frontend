"use client";

import { useState, useEffect, useCallback } from "react";
import MovieRow from "@/components/MovieRow";
import { getRecommendations } from "@/services/films/api";
import { Film } from "@/services/films/type";
import { Button } from "@/components/ui/button";

interface GenreGroup {
  genre: string;
  films: Film[];
}

export default function RecommendationSection() {
  const [groups, setGroups] = useState<GenreGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasCategories, setHasCategories] = useState(false);

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  const fetchRecommendations = useCallback(async () => {
    const stored = localStorage.getItem("zynema_category_names");
    if (!stored) {
      setHasCategories(false);
      setIsLoading(false);
      return;
    }

    const categoryNames: string[] = JSON.parse(stored);
    if (categoryNames.length === 0) {
      setHasCategories(false);
      setIsLoading(false);
      return;
    }

    setHasCategories(true);
    setIsLoading(true);
    setError(null);

    try {
      const response = await getRecommendations(categoryNames);

      // Group films by parent_genre
      const genreMap = new Map<string, Film[]>();
      response.data.forEach((film) => {
        const genre = film.parent_genre;
        if (!genreMap.has(genre)) {
          genreMap.set(genre, []);
        }
        genreMap.get(genre)!.push(film);
      });

      // Convert map to sorted array of groups
      const grouped: GenreGroup[] = Array.from(genreMap.entries()).map(
        ([genre, films]) => ({
          genre,
          films: films.sort(
            (a, b) => b.imdb_score - a.imdb_score
          ),
        })
      );

      setGroups(grouped);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load recommendations"
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRecommendations();

    // Listen for onboarding complete event
    const handleOnboardingComplete = () => {
      fetchRecommendations();
    };

    window.addEventListener("zynema_onboarding_complete", handleOnboardingComplete);
    return () => {
      window.removeEventListener("zynema_onboarding_complete", handleOnboardingComplete);
    };
  }, [fetchRecommendations]);

  // Before onboarding — show nothing
  if (!hasCategories && !isLoading) {
    return null;
  }

  // Loading state — show skeleton rows
  if (isLoading) {
    return (
      <div className="flex flex-col gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <MovieRow
            key={i}
            title={i === 0 ? "Memuat rekomendasi..." : ""}
            movies={[]}
            isLoading
          />
        ))}
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <div className="bg-destructive/10 text-destructive rounded-full p-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
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
          onClick={fetchRecommendations}
          className="rounded-full"
        >
          Coba lagi
        </Button>
      </div>
    );
  }

  // Success — render grouped movie rows
  return (
    <div className="flex flex-col gap-2">
      {groups.map((group) => (
        <MovieRow
          key={group.genre}
          title={`Rekomendasi ${capitalize(group.genre)}`}
          movies={group.films.map((f) => ({
            id: f.id,
            title: f.title,
            poster: f.poster,
            imdb_score: String(f.imdb_score),
            genre: f.parent_genre,
          }))}
        />
      ))}
    </div>
  );
}
