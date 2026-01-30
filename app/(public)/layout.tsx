
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   <div className="pt-[55px]">{children}</div>
  );
}
