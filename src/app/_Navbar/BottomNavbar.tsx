'use client';

import { CaretLeft, CaretRight } from '@/assets/icons';
import { AppLink } from '@/components';
import { useSlider } from '@/hooks';
import 'keen-slider/keen-slider.min.css';

const BottomNavbar = () => {
    const data = { items: [] };
    const { sliderRef, instanceRef, isSliderLoaded } = useSlider();

    const shouldShowCarets = isSliderLoaded && instanceRef.current;

    return (
        <div className="flex h-subnavbar items-center justify-center gap-2">
            {shouldShowCarets && (
                <button
                    type="button"
                    className="hover:text-secondary"
                    onClick={(e) => instanceRef.current?.prev()}
                >
                    <CaretLeft weight="bold" />
                </button>
            )}

            <ul
                ref={sliderRef}
                className="keen-slider max-w-4xl items-center text-center"
            >
                {data?.items?.map((x, i) => (
                    <li key={i} className="keen-slider__slide min-w-fit">
                        <AppLink href="#" weight="semibold">
                            {x.name}
                        </AppLink>
                    </li>
                ))}
            </ul>

            {shouldShowCarets && (
                <button
                    type="button"
                    className="hover:text-secondary"
                    onClick={(e) => instanceRef.current?.next()}
                >
                    <CaretRight weight="bold" />
                </button>
            )}
        </div>
    );
};

export default BottomNavbar;
