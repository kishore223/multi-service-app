import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function ConsoleLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="pt-16 flex">
        <Sidebar />
        <main className="flex-1 ml-64 min-h-screen bg-gray-100 dark:bg-gray-950">
          {children}
        </main>
      </div>
    </>
  );
}
