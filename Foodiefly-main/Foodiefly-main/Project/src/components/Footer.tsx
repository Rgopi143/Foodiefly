import React, { useState } from 'react';
import {  Instagram, Mail, Phone, MapPin, Youtube, Facebook, Twitter, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
    const [openSupport, setOpenSupport] = useState<'support' | 'documentation' | null>(null);
    const [openModal, setOpenModal] = useState<'privacy' | 'terms' | 'cookie' | null>(null);
    return (
        <footer className="bg-gray-800 text-white">
            <div className="px-6 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1">
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">FL</span>
                            </div>
                            <span className="font-bold text-xl">Foodfly</span>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Empowering restaurant owners with comprehensive management tools to streamline operations and boost success.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="/restaurants" className="text-gray-300 hover:text-white transition-colors">
                                    Restaurants
                                </a>
                            </li>
                            <li>
                                <a href="/order" className="text-gray-300 hover:text-white transition-colors">
                                    Order
                                </a>
                            </li>
                            <li>
                                <a href="/cart" className="text-gray-300 hover:text-white transition-colors">
                                    Cart
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Restaurant Timings Section */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">Restaurant Timings</h3>
                        <ul className="space-y-2 text-sm">
                            <li><span className="text-gray-300">Monday - Sunday:</span></li>
                            <li><span className="text-gray-300">10:00 AM - 4:00 PM</span></li>
                            <li><span className="text-gray-300">6:00 PM - 11:00 PM</span></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg mb-4">Support</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a
                                    href="https://wa.me/918247392437"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    Help Center
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/src/components/Readme.md"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    Documentation
                                </a>
                            </li>
                            <li>
                                <a
                                  href="https://wa.me/918247392437"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-gray-300 hover:text-white transition-colors"
                                >
                                  Contact Support
                                </a>
                              </li>
                            
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-center space-x-2">
                                <Mail className="w-4 h-4 text-blue-400" />
                                <span className="text-gray-300">ranbridgeserviceprivatelimited@gmail.com</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Mail className="w-4 h-4 text-blue-400" />
                                <span className="text-gray-300">ranbridgeservicesprivatelimite@gmail.com</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Phone className="w-4 h-4 text-blue-400" />
                                <span className="text-gray-300">+91 8247392437</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <MapPin className="w-4 h-4 text-blue-400" />
                                <span className="text-gray-300">Srinivasa Nagar, Narasaraopet, Andhra Pradesh, India</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3 mt-4">
                            <a href="https://www.facebook.com/profile.php?id=61578597456959" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="https://x.com/RanbridgePvtLtd" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="https://www.linkedin.com/in/ranbridge-services-private-limited-company-a98983376/" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="https://www.instagram.com/ranbridgeserviceprivatelimited?igsh=MTYxOWU4NHJ0YzcwaA%3D%3D" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="https://youtube.com/@ranbridgeservicesprivatelimite?si=-YmZRdTQ-K4OwR4V" className="text-gray-400 hover:text-white transition-colors" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
                                <Youtube className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400 text-sm">
                        © 2025 RANBRIDGE Services Private Limited. All rights reserved.
                    </p>
                    
                </div>
            </div>

            {/* Policy Columns at Bottom */}
            <div className="mt-12 w-full bg-gray-800 py-8 border-t border-gray-700">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Privacy Policy Column */}
                    <div>
                        <h4 className="text-lg font-bold mb-2 text-white">Privacy Policy</h4>
                        <p className="text-gray-400 text-sm mb-2">We are committed to protecting your privacy. We collect personal information to provide and improve our services. You can request access, correction, or deletion of your data at any time.</p>
                        <button onClick={() => setOpenModal('privacy')} className="text-blue-400 hover:underline text-sm">Read More</button>
                    </div>
                    {/* Terms of Service Column */}
                    <div>
                        <h4 className="text-lg font-bold mb-2 text-white">Terms of Service</h4>
                        <p className="text-gray-400 text-sm mb-2">By using Foodfly, you agree to our terms: use the service lawfully, provide accurate info, and respect our policies. We may update these terms at any time.</p>
                        <button onClick={() => setOpenModal('terms')} className="text-blue-400 hover:underline text-sm">Read More</button>
                    </div>
                    {/* Cookie Policy Column */}
                    <div>
                        <h4 className="text-lg font-bold mb-2 text-white">Cookie Policy</h4>
                        <p className="text-gray-400 text-sm mb-2">We use cookies to enhance your experience, remember your preferences, and analyze usage. You can disable cookies in your browser settings.</p>
                        <button onClick={() => setOpenModal('cookie')} className="text-blue-400 hover:underline text-sm">Read More</button>
                    </div>
                </div>
            </div>

            {/* Modals for policies */}
            {openModal === 'privacy' && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
                    <div className="bg-white text-gray-900 rounded-lg shadow-lg max-w-lg w-full p-6 relative">
                        <button onClick={() => setOpenModal(null)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-900 text-xl">&times;</button>
                        <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
                        <p className="mb-2 font-semibold">At RANBRIDGE Services Private Limited ("we", "us", "our"), we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our Foodfly app and services.</p>
                        <ul className="list-disc pl-5 mb-2">
                            <li><b>Information We Collect:</b> Personal information (name, email, phone number) when you register or place an order. Usage data (pages visited, features used) to improve our services. Payment information is processed securely by third-party providers.</li>
                            <li><b>How We Use Your Information:</b> To provide and maintain our services. To process orders and payments. To communicate with you about your account or orders. To improve our app and customer experience.</li>
                            <li><b>Your Rights:</b> You can request access to, correction, or deletion of your personal data. You can opt out of marketing communications at any time.</li>
                        </ul>
                        <p>Contact Us: If you have any questions about this policy, email us at <a href="mailto:ranbridgeserviceprivatelimited@gmail.com" className="underline text-blue-600">ranbridgeserviceprivatelimited@gmail.com</a>.</p>
                    </div>
                </div>
            )}
            {openModal === 'terms' && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
                    <div className="bg-white text-gray-900 rounded-lg shadow-lg max-w-lg w-full p-6 relative">
                        <button onClick={() => setOpenModal(null)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-900 text-xl">&times;</button>
                        <h2 className="text-2xl font-bold mb-4">Terms of Service</h2>
                        <ol className="list-decimal pl-5 mb-2">
                            <li><b>Use of Service:</b> You must be at least 18 years old or have parental consent to use Foodfly. You agree to provide accurate information and use the service lawfully.</li>
                            <li><b>Orders and Payments:</b> All orders are subject to restaurant availability. Payments are processed securely. We reserve the right to cancel orders in case of issues.</li>
                            <li><b>User Conduct:</b> You agree not to misuse the app, attempt unauthorized access, or engage in fraudulent activity.</li>
                            <li><b>Limitation of Liability:</b> We are not liable for delays, order issues, or damages arising from the use of our service.</li>
                            <li><b>Changes to Terms:</b> We may update these terms at any time. Continued use of Foodfly means you accept the new terms.</li>
                        </ol>
                    </div>
                </div>
            )}
            {openModal === 'cookie' && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
                    <div className="bg-white text-gray-900 rounded-lg shadow-lg max-w-lg w-full p-6 relative">
                        <button onClick={() => setOpenModal(null)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-900 text-xl">&times;</button>
                        <h2 className="text-2xl font-bold mb-4">Cookie Policy</h2>
                        <ul className="list-disc pl-5 mb-2">
                            <li><b>What are cookies?</b> Cookies are small text files stored on your device to remember your preferences and activity.</li>
                            <li><b>How we use cookies:</b> To keep you logged in. To remember your cart and preferences. To analyze usage and improve our services.</li>
                            <li><b>Managing cookies:</b> You can disable cookies in your browser settings, but some features may not work properly.</li>
                        </ul>
                    </div>
                </div>
            )}
        </footer>
    );
};

export default Footer;