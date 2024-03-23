
import { useState } from 'react';
import Header from '../../components/Header';
import Head from 'next/head';

const AudioPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioSrc, setAudioSrc] = useState('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setAudioSrc(URL.createObjectURL(file));
            setIsPlaying(true);
        }
    };

    return (
        <div className="py-2">
            <Head>
                <title>Play audio file | freetoolsarebest </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className='p-4 lg:px-[5.5rem] md:px-10 flex flex-col items-center justify-center'>
                <h1 className="text-3xl font-bold text-center mt-5 mb-5">Play any audio file</h1>
                <input
                    type="file"
                    accept="audio/*"
                    onChange={handleFileChange}
                    className="border border-gray-300 rounded px-4 py-2 mb-4 mt-5"
                />
                {audioSrc && (
                    <audio src={audioSrc} controls={true} autoPlay={isPlaying}>
                        Your browser does not support the audio element.
                    </audio>
                )}

            </div>
            </div>
            );
};

            export default AudioPlayer;
