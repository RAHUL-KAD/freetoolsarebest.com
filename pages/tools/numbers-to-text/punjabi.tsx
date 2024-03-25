import Head from 'next/head';
import React, { useState } from 'react';
import Header from '../../../components/Header';

const NumberConverter: React.FC = () => {
    const [number, setNumber] = useState<number>(0);
    const [text, setText] = useState<string>('');
    const [copied, setCopied] = useState(false);

    const convertToText = (num: number): string => {
        const unitsMap: { [key: number]: string } = {
            0: 'ਸਿਫ਼ਰ',
            1: 'ਇੱਕ',
            2: 'ਦੋ',
            3: 'ਤਿੰਨ',
            4: 'ਚਾਰ',
            5: 'ਪੰਜ',
            6: 'ਛੇ',
            7: 'ਸੱਤ',
            8: 'ਅੱਠ',
            9: 'ਨੌ',
        };

        const teensMap: { [key: number]: string } = {
            10: 'ਦਸ',
            11: 'ਗਿਆਰਾਂ',
            12: 'ਬਾਰਾਂ',
            13: 'ਤੇਰਾਂ',
            14: 'ਚੋਦਾਂ',
            15: 'ਪੰਦਰਾਂ',
            16: 'ਸੋਲਾਂ',
            17: 'ਸਤਾਰਾਂ',
            18: 'ਅਠਾਰਾਂ',
            19: 'ਉੱਨੀ',
        };

        const tensMap: { [key: number]: string } = {
            2: 'ਬੀਅੰਤੀ',
            3: 'ਤੀਅੰਤੀ',
            4: 'ਚਾਰੰਤੀ',
            5: 'ਪੰਜਾਂਤੀ',
            6: 'ਛਿਆਂਤੀ',
            7: 'ਸੱਤਾਂਤੀ',
            8: 'ਅੱਠਾਂਤੀ',
            9: 'ਨੌਂਤੀ',
        };

        const largeNumberSuffixes: { [key: number]: string } = {
            0: '',
            3: ' ਹਜ਼ਾਰ',
            6: ' ਲੱਖ',
            9: ' ਕਰੋੜ',
            12: ' ਅਰਬ',
            15: ' ਖਰਬ',
            18: ' ਨੀਲ',
        };

        if (num === 0) {
            return 'ਸਿਫ਼ਰ';
        }

        let text = '';

        for (let i = 18; i >= 0; i -= 3) {
            const divisor = Math.pow(10, i);
            let quotient = Math.floor(num / divisor);

            if (quotient > 0) {
                if (quotient >= 100) {
                    text += unitsMap[Math.floor(quotient / 100)] + ' ਸੌ ';
                    quotient %= 100;
                }

                if (quotient >= 10 && quotient < 20) {
                    text += teensMap[quotient] + ' ';
                    quotient = 0;
                } else if (quotient >= 20) {
                    text += tensMap[Math.floor(quotient / 10)] + ' ';
                    quotient %= 10;
                }

                if (quotient > 0) {
                    text += unitsMap[quotient];
                }

                text += largeNumberSuffixes[i] + ' ';
                num %= divisor;
            }
        }

        return text.trim();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value)) {
            setNumber(value);
            setText(convertToText(value));
        } else {
            setText('');
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    return (
        <div className="py-2">
            <Head>
                <title>Convert numbers to text (punjabi) | freetoolsarebest </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className='p-4 lg:px-[5.5rem] md:px-10 flex flex-col items-center justify-center'>
                <h1 className="text-3xl font-bold text-center mt-5 mb-5">Convert numbers to text (punjabi)</h1>

                <input
                    type="number"
                    placeholder="Enter a number"
                    className="border border-gray-300 p-2 rounded-md mb-4"
                    onChange={handleChange}
                />
                <div className="text-lg font-semibold">{text}</div>

                {text && (
                    <button
                        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={handleCopy}
                    >
                        {copied ? 'Copied!' : 'Copy'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default NumberConverter;
