import React from 'react';
import { useApp } from '../context/AppContext';

export const Header: React.FC = () => {
  const { userRole, theme, toggleTheme, openRoleModal, navigateTo } = useApp();

  return (
    <header className="sticky top-0 z-50 bg-[#0f1722] text-white border-b border-slate-800 shadow-md select-none">
      <div className="max-w-md mx-auto px-2.5 h-16 flex items-center justify-between gap-2">
        {/* Left Side: Role & Theme & Scooter */}
        <div className="flex items-center justify-between gap-3 flex-1 max-w-[230px]">
          <button
            onClick={openRoleModal}
            className="bg-white hover:bg-slate-50 text-slate-900 rounded-full px-2.5 py-1.5 shadow-md flex items-center gap-1 border border-slate-200 shrink-0 active:scale-95 transition-all cursor-pointer"
            title="تغيير نوع الاستخدام"
          >
            <div className="text-right flex flex-col justify-center">
              <span className="text-[9.5px] font-black text-[#1e3a8a] leading-tight block whitespace-nowrap">
                نوع الاستخدام
              </span>
              <span className="text-[8px] font-extrabold text-[#2563eb] leading-tight block whitespace-nowrap">
                {userRole === 'shop' ? '(صاحب محل)' : '(ليفرور)'}
              </span>
            </div>
            <svg viewBox="0 0 12 12" className="w-2.5 h-2.5 text-[#1d4ed8] shrink-0" fill="currentColor">
              <path d="M2 4.5 L6 8.5 L10 4.5 Z" />
            </svg>
          </button>

          <button
            onClick={toggleTheme}
            title="تبديل الوضع الليلي / النهاري"
            className="w-8 h-8 rounded-full bg-[#141e2e] hover:bg-[#1a273b] border border-slate-700/80 shadow-md flex items-center justify-center transition-all active:scale-95 shrink-0 cursor-pointer"
          >
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-amber-300" fill="currentColor">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="4" fill="#f59e0b" />
              </svg>
            )}
          </button>

          <div
            className="flex items-center justify-center shrink-0 cursor-pointer"
            onClick={() => navigateTo('home')}
          >
            <svg viewBox="0 0 120 85" className="w-14 h-11 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="65" y="22" width="19" height="17" rx="3" fill="#334155" />
              <text x="74.5" y="33" fontSize="5.5" fill="#ffffff" textAnchor="middle">ليفرور</text>
              <circle cx="22" cy="67" r="9.5" fill="#1e293b" stroke="#64748b" strokeWidth="2.5" />
              <circle cx="67" cy="67" r="9.5" fill="#1e293b" stroke="#64748b" strokeWidth="2.5" />
            </svg>
          </div>
        </div>

        {/* Right Side: Title & Map */}
        <div
          className="flex items-center cursor-pointer shrink-0 gap-1.5"
          onClick={() => navigateTo('home')}
        >
          <div className="text-right flex flex-col justify-center gap-0.5">
            <h1 className="font-black text-base text-white tracking-wide leading-none">
              LIVLINK MA
            </h1>
            <p className="text-[7.5px] text-slate-300 font-bold leading-tight whitespace-nowrap">
              منصة ربط المحلات بالليفرورات
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
