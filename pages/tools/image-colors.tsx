import React, { useState, useRef } from 'react';
import { extractColors } from 'extract-colors';
import Head from 'next/head';
import Header from '../../components/Header';

// https://chat.openai.com/share/0b7adb9f-4111-4967-802e-cb010736b84f

function ImageToColors() {
    const [colors, setColors] = useState<Color[]>([]);
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [hexCopied, setHexCopied] = useState(false)
    const colorsContainerRef = useRef<HTMLDivElement>(null);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            const imageFile = e.target.files[0];
            if (imageFile) {
                const imageUrl = URL.createObjectURL(imageFile);
                setImageSrc(imageUrl);
                const img = new Image();
                img.onload = async () => {
                    const colors = await extractColors(img);
                    setColors(colors);
                    URL.revokeObjectURL(imageUrl); // Clean up object URL
                    if (colorsContainerRef.current) {
                        colorsContainerRef.current.scrollIntoView({ behavior: "smooth" }); // Scroll to colors section
                    }
                };
                img.src = imageUrl;
            }
        }
    }

    const handleColorHover = (hex: string) => {
        // Display hex value on hover
        console.log(hex);
    }

    const handleColorClick = (hex: string) => {
        // Copy hex value to clipboard on click
        setHexCopied(false)
        navigator.clipboard.writeText(hex);
        setHexCopied(true)
        setTimeout(() => {
            setHexCopied(false);
        }, 2000)
    }

    return (

        <div className="w-[100%] flex flex-col items-center justify-center py-2">
            <Head>
                <title>Extract Colors from Image | freetoolsarebest </title>
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
            <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center">
                <h1 className="font-display mx-auto max-w-4xl text-center text-4xl font-bold tracking-normal text-slate-900 sm:text-5xl">
                    <span className="relative text-[#333] whitespace-wrap">
                        <span className="relative mr-2">
                            Extract Colors from image
                        </span>
                    </span>
                </h1>

                <input
                    type="file"
                    onChange={handleImageUpload}
                    accept="image/*"
                    placeholder='upload a file'
                    className="border border-gray-300 mt-10 py-2 px-4 rounded-md mb-4 lg:w-[30rem] md:w-[25rem] w-[20rem]"
                />
                {imageSrc && (
                    <img
                        src={imageSrc}
                        alt="Uploaded Image"
                        className="mb-4 flex items-center justify-center"
                        style={{ maxWidth: "50%", maxHeight: "50%" }}
                        
                    />
                )}
                <div ref={colorsContainerRef} className="flex flex-row items-center justify-center lg:w-[30rem] md:w-[25rem] w-[19rem]">
                    {colors.map(color => (
                        <div
                            key={color.hex}
                            className="w-12 h-12 mr-4 rounded-full cursor-pointer"
                            style={{ backgroundColor: color.hex }}
                            onMouseEnter={() => handleColorHover(color.hex)}
                            onClick={() => handleColorClick(color.hex)}
                        ></div>
                    ))}
                </div>
                <div className="mt-2">
                    {hexCopied && (
                        <p>Copied!</p>
                    )}
                </div>
            </div>
        </div>
    );
}

interface Color { hex: string; }
export default ImageToColors;
