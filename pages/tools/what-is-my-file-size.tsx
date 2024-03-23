import React, { useState } from 'react';
import Header from '../../components/Header';
import Head from 'next/head';

const FileSizeChecker: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
    };

    const formatSize = (bytes: number) => {
        const kilobytes = bytes / 1024;
        const megabytes = kilobytes / 1024;
        const gigabytes = megabytes / 1024;
        return { kilobytes, megabytes, gigabytes };
    };

    return (
        <div className="py-2">
            <Head>
                <title>What is my file size | freetoolsarebest </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className='p-4 lg:px-[5.5rem] md:px-10 flex flex-col items-center justify-center'>
                <h1 className="text-3xl font-bold text-center mt-5 mb-5">What is my file size</h1>
                <input
                    type="file"
                    onChange={handleFileChange}
                    accept=""
                    className="border border-gray-300 rounded px-4 py-2 mb-4 mt-5"
                />
                {file && (
                    <div className="mt-4">
                        <p>File Name: {file.name}</p>
                        <p>Size (Bytes): {file.size}</p>
                        <p>Size (KB): {formatSize(file.size).kilobytes.toFixed(2)} KB</p>
                        <p>Size (MB): {formatSize(file.size).megabytes.toFixed(2)} MB</p>
                        <p>Size (GB): {formatSize(file.size).gigabytes.toFixed(2)} GB</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FileSizeChecker;
