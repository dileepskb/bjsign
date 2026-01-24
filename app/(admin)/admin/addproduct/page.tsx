import AddProductClient from "@/app/_components/AddProductClient/AddProductClient";
import { Suspense } from "react";


export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddProductClient />
    </Suspense>
  );
}