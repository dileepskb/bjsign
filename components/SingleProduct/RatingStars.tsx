import FullStar from "@/components/Star/fullStar";
import HalfStar from "@/components/Star/halfStar";
import BlankStar from "@/components/Star/blankStar";
import { getStarCounts } from "@/lib/getStarCounts";
type RatingStarsProps = {
  rating: number;
};

export default function RatingStars({ rating }: RatingStarsProps) {
  const { full, half, blank } = getStarCounts(rating);

  return (
    <div className="flex items-center">
      {Array.from({ length: full }).map((_, i) => (
        <FullStar key={`f-${i}`} />
      ))}

      {half === 1 && <HalfStar />}

      {Array.from({ length: blank }).map((_, i) => (
        <BlankStar key={`b-${i}`} />
      ))}
    </div>
  );
}