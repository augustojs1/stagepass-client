"use client";

import Image from "next/image";
import { Menu as MenuIcon } from "lucide-react";

import { Menu } from "@/app/components";

export function Header() {
  return (
    <header className="shadow-light ">
      <div className="max-w-[86rem] p-[1rem] m-auto grid md:grid-cols-3 grid-cols-2">
        <div className="flex align-center">
          <div className="flex md:hidden mr-2">
            <button className="self-center py-1 px-2">
              <MenuIcon color="#6e7787" size={24} />
            </button>
          </div>
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
        </div>
        <div className="md:flex hidden">
          <Menu />
        </div>
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
