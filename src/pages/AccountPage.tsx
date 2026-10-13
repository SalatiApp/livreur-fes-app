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
    <div className="space-y-4">
      {/* Profile Header Card */}
      <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-3.5">
        <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-blue-700 to-blue-500 text-white flex items-center justify-center text-xl font-black shadow-md shrink-0">
          <i className="fa-solid fa-user-gear"></i>
        </div>
        <div>
          <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
            إدارة الحساب والمنصة
          </h2>
          <p className="text-xs text-slate-500">
            الوضع النشط حالياً:{' '}
            <span className="font-extrabold text-blue-600 dark:text-blue-400">
              {userRole === 'shop' ? 'صاحب محل' : 'ليفرور'}
            </span>
          </p>
        </div>
      </div>

      {/* Switch Application Mode */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2.5">
        <h3 className="text-xs font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <i className="fa-solid fa-repeat text-blue-600"></i>
          <span>تبديل نوع الاستخدام</span>
        </h3>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setUserRole('shop')}
            className={`py-3 px-3 rounded-2xl border-2 text-xs font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              userRole === 'shop'
                ? 'border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300'
                : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
            }`}
          >
            <i className="fa-solid fa-store"></i>
            <span>أنا صاحب محل</span>
          </button>
          <button
            type="button"
            onClick={() => setUserRole('driver')}
            className={`py-3 px-3 rounded-2xl border-2 text-xs font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              userRole === 'driver'
                ? 'border-amber-500 bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
            }`}
          >
            <i className="fa-solid fa-motorcycle"></i>
            <span>أنا ليفرور</span>
          </button>
        </div>
      </div>

      {/* Theme Setting */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-sm">
            {theme === 'dark' ? '🌙' : '☀️'}
          </div>
          <div>
            <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">
              مظهر التطبيق
            </h4>
            <p className="text-[10px] text-slate-500">
              {theme === 'dark' ? 'الوضع الليلي مفعّل' : 'الوضع النهاري مفعّل'}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={toggleTheme}
          className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-all cursor-pointer"
        >
          {theme === 'dark' ? 'تحويل لنهاري ☀️' : 'تحويل لليلي 🌙'}
        </button>
      </div>

      {/* Default City Selector */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
        <h3 className="text-xs font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <i className="fa-solid fa-city text-emerald-600"></i>
          <span>المدينة الافتراضية للتصفح</span>
        </h3>
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="w-full text-xs font-bold py-2.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
        >
          {Object.keys(MOROCCO_CITIES).map((key) => (
            <option key={key} value={key}>
              {MOROCCO_CITIES[key].nameAr}
            </option>
          ))}
        </select>
      </div>

      {/* Manage Offers */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <i className="fa-solid fa-list-check text-blue-600"></i>
            <span>إدارة العروض المسجلة ({offers.length})</span>
          </h3>
        </div>

        <div className="space-y-2 max-h-56 overflow-y-auto pl-1">
          {offers.length > 0 ? (
            offers.map((offer) => (
              <div
                key={offer.id}
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between text-xs"
              >
                <div>
                  <h5 className="font-bold text-slate-900 dark:text-white">
                    {offer.shopName}
                  </h5>
                  <span className="text-[10px] text-slate-500">
                    {getCityName(offer.city)} • {offer.district || 'وسط المدينة'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => toggleOfferStatus(offer.id)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer ${
                      offer.status === 'open'
                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                        : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                    }`}
                  >
                    {offer.status === 'open' ? 'إغلاق' : 'تنشيط'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteOffer(offer.id, offer.shopName)}
                    className="w-7 h-7 rounded-lg bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 flex items-center justify-center cursor-pointer active:scale-95"
                    title="حذف"
                  >
                    <i className="fa-solid fa-trash text-xs"></i>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-xs text-slate-500 text-center py-2">
              لا توجد عروض مسجلة بحسابك حالياً.
            </p>
          )}
        </div>
      </div>

      {/* Reset Platform Data */}
      <div className="p-4 rounded-3xl bg-red-50/50 dark:bg-red-950/20 border border-red-200/60 dark:border-red-900/40 space-y-2.5">
        <h4 className="text-xs font-bold text-red-700 dark:text-red-400">
          منطقة الضبط وإعادة التعيين
        </h4>
        <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-normal">
          تفريغ التخزين المؤقت واستعادة بيانات وعروض المنصة الأولية.
        </p>
        <button
          type="button"
          onClick={handleResetData}
          className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-sm active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5"
        >
          <i className="fa-solid fa-rotate-left"></i>
          <span>مسح وإعادة ضبط البيانات</span>
        </button>
      </div>
    </div>
  );
};
