export default function CatalogState({ loading, error, empty, label, retry }: {
  loading: boolean; error: boolean; empty: boolean; label: string; retry: () => void;
}) {
  if (!loading && !error && !empty) return null;
  return <div className="mx-auto max-w-xl px-5 py-10 text-center" role={error ? "alert" : "status"}>
    <p className="text-muted-foreground">{loading ? `Loading ${label}…` : error ? `We couldn’t load ${label}. Please try again.` : `No ${label} available yet.`}</p>
    {error && <button type="button" className="site-button mt-4" onClick={retry}>Try again</button>}
  </div>;
}
