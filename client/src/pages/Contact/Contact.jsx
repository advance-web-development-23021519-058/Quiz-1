import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { Mail, MapPin, Phone, Send } from 'lucide-react';

const Header = ({ theme, toggleTheme }) => (
    <header className="fixed w-full z-50 p-4 transition-colors duration-300 bg-[#F9FAFB]/95 dark:bg-[#0F172A]/95 shadow-xl dark:shadow-[#0F172A]/50 backdrop-blur-sm">
        <div className="container mx-auto flex justify-between items-center max-w-7xl">
            <Link to="/" className="text-2xl font-extrabold text-[#1E293B] dark:text-[#F9FAFB]">
                UniConvert
            </Link>

            <button
                onClick={toggleTheme}
                className="p-3 rounded-full text-[#1E293B] dark:text-[#F9FAFB] hover:bg-[#06B6D4]/20 transition duration-150"
                aria-label="Toggle theme"
            >
                {theme === 'dark' ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                )}
            </button>
        </div>
    </header>
);

const Contact = () => {
    const { theme, toggleTheme } = useTheme();

    const bgColor = theme === 'dark' ? 'bg-[#0F172A]' : 'bg-[#F9FAFB]';
    const cardBgColor = theme === 'dark' ? 'bg-[#1E293B]' : 'bg-white';
    const headingColor = theme === 'dark' ? 'text-[#F9FAFB]' : 'text-[#1E293B]';
    const subTextColor = theme === 'dark' ? 'text-[#94A3B8]' : 'text-[#64748B]';

    return (
        <div className={`min-h-screen ${bgColor} transition-colors duration-300 font-inter`}>
            <Header theme={theme} toggleTheme={toggleTheme} />
            
            <main className="pt-28 pb-16 md:pt-40 md:pb-24">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="text-center mb-16">
                        <h1 className={`text-5xl font-extrabold ${headingColor} mb-4`}>
                            Get In <span className="text-[#06B6D4]">Touch</span>
                        </h1>
                        <p className={`text-xl ${subTextColor} max-w-2xl mx-auto`}>
                            We're here to help! Send us a message or find our contact information below.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        
                        <div className={`p-8 md:p-12 ${cardBgColor} rounded-2xl shadow-2xl shadow-gray-200/50 dark:shadow-black/20`}>
                            <h2 className={`text-3xl font-bold ${headingColor} mb-6`}>Send us a message</h2>
                            <form className="space-y-6">
                                <div>
                                    <label htmlFor="name" className={`block text-sm font-medium ${headingColor} mb-2`}>
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        className={`w-full px-4 py-3 border border-[#E2E8F0] dark:border-[#334155] rounded-xl focus:ring-2 focus:ring-[#06B6D4] focus:border-[#06B6D4] ${cardBgColor} ${headingColor} transition duration-150`}
                                        placeholder="Your name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className={`block text-sm font-medium ${headingColor} mb-2`}>
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className={`w-full px-4 py-3 border border-[#E2E8F0] dark:border-[#334155] rounded-xl focus:ring-2 focus:ring-[#06B6D4] focus:border-[#06B6D4] ${cardBgColor} ${headingColor} transition duration-150`}
                                        placeholder="you@example.com"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="subject" className={`block text-sm font-medium ${headingColor} mb-2`}>
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        className={`w-full px-4 py-3 border border-[#E2E8F0] dark:border-[#334155] rounded-xl focus:ring-2 focus:ring-[#06B6D4] focus:border-[#06B6D4] ${cardBgColor} ${headingColor} transition duration-150`}
                                        placeholder="How can we help?"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className={`block text-sm font-medium ${headingColor} mb-2`}>
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        rows="4"
                                        className={`w-full px-4 py-3 border border-[#E2E8F0] dark:border-[#334155] rounded-xl focus:ring-2 focus:ring-[#06B6D4] focus:border-[#06B6D4] ${cardBgColor} ${headingColor} transition duration-150`}
                                        placeholder="Your detailed message..."
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full inline-flex items-center justify-center px-6 py-3 text-lg font-semibold text-white bg-[#06B6D4] rounded-xl shadow-xl shadow-[#06B6D4]/40 hover:bg-[#06B6D4]/90 transition-all duration-300 transform hover:scale-[1.01] tracking-wide"
                                >
                                    <Send className="w-5 h-5 mr-3" />
                                    Submit Message
                                </button>
                            </form>
                        </div>
                        
                        <div className={`p-8 md:p-12 ${cardBgColor} rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-black/20 lg:mt-16`}>
                            <h2 className={`text-3xl font-bold ${headingColor} mb-6`}>Contact Details</h2>
                            <p className={`${subTextColor} mb-8`}>
                                Prefer to reach out directly? Use the information below to connect with our support team.
                            </p>

                            <div className="space-y-8">
                                <div className="flex items-start space-x-4">
                                    <Mail className="w-8 h-8 text-[#06B6D4] flex-shrink-0 mt-1" />
                                    <div>
                                        <p className={`font-semibold text-xl ${headingColor}`}>Email Support</p>
                                        <a href="mailto:awd.doctypechanger2@gmail.com" className={`text-lg hover:text-[#06B6D4] ${subTextColor} transition duration-150`}>
                                          awd.doctypechanger2@gmail.com
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <Phone className="w-8 h-8 text-[#06B6D4] flex-shrink-0 mt-1" />
                                    <div>
                                        <p className={`font-semibold text-xl ${headingColor}`}>Phone</p>
                                        <a href="tel:+18005551234" className={`text-lg hover:text-[#06B6D4] ${subTextColor} transition duration-150`}>
                                            +92 334 2100786
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <MapPin className="w-8 h-8 text-[#06B6D4] flex-shrink-0 mt-1" />
                                    <div>
                                        <p className={`font-semibold text-xl ${headingColor}`}>Our Office</p>
                                        <p className={`text-lg ${subTextColor}`}>
                                            B-14 Usman Hostel<br />
                                            Boys Hostel, University of Gujrat
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
};

export default Contact;