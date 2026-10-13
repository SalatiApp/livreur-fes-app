import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MOROCCO_MAP_BASE64 } from './moroccoMapBase64';

export const Header: React.FC = () => {
  const { userRole, theme, toggleTheme, openRoleModal, navigateTo } = useApp();
  const [imgError, setImgError] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#030914] text-white border-b border-slate-800/80 shadow-md select-none pt-header-safe">
      <div className="max-w-md mx-auto h-[62px] px-3 flex items-center justify-between gap-1.5" dir="rtl">
        {/* Right side: Moroccan Map + Brand Name + Subtitle */}
        <div
          className="flex items-center gap-2 cursor-pointer shrink-0 active:opacity-85 transition-opacity"
          onClick={() => navigateTo('home')}
          title="LIVLINK MA الرئيسية"
        >
          {/* Moroccan Red Map */}
          <div className="h-9 w-7 shrink-0 flex items-center justify-center relative">
            {!imgError ? (
              <img
                src={MOROCCO_MAP_BASE64}
                alt="خريطة المغرب"
                className="h-full w-full object-contain filter drop-shadow-[0_2px_6px_rgba(220,38,38,0.8)]"
                onError={() => setImgError(true)}
              />
            ) : (
              <svg viewBox="0 0 100 120" className="w-7 h-9 filter drop-shadow-[0_2px_6px_rgba(220,38,38,0.8)]">
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

          <div className="flex flex-col justify-center text-right">
            <h1 className="font-black text-[15px] sm:text-base text-white tracking-wide leading-none">
              LIVLINK MA
            </h1>
            <p className="text-[8.5px] text-slate-300 font-bold leading-tight mt-1">
              منصة ربط المحلات بالليفرورات
            </p>
          </div>
        </div>

        {/* Center: Scooter Delivery Graphic */}
        <div
          className="flex items-center justify-center shrink-0 cursor-pointer active:scale-95 transition-transform"
          onClick={() => navigateTo('home')}
          title="الرئيسية"
        >
          <svg viewBox="0 0 120 85" className="w-10 h-8 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="65" y="22" width="20" height="18" rx="3" fill="#334155" />
            <text x="75" y="34" fontSize="6" fill="#ffffff" textAnchor="middle" fontWeight="bold">ليفرور</text>
            {/* Scooter body */}
            <path d="M40 55 L58 55 L70 38 L85 38" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M45 40 L55 55" stroke="#ef4444" strokeWidth="3" strokeLinecap="round"/>
            <circle cx="50" cy="30" r="7" fill="#38bdf8"/>
            <circle cx="32" cy="67" r="9.5" fill="#1e293b" stroke="#64748b" strokeWidth="2.5" />
            <circle cx="77" cy="67" r="9.5" fill="#1e293b" stroke="#64748b" strokeWidth="2.5" />
          </svg>
        </div>

        {/* Left side: Dark/Light Mode toggle + Role selector pill button */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Dark / Light Mode Button (circular) */}
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'تفعيل الوضع النهاري' : 'تفعيل الوضع الليلي'}
            type="button"
            className="w-8 h-8 rounded-full bg-[#0d1626] hover:bg-[#15233c] border border-slate-700/80 shadow-sm flex items-center justify-center shrink-0 active:scale-95 transition-all cursor-pointer"
          >
            <span className="text-xs select-none">{theme === 'dark' ? '🌙' : '☀️'}</span>
          </button>

          {/* User Role Selector Pill Button with Dropdown Chevron */}
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
            <i className="fa-solid fa-chevron-down text-[9px] text-[#1d4ed8]"></i>
          </button>
        </div>
      </div>
    </header>
  );
};
