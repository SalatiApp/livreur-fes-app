import React from 'react';
import { useApp } from '../context/AppContext';
import { AppPage } from '../types';

export const BottomNav: React.FC = () => {
  const { activePage, navigateTo, userRole } = useApp();

  const handleQuickAdd = () => {
    navigateTo('create', { mode: userRole === 'shop' ? 'offer' : 'driver' });
  };

  const getButtonClass = (page: AppPage) => {
    const isActive = activePage === page;
    return `flex-1 py-1 flex flex-col items-center gap-1 transition-colors cursor-pointer ${
      isActive
        ? 'text-blue-600 dark:text-blue-400 font-extrabold'
        : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 font-bold'
    }`;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 shadow-[0_-4px_16px_rgba(0,0,0,0.04)] select-none">
      <div className="max-w-md mx-auto flex items-center justify-around py-2 px-1">
        {/* Home */}
        <button
          onClick={() => navigateTo('home')}
          className={getButtonClass('home')}
        >
          <i className="fa-solid fa-house text-lg"></i>
          <span className="text-[11px]">الرئيسية</span>
        </button>

        {/* Offers */}
        <button
          onClick={() => navigateTo('offers')}
          className={getButtonClass('offers')}
        >
          <i className="fa-solid fa-briefcase text-lg"></i>
          <span className="text-[11px]">العروض</span>
        </button>

        {/* Quick Add (Center floating button) */}
        <button
          onClick={handleQuickAdd}
          className="flex-1 py-1 flex flex-col items-center gap-1 text-blue-600 cursor-pointer"
        >
          <div className="w-10 h-10 -mt-4 rounded-full bg-gradient-to-tr from-blue-700 to-blue-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 active:scale-95 transition-transform">
            <i className="fa-solid fa-plus text-base"></i>
          </div>
          <span className="text-[11px] font-bold mt-[-2px]">إضافة</span>
        </button>

        {/* Drivers */}
        <button
          onClick={() => navigateTo('drivers')}
          className={getButtonClass('drivers')}
        >
          <i className="fa-solid fa-motorcycle text-lg"></i>
          <span className="text-[11px]">الليفرورات</span>
        </button>

        {/* Account */}
        <button
          onClick={() => navigateTo('account')}
          className={getButtonClass('account')}
        >
          <i className="fa-solid fa-user text-lg"></i>
          <span className="text-[11px]">حسابي</span>
        </button>
      </div>
    </nav>
  );
};
