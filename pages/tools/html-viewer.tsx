import React, { useState, useEffect } from 'react';
import AceEditor from 'react-ace';
import Head from 'next/head';
import Header from '../../components/Header';

const HTMLViewer: React.FC = () => {
    const [htmlContent, setHtmlContent] = useState('');
    const [editorWidth, setEditorWidth] = useState<string>('600px');
    const [editorHeight, setEditorHeight] = useState<string>('400px');

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setEditorWidth('90vw');
                setEditorHeight('60vh');
            } else if (window.innerWidth >= 768 && window.innerWidth <= 1024) {
                setEditorWidth('500px');
                setEditorHeight('400px');
            } else {
                setEditorWidth('600px');
                setEditorHeight('500px');
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleChange = (value: string) => {
        setHtmlContent(value);
    };

    const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target && typeof e.target.result === 'string') {
                    const fileContent = e.target.result;
                    setHtmlContent(fileContent);
                } else {
                    console.error("Error reading file content.");
                }
            };
            reader.readAsText(file);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(htmlContent);
    };

    const handleDownload = () => {
        const element = document.createElement('a');
        const file = new Blob([htmlContent], { type: 'text/html' });
        element.href = URL.createObjectURL(file);
        element.download = 'file.html';
        document.body.appendChild(element);
        element.click();
    };

    return (
        <div className="w-[100%] flex flex-col items-center justify-center py-2">
            <Head>
                <title>HTML viewer | freetoolsarebest</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />
            <div className="container mx-auto px-4 py-8 flex flex-col">
                {/* <h1 className="font-display mx-auto max-w-4xl text-center text-xl font-bold tracking-normal text-slate-900 sm:text-xl">
                    <span className="relative text-[#333] whitespace-wrap">
                        <span className="relative mr-2">
                            HTML viewer
                        </span>
                    </span>
                </h1> */}
                <div className="flex lg:flex-row flex-col items-center lg:items-start mt-5 gap-10">
                    <div>
                        <div className='mb-5 flex gap-3'>
                            <label
                                htmlFor="file-input"
                                className="bg-gray-600 flex items-center justify-center hover:bg-gray-900 text-white text-sm font-bold h-[2rem] px-3 rounded cursor-pointer"
                            >
                                Upload .html File
                            </label>
                            <input
                                id="file-input"
                                type="file"
                                accept=".html"
                                className="hidden"
                                onChange={handleUpload}
                            />
                            {/* <div className=""> */}
                                <button className='bg-blue-500 hover:bg-blue-600 text-sm text-white font-semibold h-[2rem] px-3 rounded' onClick={handleCopy}>Copy</button>
                                <button className='bg-green-500 hover:bg-green-600 text-sm text-white font-semibold h-[2rem] px-3 rounded' onClick={handleDownload}>Download</button>
                            {/* </div> */}
                            {/* <input type="file" accept=".html" onChange={handleUpload} /> */}
                        </div>
                        <AceEditor
                            mode="html"
                            theme="Mac Classic"
                            onChange={handleChange}
                            value={htmlContent}
                            width={editorWidth}
                            height={editorHeight}
                        />
                    </div>
                    <div>

                        <div className="">
                            <h2 className="text-xl font-bold mb-2">Preview:</h2>
                            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HTMLViewer;
