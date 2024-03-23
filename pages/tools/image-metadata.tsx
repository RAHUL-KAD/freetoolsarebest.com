import React, { useState } from 'react';
import Head from 'next/head';
import Header from '../../components/Header';

const ImageMetadataPage = () => {
    const [fileName, setFileName] = useState<string>("");
    const [filetype, setFileType] = useState<string>("");
    const [fileSize, setFileSize] = useState<number>(0);
    const [fileLastModified, setFileLastModified] = useState<number>(0);
    const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null);
    const [imageSrc, setImageSrc] = useState<string | null>(null);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            setFileName(file.name)
            setFileType(file.type)
            setFileSize(file.size)
            setFileLastModified(file.lastModified)

            // Read image file to get dimensions
            const image = new Image();
            image.onload = () => {
                setImageDimensions({
                    width: image.width,
                    height: image.height
                });
            };
            image.src = URL.createObjectURL(file);

            // Set image source for display
            setImageSrc(URL.createObjectURL(file));
        } catch (error) {
            console.error('Error parsing metadata:', error);
        }
    };

    const formatFileSize = (sizeInBytes: number): string => {
        const sizeInMb = sizeInBytes / (1024 * 1024);
        return sizeInMb.toFixed(2) + ' MB';
    };

    const formatLastModified = (timestamp: number): string => {
        const date = new Date(timestamp);
        return date.toString();
    };

    return (
        <div className="py-2">
            <Head>
                <title>Image metadata | freetoolsarebest </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className='p-4 lg:px-[5.5rem] md:px-10 flex flex-col items-center justify-center'>
                <h1 className="text-3xl font-bold text-center mt-5 mb-5">Image metadata</h1>

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="border border-gray-300 rounded px-4 py-2 mb-4 mt-5"
                />

                {fileName && (
                    <div className="flex flex-col items-center justify-center mt-5 overflow-scroll">
                        <h2 className='text-lg font-bold'>File information</h2>
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td>Name</td>
                                    <td>{fileName}</td>
                                </tr>
                                <tr>
                                    <td>File type</td>
                                    <td>{filetype}</td>
                                </tr>
                                <tr>
                                    <td>Size</td>
                                    <td>{formatFileSize(fileSize)}</td>
                                </tr>
                                <tr>
                                    <td>Last modified</td>
                                    <td>{formatLastModified(fileLastModified)}</td>
                                </tr>
                                {imageDimensions && (
                                    <tr>
                                        <td>Image dimensions</td>
                                        <td>{imageDimensions.width} x {imageDimensions.height} px</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        {imageSrc && <img src={imageSrc} alt="Uploaded image" className="mt-4" />}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageMetadataPage;
