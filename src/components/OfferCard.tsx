import React from 'react';
import { Offer } from '../types';
import { useApp } from '../context/AppContext';
import { makeWhatsAppLink, getCityName } from '../utils/helpers';
import { MOROCCO_CITIES } from '../data/cities';

export const OfferCard: React.FC<{ offer: Offer }> = ({ offer }) => {
  const { navigateTo, checkOnlineAction } = useApp();
  const isClosed = offer.status === 'closed';
  const cityName = getCityName(offer.city);
  const waLink = makeWhatsAppLink(offer.whatsapp, `عرض العمل في "${offer.shopName}"`);

  const handleOpenDeliveryMap = () => {
    const cityObj = MOROCCO_CITIES[offer.city] || MOROCCO_CITIES['fes'] || MOROCCO_CITIES['casablanca'];
    navigateTo('deliveryMap', {
      shopName: offer.shopName,
      shopCity: cityObj.nameAr,
      district: offer.district || 'وسط المدينة',
      price: offer.price,
      cityCoords: cityObj.coords
    });
  };

  const handleCall = (e: React.MouseEvent) => {
    e.preventDefault();
    checkOnlineAction(() => {
      window.location.href = `tel:${offer.phone}`;
    });
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    checkOnlineAction(() => {
      window.open(waLink, '_blank');
    });
  };

  return (
    <div
      className={`p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3 transition-all ${
        isClosed ? 'opacity-70 bg-slate-100/50 dark:bg-slate-900/40' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
              {offer.shopName}
            </h4>
            {isClosed ? (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                مغلق
              </span>
            ) : (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                نشط
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            {offer.shopType || 'محل تجاري'}
          </p>
        </div>

        <span className="inline-flex items-center gap-1 text-xs font-black px-2.5 py-1 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 whitespace-nowrap">
          <span>{offer.price}</span>
          <span className="text-[10px]">درهم</span>
        </span>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 text-xs">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-500/20 font-bold">
          <i className="fa-solid fa-city"></i> {cityName}
        </span>
        {offer.district && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/50 font-semibold">
            <i className="fa-solid fa-location-dot text-blue-600"></i> {offer.district}
          </span>
        )}
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/50 font-semibold">
          <i className="fa-solid fa-motorcycle text-amber-500"></i> {offer.vehicle}
        </span>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/50 font-semibold">
          <i className="fa-solid fa-money-bill-wave text-emerald-500"></i> {offer.paymentType}
        </span>
      </div>

      {/* Description */}
      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50/50 dark:bg-slate-800/40 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800/80">
        {offer.description}
      </p>

      {/* Notes / Perks */}
      {offer.notes && (
        <div className="text-[11px] text-amber-700 dark:text-amber-300 flex items-start gap-1.5 font-medium">
          <i className="fa-solid fa-circle-info mt-0.5"></i>
          <span>{offer.notes}</span>
        </div>
      )}

      {/* Action Buttons */}
      <div className="pt-1 grid grid-cols-3 gap-2">
        <button
          onClick={handleCall}
          className="py-2.5 px-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
        >
          <i className="fa-solid fa-phone text-emerald-600"></i>
          <span>اتصال</span>
        </button>

        <button
          onClick={handleWhatsApp}
          className="py-2.5 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm shadow-emerald-600/20 transition-all active:scale-95 cursor-pointer"
        >
          <i className="fa-brands fa-whatsapp text-sm"></i>
          <span>واتساب</span>
        </button>

        <button
          onClick={handleOpenDeliveryMap}
          className="py-2.5 px-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm shadow-blue-600/20 active:scale-95 transition-all cursor-pointer"
        >
          <i className="fa-solid fa-map-location-dot"></i>
          <span>الخريطة</span>
        </button>
      </div>
    </div>
  );
};
