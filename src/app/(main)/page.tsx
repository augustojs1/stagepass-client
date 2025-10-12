import { SearchInput } from "@/app/components/";
import { Button } from "../components/ui/form/button";
import { CategoryCard, EventBanner, EventCard } from "./components";

export default function Home() {
  return (
    <>
      {/* Banner */}
      <section className="bg-[url(/images/explore-cover.png)] bg-cover bg-center bg-no-repea md:h-[400px] h-[300px] md:mb-[75px] mb-[50px] p-[1rem]">
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
      <section className="max-w-[86rem] m-auto mb-[100px]">
        <div className="flex justify-between mb-[30px]">
          <h1 className="font-logo md:text-[32px] text-[24px] font-bold text-black-3">
            Events in <span className="text-primary">your area</span>
          </h1>
          <Button variant="secondary">View More</Button>
        </div>
        <div className="grid grid-cols-3 gap-8">
          <EventCard />
          <EventCard />
          <EventCard />
        </div>
      </section>

      {/* Explore by categories */}
      <section className="max-w-[86rem] m-auto">
        <div className="mb-[30px]">
          <h1 className="font-logo md:text-[32px] text-[24px] font-bold text-black-3">
            Explore by <span className="text-primary">categories</span>
          </h1>
        </div>
        <div className="grid grid-cols-5 gap-2 mb-[100px]">
          <CategoryCard category="music" />
          <CategoryCard category="sport" />
          <CategoryCard category="exhibition" />
          <CategoryCard category="business" />
          <CategoryCard category="photography" />
        </div>
      </section>

      {/* Upcoming in 24h */}
      <section className="py-[60px] bg-gray-6">
        <div className="max-w-[86rem] m-auto">
          <div className="flex justify-between mb-[30px]">
            <h1 className="font-logo md:text-[32px] text-[24px] font-bold text-black-3 ">
              Upcoming <span className="text-primary">in 24h</span>
            </h1>
            <Button variant="secondary">View More</Button>
          </div>
          <div className="flex justify-between mb-[100px]">
            <EventCard />
            <EventCard />
          </div>
        </div>
      </section>

      {/* Highlights this weeks */}
      <section className="py-[60px] bg-white">
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
      <section className="py-[60px] bg-white">
        <div className="max-w-[86rem] m-auto">
          <div className="flex justify-between mb-[30px]">
            <h1 className="font-logo md:text-[32px] text-[24px] font-bold text-black-3">
              More events
            </h1>
            <Button variant="secondary">View More</Button>
          </div>
          <div className="grid grid-cols-3 gap-8">
            <EventCard />
            <EventCard />
            <EventCard />
          </div>
        </div>
      </section>
    </>
  );
}
