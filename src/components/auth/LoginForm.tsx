import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthStore } from '../../store/authstore';
import { CountrySelector } from './CountrySelector';
import ThemeToggle from '../ui/ThemeToggle';
import type { Country } from '../../types/auth';

export const LoginForm: React.FC = () => {
  const {
    step,
    phone,
    countryCode,
    setPhone,
    setCountryCode,
    sendOTP,
    verifyOTP,
    isLoading,
  } = useAuthStore();

  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [otpInput, setOtpInput] = useState(''); 


  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !countryCode) {
      toast.error('Please enter phone and country');
      return;
    }
    await sendOTP();
    toast.success('OTP sent successfully!');
  };

  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(otpInput)) {
      toast.error('OTP must be 6 digits');
      return;
    }
    const success = await verifyOTP(otpInput);
    if (success) {
      toast.success('Logged in successfully!');
      // Redirect or other actions here
    } else {
      toast.error('Invalid OTP');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute right-10 top-10">
        <ThemeToggle />
      </div>

      <div className="max-w-md w-full space-y-8 bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Sign in to Gemini Clone
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            {step === 'phone'
              ? 'Enter your phone number to continue'
              : 'Enter the 6-digit OTP sent to your phone'}
          </p>
        </div>

        {step === 'phone' ? (
  <form className="mt-8 space-y-6" onSubmit={handlePhoneSubmit}>
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Country
      </label>
      <CountrySelector
        selectedCountry={selectedCountry} 
        onSelect={(country: Country) => {
          setSelectedCountry(country); 
          setCountryCode(
            `${country.idd.root}${country.idd.suffixes?.[0] || ''}`
          ); 
        }}
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Phone Number
      </label>
      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Enter your phone number"
        className="w-full p-3 border border-slate-300 rounded-md text-black focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-100 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
      />
    </div>

    <button
      type="submit"
      disabled={isLoading}
      className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {isLoading ? 'Sending...' : 'Send OTP'}
    </button>
  </form>
  ): (
          <form className="mt-8 space-y-6" onSubmit={handleOTPSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                OTP
              </label>
              <input
                type="text"
                value={otpInput}
                onChange={(e) => setOtpInput(e.target.value)}
                maxLength={6}
                placeholder="Enter OTP: 123456"
                className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-center tracking-widest bg-slate-100 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              Verify OTP
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
