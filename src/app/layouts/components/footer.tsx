"use client";

import Link from "next/link";
import Image from "next/image";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black-3">
      <div className="max-w-[86rem] w-full m-auto py-10 grid grid-cols-3 items-center justify-between">
        <div className="flex items-center cursor-pointer">
          <Link href="/" className="flex">
            <Image
              className="w-[35px] h-[30px] md:w-[47px] md:h-[42px] object-contain"
              src={"/stagepass.svg"}
              width={47}
              height={42}
              alt="StagePass"
              priority
            />
            <h1 className="font-logo font-bold text-[18px] text-white self-center">
              Stage<span className="text-primary">Pass</span>
            </h1>
          </Link>
        </div>
        <div>
          <p className="text-gray-4">
            ©{currentYear} • Made with ❤️ by Augusto Souza
          </p>
        </div>
        <div className="flex gap-2 justify-end">
          <a
            className="cursor-pointer p-2"
            href="https://www.linkedin.com/in/augustosouza1/"
            target="_blank"
          >
            <Image
              src={"/icons/linkedin.svg"}
              width={24}
              height={24}
              alt="Linkedin"
              priority
            />
          </a>
          <a
            className="cursor-pointer p-2"
            href="https://github.com/augustojs1"
            target="_blank"
          >
            <Image
              src={"/icons/github.svg"}
              width={24}
              height={24}
              alt="Github"
              priority
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
