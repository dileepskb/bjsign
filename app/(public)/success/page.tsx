import SuccessClient from "@/app/_components/SuccessClient/SuccessClient";
import { Suspense } from "react";


export default function SuccessPage() {
  return (
    <Suspense fallback={<p className="text-center mt-10">Loading...</p>}>
      <SuccessClient />
    </Suspense>
  );
}