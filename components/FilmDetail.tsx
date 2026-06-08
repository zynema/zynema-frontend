"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Share2, Heart, Star, Clock, Calendar, Globe, Clapperboard, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FilmDetail as FilmDetailType } from "@/services/films/type";

interface FilmDetailProps {
  film: FilmDetailType;
}

export default function FilmDetail({ film }: FilmDetailProps) {
  const [isPlotExpanded, setIsPlotExpanded] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const capitalize = (str: string) =>
    str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const year = film.year_premiere
    ? String(Math.floor(parseFloat(film.year_premiere)))
    : "";

  const runtimeDisplay = film.runtime
    ? `${Math.floor(Number(film.runtime) / 60) > 0 ? `${Math.floor(Number(film.runtime) / 60)}h ` : ""}${Number(film.runtime) % 60}m`
    : "";

  const imdbScore = parseFloat(film.imdb_score);

  // Determine star color based on score
  const getScoreColor = (score: number) => {
    if (score >= 7) return "text-yellow-400";
    if (score >= 5) return "text-yellow-500";
    return "text-yellow-600";
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Background ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/[0.03] rounded-full blur-[150px] translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/[0.02] rounded-full blur-[120px] -translate-x-1/2 translate-y-1/2" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-24 pb-16">
        {/* Back button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group"
        >
          <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span className="text-sm font-medium">Kembali ke Beranda</span>
        </Link>

        {/* Main layout */}
        <div className="flex flex-col-reverse lg:flex-row gap-10 lg:gap-16">
          {/* LEFT — Film metadata */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
              {capitalize(film.title)}
            </h1>

            {/* Meta row: Score, Year, Runtime */}
            <div className="flex items-center gap-4 flex-wrap">
              {/* IMDb Score */}
              <div className="flex items-center gap-1.5 bg-yellow-500/10 px-3 py-1.5 rounded-lg border border-yellow-500/20">
                <Star className={`w-4 h-4 fill-current ${getScoreColor(imdbScore)}`} />
                <span className="font-bold text-yellow-400 text-sm">
                  {film.imdb_score}
                </span>
                <span className="text-muted-foreground text-xs">/10</span>
              </div>

              {/* Separator + Year */}
              {year && (
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5" />
                  <span className="text-sm font-medium">{year}</span>
                </div>
              )}

              {/* Separator + Runtime */}
              {runtimeDisplay && (
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="text-sm font-medium">{runtimeDisplay}</span>
                </div>
              )}
            </div>

            {/* Genre & Language badges */}
            <div className="flex items-center gap-2 flex-wrap">
              {film.genre && (
                <Badge
                  variant="outline"
                  className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors px-3 py-1 text-xs font-semibold"
                >
                  {capitalize(film.genre)}
                </Badge>
              )}
              {film.parent_genre && film.parent_genre !== film.genre && (
                <Badge
                  variant="outline"
                  className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors px-3 py-1 text-xs font-semibold"
                >
                  {capitalize(film.parent_genre)}
                </Badge>
              )}
              {film.primary_language && (
                <Badge
                  variant="outline"
                  className="bg-muted text-muted-foreground border-border hover:bg-muted/80 transition-colors px-3 py-1 text-xs font-semibold"
                >
                  <Globe className="w-3 h-3 mr-1" />
                  {capitalize(film.primary_language)}
                </Badge>
              )}
            </div>

            {/* Director */}
            {film.director && (
              <div className="flex items-start gap-3">
                <Clapperboard className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                    Sutradara
                  </span>
                  <p className="text-foreground font-semibold text-sm mt-0.5">
                    {film.director}
                  </p>
                </div>
              </div>
            )}

            {/* Premiere */}
            {film.premiere && (
              <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                    Tanggal Rilis
                  </span>
                  <p className="text-foreground font-semibold text-sm mt-0.5">
                    {film.premiere}
                  </p>
                </div>
              </div>
            )}

            {/* Plot */}
            {film.plot && (
              <div className="mt-1">
                <h3 className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-2">
                  Deskripsi
                </h3>
                <div className="relative">
                  <p
                    className={`text-sm md:text-base text-gray-300 leading-relaxed ${
                      !isPlotExpanded ? "line-clamp-3" : ""
                    }`}
                  >
                    {film.plot}
                  </p>
                  {film.plot.length > 150 && (
                    <button
                      onClick={() => setIsPlotExpanded(!isPlotExpanded)}
                      className="text-primary text-sm font-medium hover:text-primary/80 transition-colors mt-1 inline-flex items-center gap-1"
                    >
                      {isPlotExpanded
                        ? "Tampilkan lebih sedikit"
                        : "Tampilkan lebih banyak"}
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex items-center gap-3 flex-wrap mt-2">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-8 rounded-lg transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40"
              >
                <Play className="mr-2 w-5 h-5 fill-current" />
                Putar
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border text-foreground hover:bg-muted font-semibold px-6 rounded-lg transition-all"
              >
                <Share2 className="mr-2 w-4 h-4" />
                Bagikan
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setIsFavorited(!isFavorited)}
                className={`border-border font-semibold px-6 rounded-lg transition-all ${
                  isFavorited
                    ? "bg-primary/10 text-primary border-primary/30 hover:bg-primary/20"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                <Heart
                  className={`mr-2 w-4 h-4 transition-all ${
                    isFavorited ? "fill-primary text-primary scale-110" : ""
                  }`}
                />
                Favorit
              </Button>
            </div>
          </div>

          {/* RIGHT — Poster */}
          <div className="w-full lg:w-[340px] xl:w-[380px] shrink-0 flex justify-center lg:justify-end">
            <div className="relative w-[260px] sm:w-[300px] lg:w-full group">
              {/* Glow effect behind poster */}
              <div className="absolute -inset-3 bg-primary/10 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Poster container */}
              <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-2xl shadow-black/50 ring-1 ring-white/5">
                <Image
                  src={film.poster}
                  alt={film.title}
                  fill
                  sizes="(max-width: 640px) 260px, (max-width: 1024px) 300px, 380px"
                  className="object-cover"
                  priority
                />

                {/* Subtle gradient overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              {/* IMDb badge on poster */}
              <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg flex items-center gap-1.5 border border-white/10">
                <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                <span className="text-white font-bold text-xs">{film.imdb_score}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-16 border-t border-border/50" />

        {/* Film Info Grid */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {[
            { label: "Genre", value: capitalize(film.genre || "-") },
            { label: "Bahasa", value: capitalize(film.primary_language || "-") },
            { label: "Durasi", value: runtimeDisplay || "-" },
            { label: "Tahun", value: year || "-" },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-muted/30 border border-border/50 rounded-xl p-4 hover:bg-muted/50 transition-colors"
            >
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                {item.label}
              </span>
              <p className="text-foreground font-semibold mt-1 text-sm">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
