interface DetailThumbnailProps {
  src: string;
  alt: string;
  landscape?: boolean;
}

export default function DetailThumbnail({ src, alt, landscape = false }: DetailThumbnailProps) {
  if (landscape) {
    return <img src={src} alt={alt} className="block h-auto w-full rounded-2xl" />;
  }
  return (
    <div className="relative h-[260px] w-full overflow-hidden rounded-2xl bg-neutral-100 sm:h-[380px] lg:h-[520px] dark:bg-neutral-900">
      <img
        src={src}
        alt={alt}
        width={768}
        height={432}
        className="absolute inset-0 h-full w-full object-contain object-center"
      />
    </div>
  );
}
