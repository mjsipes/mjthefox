"use client";

// Movie data extracted from notes.md
const movies = [
  {
    id: "kgiygCVvFlE",
    title: "Movie 1",
  },
  {
    id: "JsojXkcW0f4",
    title: "Movie 2",
  },
  {
    id: "DWaspseTPwc",
    title: "Movie 3",
  },
  {
    id: "ctVXl0rnlmo",
    title: "Movie 4",
  },
  {
    id: "6hMRwhIDWYg",
    title: "Movie 5",
  },
];

export default function MoviesPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
      {movies.map((movie) => (
        <div key={movie.id} className="relative w-full border border-transparent hover:border-sipes-green">
          <div className="relative w-full aspect-video">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${movie.id}`}
              title={movie.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
