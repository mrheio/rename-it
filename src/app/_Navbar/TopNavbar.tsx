'use client';

import logo from '@/../public/logo.png';
import { MagnifyingGlass } from '@/assets/icons';
import { AppLink, Input, Title } from '@/components';
import { ROUTES } from '@/router';
import 'keen-slider/keen-slider.min.css';
import Image from 'next/image';
import Link from 'next/link';

const TopNavbar = ({ openModal }) => {
    return (
        <div className="flex h-topnavbar items-center justify-between gap-8 py-4">
            <Link
                href={ROUTES.HOME}
                className="flex basis-1/5 items-center gap-2"
            >
                <Image src={logo} alt="openddit" style={{ width: '28px' }} />
                <Title
                    as="span"
                    size="s"
                    weight="semibold"
                    className="hidden md:block"
                >
                    openddit
                </Title>
            </Link>

            <div className="max-w-4xl flex-1">
                <Input
                    filled
                    fluid
                    decoration={{ end: <MagnifyingGlass /> }}
                    placeholder="Search..."
                    type="search"
                />
            </div>

            <div className="basic-1/5 flex justify-end">
                <AppLink weight="bold" href={ROUTES.LOGIN}>
                    Get Started
                </AppLink>
            </div>
            {/* <div className="flex basis-1/5 justify-end gap-4">
                <button type="button" className="text-xl hover:text-secondary">
                    <BellSimple weight="fill" />
                </button>
                <Avatar onClick={openModal}>A</Avatar>
            </div> */}
        </div>
    );
};

export default TopNavbar;
