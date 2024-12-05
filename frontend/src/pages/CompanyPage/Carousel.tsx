import {useState} from "react";
import heroBackground from "../../assets/images/heroImageCar.png";
import PropTypes from "prop-types";


Carousel.propTypes = {
    heading: PropTypes.string.isRequired
};


function Carousel(heading: { heading: string }) {
    const [activeIndex, setActiveIndex] = useState(0);

    const images = [heroBackground, heroBackground, heroBackground, heroBackground, heroBackground];

    return (

        <>
            <h1 className={"font font-bold mt-5 mb-5"}>{heading.heading}</h1>


            <div id="default-carousel" className="relative w-full" data-carousel="slide">
                <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className={`duration-700 ease-in-out ${index === activeIndex ? "block" : "hidden"}`}
                        >
                            <img
                                src={image}
                                className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                                alt={`Slide ${index + 1}`}
                            />
                        </div>
                    ))}
                </div>
                <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            className={`w-3 h-3 rounded-full ${index === activeIndex ? "bg-white" : " bg-opacity-40"}`}
                            aria-current={index === activeIndex}
                            aria-label={`Slide ${index + 1}`}
                            onClick={() => setActiveIndex(index)}
                        ></button>
                    ))}
                </div>
                <div
                    className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                    onClick={() => setActiveIndex((activeIndex - 1 + images.length) % images.length)}
                >
                <span
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-transparent group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
                    <svg className="w-4 h-4 text-white rtl:rotate-180" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M5 1 1 5l4 4"/>
                    </svg>
                    <span className="sr-only">Previous</span>
                </span>
                </div>
                <div
                    className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                    onClick={() => setActiveIndex((activeIndex + 1) % images.length)}
                >
                <span
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-transparent group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
                    <svg className="w-4 h-4 text-white rtl:rotate-180" aria-hidden="true"
                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="m1 9 4-4-4-4"/>
                    </svg>
                    <span className="sr-only">Next</span>
                </span>
                </div>
            </div>

        </>
    );
}

export default Carousel;