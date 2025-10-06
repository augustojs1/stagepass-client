"use client";

import Image from "next/image";

import { Menu } from "@/app/components";

export function Header() {
  return (
    <header className="shadow-light ">
      <div className="max-w-[86rem] p-[1rem] m-auto grid grid-cols-3">
        <div className="flex align-center cursor-pointer">
          <Image
            src={"/stagepass.svg"}
            width={47}
            height={42}
            alt="StagePass"
          />
          <h1 className="font-logo font-bold text-[18px] text-black-1 self-center">
            Stage<span className="text-primary">Pass</span>
          </h1>
        </div>
        <Menu />
        <div className="flex justify-end gap-2">
          <div className="size-7 rounded-full bg-gray-2 self-center cursor-pointer"></div>
          <p className="self-center text-[14px] text-black-3 cursor-pointer">
            Augusto Souza
          </p>
        </div>
      </div>
    </header>
  );
}
