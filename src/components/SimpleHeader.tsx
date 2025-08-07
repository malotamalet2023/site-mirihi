'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function SimpleHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  const currentLocale = pathname.split('/')[1] || 'fr';
  
  const navigation = [
    { name: 'Accueil', href: `/${currentLocale}`, key: 'home' },
    { name: 'Ressources', href: `/${currentLocale}/resources`, key: 'resources' },
    { name: 'Mon Compte', href: `/${currentLocale}/account`, key: 'account' },
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

  const isActive = (href: string) => {
    if (href === `/${currentLocale}`) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="bg-white/95 backdrop-blur-lg shadow-xl fixed w-full top-0 z-50 border-b border-mirihi-blue-1/20">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href={`/${currentLocale}`} className="group flex-shrink-0 flex items-center space-x-3">
              <div className="w-14 h-14 bg-gradient-to-br from-mirihi-blue-1 to-mirihi-blue-3 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                <span className="text-white font-bold text-2xl">M</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-mirihi-text-dark-blue group-hover:text-mirihi-blue-1 transition-colors duration-300">Mirihi</h1>
                <p className="text-sm text-mirihi-text-grey font-medium">Diagnostic Achats</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navigation.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={`px-8 py-4 rounded-2xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                  isActive(item.href)
                    ? 'bg-gradient-to-r from-mirihi-blue-1 to-mirihi-blue-2 text-white shadow-lg'
                    : 'text-mirihi-text-grey hover:text-mirihi-blue-1 hover:bg-blue-50/70'
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Language Selector */}
            <div className="relative ml-6">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center px-6 py-4 text-sm font-semibold text-mirihi-text-grey hover:text-mirihi-blue-1 transition-all duration-300 rounded-2xl hover:bg-blue-50/70 transform hover:scale-105"
              >
                <span className="text-xl">{languages.find(lang => lang.code === currentLocale)?.flag}</span>
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isLanguageOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl py-3 z-50 border border-gray-100">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => {
                        switchLanguage(language.code);
                        setIsLanguageOpen(false);
                      }}
                      className={`block w-full text-left px-6 py-4 text-sm font-medium transition-all duration-200 ${
                        language.code === currentLocale
                          ? 'bg-gradient-to-r from-mirihi-blue-1 to-mirihi-blue-2 text-white'
                          : 'text-mirihi-text-grey hover:bg-blue-50 hover:text-mirihi-blue-1'
                      }`}
                    >
                      <span className="text-lg mr-3">{language.flag}</span> {language.name}
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
              className="inline-flex items-center justify-center p-3 rounded-xl text-mirihi-text-grey hover:text-mirihi-blue-1 hover:bg-blue-50 transition-colors"
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-2 pt-4 pb-6 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-mirihi-blue-1 text-white'
                      : 'text-mirihi-text-grey hover:text-mirihi-blue-1 hover:bg-blue-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Language Selector */}
              <div className="pt-4 border-t border-gray-100">
                <p className="px-4 py-2 text-xs font-semibold text-mirihi-text-grey uppercase tracking-wider">Langue</p>
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => {
                      switchLanguage(language.code);
                      setIsMenuOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-3 text-base transition-colors rounded-xl ${
                      language.code === currentLocale
                        ? 'bg-mirihi-blue-1 text-white'
                        : 'text-mirihi-text-grey hover:bg-blue-50 hover:text-mirihi-blue-1'
                    }`}
                  >
                    {language.flag} {language.name}
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
