'use client';

import { CaretLeft, CaretRight } from '@/assets/icons';
import { AppLink, Loading } from '@/components';
import { useGroups, useSlider } from '@/hooks';
import 'keen-slider/keen-slider.min.css';

const BottomNavbar = () => {
    const { data: groups, isLoading: areGroupsLoading } = useGroups();
    const { sliderRef, instanceRef, isSliderLoaded } = useSlider();

    const shouldShowCarets =
        !!groups?.length && isSliderLoaded && instanceRef.current;

    return (
        <Loading loading={areGroupsLoading} hide>
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
                    {groups?.map((x, i) => (
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
        </Loading>
    );
};

export default BottomNavbar;
