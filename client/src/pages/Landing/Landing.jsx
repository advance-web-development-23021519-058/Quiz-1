import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import {
    FileType2,
    Image,
    Code,
    BookOpen,
    Sun,
    Moon,
    ArrowRight,
    Zap,
    Shield,
    RefreshCcw,
} from 'lucide-react';

const coreServices = [
    {
        title: 'OCR PDF to Text',
        description: 'Extract text from scanned PDF documents and images with high accuracy.',
        icon: BookOpen,
        link: '/services',
    },
    {
        title: 'PDF to Word',
        description: 'Convert PDF files into editable Microsoft Word documents instantly.',
        icon: FileType2,
        link: '/services',
    },
    {
        title: 'Image to PDF',
        description: 'Combine multiple JPEG or PNG images into a single, clean PDF file.',
        icon: Image,
        link: '/services',
    },
    {
        title: 'HTML to PDF',
        description: 'Turn web page code or HTML snippets into a structured, printable PDF.',
        icon: Code,
        link: '/services',
    },
];

const features = [
    {
        title: 'Rapid Conversion',
        description: 'Leverage our optimized engine for the fastest document transformations available.',
        icon: Zap,
    },
    {
        title: 'Secure & Private',
        description: 'Your files are processed using end-to-end encryption and deleted immediately after use.',
        icon: Shield,
    },
    {
        title: 'Unlimited Revisions',
        description: 'Convert, edit, and re-convert documents as many times as you need with a single subscription.',
        icon: RefreshCcw,
    },
];

const Header = () => {
    const { theme, toggleTheme } = useTheme();
    const { isAuthenticated } = useAuth();

    return (
        <header className="fixed w-full z-50 p-4 transition-colors duration-300 bg-[#F9FAFB]/95 dark:bg-[#0F172A]/95 shadow-xl dark:shadow-[#0F172A]/50 backdrop-blur-sm">
            <div className="container mx-auto flex justify-between items-center max-w-7xl">
                <Link to="/" className="text-2xl font-extrabold text-[#1E293B] dark:text-[#F9FAFB]">
                    UniConvert
                </Link>

                <nav className="hidden md:flex space-x-8 text-[#1E293B] dark:text-[#F9FAFB] font-medium">
                    <Link to="/services" className="hover:text-[#06B6D4] transition duration-150">Services</Link>
                    <Link to="/about" className="hover:text-[#06B6D4] transition duration-150">About</Link>
                    <Link to="/contact" className="hover:text-[#06B6D4] transition duration-150">Contact</Link>
                </nav>

                <div className="flex items-center space-x-3">
                    {isAuthenticated ? (
                        <Link
                            to="/dashboard"
                            className="px-5 py-2 bg-[#06B6D4] text-[#1E293B] rounded-lg font-semibold hover:bg-[#06B6D4]/90 transition duration-300 shadow-md shadow-[#06B6D4]/40  text-white dark:text-[#1E293B]"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <Link
                            to="/login"
                            className="px-5 py-2 text-[#1E293B] dark:text-[#F9FAFB] bg-[#64748B]/10 dark:bg-[#06B6D4]/20 rounded-lg font-semibold hover:bg-[#06B6D4]/30 dark:hover:bg-[#06B6D4]/30 transition duration-300"
                        >
                            Login
                        </Link>
                    )}

                    <button
                        onClick={toggleTheme}
                        className="p-3 rounded-full text-[#1E293B] dark:text-[#F9FAFB] hover:bg-[#06B6D4]/20 transition duration-150"
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>
            </div>
        </header>
    );
};

const HeroSection = () => {
    return (
        <section className="pt-32 pb-16 md:pt-48 md:pb-24 bg-[#F9FAFB] dark:bg-[#0F172A] transition-colors duration-300">
            <div className="container mx-auto px-4 text-center max-w-5xl">
                <h1 className="text-5xl sm:text-7xl font-extrabold leading-tight text-[#1E293B] dark:text-[#F9FAFB] mb-6">
                    Effortlessly <span className="text-[#06B6D4]">Transform</span> Your Documents
                </h1>

                <p className="text-xl sm:text-2xl text-[#64748B] dark:text-[#64748B] mb-12 max-w-3xl mx-auto font-light">
                    UniConvert provides seamless, accurate, and rapid conversion for all your needs: PDF, Word, Image, and HTML.
                </p>

                <Link
                    to="/services"
                    className="inline-flex items-center justify-center px-12 py-4 text-xl font-bold text-white dark:text-[#1E293B] bg-[#06B6D4] rounded-full shadow-2xl shadow-[#06B6D4]/50 hover:bg-[#06B6D4]/90 transition-all duration-300 transform hover:scale-[1.05] tracking-wide"
                >
                    Start Converting Now
                    <ArrowRight className="ml-3 w-5 h-5" />
                </Link>
            </div>
        </section>
    );
};

const ServicesShowcase = () => {
    return (
        <section className="py-16 md:py-24 bg-[#F9FAFB] dark:bg-[#0F172A] transition-colors duration-300">
            <div className="container mx-auto px-4 max-w-7xl">
                <h2 className="text-4xl font-bold text-center text-[#1E293B] dark:text-[#F9FAFB] mb-4">
                    Our <span className="text-[#06B6D4]">Powerful</span> Tools
                </h2>
                <p className="text-lg text-center text-[#64748B] dark:text-[#64748B] mb-16">
                    A comprehensive suite for all your document processing requirements.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {coreServices.map((service, index) => (
                        <Link
                            key={index}
                            to={service.link}
                            className="group block bg-white dark:bg-[#1E293B] p-6 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] border-b-4 border-[#06B6D4]/70 dark:border-[#06B6D4] hover:border-b-[#06B6D4]/50"
                        >
                            <div className="flex items-center space-x-4 mb-4">
                                <service.icon className="text-[#06B6D4] transition-colors duration-300 group-hover:text-[#1E293B] dark:group-hover:text-white" size={40} strokeWidth={2} />
                                <h3 className="text-xl font-bold text-[#1E293B] dark:text-[#F9FAFB]">
                                    {service.title}
                                </h3>
                            </div>
                            <p className="text-[#64748B] dark:text-[#64748B] text-base">
                                {service.description}
                            </p>
                            <p className="mt-6 text-base font-semibold text-[#06B6D4] flex items-center">
                                Try it now <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

const FeaturesSection = () => {
    return (
        <section className="py-16 md:py-24 bg-[#1E293B] dark:bg-[#1E293B] transition-colors duration-300">
            <div className="container mx-auto px-4 max-w-7xl">
                <h2 className="text-4xl font-bold text-center text-[#F9FAFB] mb-4">
                    Why Choose <span className="text-[#06B6D4]">UniConvert</span>?
                </h2>
                <p className="text-lg text-center text-[#64748B] mb-16">
                    We combine speed, security, and simplicity for the best experience.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {features.map((feature, index) => (
                        <div key={index} className="text-center p-8 bg-white/10 dark:bg-[#64748B]/30 rounded-3xl shadow-2xl">
                            <feature.icon className="text-[#06B6D4] mx-auto mb-4" size={48} strokeWidth={2} />
                            <h3 className="text-2xl font-bold text-[#F9FAFB] mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-[#64748B] text-base">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

const CallToActionBottom = () => {
    return (
        <section className="py-20 md:py-32 bg-[#F9FAFB] dark:bg-[#0F172A] transition-colors duration-300">
            <div className="container mx-auto px-4 max-w-4xl text-center">
                <h2 className="text-4xl sm:text-5xl font-extrabold text-[#1E293B] dark:text-[#F9FAFB] mb-6">
                    Ready to Streamline Your Workflow?
                </h2>
                <p className="text-xl text-[#64748B] dark:text-[#64748B] mb-10">
                    Join thousands of professionals who trust UniConvert for their document conversion needs.
                </p>
                <Link
                    to="/register"
                    className="inline-flex items-center justify-center px-10 py-3 text-lg font-bold text-white dark:text-[#1E293B] bg-[#06B6D4] rounded-full shadow-lg shadow-[#06B6D4]/40 hover:bg-[#06B6D4]/90 transition-all duration-300 transform hover:scale-[1.05]"
                >
                    Get Started for Free
                    <ArrowRight className="ml-3 w-5 h-5" />
                </Link>
            </div>
        </section>
    );
}

const Landing = () => {
    const { theme } = useTheme();
    const bgColorClass = theme === 'dark' ? 'bg-[#0F172A]' : 'bg-[#F9FAFB]';

    return (
        <div className={`min-h-screen font-inter ${bgColorClass} transition-colors duration-300`}>
            <Header />
            <main>
                <HeroSection />
                <ServicesShowcase />
                <FeaturesSection />
                <CallToActionBottom />
            </main>

            <footer className="py-16 px-4 border-t border-[#64748B]/20 dark:border-[#06B6D4]/30 bg-[#F9FAFB] dark:bg-[#0F172A] transition-colors duration-300">
                <div className="container mx-auto max-w-7xl">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">

                        <div className="col-span-2 lg:col-span-2">
                            <Link to="/" className="text-3xl font-extrabold text-[#1E293B] dark:text-[#F9FAFB] mb-4 block">
                                UniConvert
                            </Link>
                            <p className="text-sm text-[#64748B] dark:text-[#64748B] max-w-sm">
                                Your trusted partner for effortless and secure document transformation. Convert anything, anywhere.
                            </p>
                            <p className="text-xs mt-6 text-[#64748B]/70 dark:text-[#64748B]/70">
                                &copy; {new Date().getFullYear()} UniConvert. All rights reserved.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-lg font-bold text-[#1E293B] dark:text-[#F9FAFB] mb-4">Quick Links</h4>
                            <ul className="space-y-3 text-sm">
                                <li>
                                    <Link to="/" className="text-[#64748B] dark:text-[#64748B] hover:text-[#06B6D4] dark:hover:text-[#F9FAFB] transition duration-150">Home</Link>
                                </li>
                                <li>
                                    <Link to="/services" className="text-[#64748B] dark:text-[#64748B] hover:text-[#06B6D4] dark:hover:text-[#F9FAFB] transition duration-150">Services</Link>
                                </li>
                                <li>
                                    <Link to="/dashboard" className="text-[#64748B] dark:text-[#64748B] hover:text-[#06B6D4] dark:hover:text-[#F9FAFB] transition duration-150">Dashboard</Link>
                                </li>
                                <li>
                                    <Link to="/about" className="text-[#64748B] dark:text-[#64748B] hover:text-[#06B6D4] dark:hover:text-[#F9FAFB] transition duration-150">About Us</Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-lg font-bold text-[#1E293B] dark:text-[#F9FAFB] mb-4">Tools</h4>
                            <ul className="space-y-3 text-sm">
                                {coreServices.slice(0, 3).map((service, index) => (
                                    <li key={index}>
                                        <Link to={service.link} className="text-[#64748B] dark:text-[#64748B] hover:text-[#06B6D4] dark:hover:text-[#F9FAFB] transition duration-150">{service.title}</Link>
                                    </li>
                                ))}
                                <li>
                                    <Link to="/services" className="text-[#06B6D4] dark:text-[#F9FAFB] hover:underline transition duration-150 font-medium">View All Tools</Link>
                                </li>
                            </ul>
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <h4 className="text-lg font-bold text-[#1E293B] dark:text-[#F9FAFB] mb-4">Legal</h4>
                            <ul className="space-y-3 text-sm">
                                <li>
                                    <Link to="/contact" className="text-[#64748B] dark:text-[#64748B] hover:text-[#06B6D4] dark:hover:text-[#F9FAFB] transition duration-150">Contact Us</Link>
                                </li>
                                <li>
                                    <a href="#" className="text-[#64748B] dark:text-[#64748B] hover:text-[#06B6D4] dark:hover:text-[#F9FAFB] transition duration-150">Privacy Policy</a>
                                </li>
                                <li>
                                    <a href="#" className="text-[#64748B] dark:text-[#64748B] hover:text-[#06B6D4] dark:hover:text-[#F9FAFB] transition duration-150">Terms of Service</a>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;