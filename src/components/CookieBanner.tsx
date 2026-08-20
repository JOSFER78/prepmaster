import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cookie, X, Settings, Check } from 'lucide-react';

interface CookieBannerProps {
  onOpenCookiesPolicy: () => void;
  onOpenPrivacyPolicy: () => void;
}

export function CookieBanner({ onOpenCookiesPolicy, onOpenPrivacyPolicy }: CookieBannerProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isCustomizing, setIsCustomizing] = useState<boolean>(false);
  const [analyticsCookies, setAnalyticsCookies] = useState<boolean>(true);
  const [preferencesCookies, setPreferencesCookies] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const consent = localStorage.getItem('touchef_cookie_consent');
      if (!consent) {
        // Show after brief delay
        const timer = setTimeout(() => setIsVisible(true), 800);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('touchef_cookie_consent', JSON.stringify({
      essential: true,
      analytics: true,
      preferences: true,
      timestamp: new Date().toISOString()
    }));
    setIsVisible(false);
  };

  const handleAcceptEssential = () => {
    localStorage.setItem('touchef_cookie_consent', JSON.stringify({
      essential: true,
      analytics: false,
      preferences: false,
      timestamp: new Date().toISOString()
    }));
    setIsVisible(false);
  };

  const handleSaveCustom = () => {
    localStorage.setItem('touchef_cookie_consent', JSON.stringify({
      essential: true,
      analytics: analyticsCookies,
      preferences: preferencesCookies,
      timestamp: new Date().toISOString()
    }));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-6 sm:max-w-xl z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border border-zinc-200 dark:border-amber-500/30 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4 text-stone-200">
        
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
            <Cookie size={20} />
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <h4 className="text-xs sm:text-sm font-black text-zinc-900 dark:text-white flex items-center gap-2">
                <span>Tu Privacidad y Cookies en TouChef</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.2 rounded-full">
                  RGPD
                </span>
              </h4>
            </div>
            <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Utilizamos cookies técnicas necesarias para guardar tus menús batch cooking, la cesta de la compra y la autenticación segura. Consulta nuestra{' '}
              <button
                onClick={onOpenCookiesPolicy}
                className="text-amber-700 dark:text-amber-400 underline font-medium hover:text-amber-600 dark:hover:text-amber-300 cursor-pointer"
              >
                Política de Cookies
              </button>{' '}
              y{' '}
              <button
                onClick={onOpenPrivacyPolicy}
                className="text-amber-700 dark:text-amber-400 underline font-medium hover:text-amber-600 dark:hover:text-amber-300 cursor-pointer"
              >
                Política de Privacidad
              </button>.
            </p>
          </div>
        </div>

        {isCustomizing && (
          <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/80 rounded-2xl border border-zinc-200 dark:border-zinc-700 space-y-2.5 text-xs">
            <div className="flex items-center justify-between">
              <div>
                <strong className="text-zinc-900 dark:text-white block text-[11px]">Cookies Técnicas y de Sesión</strong>
                <span className="text-[10px] text-zinc-600 dark:text-zinc-400">Imprescindibles para el funcionamiento de la app.</span>
              </div>
              <span className="text-[10px] bg-stone-700 text-stone-300 font-bold px-2 py-0.5 rounded">Obligatorias</span>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-stone-700">
              <div>
                <strong className="text-zinc-900 dark:text-white block text-[11px]">Cookies de Preferencias</strong>
                <span className="text-[10px] text-zinc-600 dark:text-zinc-400">Recuerdan tu tipo de cocina y comensales.</span>
              </div>
              <input
                type="checkbox"
                checked={preferencesCookies}
                onChange={(e) => setPreferencesCookies(e.target.checked)}
                className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-stone-700">
              <div>
                <strong className="text-zinc-900 dark:text-white block text-[11px]">Cookies de Rendimiento Anónimo</strong>
                <span className="text-[10px] text-zinc-600 dark:text-zinc-400">Ayudan a optimizar los tiempos de cálculo.</span>
              </div>
              <input
                type="checkbox"
                checked={analyticsCookies}
                onChange={(e) => setAnalyticsCookies(e.target.checked)}
                className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
              />
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <button
            onClick={() => setIsCustomizing(!isCustomizing)}
            className="text-[11px] text-zinc-600 dark:text-zinc-400 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Settings size={12} />
            <span>{isCustomizing ? 'Ocultar ajustes' : 'Configurar'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAcceptEssential}
              className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white text-xs font-bold transition-all cursor-pointer border border-stone-700"
            >
              Solo Necesarias
            </button>

            {isCustomizing ? (
              <button
                onClick={handleSaveCustom}
                className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-black transition-all cursor-pointer shadow-md"
              >
                Guardar Selección
              </button>
            ) : (
              <button
                onClick={handleAcceptAll}
                className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-black transition-all cursor-pointer shadow-md"
              >
                Aceptar Todas
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
