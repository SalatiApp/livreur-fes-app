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
    return `flex-1 py-1 flex flex-col items-center justify-center gap-0.5 transition-all cursor-pointer ${
      isActive
        ? 'text-blue-600 dark:text-blue-400 font-extrabold scale-105'
        : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 font-bold'
    }`;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] select-none pb-nav-safe">
      <div className="max-w-md mx-auto h-14 flex items-center justify-around px-2">
        {/* Home */}
        <button
          type="button"
          onClick={() => navigateTo('home')}
          className={getButtonClass('home')}
          title="الرئيسية"
        >
          <i className="fa-solid fa-house text-lg"></i>
          <span className="text-[10px]">الرئيسية</span>
        </button>

        {/* Offers */}
        <button
          type="button"
          onClick={() => navigateTo('offers')}
          className={getButtonClass('offers')}
          title="عروض العمل"
        >
          <i className="fa-solid fa-briefcase text-lg"></i>
          <span className="text-[10px]">العروض</span>
        </button>

        {/* Quick Add (Center floating button) */}
        <button
          type="button"
          onClick={handleQuickAdd}
          className="flex-1 py-0.5 flex flex-col items-center justify-center text-blue-600 dark:text-blue-400 cursor-pointer"
          title="إضافة عرض أو تسجيل سائق"
        >
          <div className="w-10 h-10 -mt-5 rounded-full bg-gradient-to-tr from-blue-700 via-blue-600 to-blue-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/35 active:scale-95 transition-transform">
            <i className="fa-solid fa-plus text-base"></i>
          </div>
          <span className="text-[10px] font-black mt-0.5">إضافة</span>
        </button>

        {/* Drivers */}
        <button
          type="button"
          onClick={() => navigateTo('drivers')}
          className={getButtonClass('drivers')}
          title="قائمة الليفرورات"
        >
          <i className="fa-solid fa-motorcycle text-lg"></i>
          <span className="text-[10px]">الليفرورات</span>
        </button>

        {/* Account */}
        <button
          type="button"
          onClick={() => navigateTo('account')}
          className={getButtonClass('account')}
          title="حسابي"
        >
          <i className="fa-solid fa-user text-lg"></i>
          <span className="text-[10px]">حسابي</span>
        </button>
      </div>
    </nav>
  );
};
