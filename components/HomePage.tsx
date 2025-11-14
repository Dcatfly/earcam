'use client';

import {
  CheckCircle,
  Mail,
  ArrowRight,
  Sparkles,
  Globe
} from 'lucide-react';
import { getTranslation, Language } from '@/lib/i18n';
import Link from 'next/link';
import OptimizedImage from '@/components/OptimizedImage';

interface HomePageProps {
  lang: Language;
}

export default function HomePage({ lang }: HomePageProps) {
  const t = getTranslation(lang);
  const isZh = lang === 'zh';
  const switchToPath = isZh ? '/' : '/zh';
  const switchToLabel = isZh ? 'English' : '中文';

  return (
    <main className="min-h-screen bg-white">
      {/* Language Switcher */}
      <div className="fixed top-6 right-6 z-50">
        <Link
          href={switchToPath}
          className="group relative bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200 flex items-center gap-2"
        >
          <Globe className="w-4 h-4" />
          <span className="font-medium">{switchToLabel}</span>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 min-h-screen flex items-center">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{animationDelay: '2s'}} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '4s'}} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <div className="animate-fade-in-down">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold mb-6">
                <Sparkles className="w-4 h-4" />
                {t.hero.badge}
              </span>
            </div>

            <h1 className="text-7xl lg:text-8xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent mb-6 animate-fade-in">
              {t.hero.title}
            </h1>

            <p className="text-3xl lg:text-4xl text-gray-700 mb-6 font-light animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              {t.hero.subtitle}
            </p>

            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              {t.hero.description}
            </p>

            <p className="text-lg text-gray-500 mb-12 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              {t.hero.tagline}
            </p>

            <div className="animate-bounce-in" style={{animationDelay: '0.5s'}}>
              <a
                href="https://apps.apple.com/app/id6752022264"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-2xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
                onClick={() => {
                  window.umami?.track('app_store_click', { language: lang, description: 'apple' });
                }}
              >
                <span className="text-lg font-semibold">{t.hero.cta}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 animate-fade-in-up">
              {t.features.title}
            </h2>
            <p className="text-xl text-gray-600 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              {t.features.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.features.items.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group relative p-6 rounded-2xl bg-white border border-gray-100 hover:border-primary-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-semibold text-xl mb-2 text-gray-900 group-hover:text-primary-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Screenshots Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {t.screenshots.title}
            </h2>
            <p className="text-xl text-gray-600">
              {t.screenshots.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {[
              { key: 'home-disconnected', label: t.screenshots.home },
              { key: 'cleaning-mode', label: t.screenshots.cleaning },
              { key: 'fullscreen-mode', label: t.screenshots.fullscreen },
              { key: 'rotation-control', label: t.screenshots.rotation }
            ].map((item, index) => (
              <div
                key={item.key}
                className="group animate-fade-in-up"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">{item.label}</h3>
                  <div className="rounded-xl overflow-hidden bg-gray-100">
                    <OptimizedImage
                      imageKey={item.key}
                      lang={lang}
                      alt={item.label}
                      className="w-full h-auto transform group-hover:scale-105 transition-transform duration-500"
                      loading={index > 1 ? "lazy" : "eager"}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {t.howItWorks.title}
            </h2>
            <p className="text-xl text-gray-600">
              {t.howItWorks.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {t.howItWorks.steps.map((step, index) => (
              <div
                key={index}
                className="relative text-center group animate-fade-in-up"
                style={{animationDelay: `${index * 0.15}s`}}
              >
                <div className="relative mx-auto w-24 h-24 mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300" />
                  <div className="relative bg-white rounded-2xl w-full h-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                    <span className="text-2xl font-bold bg-gradient-to-br from-primary-500 to-primary-700 bg-clip-text text-transparent">
                      {step.number}
                    </span>
                  </div>
                </div>

                <h3 className="font-semibold text-xl mb-3 text-gray-900">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>

                {/* Elegant connection indicator */}
                {index < t.howItWorks.steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 -right-4" style={{width: '32px'}}>
                    <svg className="w-full h-6" viewBox="0 0 32 24" fill="none">
                      <path
                        d="M2 12 L20 12"
                        stroke={`url(#gradient-${index})`}
                        strokeWidth="2"
                        strokeDasharray="4 2"
                        className="animate-pulse"
                      />
                      <path
                        d="M20 12 L16 8 M20 12 L16 16"
                        stroke={`url(#gradient-${index})`}
                        strokeWidth="2"
                        strokeLinecap="round"
                        className="animate-pulse"
                      />
                      <defs>
                        <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#5B8FF9" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#2B6FEF" stopOpacity="0.8" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compatibility Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {t.compatibility.title}
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              {t.compatibility.subtitle}
            </p>

            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
              <p className="text-lg text-gray-700 mb-8">
                {t.compatibility.description}
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {t.compatibility.devices.map((device, index) => (
                  <div
                    key={index}
                    className="group px-6 py-3 bg-gradient-to-r from-green-50 to-green-100 rounded-full hover:from-green-100 hover:to-green-200 transition-all duration-300 animate-fade-in-up"
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    <span className="flex items-center gap-2 text-green-700 font-medium">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      {device}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-gray-500 italic mb-4">
                {t.compatibility.note}
              </p>
              {t.compatibility.purchaseNote && (
                <p className="text-sm text-gray-400 font-medium">
                  {t.compatibility.purchaseNote}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {t.safety.title}
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              {t.safety.subtitle}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {t.safety.items.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center text-center p-6 rounded-2xl bg-gradient-to-b from-blue-50 to-transparent animate-fade-in-up"
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-gray-700 font-medium">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 animate-fade-in-up">
              {t.contact.title}
            </h2>
            <p className="text-2xl mb-8 opacity-90 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              {t.contact.subtitle}
            </p>
            <p className="text-xl mb-12 opacity-80 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              {t.contact.description}
            </p>

            <a
              href={`mailto:${t.contact.email}`}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-primary-600 rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 animate-bounce-in"
              style={{animationDelay: '0.3s'}}
              onClick={() => {
                window.umami?.track('email_click', { language: lang });
              }}
            >
              <Mail className="w-6 h-6" />
              <span className="text-lg font-semibold">{t.contact.email}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm opacity-75">
            {t.footer.copyright}
          </p>
        </div>
      </footer>
    </main>
  );
}