'use client';

import { CaretLeft, CaretRight } from '@/assets/icons';
import { AppLink, Loading } from '@/components';
import { useCommunities, useSlider } from '@/hooks';
import 'keen-slider/keen-slider.min.css';

const BottomNavbar = () => {
    const { data, isLoading: areCommunitiesLoading } = useCommunities();
    const { sliderRef, instanceRef, isSliderLoaded } = useSlider();

    const shouldShowCarets = isSliderLoaded && instanceRef.current;

    return (
        <div className="flex h-subnavbar items-center justify-center gap-2">
            <Loading loading={areCommunitiesLoading} hide>
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
            </Loading>
        </div>
    );
};

export default BottomNavbar;
