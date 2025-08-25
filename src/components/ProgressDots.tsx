"use client";
type Props = { current: number; total: number };

export default function ProgressDots({ current, total }: Props) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          aria-label={`Step ${i + 1} ${i <= current ? "completed" : "pending"}`}
          className={`h-2 w-2 rounded-full transition-colors duration-200 ${
            i <= current ? "bg-black" : "bg-gray-300"
          }`}
        />
      ))}
    </div>
  );
}
