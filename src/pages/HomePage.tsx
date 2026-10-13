import React from 'react';
import { useApp } from '../context/AppContext';
import { MOROCCO_CITIES } from '../data/cities';
import { MapView } from '../components/MapView';
import { OfferCard } from '../components/OfferCard';
import { DriverCard } from '../components/DriverCard';
import { getCityName } from '../utils/helpers';

export const HomePage: React.FC = () => {
  const { userRole, selectedCity, setSelectedCity, offers, drivers, navigateTo } = useApp();

  const isShop = userRole === 'shop';

  const filteredOffers =
    selectedCity === 'all'
      ? offers
      : offers.filter((o) => o.city === selectedCity);

  const filteredDrivers =
    selectedCity === 'all'
      ? drivers
      : drivers.filter((d) => d.city === selectedCity);

  const activeOffersCount = filteredOffers.filter((o) => o.status === 'open').length;
  const availableDriversCount = filteredDrivers.filter((d) => d.isAvailable).length;
  const citiesCount = Object.keys(MOROCCO_CITIES).length - 1;

  return (
    <div className="space-y-5">
      {/* Hero Banner with Moroccan Identity & Dynamic Role Content */}
      <div
        className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${
          isShop
            ? 'from-blue-950 via-blue-900 to-blue-800'
            : 'from-amber-950 via-amber-900 to-amber-800'
        } text-white p-5 shadow-lg border border-white/10`}
      >
        <div className="relative z-10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-white/10 text-amber-300 border border-white/15 backdrop-blur-sm">
              <i className={`fa-solid ${isShop ? 'fa-store' : 'fa-motorcycle'} text-[10px]`}></i>
              <span>
                {isShop
                  ? 'أنت في وضع: صاحب محل / مطعم'
                  : 'أنت في وضع: ليفرور (سائق توصيل)'}
              </span>
            </span>
          </div>

          <div>
            <h2 className="text-lg font-black leading-snug">
              {isShop
                ? 'ابحث عن ليفرورات متوفرين للتوصيل'
                : 'ابحث عن عروض عمل وفرص توصيل'}
            </h2>
            <p className="text-xs text-slate-200/90 font-medium mt-1 leading-normal">
              {isShop
                ? 'تواصل مباشرة مع سائقي التوصيل في مدينتك بكل سرعة وسهولة وبدون وسيط.'
                : 'تصفح طلبات التوصيل اليومية والشهرية واشتغل مع أفضل المحلات والمطاعم.'}
            </p>
          </div>

          {/* Action Row: CTA Button + City Selector */}
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            {/* Main Action Button */}
            <button
              type="button"
              onClick={() =>
                navigateTo('create', { mode: isShop ? 'offer' : 'driver' })
              }
              className="w-full py-2.5 px-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5 h-10 cursor-pointer"
            >
              <i className="fa-solid fa-plus text-[11px]"></i>
              <span className="truncate">{isShop ? 'نشر عرض جديد' : 'تسجّل كليفرور'}</span>
            </button>

            {/* City Selector */}
            <div className="relative w-full">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full py-2.5 pl-7 pr-3 bg-[#141e2e]/90 hover:bg-[#1a273b] text-amber-300 font-extrabold text-xs rounded-xl border border-slate-700/80 shadow-md focus:outline-none cursor-pointer appearance-none text-center h-10 truncate"
              >
                {Object.keys(MOROCCO_CITIES).map((key) => (
                  <option key={key} value={key} className="bg-slate-900 text-white">
                    {MOROCCO_CITIES[key].nameAr}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-amber-400 text-[10px] font-black">
                <i className="fa-solid fa-chevron-down"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute -left-6 -bottom-6 text-white/5 text-8xl pointer-events-none select-none">
          <i className={`fa-solid ${isShop ? 'fa-store' : 'fa-motorcycle'}`}></i>
        </div>
      </div>

      {/* Exploration Cards */}
      <div className="space-y-2.5">
        <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <i className="fa-solid fa-compass text-blue-600 dark:text-blue-400"></i>
          <span>شنو كتقلب عليه؟</span>
        </h3>

        <div className="grid grid-cols-2 gap-3">
          <div
            onClick={() => navigateTo('drivers')}
            className="cursor-pointer group p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:border-blue-500 transition-all active:scale-98"
          >
            <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center text-lg mb-2.5 group-hover:scale-105 transition-transform">
              <i className="fa-solid fa-motorcycle"></i>
            </div>
            <h4 className="font-extrabold text-sm text-slate-900 dark:text-white mb-0.5">
              قائمة الليفرورات
            </h4>
            <p className="text-[10.5px] text-slate-500 dark:text-slate-400 leading-tight">
              لأصحاب المحلات للبحث عن سائق متوفر
            </p>
            <div className="mt-2.5 text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
              <span>عرض الليفرورات</span>
              <i className="fa-solid fa-arrow-left text-[10px]"></i>
            </div>
          </div>

          <div
            onClick={() => navigateTo('offers')}
            className="cursor-pointer group p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:border-amber-500 transition-all active:scale-98"
          >
            <div className="w-11 h-11 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-500 flex items-center justify-center text-lg mb-2.5 group-hover:scale-105 transition-transform">
              <i className="fa-solid fa-store"></i>
            </div>
            <h4 className="font-extrabold text-sm text-slate-900 dark:text-white mb-0.5">
              عروض المحلات
            </h4>
            <p className="text-[10.5px] text-slate-500 dark:text-slate-400 leading-tight">
              لليفرورات للعثور على فرص عمل وتوصيل
            </p>
            <div className="mt-2.5 text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
              <span>تصفح العروض</span>
              <i className="fa-solid fa-arrow-left text-[10px]"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Live Statistics Counters */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-center shadow-sm">
          <span className="block text-xl font-black text-blue-600 dark:text-blue-400 leading-tight">
            {activeOffersCount}
          </span>
          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
            عروض العمل
          </span>
        </div>
        <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-center shadow-sm">
          <span className="block text-xl font-black text-amber-500 leading-tight">
            {availableDriversCount}
          </span>
          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
            ليفرورات جاهزون
          </span>
        </div>
        <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-center shadow-sm">
          <span className="block text-xl font-black text-emerald-600 dark:text-emerald-400 leading-tight">
            {citiesCount}
          </span>
          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
            مدينة مغربية
          </span>
        </div>
      </div>

      {/* Interactive Map */}
      <MapView />

      {/* Highlights Section Based on Selected Role */}
      {isShop ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <i className="fa-solid fa-motorcycle text-blue-500"></i>
              <span>
                الليفرورات المتوفرون حالياً{' '}
                {selectedCity !== 'all' ? `في ${getCityName(selectedCity)}` : ''}
              </span>
            </h3>
            <button
              type="button"
              onClick={() => navigateTo('drivers')}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
            >
              رؤية الكل ({filteredDrivers.length})
            </button>
          </div>

          <div className="space-y-3">
            {filteredDrivers.length > 0 ? (
              filteredDrivers.slice(0, 3).map((driver) => (
                <DriverCard key={driver.id} driver={driver} />
              ))
            ) : (
              <p className="text-xs text-slate-500 text-center py-4 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800">
                لا يوجد ليفرورات متوفرون حالياً في هذه المدينة.
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <i className="fa-solid fa-fire text-amber-500"></i>
              <span>
                أحدث العروض المطلوبة{' '}
                {selectedCity !== 'all' ? `في ${getCityName(selectedCity)}` : ''}
              </span>
            </h3>
            <button
              type="button"
              onClick={() => navigateTo('offers')}
              className="text-xs font-bold text-amber-500 hover:underline cursor-pointer"
            >
              رؤية الكل ({filteredOffers.length})
            </button>
          </div>

          <div className="space-y-3">
            {filteredOffers.length > 0 ? (
              filteredOffers.slice(0, 3).map((offer) => (
                <OfferCard key={offer.id} offer={offer} />
              ))
            ) : (
              <p className="text-xs text-slate-500 text-center py-4 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800">
                لا توجد عروض محلات حالياً في هذه المدينة.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
