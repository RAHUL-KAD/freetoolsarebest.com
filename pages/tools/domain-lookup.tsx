import Head from "next/head";
import Header from "../../components/Header";
import { useState } from "react";
import LoadingDots from "../../components/LoadingDots";
// https://chat.openai.com/share/3441bbb4-2a81-494d-8c95-8fb02d64eeb0

interface ShortUrlResponse {
    domainName: string;
    registryDomainId: string;
    registrarWhoisServer: string;
    registrarUrl: string;
    updatedDate: string;
    creationDate: string;
    registrarRegistrationExpirationDate: string;
    registrar: string;
    registrarIanaId: string;
    registrarAbuseContactEmail: string;
    registrarAbuseContactPhone: string;
    domainStatus: string;
    registrantOrganization: string;
    registrantStateProvince: string;
    registrantCountry: string;
    registrantEmail: string;
    adminOrganization: string;
    adminStateProvince: string;
    adminCountry: string;
    adminEmail: string;
    techOrganization: string;
    techStateProvince: string;
    techCountry: string;
    techEmail: string;
    nameServer: string;
    dnssec: string;
    urlOfTheIcannWhoisDataProblemReportingSystem: string;
    lastUpdateOfWhoisDatabase: string;
}

export default function DomainLookUp() {

    const [url, setUrl] = useState<string>("");
    const [showResponse, setShowResponse] = useState(false)
    const [loadingResponse, setLoadingResponse] = useState(false)
    const [domainresponse, setDomainResponse] = useState<ShortUrlResponse>({
        domainName: '', registryDomainId: ' ', registrarWhoisServer: ' ', registrarUrl: ' ', updatedDate: ' ',
        creationDate: ' ', registrarRegistrationExpirationDate: ' ', registrar: ' ', registrarIanaId: ' ',
        registrarAbuseContactEmail: ' ', registrarAbuseContactPhone: ' ', domainStatus: '', registrantOrganization: ' ',
        registrantStateProvince: ' ', registrantCountry: ' ', registrantEmail: ' ', adminOrganization: ' ', adminStateProvince: ' ',
        adminCountry: ' ', adminEmail: ' ', techOrganization: ' ', techStateProvince: ' ', techCountry: ' ', techEmail: ' ',
        nameServer: ' ', dnssec: ' ', urlOfTheIcannWhoisDataProblemReportingSystem: ' ', lastUpdateOfWhoisDatabase: ' '
    });

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        if (url) {
            try {
                setLoadingResponse(true);

                const apiUrl = `${process.env.NEXT_PUBLIC_EMAIL_VALIDATION_URL}/whois?domain=${encodeURIComponent(url)}`;
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                };

                const res = await fetch(apiUrl, requestOptions);
                const data = await res.json();
                console.log(data)
                setDomainResponse(data);
                setLoadingResponse(false);
                setShowResponse(true);
            } catch (error) {
                console.error('Error fetching data:', error);

            }
        }
    };

    function formatdate(originalDate: string) {
        const date = new Date(originalDate);
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    }


    const splitStringBySpace = (inputString: string) => {
        return inputString.split(' ');
    };

    return (

        <div className="w-[100%] flex flex-col items-center justify-center py-2">
            <Head>
                <title>WHOIS Domain Lookup | freetoolsarebest </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <svg
                className="absolute inset-0 -z-10 h-full w-full stroke-green-100 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
                aria-hidden="true"
            >
                <defs>
                    <pattern
                        id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
                        width="200"
                        height="200"
                        x="50%"
                        y="-1"
                        patternUnits="userSpaceOnUse"
                    >
                        <path d="M.5 200V.5H200" fill="none" />
                    </pattern>
                </defs>
                <rect
                    width="100%"
                    height="100%"
                    strokeWidth="0"
                    fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)"
                />
            </svg>

            <Header />

            <main className="flex justify-center items-center px-4 mb-20">
                <div className="mt-10 sm:mt-10">
                    {/* <Badge text={"Try our GenAI solution for Contact Center"} /> */}

                    <h1 className="font-display mx-auto max-w-4xl text-center text-5xl font-bold tracking-normal text-slate-900 sm:text-5xl">
                        <span className="relative text-[#333] whitespace-wrap">
                            <span className="relative mr-2">
                                WHOIS Domain Lookup
                            </span>
                        </span>
                    </h1>

                    <h1 className="mt-5 font-display mx-auto max-w-3xl text-center text-lg tracking-normal text-[#333] sm:text-lg">
                        <span className="relative text-[#333] whitespace-wrap">
                            <span className="relative mr-2">
                                Free Whois search for Domain
                            </span>
                        </span>
                    </h1>

                    <div className="mt-10 flex items-center justify-center flex-col">
                        <form className="flex items-center max-w-[600px]" onSubmit={handleSubmit}>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="domain-lookup"
                                    className="bg-gray-50 lg:w-[28rem] md:w-[20rem] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Enter your domain name..."
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="inline-flex lg:ml-10 md:ml-5 sm:ml-5 ml-5 items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                {loadingResponse && (
                                    <div className="mr-2 flex">
                                        <LoadingDots color="#fff" />
                                    </div>
                                )}
                                Search
                            </button>
                        </form>
                    </div>

                    <div className="">
                        {showResponse && !loadingResponse && (
                            <>
                                {domainresponse.domainName && (
                                    <div className="mt-10 flex lg:justify-start flex-col lg:items-start md:items-center items-center">
                                        <div>
                                            <h1 className="whitespace-wrap mx-auto text-sm font-bold tracking-normal text-slate-900 sm:text-2xl">
                                                Domain Information
                                            </h1>
                                            <div className="flex">
                                                <p className="mt-2 flex-initial w-32">Domain name:</p>
                                                <a href={`https://${domainresponse.domainName}`} target="_blank" className="mt-2 underline text-blue-600">{domainresponse.domainName.toLocaleLowerCase()}</a>
                                            </div>
                                            <div className="flex">
                                                <p className="mt-2 flex-initial w-32">Registrar:</p>
                                                <p className="mt-2">{domainresponse.registrar}</p>
                                            </div>

                                            <div className="flex">
                                                <p className="mt-2 flex-initial w-32">Registered On:</p>
                                                <p className="mt-2">{formatdate(domainresponse.creationDate)}</p>
                                            </div>
                                            <div className="flex">
                                                <p className="mt-2 flex-initial w-32">Expires On:</p>
                                                <p className="mt-2">{formatdate(domainresponse.registrarRegistrationExpirationDate)}</p>
                                            </div>
                                            <div className="flex">
                                                <p className="mt-2 flex-initial w-32">Updated On:</p>
                                                <p className="mt-2">{formatdate(domainresponse.updatedDate)}</p>
                                            </div>
                                            <div className="flex">
                                                <p className="mt-2 flex-initial w-32">DomainID:</p>
                                                <p className="mt-2">{domainresponse.registryDomainId}</p>
                                            </div>

                                            <div className="mt-2">
                                                <p>Status:</p>
                                                <div className="ml-[7.9rem]">
                                                    <a href="https://icann.org/epp#clientTransferProhibited" target="_blank" className="underline text-blue-600">clientTransferProhibited</a>
                                                </div>
                                                <div className="ml-[7.9rem]">
                                                    <a href="https://icann.org/epp#clientUpdateProhibited" target="_blank" className="underline text-blue-600">clientUpdateProhibited</a>
                                                </div>
                                                <div className="ml-[7.9rem]">
                                                    <a href="https://icann.org/epp#clientRenewProhibited" target="_blank" className="underline text-blue-600">clientRenewProhibited</a>
                                                </div>
                                                <div className="ml-[7.9rem]">
                                                    <a href="https://icann.org/epp#clientDeleteProhibited" target="_blank" className="underline text-blue-600">clientDeleteProhibited</a>
                                                </div>
                                            </div>

                                            <div className="mt-2">
                                                <p>Name Servers: {splitStringBySpace(domainresponse.nameServer.toLocaleLowerCase()).map((nameserver, index) => (
                                                    <p className="ml-[7.9rem]" key={index} >{nameserver} </p>
                                                ))}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-10">
                                            <h1 className="whitespace-wrap mx-auto text-sm font-bold tracking-normal text-slate-900 sm:text-2xl">
                                                Registrant Contact
                                            </h1>
                                            <div className="flex">
                                                <p className="mt-2 flex-initial w-32">Organization:</p>
                                                <p className="mt-2">{domainresponse.registrantOrganization}</p>
                                            </div>
                                            <div className="flex">
                                                <p className="mt-2 flex-initial w-32">State:</p>
                                                <p className="mt-2">{domainresponse.registrantStateProvince}</p>
                                            </div>

                                            <div className="flex">
                                                <p className="mt-2 flex-initial w-32">Country:</p>
                                                <p className="mt-2">{domainresponse.registrantCountry}</p>
                                            </div>
                                            <div className="flex">
                                                <p className="mt-2 flex-initial w-16 lg:w-32 md:w-32 whitespace-wrap">Abuse Contact Email:</p>
                                                <p className="mt-2">{domainresponse.registrarAbuseContactEmail}</p>
                                            </div>
                                            <div className="flex">
                                                <p className="mt-2 flex-initial w-32">Abuse Contact Phone no:</p>
                                                <p className="mt-2">{domainresponse.registrarAbuseContactPhone}</p>
                                            </div>
                                            {/* <div className="flex">
                                        <p className="mt-2 flex-initial w-32">Email:</p>
                                        <p className="mt-2 max-w-[200px]">{domainresponse.registrantEmail}</p>
                                    </div> */}
                                        </div>

                                        <div className="mt-10">
                                            <h1 className="whitespace-wrap mx-auto text-sm font-bold tracking-normal text-slate-900 sm:text-2xl">
                                                Administrative Contact
                                            </h1>
                                            <div className="flex">
                                                <p className="mt-2 flex-initial w-32">Organization:</p>
                                                <p className="mt-2">{domainresponse.adminOrganization}</p>
                                            </div>
                                            <div className="flex">
                                                <p className="mt-2 flex-initial w-32">State:</p>
                                                <p className="mt-2">{domainresponse.adminStateProvince}</p>
                                            </div>

                                            <div className="flex">
                                                <p className="mt-2 flex-initial w-32">Country:</p>
                                                <p className="mt-2">{domainresponse.adminCountry}</p>
                                            </div>
                                            {/* <div className="flex">
                                        <p className="mt-2 flex-initial w-32">Email:</p>
                                        <p className="mt-2 max-w-[200px]">{domainresponse.adminEmail}</p>
                                    </div> */}
                                        </div>

                                        <div className="mt-10">
                                            <h1 className="whitespace-wrap mx-auto text-sm font-bold tracking-normal text-slate-900 sm:text-2xl">
                                                Technical Contact
                                            </h1>
                                            <div className="flex">
                                                <p className="mt-2 flex-initial w-32">Organization:</p>
                                                <p className="mt-2">{domainresponse.techOrganization}</p>
                                            </div>
                                            <div className="flex">
                                                <p className="mt-2 flex-initial w-32">State:</p>
                                                <p className="mt-2">{domainresponse.techStateProvince}</p>
                                            </div>

                                            <div className="flex">
                                                <p className="mt-2 flex-initial w-32">Country:</p>
                                                <p className="mt-2">{domainresponse.techCountry}</p>
                                            </div>
                                            {/* <div className="flex">
                                        <p className="mt-2 flex-initial w-32">Email:</p>
                                        <p className="mt-2 max-w-[200px]">{domainresponse.techEmail}</p>
                                    </div> */}
                                        </div>

                                    </div>
                                )}

                                <div className="flex flex-col justify-center items-center mt-10">
                                    {!domainresponse.domainName && (
                                        <div className="">
                                            <p className="">Sorry, No Info found</p>
                                        </div>
                                    )}
                                </div>
                            </>

                        )}
                    </div>

                </div>


            </main>

        </div>
    )

}

function useCallback(arg0: () => Promise<void>, arg1: string[]) {
    throw new Error("Function not implemented.");
}
