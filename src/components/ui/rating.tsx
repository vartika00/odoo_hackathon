import { Circle } from "lucide-react";

export function BubbleRating({ rating, size = 16 }: { rating: number, size?: number }) {
  const fullBubbles = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const emptyBubbles = 5 - fullBubbles - (hasHalf ? 1 : 0);

  return (
    <div className="flex items-center gap-0.5">
      {[...Array(fullBubbles)].map((_, i) => (
        <svg key={`full-${i}`} width={size} height={size} viewBox="0 0 24 24" fill="#00AF87" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" />
        </svg>
      ))}
      {hasHalf && (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="#00AF87" strokeWidth="2" />
          <path d="M12 2A10 10 0 0 0 12 22V2Z" fill="#00AF87" />
        </svg>
      )}
      {[...Array(emptyBubbles)].map((_, i) => (
        <svg key={`empty-${i}`} width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="#00AF87" strokeWidth="2" />
        </svg>
      ))}
    </div>
  );
}
