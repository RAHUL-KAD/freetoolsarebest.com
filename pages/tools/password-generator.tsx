import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';

const PasswordGenerator: React.FC = () => {
    const [password, setPassword] = useState<string>('');
    const [length, setLength] = useState<number>(12);
    const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
    const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
    const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
    const [includeSpecialChars, setIncludeSpecialChars] = useState<boolean>(true);
    const [excludedChars, setExcludedChars] = useState<string>('');
    const [copied, setCopied] = useState(false);


    useEffect(() => {
        generatePassword();
    }, []);

    const handleExcludedCharsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setExcludedChars(event.target.value);
    };

    const generatePassword = () => {
        const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
        const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numericChars = '0123456789';
        const specialChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

        let allowedChars = '';

        if (includeLowercase) {
            allowedChars += lowercaseChars;
        }

        if (includeUppercase) {
            allowedChars += uppercaseChars;
        }

        if (includeNumbers) {
            allowedChars += numericChars;
        }

        if (includeSpecialChars) {
            allowedChars += specialChars;
        }

        allowedChars = allowedChars.replace(new RegExp(`[${excludedChars}]`, 'g'), '');

        let newPassword = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * allowedChars.length);
            newPassword += allowedChars[randomIndex];
        }

        setPassword(newPassword);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    return (
        <div className="py-2">
            <Head>
                <title>Passoword Generator | freetoolsarebest </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className='p-4 lg:px-[5.5rem] md:px-10 flex flex-col items-center justify-center'>
                <h1 className="text-3xl font-bold text-center mt-5 mb-5">Passowrd Generator</h1>

                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md w-full">
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="text"
                            placeholder="Generated Password"
                            value={password}
                            readOnly
                        />

                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="length">
                            Password Length
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="length"
                            type="number"
                            max="100"
                            value={length}
                            onChange={(e) => setLength(parseInt(e.target.value))}
                        />
                    </div>

                    <div className="mb-4">
                        <div className="flex items-center">
                            <input
                                className="mr-2"
                                id="lowercase"
                                type="checkbox"
                                checked={includeLowercase}
                                onChange={(e) => setIncludeLowercase(e.target.checked)}
                            />
                            <label className="block text-gray-700 font-bold" htmlFor="lowercase">
                                Lower Case
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                className="mr-2"
                                id="uppercase"
                                type="checkbox"
                                checked={includeUppercase}
                                onChange={(e) => setIncludeUppercase(e.target.checked)}
                            />
                            <label className="block text-gray-700 font-bold" htmlFor="uppercase">
                                Upper Case
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                className="mr-2"
                                id="numbers"
                                type="checkbox"
                                checked={includeNumbers}
                                onChange={(e) => setIncludeNumbers(e.target.checked)}
                            />
                            <label className="block text-gray-700 font-bold" htmlFor="numbers">
                                Numbers
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                className="mr-2"
                                id="special-chars"
                                type="checkbox"
                                checked={includeSpecialChars}
                                onChange={(e) => setIncludeSpecialChars(e.target.checked)}
                            />
                            <label className="block text-gray-700 font-bold" htmlFor="special-chars">
                                Special Character
                            </label>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="exclude-chars">
                            Exclude Character
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="exclude-chars"
                            type="text"
                            placeholder="eg: %$@&*!"
                            value={excludedChars}
                            onChange={handleExcludedCharsChange}
                        />
                    </div>
                    <div>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={generatePassword}
                        >
                            Generate Password
                        </button>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
                            onClick={copyToClipboard}
                        >
                            {copied ? 'Copied!' : 'Copy'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PasswordGenerator;
