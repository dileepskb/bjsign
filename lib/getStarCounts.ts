export function getStarCounts(rating: number) {
  const full = Math.floor(rating);
  const decimal = rating - full;

  const half = decimal >= 0.25 && decimal < 0.75 ? 1 : 0;
  const extraFull = decimal >= 0.75 ? 1 : 0;

  const totalFull = full + extraFull;
  const blank = 5 - totalFull - half;

  return { full: totalFull, half, blank };
}