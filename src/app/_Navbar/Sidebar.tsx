'use client';

import { Gear, Person } from '@/assets/icons';
import { useLogout } from '@/hooks';
import { ROUTES } from '@/router';
import { Dialog, Transition } from '@headlessui/react';
import 'keen-slider/keen-slider.min.css';
import { useRouter } from 'next/navigation';
import { Fragment, useEffect } from 'react';

const Sidebar = ({ isOpen, closeModal }) => {
    const router = useRouter();
    const { mutate: logout, isSuccess: isLogoutSuccess } = useLogout();

    const handleLogout = () => {
        logout();
    };

    useEffect(() => {
        if (isLogoutSuccess) {
            window.location.reload();
        }
    }, [isLogoutSuccess]);

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-20" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/40 duration-300" />
                </Transition.Child>

                <div className="fixed bottom-0 right-0 top-0 w-[320px] max-w-xs">
                    <Transition.Child
                        as={Fragment}
                        enterFrom="translate-x-full"
                        enterTo="translate-x-0"
                        leaveFrom="translate-x-0"
                        leaveTo="translate-x-full"
                    >
                        <Dialog.Panel className="flex h-full w-full transform items-end overflow-y-auto bg-surface-950 pt-navbar transition-all duration-300 ease-in-out">
                            <ul className="mt-2 w-full">
                                <li>
                                    <button
                                        onClick={() =>
                                            router.push(
                                                ROUTES.PROTECTED.PROFILE
                                            )
                                        }
                                        type="button"
                                        className="flex w-full gap-2 p-4 hover:bg-surface-900 hover:text-primary"
                                    >
                                        <Person /> Profile
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        type="button"
                                        className="flex w-full items-center gap-2 p-4 hover:bg-surface-900 hover:text-primary"
                                    >
                                        <Gear /> Sign out
                                    </button>
                                </li>
                            </ul>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
};

export default Sidebar;
