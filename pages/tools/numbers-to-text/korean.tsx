import Head from 'next/head';
import React, { useState } from 'react';
import Header from '../../../components/Header';

const NumberConverter: React.FC = () => {
    const [number, setNumber] = useState<number>(0);
    const [text, setText] = useState<string>('');
    const [copied, setCopied] = useState(false);

    const convertToText = (num: number): string => {
        const unitsMap: { [key: number]: string } = {
            0: '영',
            1: '일',
            2: '이',
            3: '삼',
            4: '사',
            5: '오',
            6: '육',
            7: '칠',
            8: '팔',
            9: '구',
        };

        const teensMap: { [key: number]: string } = {
            10: '십',
            11: '십일',
            12: '십이',
            13: '십삼',
            14: '십사',
            15: '십오',
            16: '십육',
            17: '십칠',
            18: '십팔',
            19: '십구',
        };

        const tensMap: { [key: number]: string } = {
            2: '이십',
            3: '삼십',
            4: '사십',
            5: '오십',
            6: '육십',
            7: '칠십',
            8: '팔십',
            9: '구십',
        };

        const largeNumberSuffixes: { [key: number]: string } = {
            0: '',
            4: '만',
            8: '억',
            12: '조',
            16: '경',
            20: '해',
            24: '자',
            28: '양',
            32: '구',
            36: '간',
            40: '정',
            44: '재',
        };

        if (num === 0) {
            return '영';
        }

        let text = '';

        for (let i = 44; i >= 0; i -= 4) {
            const divisor = Math.pow(10, i);
            let quotient = Math.floor(num / divisor);

            if (quotient > 0) {
                if (quotient >= 10) {
                    text += tensMap[Math.floor(quotient / 10)];
                    quotient %= 10;
                }

                if (quotient > 0) {
                    text += unitsMap[quotient];
                }

                text += largeNumberSuffixes[i];
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
                <title>Convert numbers to text (Korean) | freetoolsarebest </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className='p-4 lg:px-[5.5rem] md:px-10 flex flex-col items-center justify-center'>
                <h1 className="text-3xl font-bold text-center mt-5 mb-5">Convert numbers to text (Korean)</h1>

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
