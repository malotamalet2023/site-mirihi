'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ChevronDownIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Header() {
  const t = useTranslations();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  const currentLocale = pathname.split('/')[1] || 'fr';
  
  const navigation = [
    { name: t('nav.home'), href: `/${currentLocale}` },
    { name: t('nav.resources'), href: `/${currentLocale}/resources` },
    { name: t('nav.myAccount'), href: `/${currentLocale}/account` },
  ];

  const languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
  ];

  const switchLanguage = (newLocale: string) => {
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '');
    window.location.href = `/${newLocale}${pathWithoutLocale}`;
  };

  return (
    <header className="bg-white shadow-lg fixed w-full top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href={`/${currentLocale}`} className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-mirihi-blue-1">Mirihi</h1>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? 'bg-mirihi-blue-1 bg-opacity-10 text-mirihi-text-dark-blue'
                    : 'text-mirihi-text-grey hover:text-mirihi-blue-1 hover:bg-gray-100'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Language selector */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-mirihi-text-grey hover:text-mirihi-blue-1 hover:bg-gray-100"
              >
                <span>{languages.find(lang => lang.code === currentLocale)?.flag}</span>
                <ChevronDownIcon className="h-4 w-4" />
              </button>
              
              {isLanguageOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => {
                        switchLanguage(language.code);
                        setIsLanguageOpen(false);
                      }}
                      className={`flex items-center space-x-2 w-full px-4 py-2 text-sm text-left hover:bg-gray-100 ${
                        currentLocale === language.code ? 'bg-mirihi-blue-1 bg-opacity-10 text-mirihi-text-dark-blue' : 'text-mirihi-text-grey'
                      }`}
                    >
                      <span>{language.flag}</span>
                      <span>{language.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-mirihi-text-grey hover:text-mirihi-blue-1 hover:bg-gray-100"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile navigation menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    pathname === item.href
                      ? 'bg-mirihi-blue-1 bg-opacity-10 text-mirihi-text-dark-blue'
                      : 'text-mirihi-text-grey hover:text-mirihi-blue-1 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile language selector */}
              <div className="pt-2 border-t border-gray-200">
                <div className="px-3 py-2 text-sm font-medium text-gray-500">{t('common.language')}</div>
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => {
                      switchLanguage(language.code);
                      setIsMenuOpen(false);
                    }}
                    className={`flex items-center space-x-2 w-full px-3 py-2 text-base font-medium text-left rounded-md ${
                      currentLocale === language.code ? 'bg-mirihi-blue-1 bg-opacity-10 text-mirihi-text-dark-blue' : 'text-mirihi-text-grey hover:text-mirihi-blue-1 hover:bg-gray-100'
                    }`}
                  >
                    <span>{language.flag}</span>
                    <span>{language.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
