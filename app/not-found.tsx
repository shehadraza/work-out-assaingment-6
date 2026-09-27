import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="font-heading text-6xl font-bold text-accent mb-4">404</h1>
      <p className="text-gray-400 mb-6">This page doesn&apos;t exist.</p>
      <Link href="/" className="bg-accent text-black font-bold px-5 py-3 rounded-md">
        Back to Home
      </Link>
    </div>
  );
}