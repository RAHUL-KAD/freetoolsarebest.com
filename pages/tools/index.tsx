import React, { lazy, Suspense } from "react";

import tools from "../../public/alltools.json";
import Header from "../../components/Header";
import Head from "next/head";


export default function Freetools() {
    return (
        <div className="py-2">
            <Head>
                <title>Convert numbers to text | freetoolsarebest </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className="mx-auto px-4 sm:px-6 lg:px-8">

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

                <div className="mt-10 grid grid-cols-1 gap-7 md:grid-cols-2 max-w-7xl lg:w-[70rem]">

                    {tools.map((episod, index) => (
                        <>
                            <Suspense key={index} fallback={<div>Loading...</div>}>

                                {episod.button !== 'Coming soon' && (

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
                                        <a
                                            href={`tools${episod.url}`}
                                            className="me-2 lg:ml-5 ml-2 md:ml-5 w-36 lg:mt-5 sm:mt-2 md:mt-2 mt-1 mb-2 rounded-lg border border-blue-700 px-2 py-1 text-center text-sm font-medium text-blue-700 hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
                                        >
                                            {episod.button}
                                        </a>
                                    </div>

                                )}
                            </Suspense>
                        </>

                    ))}
                </div>
            </div>
        </div>
    );
}
