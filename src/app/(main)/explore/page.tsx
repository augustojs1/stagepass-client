import type { Metadata } from "next";

import { ExploreContent } from "./components";

export const metadata: Metadata = {
  title: "StagePass | Explore",
  description: "Explore events",
};

export default function ExplorePage() {
  return (
    <section className="px-4 py-14 m-auto">
      <h1 className="text-[3rem] font-bold font-logo text-black-3 text-center mb-[2.1rem]">
        Search Event
      </h1>
      <ExploreContent />
    </section>
  );
}
