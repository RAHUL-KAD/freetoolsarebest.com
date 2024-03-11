import React, { useState } from 'react';
import { loremIpsum } from 'lorem-ipsum';
import Header from '../../components/Header';
import Head from 'next/head';

// https://chat.openai.com/share/4e5da110-bf88-4e8c-b6e7-8c4f19e4fbce

type LoremType = 'paragraphs' | 'sentences' | 'words' | 'list';

const LoremIpsumGenerator: React.FC = () => {
    const [type, setType] = useState<LoremType>('paragraphs');
    const [count, setCount] = useState<number>(5);
    const [generatedLorem, setGeneratedLorem] = useState<string[]>([]); // Changed to array of strings
    const [copied, setCopied] = useState(false);

    const generateLorem = () => {
        let loremText = '';
        switch (type) {
            case 'paragraphs':
                loremText = loremIpsum({ count, units: 'paragraphs' });
                break;
            case 'sentences':
                loremText = loremIpsum({ count, units: 'sentences' });
                break;
            case 'words':
                loremText = loremIpsum({ count, units: 'words' });
                break;
            case 'list':
                const words = loremIpsum({ count, units: 'words' }).split(' ');
                loremText = words.join(', ');
                break;
            default:
                loremText = '';
        }

        // Split the generated text based on the selected type
        switch (type) {
            case 'paragraphs':
                setGeneratedLorem(loremText.split('\n'));
                break;
            case 'sentences':
                setGeneratedLorem(loremText.split('. '));
                break;
            case 'words':
                setGeneratedLorem(loremText.split(' '));
                break;
            case 'list':
                setGeneratedLorem(loremText.split(', '));
                break;
            default:
                setGeneratedLorem([]);
        }
    };

    const handleCopyToClipboard = () => {
        const textToCopy = generatedLorem.join('\n');
        navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 5000);
    };

    const handleDownloadTxtFile = () => {
        const textToSave = generatedLorem.join('\n');
        const blob = new Blob([textToSave], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `generatedLorem_${type}_ftools.txt`;
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="py-2">
            <Head>
                <title>Free Lorem Ipsum Generator | freetoolsarebest </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className="p-4">
                <h1 className="text-3xl font-bold mb-4 text-center mt-5">Lorem Ipsum Generator</h1>
                <div className='flex flex-col items-center justify-center mt-10'>
                    <div className='flex lg:gap-10 lg:ml-0 ml-7 items-center justify-center'>
                        <div className="mb-4">
                            <label htmlFor="type" className="mr-2">
                                Items to generate:
                            </label>
                            <select
                                id="type"
                                value={type}
                                onChange={(e) => setType(e.target.value as LoremType)}
                                className="p-2 border rounded"
                            >
                                <option value="paragraphs">Paragraphs</option>
                                <option value="sentences">sentences</option>
                                <option value="words">Words</option>
                                {/* <option value="list">List of Words</option> */}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="count" className="mr-2">
                                Number of {type === 'list' ? 'Words' : type}:
                            </label>
                            <input
                                type="number"
                                id="count"
                                value={count}
                                onChange={(e) => setCount(parseInt(e.target.value))}
                                className="p-2 border rounded w-[7rem]"
                            />
                        </div>
                    </div>

                    <button onClick={generateLorem} className="bg-blue-500 text-white px-4 py-2 rounded">
                        Generate Lorem Ipsum
                    </button>
                </div>

                <div className='flex justify-center items-center'>

                    {generatedLorem.length > 0 && (
                        <div className="mt-4 flex flex-col justify-center items-center">
                            <h2 className="text-lg font-semibold">Generated Text:</h2>

                            <div className='lg:w-[44rem] flex flex-col justify-center mt-5 items-center border border-gray-300 rounded-md p-2'>
                                <div className='mb-2 flex items-end justify-end lg:ml-[28rem]'>
                                    <button onClick={handleCopyToClipboard} className="bg-green-500 text-xs text-white px-3 py-1 rounded mr-2">
                                        {copied ? 'Copied!' : 'Copy'}
                                    </button>
                                    <button onClick={handleDownloadTxtFile} className="bg-blue-500 text-xs text-white px-3 py-1 rounded">
                                        Download as .txt
                                    </button>
                                </div>
                                {generatedLorem.map((line, index) => (
                                    <React.Fragment key={index}>
                                        <p className='text-center'>{line}</p>
                                        {index !== generatedLorem.length - 1 && <br />}
                                    </React.Fragment>
                                ))}
                            </div>

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LoremIpsumGenerator;
