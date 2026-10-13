import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MOROCCO_CITIES, VEHICLE_TYPES } from '../data/cities';
import { DriverCard } from '../components/DriverCard';

export const DriversPage: React.FC = () => {
  const { drivers, selectedCity, navigateTo, userRole } = useApp();
  const isShop = userRole === 'shop';

  const [searchQuery, setSearchQuery] = useState('');
  const [filterCity, setFilterCity] = useState('');
  const [filterDistrict, setFilterDistrict] = useState('');
  const [filterVehicle, setFilterVehicle] = useState('');
  const [filterAvailable, setFilterAvailable] = useState('');

  const activeCityKey = filterCity || (selectedCity !== 'all' ? selectedCity : '');
  const selectedCityObj = activeCityKey ? MOROCCO_CITIES[activeCityKey] : null;
  const availableDistricts = selectedCityObj ? selectedCityObj.districts : [];

  const filteredDrivers = drivers.filter((driver) => {
    const matchesGlobalCity = selectedCity === 'all' || driver.city === selectedCity;
    const matchesCity = !filterCity || driver.city === filterCity;
    const matchesDistrict = !filterDistrict || driver.district === filterDistrict;
    const matchesVehicle = !filterVehicle || driver.vehicle === filterVehicle;
    const matchesAvailable =
      !filterAvailable ||
      (filterAvailable === 'available' ? driver.isAvailable : !driver.isAvailable);
    const matchesSearch =
      !searchQuery ||
      driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (driver.district && driver.district.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (driver.experience && driver.experience.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
      matchesGlobalCity &&
      matchesCity &&
      matchesDistrict &&
      matchesVehicle &&
      matchesAvailable &&
      matchesSearch
    );
  });

  const resetFilters = () => {
    setFilterCity('');
    setFilterDistrict('');
    setFilterVehicle('');
    setFilterAvailable('');
    setSearchQuery('');
  };

  const hasActiveFilters = Boolean(
    filterCity || filterDistrict || filterVehicle || filterAvailable || searchQuery
  );

  return (
    <div className="space-y-4" dir="rtl">
      {/* Title & Action */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-white">
            الليفرورات المتوفرون بالمغرب
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            سائقو توصيل جاهزون ومتاحون في جميع المدن
          </p>
        </div>

        <button
          onClick={() =>
            navigateTo('create', { mode: isShop ? 'offer' : 'driver' })
          }
          className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-md whitespace-nowrap active:scale-95 transition-all cursor-pointer"
        >
          <i className="fa-solid fa-id-card text-xs"></i>
          <span>{isShop ? 'نشر عرض' : 'سجل كليفرور'}</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative">
        <i className="fa-solid fa-magnifying-glass absolute right-3.5 top-3.5 text-slate-400 text-sm"></i>
        <input
          type="text"
          placeholder="ابحث باسم السائق، الحي، أو الخبرة..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-10 py-3 rounded-2xl bg-[#09152b] border border-blue-900/40 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 shadow-md"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute left-3 top-3 text-slate-400 hover:text-white cursor-pointer"
          >
            <i className="fa-solid fa-circle-xmark text-sm"></i>
          </button>
        )}
      </div>

      {/* Filter Bar */}
      <div className="bg-[#09152b] p-3.5 rounded-2xl border border-blue-900/40 shadow-md space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-300">
          <span className="flex items-center gap-1.5">
            <i className="fa-solid fa-sliders text-amber-500"></i>
            <span>تصفية الليفرورات</span>
          </span>
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-amber-400 hover:underline text-[11px] cursor-pointer"
            >
              إعادة التعيين
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2">
          {/* City */}
          <select
            value={filterCity}
            onChange={(e) => {
              setFilterCity(e.target.value);
              setFilterDistrict('');
            }}
            className="w-full text-xs font-semibold py-2 px-2.5 rounded-xl bg-[#050d1c] border border-blue-900/50 text-slate-200 focus:outline-none cursor-pointer"
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
            className="w-full text-xs font-semibold py-2 px-2.5 rounded-xl bg-[#050d1c] border border-blue-900/50 text-slate-200 focus:outline-none cursor-pointer"
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
            className="w-full text-xs font-semibold py-2 px-2.5 rounded-xl bg-[#050d1c] border border-blue-900/50 text-slate-200 focus:outline-none cursor-pointer"
          >
            <option value="">كل المركبات</option>
            {VEHICLE_TYPES.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>

          {/* Availability */}
          <select
            value={filterAvailable}
            onChange={(e) => setFilterAvailable(e.target.value)}
            className="w-full text-xs font-semibold py-2 px-2.5 rounded-xl bg-[#050d1c] border border-blue-900/50 text-slate-200 focus:outline-none cursor-pointer"
          >
            <option value="">كل الحالات</option>
            <option value="available">متاح الآن</option>
            <option value="busy">غير متاح</option>
          </select>
        </div>
      </div>

      {/* Drivers List */}
      <div className="space-y-3">
        {filteredDrivers.length > 0 ? (
          filteredDrivers.map((driver) => (
            <DriverCard key={driver.id} driver={driver} />
          ))
        ) : (
          <div className="text-center py-12 px-4 rounded-3xl bg-[#09152b] border border-slate-800">
            <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center text-2xl">
              <i className="fa-solid fa-motorcycle"></i>
            </div>
            <h4 className="font-extrabold text-sm text-white mb-1">
              ما كاين حتى ليفرور متوفر حالياً في هذا البحث
            </h4>
            <p className="text-xs text-slate-400 max-w-xs mx-auto mb-4">
              جرب التصفح في مدن أو أحياء أخرى، أو قم بنشر طلب توصيل خاص بمحلك.
            </p>
            <button
              onClick={resetFilters}
              className="text-xs font-bold px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white active:scale-95 transition-all cursor-pointer"
            >
              عرض جميع السائقين
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
