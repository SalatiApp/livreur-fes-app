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
    <div className="space-y-6" dir="rtl">
      {/* 1. Top Action Hero Card with Royal Blue Gradient */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 p-4 shadow-xl">
        <div className="relative z-10 flex items-center justify-between gap-3">
          {/* Action Button: Yellow / Amber CTA */}
          <button
            type="button"
            onClick={() =>
              navigateTo('create', { mode: isShop ? 'offer' : 'driver' })
            }
            className="flex-1 py-3 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <i className="fa-solid fa-plus text-xs"></i>
            <span>{isShop ? 'نشر عرض جديد' : 'تسجّل كليفرور'}</span>
          </button>

          {/* City Selector: Dark navy rounded button with chevron */}
          <div className="relative flex-1">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full py-3 pr-4 pl-9 bg-[#0b1b36] hover:bg-[#10274e] text-white font-extrabold text-xs sm:text-sm rounded-xl border border-blue-400/30 shadow-md focus:outline-none cursor-pointer appearance-none text-center truncate"
            >
              {Object.keys(MOROCCO_CITIES).map((key) => (
                <option key={key} value={key} className="bg-slate-900 text-white">
                  {MOROCCO_CITIES[key].nameAr}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/80 text-xs">
              <i className="fa-solid fa-chevron-down"></i>
            </div>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
      </div>

      {/* 2. Main Exploration Section: "شنو كتقلب عليه؟" */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-compass text-blue-500 text-base"></i>
          <h2 className="text-base font-black text-white tracking-wide">
            شنو كتقلب عليه؟
          </h2>
        </div>

        {/* Two prominent dark cards side by side */}
        <div className="grid grid-cols-2 gap-3.5">
          {/* Card 1: عروض المحلات (Shop Offers) */}
          <div
            onClick={() => navigateTo('offers')}
            className="cursor-pointer group p-4 rounded-2xl bg-[#09152b] border border-blue-900/40 hover:border-blue-600/60 shadow-lg transition-all active:scale-98 flex flex-col justify-between min-h-[175px]"
          >
            {/* Top icon: Rounded Square with Store Icon */}
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-500 flex items-center justify-center text-xl mb-3 shadow-sm">
              <i className="fa-solid fa-store"></i>
            </div>

            <div>
              <h3 className="font-black text-sm text-white mb-1">
                عروض المحلات
              </h3>
              <p className="text-[11px] text-slate-400 leading-tight">
                لليفرورات للعثور على فرص عمل وتوصيل
              </p>
            </div>

            <div className="mt-4 text-xs font-black text-amber-500 flex items-center gap-1.5">
              <span>تصفح العروض</span>
              <i className="fa-solid fa-arrow-left text-[11px]"></i>
            </div>
          </div>

          {/* Card 2: قائمة الليفرورات (Drivers List) */}
          <div
            onClick={() => navigateTo('drivers')}
            className="cursor-pointer group p-4 rounded-2xl bg-[#09152b] border border-blue-900/40 hover:border-blue-600/60 shadow-lg transition-all active:scale-98 flex flex-col justify-between min-h-[175px]"
          >
            {/* Top icon: White rounded container with blue motorcycle */}
            <div className="w-12 h-12 rounded-2xl bg-white text-blue-600 flex items-center justify-center text-xl mb-3 shadow-md">
              <i className="fa-solid fa-motorcycle"></i>
            </div>

            <div>
              <h3 className="font-black text-sm text-white mb-1">
                قائمة الليفرورات
              </h3>
              <p className="text-[11px] text-slate-400 leading-tight">
                لأصحاب المحلات للبحث عن سائق متوفر
              </p>
            </div>

            <div className="mt-4 text-xs font-black text-blue-400 flex items-center gap-1.5">
              <span>عرض الليفرورات</span>
              <i className="fa-solid fa-arrow-left text-[11px]"></i>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Live Statistics Counters: 3 square rounded dark cards */}
      <div className="grid grid-cols-3 gap-2.5">
        {/* Offers Count */}
        <div className="bg-[#09152b] py-3.5 px-2 rounded-2xl border border-blue-900/30 text-center shadow-md">
          <span className="block text-2xl font-black text-blue-500 leading-tight mb-1">
            {activeOffersCount}
          </span>
          <span className="text-[11px] font-bold text-slate-300">
            عروض العمل
          </span>
        </div>

        {/* Available Drivers Count */}
        <div className="bg-[#09152b] py-3.5 px-2 rounded-2xl border border-blue-900/30 text-center shadow-md">
          <span className="block text-2xl font-black text-amber-500 leading-tight mb-1">
            {availableDriversCount}
          </span>
          <span className="text-[11px] font-bold text-slate-300">
            ليفرورات جاهزون
          </span>
        </div>

        {/* Moroccan Cities Count */}
        <div className="bg-[#09152b] py-3.5 px-2 rounded-2xl border border-blue-900/30 text-center shadow-md">
          <span className="block text-2xl font-black text-emerald-400 leading-tight mb-1">
            {citiesCount}
          </span>
          <span className="text-[11px] font-bold text-slate-300">
            مدينة مغربية
          </span>
        </div>
      </div>

      {/* 4. Interactive Map Section */}
      <MapView />

      {/* 5. Recent Activity List Based on User Role */}
      {isShop ? (
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <i className="fa-solid fa-motorcycle text-blue-400"></i>
              <span>
                الليفرورات المتوفرون حالياً{' '}
                {selectedCity !== 'all' ? `في ${getCityName(selectedCity)}` : ''}
              </span>
            </h3>
            <button
              type="button"
              onClick={() => navigateTo('drivers')}
              className="text-xs font-bold text-blue-400 hover:text-blue-300 hover:underline cursor-pointer"
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
              <p className="text-xs text-slate-400 text-center py-6 bg-[#09152b] rounded-2xl border border-slate-800">
                لا يوجد ليفرورات متوفرون حالياً في هذه المدينة.
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <i className="fa-solid fa-fire text-amber-500"></i>
              <span>
                أحدث العروض المطلوبة{' '}
                {selectedCity !== 'all' ? `في ${getCityName(selectedCity)}` : ''}
              </span>
            </h3>
            <button
              type="button"
              onClick={() => navigateTo('offers')}
              className="text-xs font-bold text-amber-500 hover:text-amber-400 hover:underline cursor-pointer"
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
              <p className="text-xs text-slate-400 text-center py-6 bg-[#09152b] rounded-2xl border border-slate-800">
                لا توجد عروض محلات حالياً في هذه المدينة.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
