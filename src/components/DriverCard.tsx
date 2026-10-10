import React from 'react';
import { Driver } from '../types';
import { useApp } from '../context/AppContext';
import { makeWhatsAppLink, getCityName } from '../utils/helpers';

export const DriverCard: React.FC<{ driver: Driver }> = ({ driver }) => {
  const { checkOnlineAction } = useApp();
  const cityName = getCityName(driver.city);
  const waLink = makeWhatsAppLink(driver.whatsapp, `خدمات التوصيل مع الليفرور "${driver.name}"`);

  const handleCall = (e: React.MouseEvent) => {
    e.preventDefault();
    checkOnlineAction(() => {
      window.location.href = `tel:${driver.phone}`;
    });
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    checkOnlineAction(() => {
      window.open(waLink, '_blank');
    });
  };

  return (
    <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-700 to-blue-500 text-white flex items-center justify-center text-base font-black shadow-sm shrink-0">
            <i className="fa-solid fa-motorcycle"></i>
          </div>
          <div>
            <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
              {driver.name}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              📍 {cityName} {driver.district ? `• ${driver.district}` : ''}
            </p>
          </div>
        </div>

        {driver.isAvailable ? (
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>متاح الآن</span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 whitespace-nowrap">
            غير متاح
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-2 text-xs">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/50 font-semibold">
          <i className="fa-solid fa-motorcycle text-amber-500"></i> {driver.vehicle}
        </span>
        {driver.freeHours && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/50 font-semibold">
            <i className="fa-regular fa-clock text-blue-600"></i> {driver.freeHours}
          </span>
        )}
      </div>

      {driver.experience && (
        <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800/60">
          <span className="font-bold text-slate-800 dark:text-slate-200">الخبرة:</span>{' '}
          {driver.experience}
        </div>
      )}

      {driver.notes && (
        <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
          "{driver.notes}"
        </p>
      )}

      <div className="pt-1 grid grid-cols-2 gap-2">
        <button
          onClick={handleCall}
          className="py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
        >
          <i className="fa-solid fa-phone text-emerald-600"></i>
          <span>اتصال هاتفي</span>
        </button>

        <button
          onClick={handleWhatsApp}
          className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm shadow-emerald-600/20 transition-all active:scale-95 cursor-pointer"
        >
          <i className="fa-brands fa-whatsapp text-sm"></i>
          <span>واتساب WhatsApp</span>
        </button>
      </div>
    </div>
  );
};
