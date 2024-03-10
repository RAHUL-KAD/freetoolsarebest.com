import React, { useState } from "react";
import { wordErrorRate } from "word-error-rate";
import Header from "../../components/Header";
import Head from "next/head";

const WER: React.FC = () => {
    const [referenceText, setReferenceText] = useState<string>("");
    const [transcribedText, setTranscribedText] = useState<string>("");
    const [convertToLowercase, setConvertToLowercase] = useState<boolean>(false);
    const [removePunctuation, setRemovePunctuation] = useState<boolean>(false);
    const [wer, setWER] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleCalculateWER = () => {
        if (!referenceText.trim() && !transcribedText.trim()) {
            setError("Both reference text and transcribed text are required.");
            return;
        } else if (!referenceText.trim()) {
            setError("Reference text is required.");
            return;
        } else if (!transcribedText.trim()) {
            setError("Transcribed text is required.");
            return;
        }

        let ref = referenceText;
        let trans = transcribedText;

        if (convertToLowercase) {
            ref = referenceText.toLowerCase();
            trans = transcribedText.toLowerCase();
        }

        if (removePunctuation) {
            ref = ref.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");
            trans = trans.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");
        }

        const calculatedWER = calculateWER(ref, trans);
        setWER(calculatedWER);
        setError(null);
    };

    const handleDownloadCSV = () => {
        if (!referenceText.trim() && !transcribedText.trim()) {
            setError("Both reference text and transcribed text are required to download CSV.");
            return;
        } else if (!referenceText.trim()) {
            setError("Reference text is required to download CSV.");
            return;
        } else if (!transcribedText.trim()) {
            setError("Transcribed text is required to download CSV.");
            return;
        }

        let ref = referenceText;
        let trans = transcribedText;

        if (convertToLowercase) {
            ref = referenceText.toLowerCase();
            trans = transcribedText.toLowerCase();
        }

        if (removePunctuation) {
            ref = ref.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");
            trans = trans.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");
        }

        const calculatedWER = calculateWER(ref, trans);
        setWER(calculatedWER);
        setError(null);

        // Write results to CSV
        writeResultsToCSV(ref, trans, calculatedWER);
    };

    const writeResultsToCSV = (ref: string, trans: string, wer: number) => {
        const csvContent = `Reference Text,Transcribed Text,Word Error Rate (%)\n"${ref}","${trans}",${wer.toFixed(
            2
        )}\n\n`;
        const differencesContent = generateDifferences(ref, trans);
        const blob = new Blob([csvContent + differencesContent], {
            type: "text/csv;charset=utf-8",
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "wer_results.csv");
        document.body.appendChild(link);
        link.click();
    };

    const generateDifferences = (ref: string, trans: string) => {
        const refWords = ref.split(/\s+/);
        const transWords = trans.split(/\s+/);

        let differencesContent = "Differences\n";
        for (let i = 0; i < refWords.length; i++) {
            if (refWords[i] !== transWords[i]) {
                differencesContent += `"${refWords[i]}","${transWords[i]}"\n`;
            }
        }

        return differencesContent;
    };

    const calculateWER = (ref: string, trans: string): number => {
        const werResult = wordErrorRate(ref, trans); // Using wordErrorRate function directly
        return werResult * 100; // Convert to percentage
    };

    return (
        <div className="py-2">
            <Head>
                <title>WER Calculator | freetoolsarebest </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4 text-center mt-5">Word Error Rate Calculator</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="mb-4">
                        <label htmlFor="referenceText" className="block mb-2">
                            Reference Text:
                        </label>
                        <textarea
                            id="referenceText"
                            className="border border-gray-300 rounded-md p-2 w-full h-[300px]"
                            value={referenceText}
                            onChange={(e) => setReferenceText(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="transcribedText" className="block mb-2">
                            Transcribed Text:
                        </label>
                        <textarea
                            id="transcribedText"
                            className="border border-gray-300 rounded-md p-2 w-full h-[300px]"
                            value={transcribedText}
                            onChange={(e) => setTranscribedText(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex flex-col items-center">
                    <div className="flex gap-5">
                        <div className="mb-4">
                            <input
                                type="checkbox"
                                id="convertToLowercase"
                                checked={convertToLowercase}
                                onChange={(e) => setConvertToLowercase(e.target.checked)}
                                className="mr-2"
                            />
                            <label htmlFor="convertToLowercase">To lowercase</label>
                        </div>
                        <div className="mb-4">
                            <input
                                type="checkbox"
                                id="removePunctuation"
                                checked={removePunctuation}
                                onChange={(e) => setRemovePunctuation(e.target.checked)}
                                className="mr-2"
                            />
                            <label htmlFor="removePunctuation">Remove punctuation</label>
                        </div>
                    </div>
                    <div>
                        <button
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                            onClick={handleCalculateWER}
                        >
                            Calculate WER
                        </button>
                        <button
                            className="bg-green-500 text-white py-2 px-4 rounded ml-2 hover:bg-green-600"
                            onClick={handleDownloadCSV}
                        >
                            Download CSV
                        </button>
                        {error && (
                            <div className="text-red-500 mt-2">
                                <p>{error}</p>
                            </div>
                        )}
                        {wer !== null && (
                            <div className="mt-4">
                                <p>
                                    Word Error Rate: <strong>{wer.toFixed(2)}%</strong>
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WER;
