import Link from "next/link";

type Props = {
  title: string;
  text: string;
  ctaText: string;
  ctaHref: string;
};

export default function EmptyState({ title, text, ctaText, ctaHref }: Props) {
  return (
    <div className="border border-dashed border-white/15 rounded-xl py-16 text-center">
      <h3 className="font-heading uppercase text-lg font-bold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm mb-5">{text}</p>
      <Link href={ctaHref} className="bg-accent text-black font-bold px-5 py-2 rounded-md inline-block">
        {ctaText}
      </Link>
    </div>
  );
}