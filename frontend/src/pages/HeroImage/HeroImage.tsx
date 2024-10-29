import heroBackground from "../../assets/images/heroImageCar.png";

function HeroImage() {
    return (
        <div
            className="relative h-screen w-full bg-black flex items-center justify-center"
            style={{
                backgroundImage: `url(${heroBackground})`,
                backgroundPosition: "right center",
                backgroundSize: "200% auto",
                backgroundRepeat: "no-repeat"
            }}
        >
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative z-10 flex flex-col text-left text-white">
                <h1 className="text-5xl md:text-7xl font-bold mb-4 text-red-700">MACAR,</h1>
                <p className="text-xl md:text-2xl mb-6 ml-10 max-w-2xl">
                    Ihre Autowerkstatt für erstklassigen Service. Inspektion, Reperaturen oder individuelle Lösungen - wir kümmern uns um Ihr Fahrzeug als wäre es unser eigenes
                </p>
            </div>
        </div>
    );
}

export default HeroImage;