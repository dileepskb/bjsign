import SingleOrderClient from "@/app/_components/SingleOrderClient/SingleOrderClient";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <SingleOrderClient id={id} />;
}
