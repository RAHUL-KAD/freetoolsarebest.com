import Head from 'next/head';
import React, { useState } from 'react';
import Header from '../../../components/Header';

const NumberConverter: React.FC = () => {
    const [number, setNumber] = useState<number>(0);
    const [text, setText] = useState<string>('');
    const [copied, setCopied] = useState(false);

    const convertToText = (num: number): string => {
        const unitsMap: { [key: number]: string } = {
            0: 'noll',
            1: 'ett',
            2: 'två',
            3: 'tre',
            4: 'fyra',
            5: 'fem',
            6: 'sex',
            7: 'sju',
            8: 'åtta',
            9: 'nio',
        };

        const teensMap: { [key: number]: string } = {
            10: 'tio',
            11: 'elva',
            12: 'tolv',
            13: 'tretton',
            14: 'fjorton',
            15: 'femton',
            16: 'sexton',
            17: 'sjutton',
            18: 'arton',
            19: 'nitton',
        };

        const tensMap: { [key: number]: string } = {
            2: 'tjugo',
            3: 'trettio',
            4: 'fyrtio',
            5: 'femtio',
            6: 'sextio',
            7: 'sjuttio',
            8: 'åttio',
            9: 'nittio',
        };

        const largeNumberSuffixes: { [key: number]: string } = {
            0: '',
            3: 'tusen',
            6: 'miljon',
            9: 'miljard',
            12: 'biljon',
            15: 'biljard',
            18: 'triljon',
        };

        if (num === 0) {
            return 'noll';
        }

        let text = '';

        for (let i = 18; i >= 0; i -= 3) {
            const divisor = Math.pow(10, i);
            let quotient = Math.floor(num / divisor);

            if (quotient > 0) {
                if (quotient >= 100) {
                    text += unitsMap[Math.floor(quotient / 100)] + 'hundra ';
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
                <title>Convert numbers to text (Swedish) | freetoolsarebest </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className='p-4 lg:px-[5.5rem] md:px-10 flex flex-col items-center justify-center'>
                <h1 className="text-3xl font-bold text-center mt-5 mb-5">Convert numbers to text (Swedish)</h1>

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
