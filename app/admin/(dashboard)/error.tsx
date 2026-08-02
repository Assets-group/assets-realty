"use client";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-8 text-center">
      <p className="text-xs font-bold uppercase tracking-wider text-maroon">Something went wrong</p>
      <p className="mt-4 max-w-md text-ink/70">{error.message || "An unexpected error occurred."}</p>
      <button
        onClick={reset}
        className="mt-8 bg-ink px-6 py-3 text-sm font-bold uppercase tracking-wider text-white hover:bg-maroon"
      >
        Try Again
      </button>
    </div>
  );
}
