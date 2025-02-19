import React, { useState, useRef } from "react";
import { MdOutlineArrowForwardIos, MdOutlineArrowBackIos } from "react-icons/md";
import carMechanic from "../../assets/images/carmechanic.jpg";
import buero from "../../assets/images/buero.jpg";
import objekt from "../../assets/images/objekat.jpg";
import oldcar from "../../assets/images/oldcar.jpg";

const images = [oldcar, buero, carMechanic, objekt, carMechanic];

const Carousel = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const touchStartX = useRef<number | null>(null);

    const nextSlide = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setActiveIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
        if (touchStartX.current === null) return;
        const deltaX = e.changedTouches[0].clientX - touchStartX.current;
        if (deltaX > 50) prevSlide();
        if (deltaX < -50) nextSlide();
        touchStartX.current = null;
    };

    return (
        <div
            className="relative w-full bg-gray-100 overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            id="carousel"
        >
            {/* Image Container */}
            <div className="relative flex items-center justify-center h-64 sm:h-72 md:h-96 lg:h-[400px]">
                {images.map((image, index) => {
                    const position =
                        (index - activeIndex + images.length) % images.length; // Calculate relative position
                    let translateX = 0;
                    let scale = 1;
                    let opacity = 1;

                    if (position === 0) {
                        // Active image
                        translateX = 0;
                        scale = 1;
                        opacity = 1;
                    } else if (position === 1) {
                        // Next image
                        translateX = 100;
                        scale = 0.8;
                        opacity = 0.7;
                    } else if (position === images.length - 1) {
                        // Previous image
                        translateX = -100;
                        scale = 0.8;
                        opacity = 0.7;
                    } else {
                        // Other images (hidden)
                        translateX = position > activeIndex ? 200 : -200;
                        scale = 0.5;
                        opacity = 0;
                    }

                    return (
                        <img
                            key={index}
                            src={image}
                            alt={`Slide ${index + 1}`}
                            className="absolute transition-transform duration-700 ease-in-out"
                            style={{
                                transform: `translateX(${translateX}%) scale(${scale})`,
                                opacity: opacity,
                                zIndex: position === 0 ? 10 : 0,
                                maxWidth: "70%",
                                maxHeight: "80%",
                            }}
                        />
                    );
                })}
            </div>

            {/* Progress Bar */}
            <div className="w-full mt-4">
                <div className="w-1/2 mx-auto h-1 bg-gray-300">
                    <div
                        className="h-full bg-red-700 transition-all duration-700"
                        style={{ width: `${((activeIndex + 1) / images.length) * 100}%` }}
                    ></div>
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="hidden sm:block">
                <button
                    onClick={prevSlide}
                    aria-label="Previous slide"
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 focus:outline-none bg-transparent border-none"
                >
                    <MdOutlineArrowBackIos className="text-red-700 text-3xl"/>
                </button>
                <button
                    onClick={nextSlide}
                    aria-label="Next slide"
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 focus:outline-none bg-transparent border-none"
                >
                    <MdOutlineArrowForwardIos className="text-red-700 text-3xl"/>
                </button>
            </div>
        </div>
    );
};

export default Carousel;
