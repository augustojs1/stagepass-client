import { Metadata } from "next";

import { CreateEventNavigation, CreateEventForm } from "./components";

export const metadata: Metadata = {
  title: "StagePass | Create Event",
  description: "Create Event",
};

export default function CreateEventPage() {
  return (
    <section className="max-w-[86rem] m-auto px-[1rem] mb-20">
      <div className="py-[2rem] md:text-left text-center">
        <h1 className="font-logo text-black-3 font-bold text-[2rem]">
          Create an event
        </h1>
      </div>
      <div className="grid grid-cols-1 md:[grid-template-columns:minmax(0,4fr)_minmax(0,8fr)] lg:gap-20 md:gap-15 gap-4 justify-center">
        <CreateEventNavigation />
        <div>
          <CreateEventForm />
        </div>
      </div>
    </section>
  );
}
