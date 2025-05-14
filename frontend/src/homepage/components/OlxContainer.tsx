const OlxContainer = () => {
    return (
        <div className="relative w-full h-auto bg-white rounded-lg p-6 flex flex-col md:flex-row items-start justify-between">
            {/* Left Section (Text + Button shifted right) */}
            <div className="text-left ml-0 md:ml-16">
                <h1 className="text-4xl font-bold text-black">
                    Finde <span className="lg:text-6xl text-5xl text-red-700">dein</span> neues
                </h1>
                <h1 className="text-4xl font-bold text-black">Auto.</h1>

                <a
                    href="https://olx.ba/profil/MACAR/aktivni"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <button className="mt-10 bg-red-700 text-white px-6 py-2 rounded hover:bg-red-800 transition">
                        Finden
                    </button>
                </a>
            </div>

            {/* Right Section with larger image */}
            <img
                src="/MercedesCar.png"
                alt="Auto"
                className="w-full md:w-[1000px] h-auto mt-6 md:mt-12 object-contain transform md:scale-x-[-1]"
            />
        </div>
    );
};

export default OlxContainer;
