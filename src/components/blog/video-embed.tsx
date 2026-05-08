function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match?.[1] ?? null;
}

function getVimeoId(url: string): string | null {
  const match = url.match(/vimeo\.com\/(\d+)/);
  return match?.[1] ?? null;
}

export function VideoEmbed({ url }: { url: string }) {
  const ytId = getYouTubeId(url);
  if (ytId) {
    return (
      <div className="relative aspect-video rounded-sm overflow-hidden border border-ivory/10">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${ytId}`}
          title="Vidéo intégrée"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          loading="lazy"
        />
      </div>
    );
  }

  const vimeoId = getVimeoId(url);
  if (vimeoId) {
    return (
      <div className="relative aspect-video rounded-sm overflow-hidden border border-ivory/10">
        <iframe
          src={`https://player.vimeo.com/video/${vimeoId}?dnt=1`}
          title="Vidéo intégrée"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          loading="lazy"
        />
      </div>
    );
  }

  return null;
}
