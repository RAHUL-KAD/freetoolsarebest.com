import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Head from "next/head";

// https://chat.openai.com/share/d6a978db-b1e0-4bce-a9e3-15decbc3e136


interface BatteryStatus {
    level: number;
    charging: boolean;
    chargingTime: number;
    dischargingTime: number;
}


const BrowserInfoPage: React.FC = () => {
    const [browserName, setBrowserName] = useState<string>("None");
    const [browserVersion, setBrowserVersion] = useState<string>("None");
    const [deviceType, setDeviceType] = useState<string>("None");
    const [osInfo, setOsInfo] = useState<string>("None");
    const [osVersion, setOsVersion] = useState<string>("None");
    const [screenSize, setScreenSize] = useState<string>("None");
    const [cpuCores, setCpuCores] = useState<number>(0);
    const [isTouchscreen, setIsTouchscreen] = useState<boolean>(false);
    const [hardwareClassification, setHardwareClassification] = useState<string>("None");
    const [releaseYear, setReleaseYear] = useState<number>(0);
    const [hasGPU, setHasGPU] = useState<boolean>(false);
    const [gpuVendor, setGpuVendor] = useState<string>("Unknown");
    const [gpuRenderer, setGpuRenderer] = useState<string>("Unknown");
    const [webRtcSupport, setWebRtcSupport] = useState<string>("None");
    const [audioCodecs, setAudioCodecs] = useState<string[]>();
    const [videoCodecs, setVideoCodecs] = useState<string[]>();
    const [availableStorage, setAvailableStorage] = useState<string>("None");
    const [batteryStatus, setBatteryStatus] = useState<string>("None");
    const [remainingTime, setRemainingTime] = useState<string>("Undefined")



    useEffect(() => {
        // Parse user agent string
        const userAgent = window.navigator.userAgent;
        const isMobile = /Mobile/.test(userAgent);
        const isTablet = /Tablet/.test(userAgent);
        const isDesktop = !isMobile && !isTablet;
        const isIOS = /iPhone|iPad|iPod/.test(userAgent);
        const isAndroid = /Android/.test(userAgent);
        const isWindows = /Windows/.test(userAgent);
        const isMacOS = /Macintosh/.test(userAgent);
        const isLinux = /Linux/.test(userAgent);

        setOsInfo(
            isWindows
                ? "Windows"
                : isMacOS
                    ? "MacOS"
                    : isLinux
                        ? "Linux"
                        : isIOS
                            ? "iOS"
                            : isAndroid
                                ? "Android"
                                : "None"
        );

        setDeviceType(
            isMobile ? "Mobile" : isTablet ? "Tablet" : isDesktop ? "Desktop" : "None"
        );

        // Parse browser name and version
        const browserInfo = window.navigator.userAgent.match(/(chrome|safari|firefox|edge|opera)\/(\d+\.\d+)/i);
        if (browserInfo) {
            setBrowserName(browserInfo[1]);
            setBrowserVersion(browserInfo[2]);
        }

        // Parse operating system version
        const osVersionInfo = window.navigator.userAgent.match(/(Windows NT |Mac OS X |Android )(\d+[._]\d+)/i);
        if (osVersionInfo) {
            setOsVersion(osVersionInfo[2].replace("_", "."));
        }

        // Screen size
        setScreenSize(`${window.screen.width}x${window.screen.height}`);

        // Number of CPU cores
        const cpuCount = (window.navigator as any).hardwareConcurrency || 0;
        setCpuCores(cpuCount);

        // Touchscreen capability
        setIsTouchscreen("ontouchstart" in window);

        // WebGL support (indicative of GPU)
        const canvas = document.createElement("canvas");
        const gl = canvas.getContext("webgl");
        setHasGPU(!!gl);

        // GPU information
        if (gl) {
            const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
            if (debugInfo) {
                setGpuVendor(gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL));
                setGpuRenderer(gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL));
            }
        }

        // WebRTC support
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(() => setWebRtcSupport("Supported"))
                .catch(() => setWebRtcSupport("Not Supported"));
        } else {
            setWebRtcSupport("Not Supported");
        }

        // Audio codecs
        if (window.MediaRecorder) {
            const mediaRecorder = new MediaRecorder(new MediaStream());
            setAudioCodecs(mediaRecorder.mimeType.split(","));
        }

        // Video codecs
        if (window.MediaRecorder) {
            const mediaRecorder = new MediaRecorder(new MediaStream());
            setVideoCodecs(mediaRecorder.mimeType.split(","));
        }

        // Available storage space
        if (navigator.storage && navigator.storage.estimate) {
            navigator.storage.estimate().then(estimate => {
                if (estimate.usage !== undefined) {
                    setAvailableStorage(`${estimate.usage / 1024 / 1024} MB`);
                } else {
                    setAvailableStorage("Unknown");
                }
            }).catch(() => {
                setAvailableStorage("Unknown");
            });
        } else {
            setAvailableStorage("Unknown");
        }

        // Battery status
        if ("getBattery" in navigator) {
            (navigator.getBattery as () => Promise<BatteryStatus>)().then((battery) => {
                const batteryPercentage = Math.round(battery.level * 100); // Round to nearest integer
                setBatteryStatus(`${batteryPercentage}%`);

                // Calculate remaining time
                let remainingTime: string;
                if (battery.charging) {
                    const timeRemaining = (battery.chargingTime - battery.dischargingTime) / 3600; // Convert seconds to hours
                    remainingTime = `${timeRemaining.toFixed(2)} hours`; // Keep two decimal places
                } else {
                    const timeRemaining = battery.dischargingTime / 3600; // Convert seconds to hours
                    remainingTime = `${timeRemaining.toFixed(2)} hours`; // Keep two decimal places
                }
                setRemainingTime(remainingTime);
            }).catch(() => {
                setBatteryStatus("Unknown");
                setRemainingTime("Unknown");
            });
        } else {
            setBatteryStatus("Unknown");
            setRemainingTime("Unknown");
        }



        // Hardware classification
        const classification = typeof (window.navigator as any).deviceMemory !== "undefined"
            ? (window.navigator as any).deviceMemory > 4
                ? "High"
                : (window.navigator as any).deviceMemory > 2
                    ? "Medium"
                    : "Low"
            : "Unknown";
        setHardwareClassification(classification);

        // Release year (an approximation based on userAgent)
        const yearMatch = userAgent.match(/(?:Mac OS X (\d+_\d+_?\d*))|(?:Windows NT (\d+\.?\d*))|(?:Android (\d+\.\d+))/);
        if (yearMatch) {
            const version = parseFloat(yearMatch[1] || yearMatch[2] || yearMatch[3]);
            if (!isNaN(version)) {
                const year = new Date(version).getFullYear();
                setReleaseYear(year);
            }
        }
    }, []);

    return (
        <div className="flex flex-col items-center justify-center py-2">
            <Head>
                <title>Device info | freetoolsarebest </title>
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

            {/* <div className="flex justify-center flex-col items-center px-4"> */}
            <div className="mt-10 sm:mt-10 mb-5">
                {/* <Badge text={"Try our GenAI solution for Contact Center"} /> */}

                <h1 className="font-display mx-auto max-w-4xl text-center text-5xl font-bold tracking-normal text-slate-900 sm:text-5xl">
                    <span className="relative text-[#333] whitespace-wrap">
                        <span className="relative mr-2">
                            Device info
                        </span>
                    </span>
                </h1>

                <h1 className="mt-5 font-display mx-auto max-w-3xl text-center text-lg tracking-normal text-[#333] sm:text-lg">
                    <span className="relative text-[#333] whitespace-wrap">
                        <span className="relative mr-2">
                            Extract all the info about your device.
                        </span>
                    </span>
                </h1>
            </div>
            <div className="container mx-auto md:p-10 p-4 lg:w-[65rem] ">
                <div className="grid grid-cols-2 gap-4">
                    <div className="border p-4">
                        <h2 className="font-bold mb-2">Browser Name:</h2>
                        <p>{browserName}</p>
                    </div>
                    <div className="border p-4">
                        <h2 className="font-bold mb-2">Browser Version:</h2>
                        <p>{browserVersion}</p>
                    </div>
                    <div className="border p-4">
                        <h2 className="font-bold mb-2">Operating System:</h2>
                        <p>{osInfo}</p>
                    </div>
                    <div className="border p-4">
                        <h2 className="font-bold mb-2">Operating System Version:</h2>
                        <p>{osVersion}</p>
                    </div>
                    <div className="border p-4">
                        <h2 className="font-bold mb-2">Device Type:</h2>
                        <p>{deviceType}</p>
                    </div>
                    <div className="border p-4">
                        <h2 className="font-bold mb-2">Screen Size:</h2>
                        <p>{screenSize}</p>
                    </div>
                    <div className="border p-4">
                        <h2 className="font-bold mb-2">CPU Cores:</h2>
                        <p>{cpuCores}</p>
                    </div>
                    <div className="border p-4">
                        <h2 className="font-bold mb-2">Touchscreen:</h2>
                        <p>{isTouchscreen ? "Yes" : "No"}</p>
                    </div>
                    <div className="border p-4">
                        <h2 className="font-bold mb-2">Hardware Classification:</h2>
                        <p>{hardwareClassification}</p>
                    </div>
                    <div className="border p-4">
                        <h2 className="font-bold mb-2">GPU:</h2>
                        <p>{hasGPU ? "Yes" : "No"}</p>
                    </div>
                    <div className="border p-4">
                        <h2 className="font-bold mb-2">GPU Vendor:</h2>
                        <p>{gpuVendor}</p>
                    </div>
                    <div className="border p-4">
                        <h2 className="font-bold mb-2">GPU Renderer:</h2>
                        <p>{gpuRenderer}</p>
                    </div>
                    <div className="border p-4">
                        <h2 className="font-bold mb-2">Release Year:</h2>
                        <p>{releaseYear || "Unknown"}</p>
                    </div>
                    <div className="border p-4">
                        <h2 className="font-bold mb-2">WebRTC Support:</h2>
                        <p>{webRtcSupport}</p>
                    </div>
                    <div className="border p-4">
                        <h2 className="font-bold mb-2">Audio Codecs:</h2>
                        <p>{audioCodecs ? audioCodecs.join(", ") : "Not Available"}</p>
                    </div>
                    <div className="border p-4">
                        <h2 className="font-bold mb-2">Video Codecs:</h2>
                        <p>{videoCodecs ? videoCodecs.join(", ") : "Not Available"}</p>
                    </div>
                    <div className="border p-4">
                        <h2 className="font-bold mb-2">Available Storage:</h2>
                        <p>{availableStorage}</p>
                    </div>
                    <div className="border p-4">
                        <h2 className="font-bold mb-2">Battery Status:</h2>
                        <p>{batteryStatus}</p>
                    </div>
                    <div className="border p-4">
                        <h2 className="font-bold mb-2">Battery remaining time:</h2>
                        <p>{remainingTime}</p>
                    </div>
                </div>
                {/* </div> */}

            </div>
        </div>
    );
};

export default BrowserInfoPage;