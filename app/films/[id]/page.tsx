import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import FilmDetail from "@/components/FilmDetail";
import { FilmDetailResponse } from "@/services/films/type";

const API_BASE = "https://zynema-ai.vercel.app";

interface FilmPageProps {
  params: Promise<{ id: string }>;
}

async function getFilm(id: string): Promise<FilmDetailResponse> {
  const res = await fetch(`${API_BASE}/films/${id}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch film: ${res.status}`);
  }

  return res.json();
}

export async function generateMetadata({
  params,
}: FilmPageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const { data } = await getFilm(id);
    const capitalize = (str: string) =>
      str
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");

    return {
      title: `${capitalize(data.title)} — ZYNEMA`,
      description: data.plot || `Watch ${capitalize(data.title)} on ZYNEMA`,
    };
  } catch {
    return {
      title: "Film — ZYNEMA",
      description: "Film detail page",
    };
  }
}

export default async function FilmPage({ params }: FilmPageProps) {
  const { id } = await params;
  const { data } = await getFilm(id);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <FilmDetail film={data} />
    </main>
  );
}
