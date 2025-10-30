import type { Metadata } from "next";

import { ExploreContent } from "./components";

export const metadata: Metadata = {
  title: "StagePass | Explore",
  description: "Explore events",
};

export default function ExplorePage() {
  return (
    <section className="px-4 sm:py-14 py-8 m-auto">
      <h1 className="sm:text-[3rem] text-[2.5rem] font-bold font-logo text-black-3 text-center sm:mb-[2.1rem] mb-[1.7rem]">
        Search Event
      </h1>
      <ExploreContent />
    </section>
  );
}
