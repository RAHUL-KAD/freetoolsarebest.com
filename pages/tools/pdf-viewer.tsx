import React, { useState } from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import Head from 'next/head';
import Header from '../../components/Header';

const PdfViewer: React.FC = () => {
  const [pdfFile, setPdfFile] = useState<string | null>(null);
  const [viewPDF, setViewPDF] = useState<boolean>(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onload = () => {
        setViewPDF(true)
        setPdfFile(`data:application/pdf;base64,${btoa(reader.result as string)}`);
      };
      reader.readAsBinaryString(file);
    } else {
      alert('Please select a PDF file.');
    }
  };

  return (
    <div className=''>
      <Head>
        <title>PDF viewer | freetoolsarebest </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      {!viewPDF &&


        <div className='flex flex-col items-center justify-center mt-10 mb-10'>

          <h1 className="font-display mx-auto max-w-4xl text-center text-5xl font-bold tracking-normal text-slate-900 sm:text-5xl">
            <span className="relative text-[#333] whitespace-wrap">
              <span className="relative mr-2">
                PDF Viewer
              </span>
            </span>
          </h1>

          <input type="file" accept="application/pdf" className='mt-10 ml-20' onChange={handleFileUpload} />
        </div>
      }
      {pdfFile && (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          <div style={{ height: '700px' }} className='lg:mb-10 mb-5 mt-10'>
            <Viewer fileUrl={pdfFile} />
          </div>
        </Worker>

      )}
    </div>
  );
};

export default PdfViewer;