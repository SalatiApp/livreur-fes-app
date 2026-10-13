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
    const cityObj = MOROCCO_CITIES[offer.city] || MOROCCO_CITIES['casablanca'] || MOROCCO_CITIES['all'];
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
      dir="rtl"
      className={`p-4 rounded-2xl bg-[#09152b] border border-blue-900/40 shadow-lg space-y-3 transition-all ${
        isClosed ? 'opacity-70 border-slate-800' : 'hover:border-blue-600/50'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-amber-500/15 text-amber-500 flex items-center justify-center text-lg shadow-sm shrink-0">
            <i className="fa-solid fa-store"></i>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-black text-sm text-white">
                {offer.shopName}
              </h4>
              {isClosed ? (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                  مغلق
                </span>
              ) : (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
                  نشط
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-400 font-medium mt-0.5">
              {offer.shopType || 'محل تجاري'}
            </p>
          </div>
        </div>

        {/* Price Tag */}
        <span className="inline-flex items-center gap-1 text-xs font-black px-2.5 py-1 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30 whitespace-nowrap">
          <span>{offer.price}</span>
          <span className="text-[10px]">درهم</span>
        </span>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 text-xs">
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-950/60 text-blue-300 border border-blue-500/20 font-bold text-[11px]">
          <i className="fa-solid fa-city text-blue-400"></i> {cityName}
        </span>
        {offer.district && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 text-slate-300 border border-slate-800 font-semibold text-[11px]">
            <i className="fa-solid fa-location-dot text-blue-400"></i> {offer.district}
          </span>
        )}
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 text-slate-300 border border-slate-800 font-semibold text-[11px]">
          <i className="fa-solid fa-motorcycle text-amber-400"></i> {offer.vehicle}
        </span>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 text-slate-300 border border-slate-800 font-semibold text-[11px]">
          <i className="fa-solid fa-money-bill-wave text-emerald-400"></i> {offer.paymentType}
        </span>
      </div>

      {/* Description */}
      <p className="text-xs text-slate-300 leading-relaxed bg-[#050d1c] p-3 rounded-xl border border-blue-950/50">
        {offer.description}
      </p>

      {/* Notes / Perks */}
      {offer.notes && (
        <div className="text-[11px] text-amber-300 flex items-start gap-1.5 font-medium">
          <i className="fa-solid fa-circle-info mt-0.5 text-amber-400"></i>
          <span>{offer.notes}</span>
        </div>
      )}

      {/* Action Buttons: 3 clean buttons */}
      <div className="pt-1 grid grid-cols-3 gap-2">
        <button
          onClick={handleCall}
          className="py-2.5 px-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer border border-slate-700/50"
        >
          <i className="fa-solid fa-phone text-emerald-400"></i>
          <span>اتصال</span>
        </button>

        <button
          onClick={handleWhatsApp}
          className="py-2.5 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-emerald-900/30 transition-all active:scale-95 cursor-pointer"
        >
          <i className="fa-brands fa-whatsapp text-sm"></i>
          <span>واتساب</span>
        </button>

        <button
          onClick={handleOpenDeliveryMap}
          className="py-2.5 px-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-blue-900/30 active:scale-95 transition-all cursor-pointer"
        >
          <i className="fa-solid fa-map-location-dot"></i>
          <span>الخريطة</span>
        </button>
      </div>
    </div>
  );
};
