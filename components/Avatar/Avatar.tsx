type AvatarProps = {
  name: string;
};

export default function Avatar({ name }: AvatarProps) {
  const firstLetter = name?.charAt(0).toUpperCase() || "?";

  return (
    <div className={`h-10 w-10 rounded-full flex items-center justify-center font-semibold ${getColor(name)}`}>
      {firstLetter}
    </div>
  );
}


function getColor(name: string) {
  const colors = [
    "bg-red-200 text-red-800",
    "bg-blue-200 text-blue-800",
    "bg-green-200 text-green-800",
    "bg-purple-200 text-purple-800",
    "bg-yellow-200 text-yellow-800",
  ];

  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
}