import Head from "next/head";
import Header from "../../components/Header";
import { useEffect, useRef, useState } from "react";
import LoadingDots from "../../components/LoadingDots";

interface ShortUrlResponse {
    audio_url: string;
}

export default function ShortURL() {

    const [text, setText] = useState<string>("");
    const [showResponse, setShowResponse] = useState(false)
    const [loadingResponse, setLoadingResponse] = useState(false)
    const [response, setResponse] = useState<ShortUrlResponse>({ audio_url: '' });
    const [language, setLanguage] = useState<string>('en');
    const [errorMessage, setErrorMessage] = useState<string>("There was some error");
    const [erroCondtion, setErrorCondition] = useState(false)

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        if (text) {
            try {
                setLoadingResponse(true);
                setErrorCondition(false)
                setShowResponse(false);

                const apiUrl = `${process.env.NEXT_PUBLIC_TTS_URL}/gtts`;
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ text, language })
                };

                const res = await fetch(apiUrl, requestOptions);
                const data = await res.json();
                console.log(data)
                setResponse(data);
                setLoadingResponse(false);
                setShowResponse(true);
            } catch (error: any) {
                console.error('Error fetching data:', error);
                // Handle specific errors here
                if (error.message === 'Unable to resolve the hostname') {
                    setErrorMessage("Unable to resolve the hostname")
                    setErrorCondition(true)
                    setLoadingResponse(false);

                } else if (error.message === 'Connection timed out while trying to access the URL') {
                    setErrorMessage("Connection timed out while trying to access the URL")
                    setErrorCondition(true)
                    setLoadingResponse(false);

                } else {
                    setErrorMessage(error.message)
                    setErrorCondition(true)
                    setLoadingResponse(false);

                }
            }
        }
    };




    return (

        <div className="w-[100%] flex flex-col items-center justify-center py-2">
            <Head>
                <title>Text to Speech | freetoolsarebest </title>
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
                                Text to Speech
                            </span>
                        </span>
                    </h1>

                    <h1 className="mt-5 font-display mx-auto max-w-3xl text-center text-lg tracking-normal text-[#333] sm:text-lg">
                        <span className="relative text-[#333] whitespace-wrap">
                            <span className="relative mr-2">
                                You can generate 100% free Text to Speech in 5 different Languages
                            </span>
                        </span>
                    </h1>

                    <div className="mt-10 flex items-center justify-center flex-col">
                        <div className="flex flex-col items-center justify-center ">
                            <form className=" items-center max-w-[600px]" onSubmit={handleSubmit}>
                                {/* <p className="text-start text-sm mb-3">Enter your Text below</p> */}
                                <div className="relative">
                                    <textarea
                                        id="tts"
                                        className="bg-gray-50 lg:w-[28rem] w-[20rem] md:w-[20rem] h-[9rem] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Enter text to convert it to speech..."
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="sm:mt-5 mt-5 md:mt-5 flex items-center justify-center">
                                    <div className="">
                                        <p className="text-sm mb-2 text-center">select language</p>
                                        <select
                                            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            value={language}
                                            onChange={(e) => setLanguage(e.target.value)}
                                        >
                                            <option value="en">English</option>
                                            <option value="es">Spanish</option>
                                            <option value="fr">French</option>
                                            <option value="zh-CN">Mandarin (China Mainland)</option>
                                            <option value="pt">Portuguese</option>
                                        </select>
                                    </div>

                                    {/* <div>
                                        <p className="text-sm mb-2 ml-5">select wait time</p>
                                        <select
                                            className="ml-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            
                                        >
                                            <option value={0}>None</option>
                                            <option value={10000}>10 sec</option>
                                            <option value={20000}>20 sec</option>
                                            <option value={30000}>30 sec</option>
                                        </select>
                                    </div> */}
                                    <button
                                        type="submit"
                                        className="inline-flex mt-7 lg:ml-4 md:ml-5 sm:ml-5 ml-5 items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        {loadingResponse && (
                                            <div className="mr-2 flex">
                                                <LoadingDots color="#fff" />
                                            </div>
                                        )}
                                        Convert
                                    </button>
                                </div>
                            </form>
                        </div>

                        {showResponse && (
                            <div className="mt-10 mb-20">
                                <p className="text-center mb-5">Download the Speech</p>
                                <audio className="" controls>
                                    <source src={response.audio_url} type="audio/mp3" />
                                    Your browser does not support the audio element.
                                </audio>
                            </div>
                        )}



                        {erroCondtion && errorMessage && (
                            <div className="mt-10 text-xl font-bold">
                                <p className="text-center">{errorMessage}</p>
                                <p className="text-center">Please try again</p>
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
