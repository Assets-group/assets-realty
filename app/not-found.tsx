import Link from "next/link";

export default function RootNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ivory px-8 text-center">
      <p className="text-8xl font-light text-maroon">404</p>
      <h1 className="mt-6 text-3xl font-light text-ink">Page Not Found</h1>
      <p className="mt-3 max-w-md text-ink/60">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <Link href="/en" className="btn-boutique mt-8">
        Back to Home
      </Link>
    </div>
  );
}
