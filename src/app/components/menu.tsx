"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Menu() {
  const pathname = usePathname();
  const activeRouteStyle = "text-primary border-b-3";

  return (
    <nav className="flex">
      <ul className="flex align-center gap-4 font-body text-[14px] text-gray-2">
        <li
          className={`flex px-4 cursor-pointer ${
            pathname === "/" ? activeRouteStyle : ""
          }`}
        >
          <Link href="/" className="self-center">
            Home
          </Link>
        </li>
        <li
          className={`flex px-4 cursor-pointer ${
            pathname === "/explore" ? activeRouteStyle : ""
          }`}
        >
          <Link href="/explore" className="self-center">
            Explore
          </Link>
        </li>
        <li
          className={`flex px-4 cursor-pointer ${
            pathname === "/my-tickets" ? activeRouteStyle : ""
          }`}
        >
          <Link href="/my-tickets" className="self-center">
            My Tickets
          </Link>
        </li>
      </ul>
    </nav>
  );
}
