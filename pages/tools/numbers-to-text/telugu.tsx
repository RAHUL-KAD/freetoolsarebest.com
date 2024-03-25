import Head from 'next/head';
import React, { useState } from 'react';
import Header from '../../../components/Header';

const NumberConverter: React.FC = () => {
    const [number, setNumber] = useState<number>(0);
    const [text, setText] = useState<string>('');
    const [copied, setCopied] = useState(false);

    const convertToText = (num: number): string => {
        const unitsMap: { [key: number]: string } = {
            0: 'సున్నం',
            1: 'ఒకటి',
            2: 'రెండు',
            3: 'మూడు',
            4: 'నాలుగు',
            5: 'ఐదు',
            6: 'ఆరు',
            7: 'ఏడు',
            8: 'ఎనిమిది',
            9: 'తొమ్మిది',
        };

        const teensMap: { [key: number]: string } = {
            10: 'పది',
            11: 'పదకొండు',
            12: 'పన్నెండు',
            13: 'పదమూడు',
            14: 'పదనాలుగు',
            15: 'పదఐదు',
            16: 'పదారు',
            17: 'పదేడు',
            18: 'పదేనిమిది',
            19: 'పందొమ్మిది',
        };

        const tensMap: { [key: number]: string } = {
            2: 'ఇరవైపు',
            3: 'ముప్పైగా',
            4: 'నలభైగా',
            5: 'ఐదుగా',
            6: 'ఆరుగా',
            7: 'ఏడుగా',
            8: 'ఎనిమిదిగా',
            9: 'తొమ్మిదిగా',
        };

        const largeNumberSuffixes: { [key: number]: string } = {
            0: '',
            3: ' వేల',
            6: ' లక్ష',
            9: ' కోటీ',
            12: ' అరబ్బ',
            15: ' ఖరబ్బ',
            18: ' నీల',
        };

        if (num === 0) {
            return 'సున్నం';
        }

        let text = '';

        for (let i = 18; i >= 0; i -= 3) {
            const divisor = Math.pow(10, i);
            let quotient = Math.floor(num / divisor);

            if (quotient > 0) {
                if (quotient >= 100) {
                    text += unitsMap[Math.floor(quotient / 100)] + ' వందల ';
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
                <title>Convert numbers to text (Telugu) | freetoolsarebest </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className='p-4 lg:px-[5.5rem] md:px-10 flex flex-col items-center justify-center'>
                <h1 className="text-3xl font-bold text-center mt-5 mb-5">Convert numbers to text (Telugu)</h1>

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
