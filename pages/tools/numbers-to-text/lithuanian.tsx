import Head from 'next/head';
import React, { useState } from 'react';
import Header from '../../../components/Header';

const NumberConverter: React.FC = () => {
    const [number, setNumber] = useState<number>(0);
    const [text, setText] = useState<string>('');
    const [copied, setCopied] = useState(false);

    const convertToLithuanianText = (num: number): string => {
        const unitsMap: { [key: number]: string } = {
            0: 'nulis',
            1: 'vienas',
            2: 'du',
            3: 'trys',
            4: 'keturi',
            5: 'penki',
            6: 'šeši',
            7: 'septyni',
            8: 'aštuoni',
            9: 'devyni',
        };
    
        const teensMap: { [key: number]: string } = {
            10: 'dešimt',
            11: 'vienuolika',
            12: 'dvylika',
            13: 'trylika',
            14: 'keturiolika',
            15: 'penkiolika',
            16: 'šešiolika',
            17: 'septyniolika',
            18: 'aštuoniolika',
            19: 'devyniolika',
        };
    
        const tensMap: { [key: number]: string } = {
            2: 'dvidešimt',
            3: 'trisdešimt',
            4: 'keturiasdešimt',
            5: 'penkiasdešimt',
            6: 'šešiasdešimt',
            7: 'septyniasdešimt',
            8: 'aštuoniasdešimt',
            9: 'devyniasdešimt',
        };
    
        const largeNumberSuffixes: { [key: number]: string } = {
            0: '',
            3: ' tūkstančių',
            6: ' milijonų',
            9: ' milijardų',
            12: ' bilijonų',
            15: ' trilijonų',
            18: ' kvadrilijonų',
        };
    
        if (num === 0) {
            return 'nulis';
        }
    
        let text = '';
    
        for (let i = 18; i >= 0; i -= 3) {
            const divisor = Math.pow(10, i);
            let quotient = Math.floor(num / divisor);
    
            if (quotient > 0) {
                if (quotient >= 100) {
                    text += unitsMap[Math.floor(quotient / 100)] + ' šimtas ';
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
            setText(convertToLithuanianText(value));
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
                <title>Convert numbers to text (Lithuanian) | freetoolsarebest </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className='p-4 lg:px-[5.5rem] md:px-10 flex flex-col items-center justify-center'>
                <h1 className="text-3xl font-bold text-center mt-5 mb-5">Convert numbers to text (Lithuanian)</h1>

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
