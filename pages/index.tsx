import React, { lazy } from "react";

import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import CallToAction from "../components/CallToAction";

import Freetools from "../components/Freetools";

const Home: NextPage = () => {
  return (
    <div className="w-[100%] flex flex-col items-center justify-center py-2">
      <Head>
        <title>freetoolsarebest | Use all the tools for free </title>
        <link rel="svg" href="/favicon.svg" />
      </Head>

      <svg
        className="absolute inset-0 -z-10 h-full w-full stroke-green-100 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
            width="200"
            height="200"
            x="50%"
            y="-1"
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          strokeWidth="0"
          fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)"
        />
      </svg>

      <Header />
      <main className="flex justify-center items-center px-4">
        <div className="mt-10 sm:mt-10">
          {/* <Badge text={"Try our GenAI solution for Contact Center"} /> */}

          <h1 className="font-display mx-auto max-w-4xl text-center text-5xl font-bold tracking-normal text-slate-900 sm:text-5xl">
            <span className="relative text-[#333] whitespace-wrap">
              <span className="relative mr-2">
              Explore all free tools
              </span>
            </span>
          </h1>
          </div>
      </main>
      <Freetools />
      <CallToAction />
    </div>
  );
};

export default Home;
