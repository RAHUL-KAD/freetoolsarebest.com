import Head from "next/head";
import Header from "../../components/Header";
import React, { useState } from 'react';


// https://mailbite.io/
// https://listclean.xyz/

export default function EmailValidation() {
    const [email, setEmail] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        try {
            const apiUrl = `${process.env.NEXT_PUBLIC_EMAIL_VALIDATION_URL}/validate-email?email=${encodeURIComponent(email)}`;
            const res = await fetch(apiUrl);
            const data = await res.json();
            setResponse(JSON.stringify(data, null, 2));
        } catch (error) {
            console.error('Error fetching data:', error);
            setResponse('Error fetching data');
        }
    };


    return (

        <div className="w-[100%] flex flex-col items-center justify-center py-2">
            <Head>
                <title>freetoolsarebest | Use all the tools for free </title>
                <link rel="icon" href="/favicon.ico" />
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
                    stroke-width="0"
                    fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)"
                />
            </svg>

            <Header />

            <main className="flex max-w-7xl justify-center flex-col items-center px-4">
                <div className="mt-10 sm:mt-10">
                    {/* <Badge text={"Try our GenAI solution for Contact Center"} /> */}

                    <h1 className="font-display mx-auto max-w-3xl text-center text-5xl font-bold tracking-normal text-slate-900 sm:text-5xl">
                        <span className="relative text-[#333] whitespace-wrap">
                            <span className="relative mr-2">
                                Free Email Verification Service
                            </span>
                        </span>
                    </h1>

                    <h1 className="mt-5 font-display mx-auto max-w-3xl text-center text-lg tracking-normal text-[#333] sm:text-lg">
                        <span className="relative text-[#333] whitespace-wrap">
                            <span className="relative mr-2">
                                We provide 100% free email verification and validation service. You can use as musch as you want for free. Bulk CSV upload is coming soon.
                            </span>
                        </span>
                    </h1>
                </div>

                <div className="mt-10 ">
                    <form className="flex items-center max-w-[600px]" onSubmit={handleSubmit}>
                        <div className="relative">
                            <input
                                type="text"
                                className="bg-gray-50 lg:w-[28rem] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Enter your email to test..."
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="inline-flex ml-10 items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Verify
                        </button>
                    </form>

                    {response &&
                        <div className="mt-4 w-[28rem] flex">
                            <pre>{response}</pre>
                        </div>
                    }
                </div>

            </main>

        </div>
    )

}