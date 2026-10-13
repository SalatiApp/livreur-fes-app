import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MOROCCO_MAP_BASE64 } from './moroccoMapBase64';

export const Header: React.FC = () => {
  const { userRole, theme, toggleTheme, openRoleModal, navigateTo } = useApp();
  const [imgError, setImgError] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0f1722] text-white border-b border-slate-800 shadow-md select-none pt-safe">
      <div className="max-w-md mx-auto pt-2 pb-2.5 px-3 flex items-center justify-between gap-2">
        {/* Left Side: Role Selector, Dark/Light Mode, Scooter Icon */}
        <div className="flex items-center gap-2">
          {/* User Role Selector Button */}
          <button
            onClick={openRoleModal}
            className="bg-white hover:bg-slate-100 text-slate-900 rounded-full px-2.5 py-1 shadow-sm flex items-center gap-1.5 border border-slate-200 shrink-0 active:scale-95 transition-all cursor-pointer"
            title="تغيير نوع الاستخدام"
            type="button"
          >
            <div className="text-right flex flex-col justify-center">
              <span className="text-[10px] font-black text-[#1e3a8a] leading-tight block whitespace-nowrap">
                نوع الاستخدام
              </span>
              <span className="text-[8.5px] font-extrabold text-[#2563eb] leading-tight block whitespace-nowrap">
                {userRole === 'shop' ? '(صاحب محل)' : '(ليفرور)'}
              </span>
            </div>
            <svg viewBox="0 0 12 12" className="w-2.5 h-2.5 text-[#1d4ed8] shrink-0" fill="currentColor">
              <path d="M2 4.5 L6 8.5 L10 4.5 Z" />
            </svg>
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'تفعيل الوضع النهاري' : 'تفعيل الوضع الليلي'}
            type="button"
            className="w-8 h-8 rounded-full bg-[#141e2e] hover:bg-[#1a273b] border border-slate-700/80 shadow-sm flex items-center justify-center shrink-0 active:scale-95 transition-all cursor-pointer"
          >
            <span className="text-sm select-none">{theme === 'dark' ? '🌙' : '☀️'}</span>
          </button>

          {/* Scooter Graphic Button */}
          <button
            type="button"
            className="flex items-center justify-center shrink-0 cursor-pointer active:scale-95 transition-transform"
            onClick={() => navigateTo('home')}
            title="الرئيسية"
          >
            <svg viewBox="0 0 120 85" className="w-11 h-9 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="65" y="22" width="19" height="17" rx="3" fill="#334155" />
              <text x="74.5" y="33" fontSize="5.5" fill="#ffffff" textAnchor="middle" fontWeight="bold">ليفرور</text>
              <circle cx="22" cy="67" r="9.5" fill="#1e293b" stroke="#64748b" strokeWidth="2.5" />
              <circle cx="67" cy="67" r="9.5" fill="#1e293b" stroke="#64748b" strokeWidth="2.5" />
            </svg>
          </button>
        </div>

        {/* Right Side: Platform Title & Authentic Moroccan Red Map */}
        <div
          className="flex items-center cursor-pointer shrink-0 gap-2 active:opacity-90 transition-opacity"
          onClick={() => navigateTo('home')}
          title="LIVLINK MA الرئيسية"
        >
          <div className="text-right flex flex-col justify-center">
            <h1 className="font-black text-base text-white tracking-wide leading-none">
              LIVLINK MA
            </h1>
            <p className="text-[8px] text-slate-300 font-bold leading-tight mt-0.5">
              منصة ربط المحلات بالليفرورات
            </p>
          </div>

          {/* Moroccan Map Container - with absolute fallback */}
          <div className="h-10 w-8 shrink-0 flex items-center justify-center relative">
            {!imgError ? (
              <img
                src={MOROCCO_MAP_BASE64}
                alt="خريطة المغرب"
                className="h-full w-full object-contain filter drop-shadow-[0_2px_6px_rgba(220,38,38,0.7)]"
                onError={() => setImgError(true)}
              />
            ) : (
              <svg viewBox="0 0 100 120" className="w-8 h-10 filter drop-shadow-[0_2px_6px_rgba(220,38,38,0.7)]">
                <path
                  d="M48 5 C55 8, 65 10, 75 8 C80 15, 78 25, 70 30 C72 38, 68 45, 60 48 C58 55, 52 62, 48 70 C42 80, 38 95, 30 110 C25 115, 20 112, 22 100 C24 85, 28 72, 32 60 C30 50, 25 40, 28 30 C30 20, 38 12, 48 5 Z"
                  fill="#c8102e"
                />
                <polygon
                  points="50,42 52,48 58,48 53,52 55,58 50,54 45,58 47,52 42,48 48,48"
                  fill="#006233"
                />
              </svg>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
