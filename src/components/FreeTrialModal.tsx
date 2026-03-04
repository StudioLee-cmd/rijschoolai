'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { siteDetails } from '@/data/siteDetails';
import { FiX, FiCheckCircle } from 'react-icons/fi';

interface FreeTrialModalProps {
    isOpen: boolean;
    onClose: () => void;
    isAnnual?: boolean;
}

const FreeTrialModal: React.FC<FreeTrialModalProps> = ({ isOpen, onClose, isAnnual }) => {
    const [niche, setNiche] = useState('Rijschool');
    const [businessName, setBusinessName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [url, setUrl] = useState('');
    const [message, setMessage] = useState('');

    // Status
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    // Close modal on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            const response = await fetch('https://hook.eu2.make.com/d8745917834789134-placeholder-webhook', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    niche,
                    businessName,
                    email,
                    phone,
                    url,
                    message,
                    timestamp: new Date().toISOString(),
                    source: 'RijschoolAI Free Trial Modal'
                }),
            });

            if (response.ok) {
                setSuccess(true);
                setTimeout(() => {
                    onClose();
                    setSuccess(false);
                    // Reset form
                    setBusinessName('');
                    setEmail('');
                    setPhone('');
                    setUrl('');
                    setMessage('');
                    setNiche('Rijschool');
                }, 3000);
            } else {
                setError('Er ging iets mis. Probeer het later opnieuw.');
            }
        } catch (err) {
            setError('Kon geen verbinding maken. Check je internet.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            <div className="relative w-full max-w-lg transform overflow-hidden rounded-2xl bg-white dark:bg-gray-900 p-6 text-left shadow-xl transition-all sm:p-8 border border-gray-200 dark:border-gray-800">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                >
                    <FiX size={24} />
                </button>

                <div className="mb-6">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                        <FiCheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-center text-xl font-bold leading-6 text-gray-900 dark:text-white">
                        Vraag je Gratis AI Scan aan
                    </h3>
                    <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
                        Ontdek binnen 24 uur waar jij tijd & geld laat liggen.
                    </p>
                </div>

                {success ? (
                    <div className="rounded-md bg-green-50 dark:bg-green-900/30 p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <FiCheckCircle className="h-5 w-5 text-green-400" />
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-green-800 dark:text-green-200">
                                    Aanvraag succesvol ontvangen!
                                </h3>
                                <div className="mt-2 text-sm text-green-700 dark:text-green-300">
                                    <p>We nemen zo snel mogelijk contact met je op.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="niche" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Branche
                            </label>
                            <input
                                type="text"
                                id="niche"
                                value={niche}
                                disabled
                                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 py-2 px-3 text-gray-500 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-800 dark:border-gray-700"
                            />
                        </div>

                        <div>
                            <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Bedrijfsnaam
                            </label>
                            <input
                                type="text"
                                id="businessName"
                                required
                                value={businessName}
                                onChange={(e) => setBusinessName(e.target.value)}
                                placeholder="Jouw Rijschool"
                                className="mt-1 block w-full rounded-md border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="jouw@email.nl"
                                className="mt-1 block w-full rounded-md border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            />
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Telefoonnummer
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="06 12345678"
                                className="mt-1 block w-full rounded-md border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            />
                        </div>

                        {error && (
                            <div className="rounded-md bg-red-50 dark:bg-red-900/30 p-4">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <FiX className="h-5 w-5 text-red-400" />
                                    </div>
                                    <div className="ml-3">
                                        <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                                            {error}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Bezig met versturen...' : 'Start Gratis Scan'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default FreeTrialModal;
