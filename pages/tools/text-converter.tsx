import React, { useState } from 'react';
import Header from '../../components/Header';
import Head from 'next/head';

const convertToSentenceCase = (text: string) => {
    return text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (c) => c.toUpperCase());
};

const convertToLowerCase = (text: string) => {
    return text.toLowerCase();
};

const convertToUpperCase = (text: string) => {
    return text.toUpperCase();
};

const convertToCapitalizedCase = (text: string) => {
    text = text.toLocaleLowerCase()
    return text.replace(/\b\w/g, (c) => c.toUpperCase());
};

const convertToAlternatingCapitalCase = (text: string) => {
    let result = '';
    for (let i = 0; i < text.length; i++) {
        if (i % 2 === 0) {
            result += text[i].toUpperCase();
        } else {
            result += text[i].toLowerCase();
        }
    }
    return result;
};

const convertToTitleCase = (text: string) => {
    return text.toLowerCase().replace(/(^|\s)\S/g, (c) => c.toUpperCase());
};

const convertToSnakeCase = (text: string) => {
    return text.toLowerCase().replace(/\s+/g, '_');
};

const convertToKebabCase = (text: string) => {
    return text.toLowerCase().replace(/\s+/g, '-');
};

const convertToPascalCase = (text: string) => {
    return text.toLowerCase().replace(/(\b\w)/g, (char) => char.toUpperCase()).replace(/\s+/g, '');
};

const convertToCamelCase = (text: string) => {
    const pascal = convertToPascalCase(text);
    return pascal.charAt(0).toLowerCase() + pascal.slice(1);
};

const convertToDotCase = (text: string) => {
    return text.toLowerCase().replace(/\s+/g, '.');
};

const convertToQuestionCase = (text: string) => {
    return text.replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (c) => c.toUpperCase()) + '?';
};

const convertToConstantCase = (text: string) => {
    return text.toUpperCase().replace(/\s+/g, '_');
};

const convertToSlashCase = (text: string) => {
    return text.toLowerCase().replace(/\s+/g, '/');
};

const convertToBackslashCase = (text: string) => {
    return text.toLowerCase().replace(/\s+/g, '\\');
};

const convertToUnderscoreCase = (text: string) => {
    return text.toLowerCase().replace(/\s+/g, '_');
};

const convertToDollarCase = (text: string) => {
    return text.toLowerCase().replace(/\s+/g, '$');
};

const convertToHashCase = (text: string) => {
    return text.toLowerCase().replace(/\s+/g, '#');
};

const TextConverterPage: React.FC = () => {
    const [inputText, setInputText] = useState('');
    const [showMore, setShowMore] = useState(false);
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputText(event.target.value);
        setError(''); // Clear error when text is entered
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target?.result as string;
                setInputText(text);
            };
            reader.readAsText(file);
        }
        setError(''); // Clear error when file is uploaded
    };

    const handleConversion = (converter: (text: string) => string) => {
        if (!inputText.trim()) {
            setError('Please enter text before converting.'); // Set error message
            setTimeout(() => {
                setError('');
            }, 4000);
            return; // Return early if no text is entered
        }
        setInputText(converter(inputText));
    };

    const handleCopy = () => {
        if (!inputText.trim()) {
            setError('Please enter text before copying.'); // Set error message
            setTimeout(() => {
                setError('');
            }, 4000);
            return; // Return early if no text is entered
        }
        navigator.clipboard.writeText(inputText);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    const handleDownload = () => {
        if (!inputText.trim()) {
            setError('Please enter text before downloading.'); // Set error message
            setTimeout(() => {
                setError('');
            }, 4000);
            return; // Return early if no text is entered
        }
        const element = document.createElement('a');
        const file = new Blob([inputText], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = 'converted_text_ftools.txt';
        document.body.appendChild(element);
        element.click();
    };

    const handleClear = () => {
        setInputText('');
        setError('');
    };
    const handleToggleMore = () => {
        setShowMore(!showMore);
    };

    return (
        <div className="py-2">
            <Head>
                <title>Free Lorem Ipsum Generator | freetoolsarebest </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className="p-4 flex flex-col justify-center items-center">
                <div>
                    <h1 className="text-3xl font-bold mb-4 text-center">Text Converter</h1>
                </div>
                <div className='flex items-center justify-center flex-col'>
                    {error && <div className="text-red-500 mb-1">{error}</div>}
                    <textarea
                        className="lg:w-[50rem] md:w-[30rem] h-40 border border-gray-300 rounded-md p-2 mb-4"
                        value={inputText}
                        onChange={handleInputChange}
                        placeholder="Enter your text here..."
                    ></textarea>
                </div>
                <div className='flex flex-col justify-center items-center lg:max-w-3xl md:max-w-2xl'>
                    <div className="flex flex-wrap justify-center items-center gap-2">
                        <label className="bg-gray-700 text-sm h-[2.3rem] text-white px-3 rounded flex items-center justify-center cursor-pointer">
                            Upload From File
                            <input type="file" accept=".txt" onChange={handleFileUpload} style={{ display: 'none' }} />
                        </label>

                        <button className="bg-blue-700 text-sm h-[2.3rem] text-white px-3 rounded mr-2 hover:bg-blue-800" onClick={() => handleConversion(convertToSentenceCase)}>
                            Sentence Case
                        </button>
                        <button className="bg-blue-700 text-sm h-[2.3rem] text-white px-3 rounded mr-2 hover:bg-blue-800" onClick={() => handleConversion(convertToLowerCase)}>
                            Lower Case
                        </button>
                        <button className="bg-blue-700 text-sm h-[2.3rem] text-white px-3 rounded mr-2 hover:bg-blue-800" onClick={() => handleConversion(convertToUpperCase)}>
                            Upper Case
                        </button>
                        <button className="bg-blue-700 text-sm h-[2.3rem] text-white px-3 rounded mr-2 hover:bg-blue-800" onClick={() => handleConversion(convertToAlternatingCapitalCase)}>
                            Alternating Capital Case
                        </button>
                        <button className="bg-blue-700 text-sm h-[2.3rem] text-white px-3 rounded mr-2 hover:bg-blue-800" onClick={() => handleConversion(convertToCapitalizedCase)}>
                            Capitalized Case
                        </button>
                        <button className="bg-blue-700 text-sm h-[2.3rem] text-white px-3 rounded mr-2 hover:bg-blue-800" onClick={() => handleConversion(convertToTitleCase)}>
                            Title Case
                        </button>
                        {showMore && (
                            <>
                                <button className="bg-blue-700 text-sm h-[2.3rem] text-white px-3 rounded mr-2 hover:bg-blue-800" onClick={() => handleConversion(convertToSnakeCase)}>
                                    Snake Case
                                </button>
                                <button className="bg-blue-700 text-sm h-[2.3rem] text-white px-3 rounded mr-2 hover:bg-blue-800" onClick={() => handleConversion(convertToKebabCase)}>
                                    Kebab Case
                                </button>
                                <button className="bg-blue-700 text-sm h-[2.3rem] text-white px-3 rounded mr-2 hover:bg-blue-800" onClick={() => handleConversion(convertToPascalCase)}>
                                    Pascal Case
                                </button>
                                <button className="bg-blue-700 text-sm h-[2.3rem] text-white px-3 rounded mr-2 hover:bg-blue-800" onClick={() => handleConversion(convertToCamelCase)}>
                                    Camel Case
                                </button>
                                <button className="bg-blue-700 text-sm h-[2.3rem] text-white px-3 rounded mr-2 hover:bg-blue-800" onClick={() => handleConversion(convertToDotCase)}>
                                    Dot Case
                                </button>
                                <button className="bg-blue-700 text-sm h-[2.3rem] text-white px-3 rounded mr-2 hover:bg-blue-800" onClick={() => handleConversion(convertToQuestionCase)}>
                                    Question Case
                                </button>

                                <button className="bg-blue-700 text-sm h-[2.3rem] text-white px-3 rounded mr-2 hover:bg-blue-800" onClick={() => handleConversion(convertToConstantCase)}>
                                    Constant Case
                                </button>
                                <button className="bg-blue-700 text-sm h-[2.3rem] text-white px-3 rounded mr-2 hover:bg-blue-800" onClick={() => handleConversion(convertToSlashCase)}>
                                    Slash Case
                                </button>
                                <button className="bg-blue-700 text-sm h-[2.3rem] text-white px-3 rounded mr-2 hover:bg-blue-800" onClick={() => handleConversion(convertToBackslashCase)}>
                                    Backslash Case
                                </button>
                                <button className="bg-blue-700 text-sm h-[2.3rem] text-white px-3 rounded mr-2 hover:bg-blue-800" onClick={() => handleConversion(convertToUnderscoreCase)}>
                                    Underscore Case
                                </button>
                                <button className="bg-blue-700 text-sm h-[2.3rem] text-white px-3 rounded mr-2 hover:bg-blue-800" onClick={() => handleConversion(convertToDollarCase)}>
                                    Dollar Case
                                </button>
                                <button className="bg-blue-700 text-sm h-[2.3rem] text-white px-3 rounded mr-2 hover:bg-blue-800" onClick={() => handleConversion(convertToHashCase)}>
                                    Hash Case
                                </button>
                            </>
                        )}
                        <button className="bg-gray-700 text-sm h-[2.3rem] text-white px-3 rounded mr-2 hover:bg-gray-800" onClick={handleToggleMore}>
                            {showMore ? 'Show Less' : 'Show More'}
                        </button>
                        <button className="bg-green-500 text-sm h-[2.3rem] text-white px-3 rounded mr-2 hover:bg-green-600" onClick={handleClear}>
                            Clear
                        </button>
                        <button className="bg-green-500 text-sm h-[2.3rem] text-white px-3 rounded mr-2 hover:bg-green-600" onClick={handleCopy}>
                            {copied ? 'Copied!' : 'Copy'}
                        </button>
                        <button className="bg-gray-700 text-sm h-[2.3rem] text-white px-3 rounded mr-2 hover:bg-gray-800" onClick={handleDownload}>
                            Download
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TextConverterPage;
