"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import { useRouter } from "next/router";
import React from "react";

const Header = () => {
  const pathname = usePathname();
  console.log("route==", pathname);

  return (
    <header className="p-8 flex shadow-sm shadow-slate-500 items-center">
      <nav className="flex gap-6 text-xl">
        <Link
          href="/"
          className={`${pathname === "/" ? " text-blue-600" : " text-white"}`}
        >
          Home
        </Link>
        <Link
          href="/favorites"
          className={`${
            pathname === "/favorites" ? " text-blue-600" : " text-white"
          }`}
        >
          Favorites
        </Link>
      </nav>
    </header>
  );
};

export default Header;
