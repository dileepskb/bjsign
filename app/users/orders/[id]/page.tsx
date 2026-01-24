import SingleOrder from "@/app/_components/SingleOrder/SingleOrder";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // 🔥 REQUIRED in Next 15

  return <SingleOrder id={id} />;
}