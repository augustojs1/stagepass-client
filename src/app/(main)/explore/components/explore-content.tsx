"use client";

import React from "react";
import { ListFilter } from "lucide-react";

import { EventsFilter } from "./events-filter";
import { SearchInput } from "@/app/components";
import { ExploreEventCard } from "./explore-event-card";

export function ExploreContent() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false);
  const [showFilter, setShowFilter] = React.useState<boolean>(false);

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;

    return {
      width,
      height,
    };
  }

  React.useEffect(() => {
    function handleResize() {
      const size = getWindowDimensions();

      if (size.width >= 767) {
        setIsMobile(true);
      }
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleShowFilter() {
    setShowFilter(!showFilter);
    setIsMobile(!isMobile);
  }

  return (
    <section className="mb-20">
      <div className="flex justify-center items-center mb-[2.7rem] gap-4">
        <SearchInput />
        <button
          className="flex md:hidden justify-center items-center border border-primary rounded-[6px] w-12 h-12"
          onClick={handleShowFilter}
        >
          <ListFilter size={18} color="#636ae8" />
        </button>
      </div>
      <div className="grid grid-cols-1 md:[grid-template-columns:minmax(0,276px)_minmax(0,856px)] gap-4 justify-center">
        {isMobile || showFilter ? (
          <aside>
            <EventsFilter />
          </aside>
        ) : null}
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
