import React, { ChangeEvent, useState } from 'react';

// https://chat.openai.com/share/9d39dc1d-cbe0-4f44-8bd2-2c946b918011

const Home: React.FC = () => {
    const [files, setFiles] = useState<FileList | null>(null);
    const [combinedContent, setCombinedContent] = useState<string>('');
    const [addNewLine, setAddNewLine] = useState<boolean>(false);

    const handleFilesUploaded = (uploadedFiles: FileList) => {
        setFiles(uploadedFiles);
    };

    const handleCombineFiles = () => {
        if (!files) return;
        const promises: Promise<string>[] = [];

        // Read each file and push a promise to the array
        for (let i = 0; i < files.length; i++) {
            const promise = new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => {
                    if (reader.result) {
                        resolve(reader.result.toString());
                    } else {
                        reject(new Error("Failed to read file"));
                    }
                };
                reader.onerror = () => {
                    reject(new Error("Failed to read file"));
                };
                reader.readAsText(files[i]);
            });
            promises.push(promise);
        }

        // Resolve all promises and combine content when all files are read
        Promise.all(promises)
            .then((results) => {
                let combinedText = '';
                results.forEach((content, index) => {
                    combinedText += content;
                    if (addNewLine && index < files.length - 1) {
                        combinedText += '\n';
                    }
                });
                setCombinedContent(combinedText);
            })
            .catch((error) => {
                console.error("Error reading files:", error);
            });
    };



    const handleRemoveDuplicates = () => {
        if (!combinedContent) return;

        // Ensure that the combined content ends with a newline character
        let contentWithNewline = combinedContent;
        if (contentWithNewline.charAt(contentWithNewline.length - 1) !== '\n') {
            contentWithNewline += '\n';
        }

        const lines = contentWithNewline.split('\n');
        const uniqueLines = [...new Set(lines)];
        setCombinedContent(uniqueLines.join('\n'));
    };


    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Upload .txt files</h1>
            <div>
                <input
                    type="file"
                    multiple
                    accept=".txt"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleFilesUploaded(e.target.files as FileList)}
                    className="py-2 px-4 border border-gray-300 rounded-lg mb-4"
                />
            </div>
            {files && (
                <div>
                    <button onClick={handleCombineFiles} className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-2">
                        Combine Files
                    </button>
                    <label className="flex items-center space-x-2">
                        <input type="checkbox" checked={addNewLine} onChange={() => setAddNewLine(!addNewLine)} />
                        <span>Add new line after each file</span>
                    </label>
                    <button onClick={handleRemoveDuplicates} className="bg-blue-500 text-white py-2 px-4 rounded-lg">
                        Remove Duplicates
                    </button>
                    <textarea
                        value={combinedContent}
                        readOnly
                        className="mt-4 p-2 w-full border border-gray-300 rounded-lg"
                        rows={10}
                    />
                </div>
            )}
        </div>
    );
};

export default Home;
