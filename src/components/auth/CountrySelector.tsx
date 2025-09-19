import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import type { Country } from '../../types/auth';

interface Props {
  selectedCountry: Country | null;
  onSelect: (country: Country) => void;
}

export const CountrySelector: React.FC<Props> = ({ selectedCountry, onSelect }) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2,idd,flag');
      const data = await response.json();
      const sortedCountries = data
        .filter((country: Country) => country.idd?.root)
        .sort((a: Country, b: Country) => a.name.common.localeCompare(b.name.common));
      setCountries(sortedCountries);
    } catch (error) {
      console.error('Failed to fetch countries:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDialCode = (country: Country) => {
    const { root, suffixes } = country.idd;
    return `${root}${suffixes?.[0] || ''}`;
  };

  if (loading) {
    return <div className="animate-pulse bg-gray-200 h-12 rounded-md"></div>;
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-3 border rounded-md w-full text-left bg-white hover:bg-gray-50 dark:bg-dark-secondary dark:border-gray-600"
      >
        {selectedCountry ? (
          <>
            <span>{selectedCountry.flag}</span>
            <span>{getDialCode(selectedCountry)}</span>
            <span className="text-sm text-gray-500 truncate">
              {selectedCountry.name.common}
            </span>
          </>
        ) : (
          <span className="text-gray-500">Select country</span>
        )}
        <ChevronDown className="ml-auto h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-white dark:bg-dark-secondary border rounded-md shadow-lg max-h-60 overflow-auto">
          {countries.map((country) => (
            <button
              key={country.cca2}
              type="button"
              onClick={() => {
                onSelect(country);
                setIsOpen(false);
              }}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
            >
              <span>{country.flag}</span>
              <span className="font-mono text-sm">{getDialCode(country)}</span>
              <span className="text-sm truncate">{country.name.common}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};