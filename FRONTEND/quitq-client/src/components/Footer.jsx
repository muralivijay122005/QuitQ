function Footer() {
    return (
        <footer className="border-t border-neutral-200 dark:border-neutral-900 mt-20 bg-neutral-50/50 dark:bg-neutral-950/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                <div className="text-sm text-neutral-550 dark:text-neutral-400">
                    &copy; {new Date().getFullYear()} <span className="font-semibold text-neutral-900 dark:text-white">Quit<span className="text-spotify">Q</span></span>. All rights reserved.
                </div>
                <div className="flex gap-6 text-sm text-neutral-500 dark:text-neutral-450">
                    <a href="#" className="hover:text-spotify ">Privacy Policy</a>
                    <a href="#" className="hover:text-spotify ">Terms of Service</a>
                    <a href="#" className="hover:text-spotify ">Contact Support</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;