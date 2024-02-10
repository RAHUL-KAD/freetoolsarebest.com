import React, { lazy, Suspense } from "react";

import tools from "../public/alltools.json";


export default function Freetools() {
  return (
    <section id="freetools" className="max-w-full pb-10 md:pt-5">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2 max-w-7xl">

          {tools.map((episod, index) => (
            <>
              <Suspense key={index} fallback={<div>Loading...</div>}>

                <div className="undefined relative p-4 flex flex-col overflow-hidden rounded-lg border border-gray-200 shadow-sm dark:border-gray-800">
                  <div className="flex grow flex-col p-3 sm:py-0 sm:px-6">
                    <div className="text-color-secondary flex items-center gap-x-2">
                      <div className="flex grow items-center gap-x-1">
                      </div>
                    </div>
                    <div>
                      {/* <span className="absolute inset-0 z-0"></span> */}
                      <h3 className="line-clamp-2 sm:line-clamp-1 text-base font-semibold sm:text-xl">
                        {episod.title}
                      </h3>

                    </div>
                    <p className="line-clamp-3 sm:line-clamp-1 text-color-secondary mt-1 break-all">
                            {episod.desc}
                    </p>

                    
                  </div>
                  <button
                      className="me-2 lg:ml-5 ml-2 md:ml-5 w-36 lg:mt-5 sm:mt-2 md:mt-2 mt-1 mb-2 rounded-lg border border-blue-700 px-2 py-1 text-center text-sm font-medium text-blue-700 hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
                    >
                      {episod.button}
                    </button>
                </div>
              </Suspense>
            </>

          ))}
        </div>
      </div>
    </section>
  );
}
