import Link from "next/link";


export default function CallToAction() {
  return (
    <section className="sm:mt-10 mb-20">
      <div className="px-4 mx-auto max-w-screen-xl text-center">
        {/* <h1 className="mb-4 text-xl font-extrabold tracking-tight leading-none text-[#333] md:text-4xl lg:text-4xl whitespace-wrap">More </h1> */}
        <p className="mb-2 text-lg font-semibold text-[#333] lg:text-xl sm:px-16 lg:px-48">More free tools are Coming Soon</p>
        <button
          data-tally-open="nP5pWb"
          data-tally-layout="modal"
          data-tally-emoji-text="👋"
          data-tally-width="700"
          data-tally-emoji-animation="wave"
          className="me-2 mt-5 mb-2 rounded-lg border border-blue-700 px-2 py-1 text-center text-sm font-medium text-blue-700 hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
        >
          Request new tool
        </button>

      </div>
    </section>



  );
}
