import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { MOROCCO_CITIES, VEHICLE_TYPES, PAYMENT_TYPES } from '../data/cities';

export const CreatePage: React.FC<{ initialMode?: 'offer' | 'driver' }> = ({
  initialMode = 'offer'
}) => {
  const { addOffer, addDriver, selectedCity } = useApp();
  const [activeTab, setActiveTab] = useState<'offer' | 'driver'>(initialMode);

  useEffect(() => {
    setActiveTab(initialMode);
  }, [initialMode]);

  // Default city for form
  const defaultCityKey = selectedCity !== 'all' ? selectedCity : 'fes';

  // Offer form state
  const [offShopName, setOffShopName] = useState('');
  const [offShopType, setOffShopType] = useState('');
  const [offCity, setOffCity] = useState(defaultCityKey);
  const [offDistrict, setOffDistrict] = useState('');
  const [offVehicle, setOffVehicle] = useState(VEHICLE_TYPES[0]);
  const [offPaymentType, setOffPaymentType] = useState(PAYMENT_TYPES[0]);
  const [offPrice, setOffPrice] = useState('');
  const [offWorkingHours, setOffWorkingHours] = useState('');
  const [offPhone, setOffPhone] = useState('');
  const [offWhatsapp, setOffWhatsapp] = useState('');
  const [offDescription, setOffDescription] = useState('');
  const [offNotes, setOffNotes] = useState('');

  // Driver form state
  const [drvName, setDrvName] = useState('');
  const [drvCity, setDrvCity] = useState(defaultCityKey);
  const [drvDistrict, setDrvDistrict] = useState('');
  const [drvVehicle, setDrvVehicle] = useState(VEHICLE_TYPES[0]);
  const [drvPhone, setDrvPhone] = useState('');
  const [drvWhatsapp, setDrvWhatsapp] = useState('');
  const [drvFreeHours, setDrvFreeHours] = useState('');
  const [drvExperience, setDrvExperience] = useState('');
  const [drvNotes, setDrvNotes] = useState('');

  // Districts for Offer form
  const offCityObj = MOROCCO_CITIES[offCity] || MOROCCO_CITIES['fes'];
  const offDistricts = offCityObj ? offCityObj.districts : [];

  // Districts for Driver form
  const drvCityObj = MOROCCO_CITIES[drvCity] || MOROCCO_CITIES['fes'];
  const drvDistricts = drvCityObj ? drvCityObj.districts : [];

  const handleOfferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addOffer({
      shopName: offShopName.trim(),
      shopType: offShopType.trim(),
      city: offCity,
      district: offDistrict,
      vehicle: offVehicle,
      paymentType: offPaymentType,
      price: Number(offPrice) || 0,
      workingHours: offWorkingHours.trim(),
      phone: offPhone.trim(),
      whatsapp: offWhatsapp.trim(),
      description: offDescription.trim(),
      notes: offNotes.trim()
    });
  };

  const handleDriverSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addDriver({
      name: drvName.trim(),
      city: drvCity,
      district: drvDistrict,
      vehicle: drvVehicle,
      phone: drvPhone.trim(),
      whatsapp: drvWhatsapp.trim(),
      freeHours: drvFreeHours.trim(),
      experience: drvExperience.trim(),
      notes: drvNotes.trim()
    });
  };

  return (
    <div className="space-y-4">
      {/* Tab Switcher */}
      <div className="flex p-1.5 bg-slate-200/80 dark:bg-slate-800/80 rounded-2xl gap-1">
        <button
          type="button"
          onClick={() => setActiveTab('offer')}
          className={`flex-1 py-2.5 px-2 rounded-xl font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'offer'
              ? 'bg-slate-900 text-white dark:bg-slate-950 dark:text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
          }`}
        >
          <i className="fa-solid fa-shop"></i>
          <span>نشر عرض عمل للمحلات</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('driver')}
          className={`flex-1 py-2.5 px-2 rounded-xl font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'driver'
              ? 'bg-slate-900 text-amber-400 dark:bg-slate-950 dark:text-amber-400 shadow-md font-black'
              : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
          }`}
        >
          <i className="fa-solid fa-id-card"></i>
          <span>التسجيل كليفرور</span>
        </button>
      </div>

      {/* Forms Container */}
      {activeTab === 'offer' ? (
        <form
          onSubmit={handleOfferSubmit}
          className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4"
        >
          <div>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              إضافة عرض عمل جديد
            </h3>
            <p className="text-xs text-slate-500">
              ادخل معلومات المحل أو المطعم للعثور على ليفرور مناسب
            </p>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                اسم المحل / المطعم *
              </label>
              <input
                type="text"
                required
                value={offShopName}
                onChange={(e) => setOffShopName(e.target.value)}
                placeholder="مثال: مطعم الأندلس فاس"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-xs focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                نوع المحل
              </label>
              <input
                type="text"
                value={offShopType}
                onChange={(e) => setOffShopType(e.target.value)}
                placeholder="مطعم / سناك / صيدلية / ملابس..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-xs focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  المدينة *
                </label>
                <select
                  required
                  value={offCity}
                  onChange={(e) => {
                    setOffCity(e.target.value);
                    setOffDistrict('');
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-xs focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  {Object.keys(MOROCCO_CITIES)
                    .filter((k) => k !== 'all')
                    .map((k) => (
                      <option key={k} value={k}>
                        {MOROCCO_CITIES[k].nameAr}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  الحي *
                </label>
                <select
                  required
                  value={offDistrict}
                  onChange={(e) => setOffDistrict(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-xs focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option value="">اختر الحي</option>
                  {offDistricts.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  وسيلة النقل المطلوبة *
                </label>
                <select
                  required
                  value={offVehicle}
                  onChange={(e) => setOffVehicle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-xs focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  {VEHICLE_TYPES.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  طريقة الدفع *
                </label>
                <select
                  required
                  value={offPaymentType}
                  onChange={(e) => setOffPaymentType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-xs focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  {PAYMENT_TYPES.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  المبلغ المقترح (درهم) *
                </label>
                <input
                  type="number"
                  required
                  value={offPrice}
                  onChange={(e) => setOffPrice(e.target.value)}
                  placeholder="180"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  أوقات العمل
                </label>
                <input
                  type="text"
                  value={offWorkingHours}
                  onChange={(e) => setOffWorkingHours(e.target.value)}
                  placeholder="12:00 - 23:00"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-xs focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  رقم الهاتف *
                </label>
                <input
                  type="tel"
                  required
                  value={offPhone}
                  onChange={(e) => setOffPhone(e.target.value)}
                  placeholder="0612345678"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  رقم WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  value={offWhatsapp}
                  onChange={(e) => setOffWhatsapp(e.target.value)}
                  placeholder="0612345678"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-xs focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                وصف العمل *
              </label>
              <textarea
                required
                rows={3}
                value={offDescription}
                onChange={(e) => setOffDescription(e.target.value)}
                placeholder="اكتب تفاصيل الطلب والشروط المطلوب توفرها في السائق..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-xs focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                ملاحظات أو امتيازات إضافية
              </label>
              <input
                type="text"
                value={offNotes}
                onChange={(e) => setOffNotes(e.target.value)}
                placeholder="البنزين مدفوع + وجبة غداء + بونص"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-xs focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs sm:text-sm rounded-xl shadow-md shadow-blue-500/20 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <i className="fa-solid fa-paper-plane text-xs"></i>
            <span>نشر العرض مباشرة</span>
          </button>
        </form>
      ) : (
        <form
          onSubmit={handleDriverSubmit}
          className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4"
        >
          <div>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              تسجيل سائق توصيل جديد
            </h3>
            <p className="text-xs text-slate-500">
              أنشئ ملفك الشخصي ليجدك أصحاب المحلات والمطاعم بسهولة
            </p>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                الاسم الكامل *
              </label>
              <input
                type="text"
                required
                value={drvName}
                onChange={(e) => setDrvName(e.target.value)}
                placeholder="مثال: يوسف العلمي"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-xs focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  المدينة *
                </label>
                <select
                  required
                  value={drvCity}
                  onChange={(e) => {
                    setDrvCity(e.target.value);
                    setDrvDistrict('');
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-xs focus:outline-none focus:border-amber-500 cursor-pointer"
                >
                  {Object.keys(MOROCCO_CITIES)
                    .filter((k) => k !== 'all')
                    .map((k) => (
                      <option key={k} value={k}>
                        {MOROCCO_CITIES[k].nameAr}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  الحي *
                </label>
                <select
                  required
                  value={drvDistrict}
                  onChange={(e) => setDrvDistrict(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-xs focus:outline-none focus:border-amber-500 cursor-pointer"
                >
                  <option value="">اختر الحي</option>
                  {drvDistricts.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                وسيلة التوصيل *
              </label>
              <select
                required
                value={drvVehicle}
                onChange={(e) => setDrvVehicle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-xs focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                {VEHICLE_TYPES.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  رقم الهاتف *
                </label>
                <input
                  type="tel"
                  required
                  value={drvPhone}
                  onChange={(e) => setDrvPhone(e.target.value)}
                  placeholder="0612345678"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  رقم WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  value={drvWhatsapp}
                  onChange={(e) => setDrvWhatsapp(e.target.value)}
                  placeholder="0612345678"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-xs focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                أوقات التفرغ
              </label>
              <input
                type="text"
                value={drvFreeHours}
                onChange={(e) => setDrvFreeHours(e.target.value)}
                placeholder="مساءً (18:00 - 01:00) أو تفرغ تام"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-xs focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                الخبرة السابقة
              </label>
              <input
                type="text"
                value={drvExperience}
                onChange={(e) => setDrvExperience(e.target.value)}
                placeholder="سنتان في التوصيل الحر مع المطاعم"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-xs focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                نبذة عنك / ملاحظات
              </label>
              <textarea
                rows={2}
                value={drvNotes}
                onChange={(e) => setDrvNotes(e.target.value)}
                placeholder="أذكر متطلباتك أو مميزاتك..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-xs focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-md active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <i className="fa-solid fa-check text-xs"></i>
            <span>تسجيل الملف الشخصي</span>
          </button>
        </form>
      )}
    </div>
  );
};
