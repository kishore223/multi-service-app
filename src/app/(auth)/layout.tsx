export const metadata = { title: "Auth • TrustRoute" };

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen grid place-items-center bg-gray-50 dark:bg-gray-900">
      {children}
    </main>
  );
}
