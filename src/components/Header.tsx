import React from 'react';
import { useApp } from '../context/AppContext';

export const Header: React.FC = () => {
  const { userRole, theme, toggleTheme, openRoleModal, navigateTo } = useApp();

  return (
    <header className="sticky top-0 z-40 bg-[#0f1722] text-white border-b border-slate-800 shadow-md select-none">
      <div className="max-w-md mx-auto px-2.5 h-16 flex items-center justify-between gap-2">
        {/* Left Side (RTL Start): Role Selector & Theme Toggle & Scooter */}
        <div className="flex items-center justify-between gap-3 flex-1 max-w-[230px]">
          {/* Role Switcher Button */}
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

          {/* Dark/Light Theme Button */}
          <button
            onClick={toggleTheme}
            title="تبديل الوضع الليلي / النهاري"
            className="w-8 h-8 rounded-full bg-[#141e2e] hover:bg-[#1a273b] border border-slate-700/80 shadow-md flex items-center justify-center transition-all active:scale-95 shrink-0 cursor-pointer"
          >
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-amber-300 transition-transform duration-300 hover:rotate-12" fill="currentColor">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="#fde047" stroke="#f59e0b" strokeWidth="0.5" />
                <path d="M19 4.5l.4 1.1 1.1.4-1.1.4-.4 1.1-.4-1.1-1.1-.4 1.1-.4z" fill="#ffffff" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-amber-400 transition-transform duration-300 hover:rotate-45" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4" fill="#f59e0b" stroke="#d97706" strokeWidth="1.5" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="#f59e0b" strokeWidth="2" />
              </svg>
            )}
          </button>

          {/* Scooter Rider Graphic Icon */}
          <div
            className="flex items-center justify-center shrink-0 cursor-pointer"
            onClick={() => navigateTo('home')}
            title="الصفحة الرئيسية"
          >
            <svg viewBox="0 0 120 85" className="w-14 h-11 shrink-0 filter drop-shadow transition-transform hover:scale-105" fill="none" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
              <line x1="75" y1="22" x2="115" y2="22" stroke="#ef4444" strokeWidth="2.8" strokeLinecap="round" opacity="0.85" />
              <line x1="70" y1="29" x2="106" y2="29" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
              <line x1="78" y1="37" x2="112" y2="37" stroke="#ef4444" strokeWidth="2.8" strokeLinecap="round" opacity="0.75" />
              <rect x="65" y="22" width="19" height="17" rx="3" fill="#334155" stroke="#475569" strokeWidth="1.2" />
              <rect x="67" y="24" width="15" height="13" rx="1.5" fill="#1e293b" />
              <text x="74.5" y="33" fontSize="5.5" fontFamily="'Cairo', sans-serif" fontWeight="bold" fill="#ffffff" textAnchor="middle">ليفرور</text>
              <ellipse cx="46" cy="16" rx="7.5" ry="8.5" fill="#ef4444" stroke="#b91c1c" strokeWidth="1.2" />
              <path d="M42 15 Q38 17 42 20" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
              <path d="M45 24 L58 30 L55 49 L43 49 L39 32 Z" fill="#0284c7" stroke="#0369a1" strokeWidth="1.2" />
              <circle cx="22" cy="67" r="9.5" fill="#1e293b" stroke="#64748b" strokeWidth="2.5" />
              <circle cx="67" cy="67" r="9.5" fill="#1e293b" stroke="#64748b" strokeWidth="2.5" />
              <path d="M23 66 L30 43 L35 41 L39 53 L63 53 L67 66 Z" fill="#ef4444" />
            </svg>
          </div>
        </div>

        {/* Right Side (RTL End): Map & App Titles */}
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

          <div className="h-10 w-8 shrink-0 flex items-center justify-center">
            <img
              src="/morocco-map.png"
              alt="المغرب"
              className="h-full w-full object-contain filter drop-shadow-[0_2px_5px_rgba(200,16,46,0.5)]"
              onError={(e) => {
                // If png fails, fallback to vector SVG
                (e.currentTarget as HTMLElement).style.display = 'none';
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
};
