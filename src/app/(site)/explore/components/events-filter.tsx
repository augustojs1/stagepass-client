"use client";

import React from "react";

import CheckboxGroup from "@/components/ui/form/checkbox-group";
import { Button } from "@/components/ui/form/button";
import { Slider } from "@/components";

export function EventsFilter() {
  const [categoriesFilter, setCategoriesFilter] = React.useState<string[]>([
    "all",
  ]);
  const [pricingFilter, setPricingFilter] = React.useState<string[]>(["paid"]);
  const [maxPrice, setMaxPrice] = React.useState(0);
  const [maxDistance, setMaxDistance] = React.useState(0);

  return (
    <div className="w-full py-4 rounded-[6px] bg-gray-7">
      <div className="px-4">
        <h4 className="text-[1.3rem] text-black-3 font-bold">Filter</h4>
      </div>
      <hr className="text-gray-5 my-4" />
      <div className="px-4">
        <p className="text-[1rem] text-black-3 font-bold mb-2">Category</p>
        <CheckboxGroup
          value={categoriesFilter}
          setValue={setCategoriesFilter}
          options={[
            { label: "All", value: "all" },
            { label: "Trending", value: "trending" },
            { label: "Upcoming", value: "upcoming" },
            { label: "Music", value: "music" },
            { label: "Sport", value: "sport" },
            { label: "Exibition", value: "exibition" },
            { label: "Business", value: "business" },
            { label: "Photography", value: "photography" },
          ]}
          direction="vertical"
          name="categories-filter"
        />
        <hr className="text-gray-5 my-4" />
      </div>
      <div className="px-4">
        <p className="text-[1rem] text-black-3 font-bold mb-2">Pricing</p>
        <CheckboxGroup
          value={pricingFilter}
          setValue={setPricingFilter}
          options={[
            { label: "Free", value: "free" },
            { label: "Paid", value: "paid" },
          ]}
          direction="vertical"
          name="pricing-filter"
        />
        <hr className="text-gray-5 my-4" />
      </div>
      <div className="px-4">
        <p className="text-[1rem] text-black-3 font-bold mb-8">Distance</p>
        <Slider
          id="distance"
          min={0}
          max={100}
          step={1}
          suffix=" km"
          initialValue={maxDistance}
          onChange={setMaxDistance}
        />
        <hr className="text-gray-5 my-4" />
      </div>
      <div className="px-4">
        <p className="text-[1rem] text-black-3 font-bold mb-8">Ticket Price</p>
        <Slider
          id="ticket-price"
          min={0}
          max={5000}
          step={1}
          prefix="$ "
          initialValue={maxPrice}
          onChange={setMaxPrice}
        />
        <hr className="text-gray-5 my-4" />
      </div>
      <div className="flex justify-between px-4">
        <Button variant="secondary">Clear All</Button>
        <Button variant="primary">Apply</Button>
      </div>
    </div>
  );
}
