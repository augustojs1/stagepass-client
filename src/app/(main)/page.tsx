import { SearchInput } from "@/app/components/";
import { Button } from "../components/ui/form/button";
import { CategoryCard, EventBanner, EventCard } from "./components";

export default function Home() {
  return (
    <>
      {/* Banner */}
      <section className="bg-[url(/images/explore-cover.png)] bg-cover bg-center bg-no-repea md:h-[400px] h-[300px] md:mb-[110px] mb-[80px] p-[1rem]">
        <div className="flex justify-center items-center h-full text-center">
          <h1 className="font-logo sm:text-[56px] text-[40px] font-bold text-white">
            Pick up your <br />
            <span className="text-primary">wonderful plans</span>
          </h1>
        </div>
        <div className="relative top-[-15px] flex justify-center">
          <SearchInput />
        </div>
      </section>

      {/* Events in your area */}
      <section className="max-w-[86rem] m-auto md:mb-[110px] mb-[80px] px-4">
        <div className="flex justify-between mb-[30px]">
          <h1 className="font-logo md:text-[32px] text-[24px] font-bold text-black-3">
            Events in <span className="text-primary">your area</span>
          </h1>
          <Button variant="secondary">View More</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 justify-center gap-4 md:gap-8">
          <EventCard />
          <EventCard />
          <EventCard />
        </div>
      </section>

      {/* Explore by categories */}
      <section className="max-w-[86rem] m-auto px-4 md:mb-[110px] mb-[80px]">
        <div className="mb-[30px]">
          <h1 className="font-logo md:text-[32px] text-[24px] font-bold text-black-3">
            Explore by <span className="text-primary">categories</span>
          </h1>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          <CategoryCard category="music" />
          <CategoryCard category="sport" />
          <CategoryCard category="exhibition" />
          <CategoryCard category="business" />
          <CategoryCard category="photography" />
        </div>
      </section>

      {/* Upcoming in 24h */}
      <section className="px-4 bg-gray-6 md:mb-[110px] mb-[80px] py-10">
        <div className="max-w-[86rem] m-auto">
          <div className="flex justify-between mb-[30px]">
            <h1 className="font-logo md:text-[32px] text-[24px] font-bold text-black-3 ">
              Upcoming <span className="text-primary">in 24h</span>
            </h1>
            <Button variant="secondary">View More</Button>
          </div>
          <div className="flex flex-col gap-4 md:flex-row md:gap-0 justify-between">
            <EventCard />
            <EventCard />
          </div>
        </div>
      </section>

      {/* Highlights this weeks */}
      <section className="bg-white md:mb-[110px] mb-[80px] px-4">
        <div className="max-w-[86rem] m-auto">
          <div className="flex justify-between mb-[30px]">
            <h1 className="font-logo md:text-[32px] text-[24px] font-bold text-black-3 ">
              Highlights <span className="text-primary">this week</span>
            </h1>
            <Button variant="secondary">View More</Button>
          </div>
          <div>
            <EventBanner />
          </div>
        </div>
      </section>

      {/* More events */}
      <section className="md:mb-[110px] mb-[80px] bg-white px-4">
        <div className="max-w-[86rem] m-auto">
          <div className="flex justify-between mb-[30px]">
            <h1 className="font-logo md:text-[32px] text-[24px] font-bold text-black-3">
              More events
            </h1>
            <Button variant="secondary">View More</Button>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
            <EventCard />
            <EventCard />
            <EventCard />
          </div>
        </div>
      </section>
    </>
  );
}
