import Head from 'next/head';
import React, { useState } from 'react';
import Header from '../../../components/Header';

const NumberConverter: React.FC = () => {
    const [number, setNumber] = useState<number>(0);
    const [text, setText] = useState<string>('');
    const [copied, setCopied] = useState(false);

    const convertToText = (num: number): string => {
        const unitsMap: { [key: number]: string } = {
            0: 'nul',
            1: 'een',
            2: 'twee',
            3: 'drie',
            4: 'vier',
            5: 'vijf',
            6: 'zes',
            7: 'zeven',
            8: 'acht',
            9: 'negen',
        };
    
        const teensMap: { [key: number]: string } = {
            10: 'tien',
            11: 'elf',
            12: 'twaalf',
            13: 'dertien',
            14: 'veertien',
            15: 'vijftien',
            16: 'zestien',
            17: 'zeventien',
            18: 'achttien',
            19: 'negentien',
        };
    
        const tensMap: { [key: number]: string } = {
            2: 'twintig',
            3: 'dertig',
            4: 'veertig',
            5: 'vijftig',
            6: 'zestig',
            7: 'zeventig',
            8: 'tachtig',
            9: 'negentig',
        };
    
        const largeNumberSuffixes: { [key: number]: string } = {
            0: '',
            3: 'duizend',
            6: 'miljoen',
            9: 'miljard',
            12: 'biljoen',
            15: 'biljard',
            18: 'triljoen',
        };
    
        if (num === 0) {
            return 'nul';
        }
    
        let text = '';
    
        for (let i = 18; i >= 0; i -= 3) {
            const divisor = Math.pow(10, i);
            let quotient = Math.floor(num / divisor);
    
            if (quotient > 0) {
                if (quotient >= 100) {
                    text += unitsMap[Math.floor(quotient / 100)] + 'honderd ';
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
                <title>Convert numbers to text (Dutch) | freetoolsarebest </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className='p-4 lg:px-[5.5rem] md:px-10 flex flex-col items-center justify-center'>
                <h1 className="text-3xl font-bold text-center mt-5 mb-5">Convert numbers to text (Dutch)</h1>

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
