import Head from 'next/head';
import React, { useState } from 'react';
import Header from '../../../components/Header';

const NumberConverter: React.FC = () => {
    const [number, setNumber] = useState<number>(0);
    const [text, setText] = useState<string>('');
    const [copied, setCopied] = useState(false);

    const convertToText = (num: number): string => {
        const unitsMap: { [key: number]: string } = {
            0: 'शुन्य',
            1: 'एक',
            2: 'दुई',
            3: 'तीन',
            4: 'चार',
            5: 'पाँच',
            6: 'छ',
            7: 'सात',
            8: 'आठ',
            9: 'नौ',
        };

        const teensMap: { [key: number]: string } = {
            10: 'दश',
            11: 'एघार',
            12: 'बाह्र',
            13: 'तेह्र',
            14: 'चौध',
            15: 'पन्ध्र',
            16: 'सोह्र',
            17: 'सत्र',
            18: 'अठार',
            19: 'उन्नाइस',
        };

        const tensMap: { [key: number]: string } = {
            2: 'बीस',
            3: 'तीस',
            4: 'चालीस',
            5: 'पचास',
            6: 'साठी',
            7: 'सत्ताइस',
            8: 'अठाइस',
            9: 'उनन्नती',
        };

        const largeNumberSuffixes: { [key: number]: string } = {
            0: '',
            3: ' हजार',
            6: ' लाख',
            9: ' करोड',
            12: ' अर्ब',
            15: ' खर्ब',
            18: ' नील',
        };

        if (num === 0) {
            return 'शुन्य';
        }

        let text = '';

        for (let i = 18; i >= 0; i -= 3) {
            const divisor = Math.pow(10, i);
            let quotient = Math.floor(num / divisor);

            if (quotient > 0) {
                if (quotient >= 100) {
                    text += unitsMap[Math.floor(quotient / 100)] + ' सय ';
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
                <title>Convert numbers to text (nepali) | freetoolsarebest </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className='p-4 lg:px-[5.5rem] md:px-10 flex flex-col items-center justify-center'>
                <h1 className="text-3xl font-bold text-center mt-5 mb-5">Convert numbers to text (nepali)</h1>

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
