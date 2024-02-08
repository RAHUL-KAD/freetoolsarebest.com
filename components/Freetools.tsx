import Image from "next/image";
import React, { lazy, Suspense } from "react";

import tools from "../public/alltools.json";


export default function Freetools() {
  return (
    <section id="podcasts" className="max-w-full pb-10 md:pt-5">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2 max-w-7xl">

          {tools.map((episod, index) => (
            <>
              <Suspense key={index} fallback={<div>Loading...</div>}>

                <div className="undefined relative p-4 flex items-center overflow-hidden rounded-lg border border-gray-200 shadow-sm dark:border-gray-800">
                  {/* <img
                        className="absolute w-full h-auto opacity-[.08] dark:opacity-10 top-1/2 -translate-y-1/2 sm:static sm:translate-y-0 sm:w-96 sm:h-96 sm:shrink-0 sm:opacity-100 sm:dark:opacity-100"
                        src="https://img.youtube.com/vi/2yHr9DPnSzk/mqdefault.jpg"
                        alt="Podcast cover"
                        /> */}
                  <div className="flex grow flex-col p-3 sm:py-0 sm:px-6">
                    <div className="text-color-secondary flex items-center gap-x-2">
                      <div className="flex grow items-center gap-x-1">
                      </div>
                      {/* {episod.new && (
                        <div className="relative z-10  flex items-center text-green-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="mr-1 h-4 w-4 "
                          >
                            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
                            <path d="M5 3v4"></path>
                            <path d="M19 17v4"></path>
                            <path d="M3 5h4"></path>
                            <path d="M17 19h4"></path>
                          </svg>
                          <span>New</span>
                        </div>
                      )} */}
                    </div>
                    <div>
                      <span className="absolute inset-0 z-0"></span>
                      <h3 className="line-clamp-2 sm:line-clamp-1 text-base font-semibold sm:text-xl">
                        {episod.title}
                      </h3>

                    </div>
                    <p className="line-clamp-3 sm:line-clamp-1 text-color-secondary mt-1 break-all">
                            {episod.desc}
                        </p>
                  </div>
                </div>
              </Suspense>
            </>

          ))}
        </div>
      </div>
    </section>
  );
}
