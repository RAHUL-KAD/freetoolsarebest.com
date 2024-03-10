import React, { useState } from "react";
import calculateWER from "../../utils/calculateWER"
import Header from "../../components/Header";
import Head from "next/head";

const App: React.FC = () => {
    const [referenceText, setReferenceText] = useState<string>("");
    const [transcribedText, setTranscribedText] = useState<string>("");
    const [convertToLowercase, setConvertToLowercase] = useState<boolean>(false);
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

    return (
        <div className="p-4">
            <Head>
                <title>XML Editor and Viewer | freetoolsarebest </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className="">
                <h1 className="text-2xl font-bold mb-4 text-center mt-5">Word Error Rate Calculator</h1>
                <div className="mb-4">
                    <label htmlFor="referenceText" className="block mb-2">
                        Reference Text:
                    </label>
                    <textarea
                        id="referenceText"
                        className="w-full p-2 border rounded"
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
                        className="w-full p-2 border rounded"
                        value={transcribedText}
                        onChange={(e) => setTranscribedText(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="checkbox"
                        id="convertToLowercase"
                        checked={convertToLowercase}
                        onChange={(e) => setConvertToLowercase(e.target.checked)}
                        className="mr-2"
                    />
                    <label htmlFor="convertToLowercase">Convert text to lowercase</label>
                </div>
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
    );
};

export default App;
