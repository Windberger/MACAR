import heroBackground from "../../assets/images/heroImageCar.jpg"

HeroImage.propTypes = {

};

function HeroImage() {
    return (
        <div className="relative h-screen bg-cover bg-center"
             style={{backgroundImage: `url(${heroBackground})`}}>

            <div className="relative z-10 flex flex-col justify-center items-center text-center text-white h-full">
                <h1 className="text-5xl md:text-7xl font-bold mb-4">Welcome to Our World</h1>
                <p className="text-xl md:text-2xl mb-6">Where innovation meets creativity</p>

                <div className="flex space-x-4">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg">
                        Get Started
                    </button>
                    <button className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-6 rounded-lg">
                        Learn More
                    </button>
                </div>
            </div>
        </div>
    );
}

export default HeroImage;