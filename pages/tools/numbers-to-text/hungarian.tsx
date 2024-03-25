import Head from 'next/head';
import React, { useState } from 'react';
import Header from '../../../components/Header';

const NumberConverter: React.FC = () => {
    const [number, setNumber] = useState<number>(0);
    const [text, setText] = useState<string>('');
    const [copied, setCopied] = useState(false);

    const convertToHungarianText = (num: number): string => {
        const unitsMap: { [key: number]: string } = {
            0: 'nulla',
            1: 'egy',
            2: 'kettő',
            3: 'három',
            4: 'négy',
            5: 'öt',
            6: 'hat',
            7: 'hét',
            8: 'nyolc',
            9: 'kilenc',
        };
    
        const teensMap: { [key: number]: string } = {
            10: 'tíz',
            11: 'tizenegy',
            12: 'tizenkettő',
            13: 'tizenhárom',
            14: 'tizennégy',
            15: 'tizenöt',
            16: 'tizenhat',
            17: 'tizenhét',
            18: 'tizennyolc',
            19: 'tizenkilenc',
        };
    
        const tensMap: { [key: number]: string } = {
            2: 'húsz',
            3: 'harminc',
            4: 'negyven',
            5: 'ötven',
            6: 'hatvan',
            7: 'hetven',
            8: 'nyolcvan',
            9: 'kilencven',
        };
    
        const largeNumberSuffixes: { [key: number]: string } = {
            0: '',
            3: 'ezer',
            6: 'millió',
            9: 'milliárd',
            12: 'billió',
            15: 'billiárd',
            18: 'trillió',
        };
    
        if (num === 0) {
            return 'nulla';
        }
    
        let text = '';
    
        for (let i = 18; i >= 0; i -= 3) {
            const divisor = Math.pow(10, i);
            let quotient = Math.floor(num / divisor);
    
            if (quotient > 0) {
                if (quotient >= 100) {
                    text += unitsMap[Math.floor(quotient / 100)] + 'száz ';
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
                    text += unitsMap[quotient] + ' ';
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
            setText(convertToHungarianText(value));
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
                <title>Convert numbers to text (Hungarian) | freetoolsarebest </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className='p-4 lg:px-[5.5rem] md:px-10 flex flex-col items-center justify-center'>
                <h1 className="text-3xl font-bold text-center mt-5 mb-5">Convert numbers to text (Hungarian)</h1>

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
