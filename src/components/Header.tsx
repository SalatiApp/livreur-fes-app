import React from 'react';
import { useApp } from '../context/AppContext';

export const Header: React.FC = () => {
  const { userRole, theme, toggleTheme, openRoleModal, navigateTo } = useApp();

  return (
    <header className="w-full bg-[#0f1722] text-white border-b border-slate-800 shadow-md select-none pt-7 pb-2.5 px-2.5">
      <div className="max-w-md mx-auto flex items-center justify-between gap-2">
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
            title="تبديل الوضع"
            className="w-8 h-8 rounded-full bg-[#141e2e] hover:bg-[#1a273b] border border-slate-700/80 shadow-md flex items-center justify-center shrink-0 cursor-pointer"
          >
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>

          <div
            className="flex items-center justify-center shrink-0 cursor-pointer"
            onClick={() => navigateTo('home')}
          >
            <svg viewBox="0 0 120 85" className="w-12 h-10 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="65" y="22" width="19" height="17" rx="3" fill="#334155" />
              <text x="74.5" y="33" fontSize="5.5" fill="#ffffff" textAnchor="middle">ليفرور</text>
              <circle cx="22" cy="67" r="9.5" fill="#1e293b" stroke="#64748b" strokeWidth="2.5" />
              <circle cx="67" cy="67" r="9.5" fill="#1e293b" stroke="#64748b" strokeWidth="2.5" />
            </svg>
          </div>
        </div>

        {/* Right Side: Title & Morocco Map */}
        <div
          className="flex items-center cursor-pointer shrink-0 gap-1.5"
          onClick={() => navigateTo('home')}
        >
          <div className="text-right flex flex-col justify-center">
            <h1 className="font-black text-base text-white tracking-wide leading-none">
              LIVLINK MA
            </h1>
            <p className="text-[7.5px] text-slate-300 font-bold leading-tight">
              منصة ربط المحلات بالليفرورات
            </p>
          </div>

          <div className="h-10 w-8 shrink-0 flex items-center justify-center">
            <img
              src="/morocco-map.png"
              alt="المغرب"
              className="h-full w-full object-contain filter drop-shadow-[0_2px_5px_rgba(200,16,46,0.5)]"
              onError={(e) => {
                (e.currentTarget as HTMLElement).style.display = 'none';
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
};
