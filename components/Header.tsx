import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [open, setOpen] = useState(false);

  function menuExpand() {
    setOpen(!open);
  }

  return (
    <header className="w-full mx-auto rounded-3xl px-2">
      <div className="w-full mx-auto md:px-12 px-8 max-w-[100rem]">
        <div
          x-data="{ open: false }"
          className="relative flex flex-col max-w-7xl pt-2 mx-auto md:items-center md:justify-between md:flex-row md:px-6"
        >
          <div className="flex flex-row items-center justify-between lg:justify-start">
          <Link href="/" className="flex space-x-2">

            {/* <Image
              alt="header text"
              src="/favicon.svg"
              className="sm:w-12 sm:h-12 w-10 h-10"
              width={25}
              height={25}
          /> */}
            <h1 className="sm:text-3xl text-3xl font-bold  tracking-tight">
            freetoolsarebest.com &nbsp;
            <sup >
              {/* <small className="text-base">Beta</small> */}
            </sup>
            </h1>
          </Link>

            <button
              onClick={menuExpand}
              className="hidden inline-flex items-center justify-center p-2 text-slate-400 hover:text-black focus:outline-none focus:text-black lg:hidden md:hidden"
              id='expand-menu'
              aria-label='Expand Menu'
            >
              <svg
                className="w-6 h-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  className={open ? "hidden" : "inline-flex"}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
                <path
                  className={!open ? "hidden" : "inline-flex"}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>

          <nav
            className={`md:hidden sm:hidden lg:block flex-col lg:items-end items-center  ${
              open ? "flex" : "hidden"
            } md:pb-0 md:flex md:justify-end md:flex-row mt-10 sm:mt-0`}
          >
            <a
              className="px-2 lg:px-6 py-2 md:px-3 text-lg font-medium text-black hover:text-accent-400 lg:ml-auto"
              href="/#podcasts"
            >
              Explore All tools
            </a>

            {/* <details className="dropdown lg:ml-auto">
              <summary className="m-1 btn">Services</summary>
              <ul className="p-2  menu dropdown-content z-[1] bg-base-100">
                <li><a>Item 1</a></li>
                <li><a>Item 2</a></li>
              </ul>
            </details> */}
            
            <a
              className="px-2 lg:px-6 py-2 md:px-3 text-lg font-medium text-black hover:text-accent-400"
              href="/"
            >
              Changlog
            </a>
            <a
              className="px-2 lg:px-6 py-2 md:px-3 text-lg font-medium text-black hover:text-accent-400"
              target="_blank"
              rel="noopener noreferrer"
              href="https://twitter.com/rahul_jalindar"
            >
              About
            </a>
          </nav>
        </div>

        <div>
          <hr className="w-full h-0.5 border-t-0 mt-2 bg-slate-50 opacity-200 dark:opacity-200" />
        </div>
      </div>

    </header>
  );
}