import Head from "next/head";
import Header from "../../components/Header";
import { useState } from "react";
import LoadingDots from "../../components/LoadingDots";
// https://chat.openai.com/share/3441bbb4-2a81-494d-8c95-8fb02d64eeb0

interface ShortUrlResponse {
    shortUrl: string;
}

export default function QRCode() {

    const [url, setUrl] = useState<string>("");
    const [showResponse, setShowResponse] = useState(false)
    const [loadingResponse, setLoadingResponse] = useState(false)
    const [response, setResponse] = useState<ShortUrlResponse>({ shortUrl: '' });

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        if (url) {
            try {
                setLoadingResponse(true)
                const apiUrl = `${process.env.NEXT_PUBLIC_EMAIL_VALIDATION_URL}/short-url?url=${encodeURIComponent(url)}`;
                const res = await fetch(apiUrl);
                const data = await res.json();
                // console.log("data - ", data)
                setResponse(data);
                setLoadingResponse(false)
                setShowResponse(true)
            } catch (error) {
                console.error('Error fetching data:', error);
                setResponse({ shortUrl: '' });
            }
        }
    };

    // function copy(text: string) {
    //     navigator.clipboard.writeText(text)
    // }

    return (

        <div className="w-[100%] flex flex-col items-center justify-center py-2">
            <Head>
                <title>URL shortening | freetoolsarebest </title>
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
                                Shorten any URL for free
                            </span>
                        </span>
                    </h1>

                    <h1 className="mt-5 font-display mx-auto max-w-3xl text-center text-lg tracking-normal text-[#333] sm:text-lg">
                        <span className="relative text-[#333] whitespace-wrap">
                            <span className="relative mr-2">
                                You can shorten your urls for 100% free. We also provide analytics like no of times url was accessed, more analytics are coming soon.
                            </span>
                        </span>
                    </h1>

                    <div className="mt-10 flex items-center justify-center flex-col">
                        <form className="flex items-center max-w-[600px]" onSubmit={handleSubmit}>
                            <div className="relative">
                                <input
                                    type="url"
                                    id="short-url"
                                    className="bg-gray-50 lg:w-[28rem] md:w-[20rem] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Enter your url to shorten..."
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="inline-flex lg:ml-10 md:ml-5 sm:ml-5 ml-5 items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                {loadingResponse && (
                                    <div className="mr-2 flex">
                                        <LoadingDots color="#fff" />
                                    </div>
                                )}
                                Shorten
                            </button>
                        </form>



                        {showResponse && !loadingResponse && (
                            <div className="mt-10">

                                <h1 className="whitespace-wrap mx-auto text-center text-sm font-bold tracking-normal text-slate-900 sm:text-3xl">
                                    <span className="relative text-[#333] whitespace-wrap">
                                        <span className="relative mr-2 whitespace-wrap">
                                            Short URL: <br />
                                            <a href={`${response.shortUrl}`}
                                                target="_blank"
                                                className="text-blue-700 underline">
                                                {response.shortUrl}
                                            </a>
                                        </span>
                                    </span>
                                </h1>

                                {/* <span onClick={() => copy(response.shortUrl)}>
                                    Copy
                                </span> */}
                            </div>
                        )}
                    </div>
                </div>


            </main>

        </div>
    )

}

function useCallback(arg0: () => Promise<void>, arg1: string[]) {
    throw new Error("Function not implemented.");
}
