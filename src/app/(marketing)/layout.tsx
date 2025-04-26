import MarketingHeader from "@/components/MarketingHeader";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MarketingHeader />
      <main className="pt-20 max-w-5xl mx-auto px-6">{children}</main>
    </>
  );
}
