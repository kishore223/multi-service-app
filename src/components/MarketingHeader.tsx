import Link from "next/link";

export default function MarketingHeader() {
  return (
    <header className="fixed inset-x-0 top-0 h-16 bg-white/70 backdrop-blur z-40 border-b">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-6">
        <Link href="/" className="text-xl font-semibold">TrustRoute</Link>
        <nav className="hidden md:flex gap-6 text-gray-700">
          <Link href="/about">About</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/support">Support</Link>
          <Link href="/login" className="text-indigo-600">Sign in</Link>
        </nav>
      </div>
    </header>
  );
}
