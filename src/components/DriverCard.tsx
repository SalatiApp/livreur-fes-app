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
    <div dir="rtl" className="p-4 rounded-2xl bg-[#09152b] border border-blue-900/40 shadow-lg space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-white text-blue-600 flex items-center justify-center text-lg font-black shadow-md shrink-0">
            <i className="fa-solid fa-motorcycle"></i>
          </div>
          <div>
            <h4 className="font-black text-sm text-white">
              {driver.name}
            </h4>
            <p className="text-[11px] text-slate-400 font-medium mt-0.5">
              📍 {cityName} {driver.district ? `• ${driver.district}` : ''}
            </p>
          </div>
        </div>

        {driver.isAvailable ? (
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>متاح الآن</span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 whitespace-nowrap">
            غير متاح
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-2 text-xs">
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 text-slate-300 border border-slate-800 font-semibold text-[11px]">
          <i className="fa-solid fa-motorcycle text-amber-400"></i> {driver.vehicle}
        </span>
        {driver.freeHours && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 text-slate-300 border border-slate-800 font-semibold text-[11px]">
            <i className="fa-regular fa-clock text-blue-400"></i> {driver.freeHours}
          </span>
        )}
      </div>

      {driver.experience && (
        <div className="text-xs text-slate-300 leading-relaxed bg-[#050d1c] p-2.5 rounded-xl border border-blue-950/50">
          <span className="font-bold text-white">الخبرة:</span> {driver.experience}
        </div>
      )}

      {driver.notes && (
        <p className="text-[11px] text-slate-400 italic">
          "{driver.notes}"
        </p>
      )}

      <div className="pt-1 grid grid-cols-2 gap-2">
        <button
          onClick={handleCall}
          className="py-2.5 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer border border-slate-700/50"
        >
          <i className="fa-solid fa-phone text-emerald-400"></i>
          <span>اتصال هاتفي</span>
        </button>

        <button
          onClick={handleWhatsApp}
          className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-emerald-900/30 transition-all active:scale-95 cursor-pointer"
        >
          <i className="fa-brands fa-whatsapp text-base"></i>
          <span>واتساب WhatsApp</span>
        </button>
      </div>
    </div>
  );
};
