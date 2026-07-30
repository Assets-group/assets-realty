import LoginForm from "@/components/admin/LoginForm";

export default function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-ink px-6"
      style={{ fontFamily: "Tajawal, sans-serif" }}
    >
      <div className="w-full max-w-sm">
        <p className="mb-8 text-center text-2xl font-extrabold tracking-wide text-white">
          ASSET<span className="text-maroon">S</span>
        </p>
        <div className="bg-white p-8">
          <h1 className="mb-6 text-lg font-medium text-ink">Employee sign in</h1>
          {searchParams.error === "not_provisioned" && (
            <p className="mb-4 text-sm text-maroon">
              Your account isn't set up as an employee yet. Ask an admin to add you.
            </p>
          )}
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
