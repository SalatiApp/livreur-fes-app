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
    <div className="space-y-5">
      {/* Profile Header */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-amber-500 text-white flex items-center justify-center text-2xl font-black shadow-md shrink-0">
          <i className="fa-solid fa-user-gear"></i>
        </div>
        <div>
          <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
            إدارة الحساب والبيانات
          </h2>
          <p className="text-xs text-slate-500">
            الوضع الحالي:{' '}
            <span className="font-bold text-blue-600 dark:text-blue-400">
              {userRole === 'shop' ? 'صاحب محل' : 'ليفرور'}
            </span>
          </p>
        </div>
      </div>

      {/* Default City Selector */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
        <h3 className="text-xs font-extrabold text-slate-900 dark:text-white">
          المدينة الافتراضية للتصفح
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

      {/* Switch Application Mode */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
        <h3 className="text-xs font-extrabold text-slate-900 dark:text-white">
          تبديل وضع التطبيق
        </h3>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setUserRole('shop')}
            className={`py-2.5 px-3 rounded-xl border-2 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              userRole === 'shop'
                ? 'border-blue-600 bg-blue-50 text-blue-600 dark:bg-blue-950/50'
                : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
            }`}
          >
            <i className="fa-solid fa-shop"></i>
            <span>أنا صاحب محل</span>
          </button>

          <button
            onClick={() => setUserRole('driver')}
            className={`py-2.5 px-3 rounded-xl border-2 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              userRole === 'driver'
                ? 'border-amber-500 bg-amber-50 text-amber-600 dark:bg-amber-950/50'
                : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
            }`}
          >
            <i className="fa-solid fa-motorcycle"></i>
            <span>أنا ليفرور</span>
          </button>
        </div>
      </div>

      {/* Manage Offers */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <i className="fa-solid fa-list-check text-blue-600"></i>
            <span>إدارة العروض المسجلة ({offers.length})</span>
          </h3>
        </div>

        <div className="space-y-2 max-h-64 overflow-y-auto pl-1">
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
                    onClick={() => toggleOfferStatus(offer.id)}
                    className={`px-2 py-1 rounded-lg text-[10px] font-bold cursor-pointer ${
                      offer.status === 'open'
                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                        : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                    }`}
                  >
                    {offer.status === 'open' ? 'إغلاق' : 'تنشيط'}
                  </button>

                  <button
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
          منطقة الضبط والتحكم
        </h4>
        <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-normal">
          تفريغ وإعادة ضبط جميع البيانات المحلية المسجلة بالتطبيق واستعادة البيانات الافتراضية.
        </p>
        <button
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
