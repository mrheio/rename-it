'use client';

import { useState } from 'react';
import BottomNavbar from './BottomNavbar';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';

const Navbar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const openModal = () => {
        setIsSidebarOpen(true);
    };

    const closeModal = () => {
        setIsSidebarOpen(false);
    };

    return (
        <nav className="fixed top-0 z-10 h-navbar w-full px-6 dark:bg-surface-950">
            <TopNavbar openModal={openModal} />
            <BottomNavbar />

            <Sidebar isOpen={isSidebarOpen} closeModal={closeModal} />
        </nav>
    );
};

export default Navbar;
