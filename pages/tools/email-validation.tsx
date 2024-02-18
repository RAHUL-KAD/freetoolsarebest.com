import Head from "next/head";
import Header from "../../components/Header";
import React, { useState } from 'react';

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { supabase } from '../../libs/supabase'
import axios from "axios";

// https://mailbite.io/
// https://listclean.xyz/

interface EmailResponse {
    isEmailValid: boolean;
    mxRecords: any[]; // Assuming mxRecords is an array of objects
    // Add more properties if needed
}

export default function EmailValidation() {
    const [email, setEmail] = useState('');
    const [showResponse, setShowResponse] = useState(false)
    const [loadingResponse, setLoadingResponse] = useState(false)
    const [response, setResponse] = useState<EmailResponse>({ isEmailValid: false, mxRecords: [] });
    const [filebase64, setFileBase64] = useState<string>("")
    const [apiResponse, setApiResponse] = useState<string>("");
    const [blobData, setBlobData] = useState<File | null>(null);
    const [uploadUi, setuploadUi] = useState(true);
    const [fileExtensionVariable, setFileExtensionVariable] = useState<string | '.csv'>("");
    const [fileTypeVariable, setFileTypeVariable] = useState<string | 'csv'>("");


    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        try {
            setLoadingResponse(true)
            const apiUrl = `${process.env.NEXT_PUBLIC_EMAIL_VALIDATION_URL}/validate-email?email=${encodeURIComponent(email)}`;
            const res = await fetch(apiUrl);
            const data = await res.json();
            setResponse(data);
            setLoadingResponse(false)
            setShowResponse(true)
        } catch (error) {
            console.error('Error fetching data:', error);
            setResponse({ isEmailValid: false, mxRecords: [] });
        }
    };


    async function formSubmit(e: any) {
        e.preventDefault();

        if (!blobData) {
            console.error("No audio file selected.");

        }
        setuploadUi(false);
        //   console.log("Blob data: " + typeof blobData);

        const formData = new FormData();
        if (blobData) {
            // formData.append('audioBlob', blobData);

            const uniqueFileName = `${Date.now()}.csv`;
            console.log("unique file name: " + uniqueFileName);

            const { data: uploadData, error: uploadError } = await supabase
                .storage
                .from('freetoolsarebest.com')
                .upload(`email-validation-v01/${uniqueFileName}`, blobData, {
                    cacheControl: '3600',
                    upsert: false,
                });

            if (uploadError) {
                console.log("Upload error: " + uploadError);
            } else {
                console.log("Upload success: " + uploadData);
            }

            const { data: signedUrlData, error: signedUrlError } = await supabase
                .storage
                .from('freetoolsarebest.com')
                .createSignedUrl(`email-validation-v01/${uniqueFileName}`, 180, {
                    download: true
                });

            let email_validation_url: string = '';

            if (signedUrlError) {
                console.error("Signed URL error: " + signedUrlError);
            } else {
                email_validation_url = signedUrlData.signedUrl || '';
                console.log("Signed URL data: " + signedUrlData.signedUrl);
            }

            formData.append('email_validation_url', email_validation_url)

            console.log("formData : ", formData)

            if (process.env.NEXT_PUBLIC_ASR_URL) {

                const asr_url = process.env.NEXT_PUBLIC_ASR_URL;

                await axios.post(asr_url, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                    .then((response) => {
                        const output_email_validation_url = response.data.response.output_email_validation_url
                        setApiResponse(output_email_validation_url);
                    })
                    .catch((error) => {
                        console.error("API Error:", error);
                    });
            }

        }
    }


    function convertFile(files: FileList | null) {
        if (files) {
            console.log("Files", files)
            const fileRef = files[0];
            setBlobData(files[0]);

        };
    }

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
                    strokeWidth="0"
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

                <div className="mt-10 flex items-center justify-center flex-col">
                    <form className="flex items-center max-w-[600px]" onSubmit={handleSubmit}>
                        <div className="relative">
                            <input
                                type="email"
                                className="bg-gray-50 lg:w-[28rem] md:w-[20rem] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Enter your email to test..."
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                            <button
                                type="submit"
                                className="inline-flex lg:ml-10 md:ml-5 sm:ml-5 ml-5 items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Verify
                            </button>
                    </form>
                    
                    {loadingResponse &&
                        <Skeleton count={3} />
                    }

                    {showResponse && !loadingResponse && (
                        <div className="mt-10">

                            <h1 className="font-display mx-auto max-w-3xl text-center text-3xl font-bold tracking-normal text-slate-900 sm:text-3xl">
                                <span className="relative text-[#333] whitespace-wrap">
                                    <span className="relative mr-2">
                                    Status: {response.isEmailValid ? 'true' : 'false'}
                                    </span>
                                </span>
                            </h1>
                            {/* <pre>
                                mxRecords:
                                {response.mxRecords.map((record, index) => (
                                    <div key={index}>
                                        {JSON.stringify(record)}
                                    </div>
                                ))}
                            </pre> */}
                        </div>
                    )}

                    
                    {/* {uploadUi &&
                        <div className="lg:mr-10 mb-20">
                            <p className="mt-10 text-center text-[#333] whitespace-wrap">or you can upload <span className="font-bold"> CSV</span> containing email address  </p>

                            <form onSubmit={formSubmit} className='mt-4'>

                                <div className="mt-10 flex items-center justify-center">
                                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center lg:w-[28rem] w-full h-32 border-2 border-blue-700 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Upload a CSV file. (File sholud be less than 30 MB) </p>
                                        </div>

                                        <input type="file" id="dropzone-file" className="hidden" accept=".csv" onChange={(e) => convertFile(e.target.files)} />

                                    </label>
                                </div>

                                {blobData &&

                                    <div className='mt-7 flex items-center justify-center flex-col'>


                                        <p>{blobData.name}</p>


                                        <div className='flex items-center justify-center flex-col'>

                                            <button className="mt-7 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-lg px-10 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"> Submit</button>
                                        </div>
                                    </div>
                                }
                            </form>

                        </div>
                    } */}
                </div>

            </main>

        </div>
    )

}