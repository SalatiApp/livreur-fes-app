import React from 'react';
import { useApp } from '../context/AppContext';
import { MOROCCO_CITIES } from '../data/cities';
import { getCityName } from '../utils/helpers';

export const AccountPage: React.FC = () => {
  const {
    userRole,
    setUserRole,
    selectedCity,
    setSelectedCity,
    theme,
    toggleTheme,
    offers,
    toggleOfferStatus,
    deleteOffer,
    showConfirm,
    resetAllData
  } = useApp();

  const handleDeleteOffer = (id: string, name: string) => {
    showConfirm(
      'حذف العرض',
      `هل أنت متأكد من رغبتك في حذف عرض "${name}" نهائياً من المنصة؟`,
      () => deleteOffer(id),
      true
    );
  };

  const handleResetData = () => {
    showConfirm(
      'مسح وإعادة ضبط البيانات',
      'سيتم مسح وتفريغ قائمة العروض والسائقين والتخزين المؤقت واستعادة البيانات الأساسية للمنصة.',
      () => resetAllData(),
      true
    );
  };

  return (
    <div className="space-y-4" dir="rtl">
      {/* Profile Header Card */}
      <div className="bg-[#09152b] p-4 sm:p-5 rounded-2xl border border-blue-900/40 shadow-lg flex items-center gap-3.5">
        <div className="w-13 h-13 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-xl font-black shadow-md shrink-0">
          <i className="fa-solid fa-user-gear"></i>
        </div>
        <div>
          <h2 className="text-base font-black text-white">
            إدارة الحساب والمنصة
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            الوضع النشط حالياً:{' '}
            <span className="font-extrabold text-blue-400">
              {userRole === 'shop' ? 'صاحب محل' : 'ليفرور'}
            </span>
          </p>
        </div>
      </div>

      {/* Switch Application Mode */}
      <div className="bg-[#09152b] p-4 rounded-2xl border border-blue-900/40 shadow-lg space-y-2.5">
        <h3 className="text-xs font-black text-white flex items-center gap-2">
          <i className="fa-solid fa-repeat text-blue-400"></i>
          <span>تبديل نوع الاستخدام</span>
        </h3>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setUserRole('shop')}
            className={`py-3 px-3 rounded-xl border-2 text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer ${
              userRole === 'shop'
                ? 'border-blue-500 bg-blue-600/30 text-white shadow-md'
                : 'border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <i className="fa-solid fa-store"></i>
            <span>أنا صاحب محل</span>
          </button>
          <button
            type="button"
            onClick={() => setUserRole('driver')}
            className={`py-3 px-3 rounded-xl border-2 text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer ${
              userRole === 'driver'
                ? 'border-amber-500 bg-amber-500/30 text-amber-300 shadow-md'
                : 'border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <i className="fa-solid fa-motorcycle"></i>
            <span>أنا ليفرور</span>
          </button>
        </div>
      </div>

      {/* Theme Setting */}
      <div className="bg-[#09152b] p-4 rounded-2xl border border-blue-900/40 shadow-lg flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-sm border border-slate-800">
            {theme === 'dark' ? '🌙' : '☀️'}
          </div>
          <div>
            <h4 className="text-xs font-black text-white">
              مظهر التطبيق
            </h4>
            <p className="text-[10px] text-slate-400">
              {theme === 'dark' ? 'الوضع الليلي مفعّل' : 'الوضع النهاري مفعّل'}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={toggleTheme}
          className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-all cursor-pointer border border-slate-700/60"
        >
          {theme === 'dark' ? 'تحويل لنهاري ☀️' : 'تحويل لليلي 🌙'}
        </button>
      </div>

      {/* Default City Selector */}
      <div className="bg-[#09152b] p-4 rounded-2xl border border-blue-900/40 shadow-lg space-y-2">
        <h3 className="text-xs font-black text-white flex items-center gap-2">
          <i className="fa-solid fa-city text-emerald-400"></i>
          <span>المدينة الافتراضية للتصفح</span>
        </h3>
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="w-full text-xs font-bold py-2.5 px-3 rounded-xl bg-[#050d1c] border border-blue-900/50 text-white focus:outline-none cursor-pointer"
        >
          {Object.keys(MOROCCO_CITIES).map((key) => (
            <option key={key} value={key} className="bg-slate-900">
              {MOROCCO_CITIES[key].nameAr}
            </option>
          ))}
        </select>
      </div>

      {/* Manage Offers */}
      <div className="bg-[#09152b] p-4 rounded-2xl border border-blue-900/40 shadow-lg space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black text-white flex items-center gap-2">
            <i className="fa-solid fa-list-check text-blue-400"></i>
            <span>إدارة العروض المسجلة ({offers.length})</span>
          </h3>
        </div>

        <div className="space-y-2 max-h-56 overflow-y-auto pl-1">
          {offers.length > 0 ? (
            offers.map((offer) => (
              <div
                key={offer.id}
                className="p-3 rounded-xl bg-[#050d1c] border border-blue-950 flex items-center justify-between text-xs"
              >
                <div>
                  <h5 className="font-black text-white">
                    {offer.shopName}
                  </h5>
                  <span className="text-[10px] text-slate-400">
                    {getCityName(offer.city)} • {offer.district || 'وسط المدينة'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => toggleOfferStatus(offer.id)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer ${
                      offer.status === 'open'
                        ? 'bg-amber-950 text-amber-300 border border-amber-600/40'
                        : 'bg-emerald-950 text-emerald-300 border border-emerald-600/40'
                    }`}
                  >
                    {offer.status === 'open' ? 'إغلاق' : 'تنشيط'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteOffer(offer.id, offer.shopName)}
                    className="w-7 h-7 rounded-lg bg-red-950/80 border border-red-800/50 text-red-400 flex items-center justify-center cursor-pointer active:scale-95"
                    title="حذف"
                  >
                    <i className="fa-solid fa-trash text-xs"></i>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-xs text-slate-400 text-center py-4">
              لا توجد عروض مسجلة بحسابك حالياً.
            </p>
          )}
        </div>
      </div>

      {/* Reset Platform Data */}
      <div className="p-4 rounded-2xl bg-red-950/20 border border-red-900/40 space-y-2.5">
        <h4 className="text-xs font-bold text-red-400">
          منطقة الضبط وإعادة التعيين
        </h4>
        <p className="text-[11px] text-slate-400 leading-normal">
          تفريغ التخزين المؤقت واستعادة بيانات وعروض المنصة الأولية.
        </p>
        <button
          type="button"
          onClick={handleResetData}
          className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-md active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5"
        >
          <i className="fa-solid fa-rotate-left"></i>
          <span>مسح وإعادة ضبط البيانات</span>
        </button>
      </div>
    </div>
  );
};
