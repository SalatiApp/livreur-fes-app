import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MOROCCO_CITIES, VEHICLE_TYPES, PAYMENT_TYPES } from '../data/cities';

const SHOP_TYPES = [
  'مطعم / مأكولات سريعة',
  'سناك / وجبات خفيفة',
  'مقهى / عصائر',
  'مخبزة / حلويات',
  'صيدلية',
  'سوبرماركت / بقالة',
  'متجر إلكتروني',
  'محل ورود وهدايا',
  'أخرى'
];

export const CreatePage: React.FC<{ initialMode?: 'offer' | 'driver' }> = ({
  initialMode = 'offer'
}) => {
  const { addOffer, addDriver } = useApp();
  const [mode, setMode] = useState<'offer' | 'driver'>(initialMode);

  // Shop Offer form state
  const [shopName, setShopName] = useState('');
  const [shopType, setShopType] = useState(SHOP_TYPES[0]);
  const [city, setCity] = useState(Object.keys(MOROCCO_CITIES)[1] || 'casablanca');
  const [district, setDistrict] = useState('');
  const [vehicle, setVehicle] = useState(VEHICLE_TYPES[0]);
  const [paymentType, setPaymentType] = useState(PAYMENT_TYPES[0]);
  const [price, setPrice] = useState('150');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState('');

  // Driver Profile form state
  const [drvName, setDrvName] = useState('');
  const [drvCity, setDrvCity] = useState(Object.keys(MOROCCO_CITIES)[1] || 'casablanca');
  const [drvDistrict, setDrvDistrict] = useState('');
  const [drvVehicle, setDrvVehicle] = useState(VEHICLE_TYPES[0]);
  const [drvPhone, setDrvPhone] = useState('');
  const [drvWhatsapp, setDrvWhatsapp] = useState('');
  const [drvFreeHours, setDrvFreeHours] = useState('');
  const [drvExperience, setDrvExperience] = useState('');
  const [drvNotes, setDrvNotes] = useState('');

  const currentCityObj = MOROCCO_CITIES[city] || MOROCCO_CITIES['casablanca'];
  const availableDistricts = currentCityObj ? currentCityObj.districts : [];

  const drvCityObj = MOROCCO_CITIES[drvCity] || MOROCCO_CITIES['casablanca'];
  const drvDistricts = drvCityObj ? drvCityObj.districts : [];

  const handleOfferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addOffer({
      shopName,
      shopType,
      city,
      district,
      vehicle,
      paymentType,
      price: parseFloat(price) || 0,
      phone,
      whatsapp: whatsapp || phone,
      description,
      notes
    });
  };

  const handleDriverSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addDriver({
      name: drvName,
      city: drvCity,
      district: drvDistrict,
      vehicle: drvVehicle,
      phone: drvPhone,
      whatsapp: drvWhatsapp || drvPhone,
      freeHours: drvFreeHours,
      experience: drvExperience,
      notes: drvNotes
    });
  };

  return (
    <div className="space-y-4" dir="rtl">
      {/* Mode Switcher Tabs */}
      <div className="bg-[#09152b] p-1.5 rounded-2xl border border-blue-900/40 shadow-md flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => setMode('offer')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            mode === 'offer'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <i className="fa-solid fa-store"></i>
          <span>نشر طلب ليفرور (محل)</span>
        </button>

        <button
          type="button"
          onClick={() => setMode('driver')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            mode === 'driver'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <i className="fa-solid fa-motorcycle"></i>
          <span>تسجيل سائق توصيل</span>
        </button>
      </div>

      {mode === 'offer' ? (
        <form
          onSubmit={handleOfferSubmit}
          className="bg-[#09152b] p-5 rounded-2xl border border-blue-900/40 shadow-lg space-y-4"
        >
          <div>
            <h3 className="text-base font-black text-white">
              نشر طلب توصيل أو عرض عمل
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              سيظهر عرضك فوراً لليفرورات المتواجدين في نفس المدينة والحي
            </p>
          </div>

          <div className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                اسم المحل أو المطعم *
              </label>
              <input
                type="text"
                required
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
                placeholder="مثال: مطعم الأندلس، سناك البركة..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-blue-900/50 bg-[#050d1c] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  نوع النشاط *
                </label>
                <select
                  required
                  value={shopType}
                  onChange={(e) => setShopType(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-blue-900/50 bg-[#050d1c] text-xs text-white focus:outline-none cursor-pointer"
                >
                  {SHOP_TYPES.map((t: string) => (
                    <option key={t} value={t} className="bg-slate-900">
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  المدينة *
                </label>
                <select
                  required
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    setDistrict('');
                  }}
                  className="w-full px-3 py-2.5 rounded-xl border border-blue-900/50 bg-[#050d1c] text-xs text-white focus:outline-none cursor-pointer"
                >
                  {Object.keys(MOROCCO_CITIES)
                    .filter((k) => k !== 'all')
                    .map((k) => (
                      <option key={k} value={k} className="bg-slate-900">
                        {MOROCCO_CITIES[k].nameAr}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  الحي / المنطقة *
                </label>
                <select
                  required
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-blue-900/50 bg-[#050d1c] text-xs text-white focus:outline-none cursor-pointer"
                >
                  <option value="" className="bg-slate-900">اختر الحي</option>
                  {availableDistricts.map((d) => (
                    <option key={d} value={d} className="bg-slate-900">
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  المركبة المطلوبة *
                </label>
                <select
                  required
                  value={vehicle}
                  onChange={(e) => setVehicle(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-blue-900/50 bg-[#050d1c] text-xs text-white focus:outline-none cursor-pointer"
                >
                  {VEHICLE_TYPES.map((v) => (
                    <option key={v} value={v} className="bg-slate-900">
                      {v}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  طريقة المحاسبة *
                </label>
                <select
                  required
                  value={paymentType}
                  onChange={(e) => setPaymentType(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-blue-900/50 bg-[#050d1c] text-xs text-white focus:outline-none cursor-pointer"
                >
                  {PAYMENT_TYPES.map((p) => (
                    <option key={p} value={p} className="bg-slate-900">
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  المبلغ المقترح (درهم) *
                </label>
                <input
                  type="number"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="150"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-blue-900/50 bg-[#050d1c] text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  رقم الهاتف *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0612345678"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-blue-900/50 bg-[#050d1c] text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  رقم WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="0612345678"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-blue-900/50 bg-[#050d1c] text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                تفاصيل العرض وأوقات العمل *
              </label>
              <textarea
                required
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="مثال: مطلوب ليفرور من 17:00 إلى 00:00 يومياً، المحاسبة نهاية كل أسبوع..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-blue-900/50 bg-[#050d1c] text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                امتيازات إضافية (اختياري)
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="مثال: البنزين مدفوع + وجبة غداء + بونص"
                className="w-full px-3.5 py-2.5 rounded-xl border border-blue-900/50 bg-[#050d1c] text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs sm:text-sm rounded-xl shadow-lg active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <i className="fa-solid fa-paper-plane text-xs"></i>
            <span>نشر العرض مباشرة</span>
          </button>
        </form>
      ) : (
        <form
          onSubmit={handleDriverSubmit}
          className="bg-[#09152b] p-5 rounded-2xl border border-blue-900/40 shadow-lg space-y-4"
        >
          <div>
            <h3 className="text-base font-black text-white">
              تسجيل سائق توصيل جديد
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              أنشئ ملفك الشخصي ليجدك أصحاب المحلات والمطاعم بسهولة
            </p>
          </div>

          <div className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                الاسم الكامل *
              </label>
              <input
                type="text"
                required
                value={drvName}
                onChange={(e) => setDrvName(e.target.value)}
                placeholder="مثال: يوسف العلمي"
                className="w-full px-3.5 py-2.5 rounded-xl border border-blue-900/50 bg-[#050d1c] text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  المدينة *
                </label>
                <select
                  required
                  value={drvCity}
                  onChange={(e) => {
                    setDrvCity(e.target.value);
                    setDrvDistrict('');
                  }}
                  className="w-full px-3 py-2.5 rounded-xl border border-blue-900/50 bg-[#050d1c] text-xs text-white focus:outline-none cursor-pointer"
                >
                  {Object.keys(MOROCCO_CITIES)
                    .filter((k) => k !== 'all')
                    .map((k) => (
                      <option key={k} value={k} className="bg-slate-900">
                        {MOROCCO_CITIES[k].nameAr}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  الحي *
                </label>
                <select
                  required
                  value={drvDistrict}
                  onChange={(e) => setDrvDistrict(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-blue-900/50 bg-[#050d1c] text-xs text-white focus:outline-none cursor-pointer"
                >
                  <option value="" className="bg-slate-900">اختر الحي</option>
                  {drvDistricts.map((d) => (
                    <option key={d} value={d} className="bg-slate-900">
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                وسيلة التوصيل *
              </label>
              <select
                required
                value={drvVehicle}
                onChange={(e) => setDrvVehicle(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-blue-900/50 bg-[#050d1c] text-xs text-white focus:outline-none cursor-pointer"
              >
                {VEHICLE_TYPES.map((v) => (
                  <option key={v} value={v} className="bg-slate-900">
                    {v}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  رقم الهاتف *
                </label>
                <input
                  type="tel"
                  required
                  value={drvPhone}
                  onChange={(e) => setDrvPhone(e.target.value)}
                  placeholder="0612345678"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-blue-900/50 bg-[#050d1c] text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  رقم WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  value={drvWhatsapp}
                  onChange={(e) => setDrvWhatsapp(e.target.value)}
                  placeholder="0612345678"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-blue-900/50 bg-[#050d1c] text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                أوقات التفرغ
              </label>
              <input
                type="text"
                value={drvFreeHours}
                onChange={(e) => setDrvFreeHours(e.target.value)}
                placeholder="مساءً (18:00 - 01:00) أو تفرغ تام"
                className="w-full px-3.5 py-2.5 rounded-xl border border-blue-900/50 bg-[#050d1c] text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                الخبرة السابقة
              </label>
              <input
                type="text"
                value={drvExperience}
                onChange={(e) => setDrvExperience(e.target.value)}
                placeholder="سنتان في التوصيل الحر مع المطاعم"
                className="w-full px-3.5 py-2.5 rounded-xl border border-blue-900/50 bg-[#050d1c] text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                نبذة عنك / ملاحظات
              </label>
              <textarea
                rows={2}
                value={drvNotes}
                onChange={(e) => setDrvNotes(e.target.value)}
                placeholder="أذكر متطلباتك أو مميزاتك..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-blue-900/50 bg-[#050d1c] text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-lg active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <i className="fa-solid fa-check text-xs"></i>
            <span>تسجيل الملف الشخصي</span>
          </button>
        </form>
      )}
    </div>
  );
};
