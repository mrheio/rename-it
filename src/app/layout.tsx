import { Inter } from 'next/font/google';
import { Navbar } from './_Navbar';
import './globals.css';
import _Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'rename-it',
    description: 'Renameit - Make it your own',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html className="dark">
            <body className="dark:bg-surface dark:text-neutral-200">
                <_Providers>
                    <Navbar />
                    {children}
                </_Providers>
            </body>
        </html>
    );
};

export default RootLayout;
