import Head from 'next/head';
import React, { useState } from 'react';
import Header from '../../../components/Header';

const NumberConverter: React.FC = () => {
    const [number, setNumber] = useState<number>(0);
    const [text, setText] = useState<string>('');
    const [copied, setCopied] = useState(false);

    const convertToWelshText = (num: number): string => {
        const unitsMap: { [key: number]: string } = {
            0: 'dim',
            1: 'un',
            2: 'dau',
            3: 'tri',
            4: 'pedwar',
            5: 'pump',
            6: 'chwech',
            7: 'saith',
            8: 'wyth',
            9: 'naw',
        };
    
        const teensMap: { [key: number]: string } = {
            10: 'deg',
            11: 'un ar ddeg',
            12: 'dau ar ddeg',
            13: 'tri ar ddeg',
            14: 'pedwar ar ddeg',
            15: 'pymtheg',
            16: 'un ar bymtheg',
            17: 'dau ar bymtheg',
            18: 'tri ar bymtheg',
            19: 'pedwar ar bymtheg',
        };
    
        const tensMap: { [key: number]: string } = {
            2: 'dau ddeg',
            3: 'deng mlynedd',
            4: 'pedwar ugain',
            5: 'hanner cant',
            6: 'chwe deg',
            7: 'dau chant',
            8: 'wyth deg',
            9: 'naw deg',
        };
    
        const largeNumberSuffixes: { [key: number]: string } = {
            0: '',
            3: ' mil',
            6: ' miliwn',
            9: ' biliwn',
            12: ' triliwn',
            15: ' triliwn',
            18: ' kwadriliwn',
        };
    
        if (num === 0) {
            return 'dim';
        }
    
        let text = '';
    
        for (let i = 18; i >= 0; i -= 3) {
            const divisor = Math.pow(10, i);
            let quotient = Math.floor(num / divisor);
    
            if (quotient > 0) {
                if (quotient >= 100) {
                    text += unitsMap[Math.floor(quotient / 100)] + ' cant ';
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
            setText(convertToWelshText(value));
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
                <title>Convert numbers to text (Welsh) | freetoolsarebest </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className='p-4 lg:px-[5.5rem] md:px-10 flex flex-col items-center justify-center'>
                <h1 className="text-3xl font-bold text-center mt-5 mb-5">Convert numbers to text (Welsh)</h1>

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
