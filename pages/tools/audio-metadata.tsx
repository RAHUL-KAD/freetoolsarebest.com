import { use, useState } from 'react';
import Head from 'next/head';
import * as mm from 'music-metadata-browser';
import Header from '../../components/Header';

const AudioMetadataPage = () => {
    const [metadata, setMetadata] = useState<any>(null); // Change 'any' to a more specific type if available.
    const [fileName, setFileName] = useState<string>("");
    const [filetype, setFileType] = useState<string>("");
    const [fileSize, setFileSize] = useState<number>(0);
    const [fileLastModifiled, setfileLastModifiled] = useState<number>(0);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            const musicMetadata = await mm.parseBlob(file);
            // console.log(musicMetadata)
            setFileName(file.name)
            setFileType(file.type)
            setFileSize(file.size)
            setfileLastModifiled(file.lastModified)

            setMetadata(musicMetadata);

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
                <title>Audio metadata | freetoolsarebest </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className='p-4 lg:px-[5.5rem] md:px-10 flex flex-col items-center justify-center'>
                <h1 className="text-3xl font-bold text-center mt-5 mb-5">Audio metadata</h1>

                <input
                    type="file"
                    accept="audio/*"
                    onChange={handleFileChange}
                    className="border border-gray-300 rounded px-4 py-2 mb-4 mt-5"
                />

                {metadata && (
                    <div className="flex flex-col items-center justify-center mt-5 overflow-scroll">

                        <h2 className='text-lg font-bold'>File information</h2>

                        <table className="table">
                            <tr>
                                <td className="">Name</td>
                                <td>{fileName}</td>
                            </tr>
                            <tr>
                                <td className="">File type</td>
                                <td>{filetype}</td>
                            </tr>
                            <tr>
                                <td className="">Size</td>
                                <td>{formatFileSize(fileSize)}</td>
                            </tr>
                            <tr>
                                <td className="">Last modified</td>
                                <td>{formatLastModified(fileLastModifiled)}</td>
                            </tr>
                        </table>

                        <h2 className='text-lg font-bold mt-5'>Format</h2>

                        <table className="table">
                            <tr>
                                <td className="">Sample Rate</td>
                                <td>{metadata.format.sampleRate}</td>
                            </tr>
                            <tr>
                                <td className="">Number of Samples</td>
                                <td>{metadata.format.numberOfSamples}</td>
                            </tr>
                            <tr>
                                <td className="">Bit Rate</td>
                                <td>{metadata.format.bitrate}</td>
                            </tr>
                            <tr>
                                <td className="">Audio bit depth</td>
                                <td>{metadata.format.bitsPerSample}</td>
                            </tr>
                            <tr>
                                <td className="">Codec</td>
                                <td>{metadata.format.codec}</td>
                            </tr>
                            <tr>
                                <td className="">Container</td>
                                <td>{metadata.format.container}</td>
                            </tr>
                            <tr>
                                <td className="">No of channels</td>
                                <td>{metadata.format.numberOfChannels}</td>
                            </tr>
                            <tr>
                                <td className="">Lossless</td>
                                <td>{metadata.format.lossless ? 'true' : 'false'}</td>
                            </tr>
                            <tr>
                                <td className="">Tag header type(s)</td>
                                <td>{metadata.tagTypes}</td>
                            </tr>
                        </table>

                        <h2 className='text-lg font-bold mt-5'>Quality information</h2>
                        <h2 className='text-md font-bold mt-5'>Parser warnings </h2>


                        <table className="table">
                            <tr>
                                {/* <td className="">Track number</td> */}
                                <h2 className='text-center mt-5'>{metadata.quality.warnings[0]?.message}</h2>
                            </tr>


                        </table>

                        <h2 className='text-lg font-bold mt-5'>Generic Tags</h2>

                        <table className="table">
                            <tr>
                                <td className="">Track number</td>
                                <td>{metadata.common.track.no}</td>
                            </tr>
                            <tr>
                                <td className="">Disk number</td>
                                <td>{metadata.common.disk.no}</td>
                            </tr>

                        </table>

                        {/* <div>Channels:</div>
                    <div>{metadata.format.numberOfChannels}</div>
                    <div>Sample Rate:</div>
                    <div>{metadata.format.sampleRate}</div>
                    <div>Precision:</div>
                    <div>{metadata.format.bitsPerSample}</div>
                    <div>Duration:</div>
                    <div>{metadata.format.duration}</div>
                    <div>File Size:</div>
                    <div>{metadata.format.bitrate}</div>
                    <div>Bit Rate:</div>
                    <div>{metadata.format.codecProfile}</div>
                    <div>Sample Encoding:</div>
                    <div>{metadata.format.lossless ? 'Lossless' : 'Lossy'}</div> */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AudioMetadataPage;
