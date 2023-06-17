import { useKeenSlider } from 'keen-slider/react';
import { useState } from 'react';

const useSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [sliderRef, instanceRef] = useKeenSlider({
        loop: true,
        slides: {
            spacing: 12,
            perView: 'auto',
        },
        slideChanged: (slider) => {
            setCurrentSlide(slider.track.details.rel);
        },
        created: () => {
            setLoaded(true);
        },
    });

    return {
        currentSlide,
        setCurrentSlide,
        isSliderLoaded: loaded,
        sliderRef,
        instanceRef,
    };
};

export default useSlider;
