// pages/ScreenInfo.tsx

import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';

const ScreenInfo: React.FC = () => {
    const [screenInfo, setScreenInfo] = useState({
        width: 0,
        height: 0,
        pixelDensity: 0,
        aspectRatio: 0,
        orientation: '',
        deviceType: '',
        colorDepth: 0,
        touchSupport: false,
        browserWidth: 0,
        browserHeight: 0,
    });

    useEffect(() => {
        const updateScreenInfo = () => {
            setScreenInfo({
                width: window.screen.width,
                height: window.screen.height,
                pixelDensity: window.devicePixelRatio,
                aspectRatio: window.screen.width / window.screen.height,
                orientation: window.screen.orientation.type,
                deviceType: getDeviceType(),
                colorDepth: window.screen.colorDepth,
                touchSupport: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
                browserWidth: window.innerWidth,
                browserHeight: window.innerHeight,
            });
        };

        updateScreenInfo(); // Set initial screen info
        window.addEventListener('resize', updateScreenInfo);

        return () => {
            window.removeEventListener('resize', updateScreenInfo);
        };
    }, []);

    const getDeviceType = () => {
        const width = window.screen.width;
        if (width > 1024) {
            return 'Desktop';
        } else if (width <= 1024 && width > 600) {
            return 'Tablet';
        } else {
            return 'Mobile';
        }
    };

    return (
        <div className="py-2">
            <Head>
                <title>My Screen Info | freetoolsarebest </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className='p-4  lg:px-[5.5rem] md:px-10 flex flex-col items-center justify-center'>
                <div>
                    <h1 className="text-3xl font-bold text-center mt-5 mb-5">My Screen Information</h1>
                </div>

                <div className="container mx-auto md:p-10 p-4 lg:w-[60rem]">
                    <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-2 gap-4">
                        <div className="border p-4 rounded-md border-gray-300">
                            <h2 className="font-bold mb-2">Width:</h2>
                            <p>{screenInfo.width}</p>
                        </div>
                        <div className="border p-4 rounded-md border-gray-300">
                            <h2 className="font-bold mb-2">Height:</h2>
                            <p>{screenInfo.height}</p>
                        </div>
                        <div className="border p-4 rounded-md border-gray-300">
                            <h2 className="font-bold mb-2">Pixel Density:</h2>
                            <p>{screenInfo.pixelDensity}</p>
                        </div>
                        <div className="border p-4 rounded-md border-gray-300">
                            <h2 className="font-bold mb-2">Aspect Ratio:</h2>
                            <p>{screenInfo.aspectRatio}</p>
                        </div>
                        <div className="border p-4 rounded-md border-gray-300">
                            <h2 className="font-bold mb-2">Orientation:</h2>
                            <p>{screenInfo.orientation}</p>
                        </div>
                        <div className="border p-4 rounded-md border-gray-300">
                            <h2 className="font-bold mb-2">Device Type:</h2>
                            <p>{screenInfo.deviceType}</p>
                        </div>
                        <div className="border p-4 rounded-md border-gray-300">
                            <h2 className="font-bold mb-2">Color Depth:</h2>
                            <p>{screenInfo.colorDepth}</p>
                        </div>
                        <div className="border p-4 rounded-md border-gray-300">
                            <h2 className="font-bold mb-2">Touch Support:</h2>
                            <p>{screenInfo.touchSupport ? 'Yes' : 'No'}</p>
                        </div>
                        <div className="border p-4 rounded-md border-gray-300">
                            <h2 className="font-bold mb-2">Browser Width:</h2>
                            <p>{screenInfo.browserWidth}</p>
                        </div>
                        <div className="border p-4 rounded-md border-gray-300">
                            <h2 className="font-bold mb-2">Browser Height:</h2>
                            <p>{screenInfo.browserHeight}</p>
                        </div>
                        
                    </div>
                    {/* </div> */}

                </div>
                {/* <h1 className="text-2xl font-bold mb-2">Screen Information</h1> */}
                {/* <div className="bg-gray-100 p-4 lg:w-[25rem] text-center ">
                    <p>Width: {screenInfo.width}px</p>
                    <p>Height: {screenInfo.height}px</p>
                    <p>Pixel Density: {screenInfo.pixelDensity}</p>
                    <p>Aspect Ratio: {screenInfo.aspectRatio.toFixed(2)}</p>
                    <p>Orientation: {screenInfo.orientation}</p>
                    <p>Device Type: {screenInfo.deviceType}</p>
                    <p>Color Depth: {screenInfo.colorDepth}</p>
                    <p>Touch Support: {screenInfo.touchSupport ? 'Yes' : 'No'}</p>
                    <p>Browser Width: {screenInfo.browserWidth}px</p>
                    <p>Browser Height: {screenInfo.browserHeight}px</p>
                </div> */}
            </div>
        </div>
    );
};

export default ScreenInfo;
