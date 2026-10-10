import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MOROCCO_CITIES, VEHICLE_TYPES } from '../data/cities';
import { OfferCard } from '../components/OfferCard';

export const OffersPage: React.FC = () => {
  const { offers, userRole, selectedCity, navigateTo } = useApp();
  const isShop = userRole === 'shop';

  const [searchQuery, setSearchQuery] = useState('');
  const [filterCity, setFilterCity] = useState('');
  const [filterDistrict, setFilterDistrict] = useState('');
  const [filterVehicle, setFilterVehicle] = useState('');
  const [filterPayment, setFilterPayment] = useState('');

  // Active city for districts
  const activeCityKey = filterCity || (selectedCity !== 'all' ? selectedCity : '');
  const selectedCityObj = activeCityKey ? MOROCCO_CITIES[activeCityKey] : null;
  const availableDistricts = selectedCityObj ? selectedCityObj.districts : [];

  const filteredOffers = offers.filter((offer) => {
    const matchesGlobalCity = selectedCity === 'all' || offer.city === selectedCity;
    const matchesSelectedCity = !filterCity || offer.city === filterCity;
    const matchesDistrict = !filterDistrict || offer.district === filterDistrict;
    const matchesVehicle = !filterVehicle || offer.vehicle === filterVehicle;
    const matchesPayment = !filterPayment || offer.paymentType.includes(filterPayment);
    const matchesSearch =
      !searchQuery ||
      offer.shopName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      offer.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (offer.district && offer.district.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
      matchesGlobalCity &&
      matchesSelectedCity &&
      matchesDistrict &&
      matchesVehicle &&
      matchesPayment &&
      matchesSearch
    );
  });

  const resetFilters = () => {
    setFilterCity('');
    setFilterDistrict('');
    setFilterVehicle('');
    setFilterPayment('');
    setSearchQuery('');
  };

  const hasActiveFilters = Boolean(
    filterCity || filterDistrict || filterVehicle || filterPayment || searchQuery
  );

  return (
    <div className="space-y-4">
      {/* Title & Action */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">
            عروض العمل بالتوصيل
          </h2>
          <p className="text-xs text-slate-500">
            تصفح الفرص في مدينتك وتواصل فوراً
          </p>
        </div>
        <button
          onClick={() =>
            navigateTo('create', { mode: isShop ? 'offer' : 'driver' })
          }
          className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm whitespace-nowrap active:scale-95 transition-all cursor-pointer"
        >
          <i className="fa-solid fa-plus text-xs"></i>
          <span>{isShop ? 'نشر عرض' : 'تسجّل كليفرور'}</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative">
        <i className="fa-solid fa-magnifying-glass absolute right-3.5 top-3.5 text-slate-400 text-sm"></i>
        <input
          type="text"
          placeholder="ابحث باسم المحل، الحي، أو الخدمة..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-10 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:border-blue-500 shadow-sm"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute left-3 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
          >
            <i className="fa-solid fa-circle-xmark text-sm"></i>
          </button>
        )}
      </div>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-400">
          <span className="flex items-center gap-1.5">
            <i className="fa-solid fa-sliders text-blue-600"></i> تصفية حسب المدينة والحي
          </span>
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-red-500 hover:underline text-[11px] cursor-pointer"
            >
              إعادة التعيين
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {/* City */}
          <select
            value={filterCity}
            onChange={(e) => {
              setFilterCity(e.target.value);
              setFilterDistrict('');
            }}
            className="w-full text-xs font-semibold py-2 px-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
          >
            <option value="">كل المدن</option>
            {Object.keys(MOROCCO_CITIES)
              .filter((k) => k !== 'all')
              .map((k) => (
                <option key={k} value={k}>
                  {MOROCCO_CITIES[k].nameAr}
                </option>
              ))}
          </select>

          {/* District */}
          <select
            value={filterDistrict}
            onChange={(e) => setFilterDistrict(e.target.value)}
            className="w-full text-xs font-semibold py-2 px-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
          >
            <option value="">كل الأحياء</option>
            {availableDistricts.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          {/* Vehicle */}
          <select
            value={filterVehicle}
            onChange={(e) => setFilterVehicle(e.target.value)}
            className="w-full text-xs font-semibold py-2 px-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
          >
            <option value="">كل المركبات</option>
            {VEHICLE_TYPES.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>

          {/* Payment Type */}
          <select
            value={filterPayment}
            onChange={(e) => setFilterPayment(e.target.value)}
            className="w-full text-xs font-semibold py-2 px-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
          >
            <option value="">نوع الدفع</option>
            <option value="يومي">يومي</option>
            <option value="بالتوصيلة">بالتوصيلة</option>
            <option value="شهري">شهري</option>
          </select>
        </div>
      </div>

      {/* Cards List */}
      <div className="space-y-3.5">
        {filteredOffers.length > 0 ? (
          filteredOffers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))
        ) : (
          <div className="text-center py-12 px-4 rounded-3xl bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-800">
            <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-500 flex items-center justify-center text-2xl">
              <i className="fa-solid fa-folder-open"></i>
            </div>
            <h4 className="font-extrabold text-sm text-slate-800 dark:text-slate-200 mb-1">
              ما كاين حتى عرض مطابق لبحثك حالياً
            </h4>
            <p className="text-xs text-slate-500 max-w-xs mx-auto mb-4">
              جرب تغيير المدينة أو الحي، أو قم بنشر عرض جديد الآن.
            </p>
            <button
              onClick={resetFilters}
              className="text-xs font-bold px-4 py-2 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-300 active:scale-95 transition-all cursor-pointer"
            >
              عرض جميع العروض
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
