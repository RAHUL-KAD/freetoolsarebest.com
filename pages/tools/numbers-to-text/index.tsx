
import Head from 'next/head';
import React from 'react';
import Header from '../../../components/Header';

const AbcIndexPage: React.FC = () => {

    // not working for - hindi, korean, japanese, chinese, marathi
    const languages = ['english', 'spanish', 'french', 'german', 'italian', 'russian', 'sanskrit'
        , 'dutch', 'danish', 'flemish', 'czech', 'arabic', 'greek', 'indonesian', 'norwegian', 'polish', 'portuguese', 'turkish', 'swedish',
        'ukrainian', 'nepali', 'tamil', 'punjabi', 'Hariyani', 'Rajasthani', 'Telugu', 'Malayalam', 'Bengali', 'Gujarati', 'Bashkir', 'Basque', 'Belarusian', 'Bulgarian', 'Cantonese', 'Catalan',
        'Croatian',  'Esperanto', 'Estonian', 'Finnish', 'Galician', 'Hebrew', 'Hungarian', 'Interlingua', 'Latvian', 'Lithuanian', 'Malay', 'Mongolian', 'Persian', 'Romanian', 'Slovakian', 'Slovenian',
        'Uyghur', 'Vietnamese', 'Welsh']

    const capitalizeFirstLetter = (word: string) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    };
    return (
        <div className="py-2">
            <Head>
                <title>Convert numbers to text | freetoolsarebest </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className='p-4 lg:px-[5.5rem] md:px-10 flex flex-col items-center justify-center'>
                <h1 className="text-3xl font-bold text-center mt-5 mb-5">Convert numbers to text</h1>
                <p className='text-center'>You can convert from numbers to text in following languages. (total languages - {languages.length})</p>
                <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {languages.map((language, index) => (
                        <div key={index} className="relative p-4 flex flex-col overflow-hidden rounded-lg border border-gray-200 shadow-sm dark:border-gray-800">
                            <div className="flex-grow flex-col p-3 sm:py-0 sm:px-6">
                                <div className="text-color-secondary flex items-center gap-x-2">
                                    <div className="flex-grow items-center gap-x-1">
                                        <a
                                            href={`numbers-to-text/${language.toLocaleLowerCase()}`}
                                            className="line-clamp-2 sm:line-clamp-1 text-base font-semibold sm:text-xl hover:underline hover:text-blue-700">
                                            {capitalizeFirstLetter(language)}
                                        </a>
                                        {/* <a
                                            href={`numbers-to-text/${language}`}
                                            className="me-2 lg:ml-5 ml-2 md:ml-5 w-36 lg:mt-5 sm:mt-2 md:mt-2 mt-1 mb-2 rounded-lg border border-blue-700 px-2 py-1 text-center text-sm font-medium text-blue-700 hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
                                        >
                                            Convert
                                        </a> */}
                                    </div>

                                </div>
                            </div>
                        </div>

                    ))}
                </div>
            </div>
        </div >
    );
};

export default AbcIndexPage;
