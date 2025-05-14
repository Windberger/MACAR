import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import InformationCardLight from '../../components/InformationCardLight';
import carwash from '../../assets/images/carwash.jpg';
import carmechanic from '../../assets/images/carmechanic.jpg';

const cardData = [
    {
        titleKey: 'firstInformationCardTitle',
        descriptionKey: 'firstInformationCardContent',
        image: carwash,
    },
    {
        titleKey: 'secondInformationCardTitle',
        descriptionKey: 'secondInformationCardContent',
        image: carmechanic,
    },
];

function InformationCardsLayoutLight() {
    const { t } = useTranslation();

    const [progress1, setProgress1] = useState(0);
    const [progress2, setProgress2] = useState(0);

    const card1Ref = useRef<HTMLDivElement>(null);
    const card2Ref = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const triggerFactor = 0.5; // Start bei 50% Sichtbarkeit
        const slowDownFactor = 3;  // Langsameres Füllen

        if (card1Ref.current && card2Ref.current) {
            const card1Top = card1Ref.current.offsetTop;
            const card1Height = card1Ref.current.offsetHeight;
            const card2Top = card2Ref.current.offsetTop;

            const card1Trigger = card1Top + card1Height * triggerFactor;

            const card1Visible = scrollY + windowHeight >= card1Trigger;

            if (card1Visible) {
                const rawProgress1 = ((scrollY + windowHeight - card1Trigger) / (card1Height * (1 - triggerFactor))) * 100;
                const progress1Clamped = Math.min(100, rawProgress1 / slowDownFactor);
                setProgress1(progress1Clamped);

                // Starte zweite Karte, wenn erste Karte fast fertig ist
                if (progress1Clamped >= 100) {
                    const card2Trigger = card2Top; // Startet wenn Karte 2 überhaupt in Reichweite ist
                    if (scrollY + windowHeight >= card2Trigger) {
                        const rawProgress2 = ((scrollY + windowHeight - card2Trigger) / card1Height) * 90;
                        const progress2Clamped = Math.min(100, rawProgress2 / slowDownFactor);
                        setProgress2(progress2Clamped);
                    }
                } else {
                    setProgress2(0);
                }
            } else {
                setProgress1(0);
                setProgress2(0);
            }
        }
    };




    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="flex flex-col items-center h-auto bg-white space-y-10">
            {cardData.map((card, index) => {
                const isFirst = index === 0;
                const progress = isFirst ? progress1 : progress2;

                const textSide = isFirst ? 'left' : 'right';
                const lineSideClass = isFirst ? 'left-0' : 'right-0';
                const gradientDirection = isFirst ? 'to left' : 'to right';

                return (
                    <motion.div
                        key={index}
                        ref={index === 0 ? card1Ref : card2Ref}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: index * 0.2 }}
                        className={`relative flex flex-col sm:flex-row items-center bg-white z-10 shadow-2xl w-[90%] ${
                            isFirst ? '' : 'flex-row-reverse'
                        }`}

                        id={`${isFirst ? 'wash-detailing' : 'mechanic'}`}
                    >
                        {/* Vertikale Linie auf Textseite */}
                        <div
                            className={`absolute top-0 h-full w-1 bg-gray-300 ${lineSideClass}`}
                        >
                            <div
                                className="bg-red-600 w-full transition-all duration-300 ease-out"
                                style={{ height: `${progress}%` }}
                            />
                        </div>

                        {/* Bildseite (immer gegenüber Text) */}
                        <div
                            className={`relative w-full sm:w-1/2 h-96 hidden sm:block overflow-hidden ${
                                isFirst ? 'order-last' : 'order-first'
                            }`}
                            style={{
                                backgroundImage: `linear-gradient(${gradientDirection}, rgba(255,255,255,0.1) 2%, rgba(255,255,255,1) 100%), url(${card.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        ></div>

                        <InformationCardLight
                            left={textSide === 'left'}
                            title={t(card.titleKey)}
                            description={t(card.descriptionKey)}
                            className="text-lg px-6" // Added padding for space between text and line
                        />
                    </motion.div>
                );
            })}
            <div className="mb-12"></div>
        </div>
    );
}

export default InformationCardsLayoutLight;
