"use client";

import React from "react";
import { ListFilter } from "lucide-react";

import { EventsFilter } from "./events-filter";
import { SearchInput } from "@/components";
import { ExploreEventCard } from "./explore-event-card";

export function ExploreContent() {
  const [showFilter, setShowFilter] = React.useState<boolean>(false);

  return (
    <section className="max-w-[86rem] m-auto mb-20">
      <div className="flex justify-center items-center mb-[2.7rem] gap-4">
        <SearchInput />
        <button
          className="flex md:hidden justify-center items-center border border-primary rounded-[6px] w-12 h-12"
          onClick={() => setShowFilter(!showFilter)}
        >
          <ListFilter size={18} color="#636ae8" />
        </button>
      </div>
      <div className="grid grid-cols-1 md:[grid-template-columns:minmax(0,4fr)_minmax(0,8fr)] lg:gap-20 md:gap-15 gap-4 justify-center">
        <aside className="sm:block hidden">
          <EventsFilter />
        </aside>
        <div className="flex sm:hidden">
          {showFilter ? <EventsFilter /> : null}
        </div>
        <div className="flex flex-col gap-4">
          <div className="py-4">
            <p className="text-[1rem] text-black-3">
              <strong>6</strong> results
            </p>
          </div>
          <ExploreEventCard />
          <ExploreEventCard />
          <ExploreEventCard />
          <ExploreEventCard />
          <ExploreEventCard />
          <ExploreEventCard />
          <ExploreEventCard />
        </div>
      </div>
    </section>
  );
}
