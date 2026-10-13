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
    return `flex-1 py-1 flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
      isActive
        ? 'text-blue-500 font-extrabold'
        : 'text-slate-400 dark:text-slate-500 hover:text-slate-200 font-bold'
    }`;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#030914]/95 dark:bg-[#030914]/95 backdrop-blur-md border-t border-slate-800 shadow-[0_-4px_24px_rgba(0,0,0,0.4)] select-none pb-nav-safe">
      <div className="max-w-md mx-auto h-[58px] flex items-center justify-around px-2">
        {/* Rightmost in RTL: Home (الرئيسية) */}
        <button
          type="button"
          onClick={() => navigateTo('home')}
          className={getButtonClass('home')}
          title="الرئيسية"
        >
          <i className="fa-solid fa-house text-lg"></i>
          <span className="text-[11px]">الرئيسية</span>
        </button>

        {/* Offers (العروض) */}
        <button
          type="button"
          onClick={() => navigateTo('offers')}
          className={getButtonClass('offers')}
          title="عروض العمل"
        >
          <i className="fa-solid fa-briefcase text-lg"></i>
          <span className="text-[11px]">العروض</span>
        </button>

        {/* Center: Vibrant Blue Circular Quick Add Button */}
        <button
          type="button"
          onClick={handleQuickAdd}
          className="flex-1 py-0.5 flex flex-col items-center justify-center text-blue-400 cursor-pointer"
          title="إضافة عرض أو تسجيل سائق"
        >
          <div className="w-12 h-12 -mt-6 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-lg shadow-blue-600/40 border-2 border-[#030914] active:scale-95 transition-transform">
            <i className="fa-solid fa-plus text-xl font-black"></i>
          </div>
          <span className="text-[11px] font-black text-blue-400 mt-0.5">إضافة</span>
        </button>

        {/* Drivers (الليفرورات) */}
        <button
          type="button"
          onClick={() => navigateTo('drivers')}
          className={getButtonClass('drivers')}
          title="قائمة الليفرورات"
        >
          <i className="fa-solid fa-motorcycle text-lg"></i>
          <span className="text-[11px]">الليفرورات</span>
        </button>

        {/* Leftmost in RTL: Account (حسابي) */}
        <button
          type="button"
          onClick={() => navigateTo('account')}
          className={getButtonClass('account')}
          title="حسابي"
        >
          <i className="fa-solid fa-user text-lg"></i>
          <span className="text-[11px]">حسابي</span>
        </button>
      </div>
    </nav>
  );
};
