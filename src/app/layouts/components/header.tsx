"use client";

import Image from "next/image";
import { Menu as MenuIcon } from "lucide-react";

import { Menu, Dropdown } from "@/app/components";

export function Header() {
  const userMenuItems = [
    { label: "My Profile", href: "/" },
    { label: "My Events", href: "/" },
    { label: "Logout", onClick: () => console.log("Logout") },
  ];

  const navMenuItems = [
    { label: "Home", href: "/" },
    { label: "Explore", href: "/explore" },
    { label: "My Tickets", href: "/my-tickets" },
  ];

  return (
    <header className="shadow-light ">
      <div className="max-w-[86rem] p-[1rem] m-auto grid md:grid-cols-3 grid-cols-2">
        <div className="flex align-center">
          <div className="flex items-center md:hidden mr-2">
            <Dropdown
              trigger={
                <button className="py-1 px-2">
                  <MenuIcon color="#6e7787" size={24} />
                </button>
              }
              items={navMenuItems}
              align="left"
            />
          </div>
          <div className="flex items-center cursor-pointer">
            <Image
              className="w-[35px] h-[30px] md:w-[47px] md:h-[42px] object-contain"
              src={"/stagepass.svg"}
              width={47}
              height={42}
              alt="StagePass"
              priority
            />
            <h1 className="font-logo font-bold text-[18px] text-black-1 self-center">
              Stage<span className="text-primary">Pass</span>
            </h1>
          </div>
        </div>
        <div className="md:flex hidden">
          <Menu />
        </div>
        <div className="md:flex hidden justify-end gap-2">
          <div className="size-7 rounded-full bg-gray-2 self-center cursor-pointer"></div>
          <p className="self-center text-[14px] text-black-3 cursor-pointer">
            Augusto Souza
          </p>
        </div>
        <div className="flex md:hidden justify-end items-center">
          <div>
            <Dropdown
              trigger={
                <div className="flex  items-center gap-2">
                  <div className="size-7 rounded-full bg-gray-2 self-center cursor-pointer"></div>
                  <p className="self-center text-[14px] text-black-3 cursor-pointer">
                    Augusto Souza
                  </p>
                </div>
              }
              items={userMenuItems}
              align="right"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
