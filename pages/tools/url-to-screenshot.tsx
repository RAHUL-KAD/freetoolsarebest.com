import Head from "next/head";
import Header from "../../components/Header";
import { useState } from "react";
import LoadingDots from "../../components/LoadingDots";
// https://chat.openai.com/share/3441bbb4-2a81-494d-8c95-8fb02d64eeb0
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


export default function URLToScreenshot() {

    const [url, setUrl] = useState<string>("");
    const [showResponse, setShowResponse] = useState(false)
    const [loadingResponse, setLoadingResponse] = useState(false)
    const [screenshotBlob, setScreenshotBlob] = useState<Blob | null>(null);
    const [downloadFormat, setDownloadFormat] = useState<'png' | 'pdf'>('png');
    const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
    const [waitTime, setWaitTime] = useState<number>(0); // Default wait time is 0 seconds
    const [errorMessage, setErrorMessage] = useState<string>("There was some error");
    const [erroCondtion, setErrorCondition] = useState(false)



    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        let formattedUrl = url.trim();
        if (formattedUrl && !formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
            // If URL doesn't start with "http://" or "https://", prepend "https://"
            formattedUrl = `https://${formattedUrl}`;
        }
        if (url) {
            try {
                setLoadingResponse(true);
                setErrorCondition(false)

                const apiUrl = `${process.env.NEXT_PUBLIC_SCREENSHOT_URL}/screenshot`;
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ url: formattedUrl, deviceType, waitTime })
                };

                const res = await fetch(apiUrl, requestOptions);

                if (!res.ok) {
                    if (res.status === 400) {
                        throw new Error('Unable to resolve the hostname');
                    } else if (res.status === 408) {
                        throw new Error('Connection timed out while trying to access the URL');
                    } else {
                        throw new Error('Internal server error');
                    }
                }

                const blob = await res.blob();
                setScreenshotBlob(blob);
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

    const handleDownload = () => {
        if (screenshotBlob) {
            if (downloadFormat === 'pdf') {
                // Convert to PDF
                const img = new Image();
                img.src = window.URL.createObjectURL(screenshotBlob);
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx?.drawImage(img, 0, 0, img.width, img.height);
                    const pdf = new jsPDF('l', 'px', [img.width, img.height]);
                    const imageData = canvas.toDataURL('image/png');
                    pdf.addImage(imageData, 'PNG', 0, 0, img.width, img.height);
                    pdf.save(`freetoolsarebest.com__${url}__${deviceType}__${waitTime}.pdf`);
                };
            } else {
                // Convert to PNG
                const url = window.URL.createObjectURL(screenshotBlob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `freetoolsarebest.com__${url}__${deviceType}__${waitTime}.png`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }
        }
    };

    return (

        <div className="w-[100%] flex flex-col items-center justify-center py-2">
            <Head>
                <title>URL To Screenshot | freetoolsarebest </title>
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
                                URL to Screenshot
                            </span>
                        </span>
                    </h1>

                    <h1 className="mt-5 font-display mx-auto max-w-3xl text-center text-lg tracking-normal text-[#333] sm:text-lg">
                        <span className="relative text-[#333] whitespace-wrap">
                            <span className="relative mr-2">
                                An easy way to capture a screenshot of a full webpage. You can download the screenshot.
                            </span>
                        </span>
                    </h1>

                    <div className="mt-10 flex items-center justify-center flex-col">
                        <div className="flex flex-col items-center justify-center ">
                            <form className=" items-center max-w-[600px]" onSubmit={handleSubmit}>
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="url-screenshot"
                                        className="bg-gray-50 lg:w-[28rem] w-[20rem] md:w-[20rem] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Enter your url to capture screenshot..."
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="sm:mt-5 mt-5 md:mt-5 flex items-center justify-center">
                                    <div className="">
                                        <p className="text-sm mb-2">select device type</p>
                                        <select
                                            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            value={deviceType}
                                            onChange={(e) => setDeviceType(e.target.value as 'mobile' | 'tablet' | 'desktop')}
                                        >
                                            <option value="desktop">Desktop</option>
                                            <option value="mobile">Mobile</option>
                                            <option value="tablet">Tablet</option>
                                        </select>
                                    </div>

                                    <div>
                                        <p className="text-sm mb-2 ml-5">select wait time</p>
                                        <select
                                            className="ml-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            value={waitTime}
                                            onChange={(e) => setWaitTime(parseInt(e.target.value))}
                                        >
                                            <option value={0}>None</option>
                                            <option value={10000}>10 sec</option>
                                            <option value={20000}>20 sec</option>
                                            <option value={30000}>30 sec</option>
                                        </select>
                                    </div>
                                    <button
                                        type="submit"
                                        className="inline-flex mt-7 lg:ml-4 md:ml-5 sm:ml-5 ml-5 items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        {loadingResponse && (
                                            <div className="mr-2 flex">
                                                <LoadingDots color="#fff" />
                                            </div>
                                        )}
                                        capture
                                    </button>
                                </div>
                            </form>
                        </div>


                        {showResponse && screenshotBlob && (
                            <div className="fixed z-10 inset-0 overflow-y-auto">
                                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                    <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                                    </div>

                                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                                    <div
                                        className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                                        role="dialog"
                                        aria-modal="true"
                                        aria-labelledby="modal-headline"
                                    >
                                        <div className="flex justify-end pt-4 pr-4">
                                            <button
                                                onClick={() => setShowResponse(false)}
                                                type="button"
                                                className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
                                            >
                                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                            <div className="sm:flex sm:items-start">
                                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                    <img src={URL.createObjectURL(screenshotBlob)} alt="Screenshot" className="max-w-full" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                            <button
                                                onClick={handleDownload}
                                                type="button"
                                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-blue-700 text-base font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                            >
                                                Download as {downloadFormat.toUpperCase()}
                                            </button>
                                            <select
                                                className="mt-3 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                                value={downloadFormat}
                                                onChange={(e) => setDownloadFormat(e.target.value as 'png' | 'pdf')}
                                            >
                                                <option value="png">PNG</option>
                                                <option value="pdf">PDF</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
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
