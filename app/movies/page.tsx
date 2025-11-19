"use client";

import {
  VideoPlayer,
  VideoPlayerContent,
  VideoPlayerControlBar,
  VideoPlayerMuteButton,
  VideoPlayerPlayButton,
  VideoPlayerSeekBackwardButton,
  VideoPlayerSeekForwardButton,
  VideoPlayerTimeDisplay,
  VideoPlayerTimeRange,
  VideoPlayerVolumeRange,
} from "@/components/kibo-ui/video-player";

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

// Custom hosted videos
const hostedVideos = [
  {
    id: "vivid-starry-desert",
    title: "Vivid Starry Desert",
    url: "https://gjbeonnspjcwyrpgcnuz.supabase.co/storage/v1/object/public/mj-photos/everything-else/20250613_0337_Vivid%20Starry%20Desert_simple_compose_01jxmdtsw6ftr9n3d7jh1jyykr.mp4",
  },
  {
    id: "starry-desert-night",
    title: "Starry Desert Night",
    url: "https://gjbeonnspjcwyrpgcnuz.supabase.co/storage/v1/object/public/mj-photos/everything-else/20250613_0340_Starry%20Desert%20Night_loop_01jxme0grse5g8nh5bn3xh9vg2.mp4",
  },
  {
    id: "oak-tree-grove",
    title: "Oak Tree Grove",
    url: "https://gjbeonnspjcwyrpgcnuz.supabase.co/storage/v1/object/public/mj-photos/everything-else/social_mjsipes_impressionist_painting_of_an_oak_tree_grove_in_the_ev_7f94bd9c-93e8-4bb2-8854-307bbf715243_0.mp4",
  },
];

export default function MoviesPage() {
  return (
    <div className="space-y-8">
      {/* YouTube Videos Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
        {movies.map((movie) => (
          <div key={movie.id} className="relative w-full border border-transparent hover:border-sipes-blue dark:hover:border-sipes-orange">
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

      {/* Hosted Videos Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
        {hostedVideos.map((video) => (
          <div key={video.id} className="relative w-full border border-transparent hover:border-sipes-blue dark:hover:border-sipes-orange">
            <VideoPlayer className="overflow-hidden">
              <VideoPlayerContent
                crossOrigin=""
                preload="auto"
                slot="media"
                src={video.url}
              />
              <VideoPlayerControlBar>
                <VideoPlayerPlayButton />
                {/* <VideoPlayerSeekBackwardButton />
                <VideoPlayerSeekForwardButton /> */}
                <VideoPlayerTimeRange />
                <VideoPlayerTimeDisplay showDuration />
                <VideoPlayerMuteButton />
                <VideoPlayerVolumeRange />
              </VideoPlayerControlBar>
            </VideoPlayer>
          </div>
        ))}
      </div>
    </div>
  );
}
