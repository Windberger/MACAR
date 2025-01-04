import { useState } from "react";
import { MdOutlineArrowForwardIos, MdOutlineArrowBackIos } from "react-icons/md";
import heroBackground from "../../assets/images/heroImageCar.png";
import PropTypes from "prop-types";

Carousel.propTypes = {
    heading: PropTypes.string.isRequired,
};

function Carousel(heading) {
    const [activeIndex, setActiveIndex] = useState(0);

    const images = [heroBackground, heroBackground, heroBackground, heroBackground, heroBackground];

    const nextSlide = () => {
        setActiveIndex((activeIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setActiveIndex((activeIndex - 1 + images.length) % images.length);
    };

    return (
        <>
            <h1 className={"font font-bold mt-5 mb-5 text-center"}>{heading.heading}</h1>

            <div id="carousel" className="relative w-full overflow-hidden">
                {/* Slides Container */}
                <div className="relative flex items-center h-56 md:h-96">
                    {images.map((image, index) => {
                        const isAdjacent =
                            index === activeIndex ||
                            index === (activeIndex + 1) % images.length ||
                            index === (activeIndex - 1 + images.length) % images.length;

                        return (
                            <img
                                key={index}
                                src={image}
                                className={`absolute transition-transform duration-700 ease-in-out object-cover flex-shrink-0 ${
                                    isAdjacent ? "opacity-100" : "opacity-50"
                                }`}
                                alt={`Slide ${index + 1}`}
                                style={{
                                    transform: `translateX(${(index - activeIndex) * 105}%)`,
                                    width: "70%",
                                    left: isAdjacent ? "15%" : undefined,
                                }}
                            />
                        );
                    })}
                </div>

                {/* Progress Bar */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-1 bg-gray-300">
                    <div
                        className="h-full bg-blue-500 transition-all duration-700"
                        style={{ width: `${((activeIndex + 1) / images.length) * 100}%` }}
                    ></div>
                </div>

                {/* Navigation Buttons */}
                <button
                    onClick={prevSlide}
                    className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white rounded-full shadow-md w-10 h-10 flex items-center justify-center focus:outline-none"
                >
                    <MdOutlineArrowBackIos className="w-6 h-6 text-gray-800" />
                </button>

                <button
                    onClick={nextSlide}
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white rounded-full shadow-md w-10 h-10 flex items-center justify-center focus:outline-none"
                >
                    <MdOutlineArrowForwardIos className="w-6 h-6 text-gray-800" />
                </button>
            </div>
        </>
    );
}

export default Carousel;