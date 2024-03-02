// src/components/YoutubeThumbnailViewer.tsx

import React, { useState } from 'react';
import Header from '../../components/Header';
import Head from 'next/head';
import LoadingDots from '../../components/LoadingDots';

// https://chat.openai.com/share/e3a2e130-1caf-47e0-9b11-0c48bec33553

const YoutubeThumbnailViewer: React.FC = () => {
  const [url, setUrl] = useState('');
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [loadingResponse, setLoadingResponse] = useState(false)
  const [highQualityThumbnail, sethighQualityThumbnail] = useState<string>('');
  const [mediumQualityThumbnail, setmediumQualityThumbnail] = useState<string>('');
  const [standardQualityThumbnail, setstandardQualityThumbnail] = useState<string>('');
  const [lowQualityThumbnail, setlowQualityThumbnail] = useState<string>('');
  const [lowestQualityThumbnail, setlowestQualityThumbnail] = useState<string>('');

  const [defaultThumbnail, setDefaultThumbnail] = useState<string>('');

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if (url.startsWith('https://www.youtube.com')) {
      try {
        const videoId = new URL(url).searchParams.get('v');
        if (videoId) {
          const highQualityThumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
          const mediumQualityThumbnail = `https://img.youtube.com/vi/${videoId}/sddefault.jpg`;
          const standardQualityThumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
          const lowQualityThumbnail = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
          const lowestQualityThumbnail = `https://img.youtube.com/vi/${videoId}/default.jpg`;

          setThumbnails([
            highQualityThumbnail,
            mediumQualityThumbnail,
            standardQualityThumbnail,
            lowQualityThumbnail,
            lowestQualityThumbnail
          ]);
          sethighQualityThumbnail(highQualityThumbnail);
          setmediumQualityThumbnail(mediumQualityThumbnail);
          setstandardQualityThumbnail(standardQualityThumbnail);
          setlowQualityThumbnail(lowQualityThumbnail);
          setlowestQualityThumbnail(lowestQualityThumbnail);

          setDefaultThumbnail(highQualityThumbnail)
        }
      } catch (error) {
        console.error('Error fetching thumbnails:', error);
      }
    }
    else {
      alert('Please enter a valid YouTube URL');
    }
  };

  const downloadThumbnail = (url: string, filename: string) => {
    fetch(url)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
      })
      .catch(error => console.error('Error downloading thumbnail:', error));
  };

  return (

    <div className="w-[100%] flex flex-col items-center justify-center py-2">
      <Head>
        <title>Youtube Video Thumbnail Downloader| freetoolsarebest </title>
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
        <div className="sm:mt-10">
          {/* <Badge text={"Try our GenAI solution for Contact Center"} /> */}

          <h1 className="font-display mx-auto max-w-4xl text-center text-3xl font-bold tracking-normal text-slate-900 sm:text-5xl">
            <span className="relative text-[#333] whitespace-wrap">
              <span className="relative mr-2">
                Extract Youtube Thumbnails
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
                  placeholder="Enter valid youtube url..."
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
                Fetch
              </button>
            </form>
            {/* <div className="container mx-auto">
              <div className="mt-4">
                {thumbnails.map((thumbnail, index) => (
                  <div key={index}>
                    <img src={thumbnail} alt={`Thumbnail ${index}`} className="mb-2" />
                  </div>
                ))}
              </div>
            </div> */}
            {defaultThumbnail && (
              <div className='flex lg:flex-row flex-col mt-10 lg:gap-20 gap-7'>
                <div className='lg:max-w-[30rem] py-5'>
                  <img src={defaultThumbnail} alt="Thumbnail" className="mb-2" />
                </div>
                <div className='flex flex-col lg:p-4 p-5 border items-center justify-center md:max-w-[25rem] border-gray-200 rounded-lg'>
                  <p className='text-center'>Download Options</p>
                  <div>
                    <div className="flex">
                      <button type="button" onClick={() => setDefaultThumbnail(highQualityThumbnail)} className="py-2 flex-initial w-[10rem] mt-4 px-5 me-2 text-sm font-medium text-gray-900 focus:outline-none bg-white  hover:text-blue-700 hover:underline ">High Quality</button>
                      <button type="button" onClick={() => downloadThumbnail(highQualityThumbnail, `High_quality_thumbnail_${url}.jpg`)} className="inline-flex items-center py-2 mt-4 px-5 me-2  text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Download</button>
                    </div>
                    <div className="flex">
                      <button type="button" onClick={() => setDefaultThumbnail(mediumQualityThumbnail)} className="py-2 mt-4 flex-initial w-[10rem] px-5 me-2  text-sm font-medium text-gray-900 focus:outline-none bg-white  hover:text-blue-700 hover:underline ">Medium Quality</button>
                      <button type="button" onClick={() => downloadThumbnail(highQualityThumbnail, `Medium_quality_thumbnail_${url}.jpg`)} className="inline-flex items-center py-2 mt-4 px-5 me-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Download</button>
                    </div>
                    <div className="flex">
                      <button type="button" onClick={() => setDefaultThumbnail(standardQualityThumbnail)} className="py-2 flex-initial w-[10rem] mt-4 px-5 me-2 text-sm font-medium text-gray-900 focus:outline-none bg-white  hover:text-blue-700 hover:underline ">Standard Quality</button>
                      <button type="button" onClick={() => downloadThumbnail(highQualityThumbnail, `Standard_quality_thumbnail_${url}.jpg`)} className="inline-flex items-center py-2 mt-4 px-5 me-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Download</button>
                    </div>
                    <div className="flex">
                      <button type="button" onClick={() => setDefaultThumbnail(lowQualityThumbnail)} className="py-2 mt-4 flex-initial w-[10rem] px-5 me-2 text-sm font-medium text-gray-900 focus:outline-none bg-white  hover:text-blue-700 hover:underline ">Low Quality</button>
                      <button type="button" onClick={() => downloadThumbnail(highQualityThumbnail, `Low_quality_thumbnail_${url}.jpg`)} className="inline-flex items-center py-2 mt-4 px-5 me-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Download</button>
                    </div>
                    <div className="flex">
                      <button type="button" onClick={() => setDefaultThumbnail(lowestQualityThumbnail)} className="py-2 flex-initial w-[10rem] mt-4 px-5 me-2 text-sm font-medium text-gray-900 focus:outline-none bg-white  hover:text-blue-700 hover:underline ">Lowest Quality</button>
                      <button type="button" onClick={() => downloadThumbnail(highQualityThumbnail, `Lowest_quality_thumbnail_${url}.jpg`)} className="inline-flex items-center py-2 mt-4 px-5 me-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Download</button>
                    </div>
                  </div>
                </div>
              </div>
            )}


          </div>
        </div>
      </main>
    </div>
  );
};

export default YoutubeThumbnailViewer;
