"use client";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("./map"), { ssr: false });

export function RegionLabels() {
  return (
    <div className="col-span-12 rounded-[10px] bg-white border px-7 pb-6 pt-7 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-7 overflow-hidden relative">
      <h2 className="mb-7 text-body-2xlg font-bold text-dark dark:text-white">
        Region labels
      </h2>

      <Map />
    </div>
  );
}
