import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { useApp } from '../context/AppContext';
import { DeliveryRouteParams } from '../types';

export const DeliveryRouteView: React.FC<{ params: DeliveryRouteParams }> = ({ params }) => {
  const { navigateTo, showToast, showConfirm } = useApp();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  const baseCoords: [number, number] = params.cityCoords || [34.0331, -5.0003];
  const driverLatLng: [number, number] = [baseCoords[0] - 0.009, baseCoords[1] - 0.012];
  const shopLatLng: [number, number] = [baseCoords[0] + 0.006, baseCoords[1] + 0.008];

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    try {
      const map = L.map(mapContainerRef.current, {
        zoomControl: false,
        attributionControl: false
      }).setView(baseCoords, 14);

      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        { maxZoom: 19 }
      ).addTo(map);

      // Route polyline connecting driver and shop
      const polyline = L.polyline([driverLatLng, shopLatLng], {
        color: '#2563eb',
        weight: 5,
        opacity: 0.85,
        dashArray: '10, 10'
      }).addTo(map);

      // Driver pin
      const driverIcon = L.divIcon({
        className: 'route-driver-pin',
        html: `
          <div style="background-color: #f59e0b; color: white; border-radius: 9999px; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(245,158,11,0.5); border: 2.5px solid white;">
            <i class="fa-solid fa-motorcycle text-sm"></i>
          </div>
        `,
        iconSize: [34, 34],
        iconAnchor: [17, 34]
      });

      // Shop pin
      const shopIcon = L.divIcon({
        className: 'route-shop-pin',
        html: `
          <div style="background-color: #10b981; color: white; border-radius: 9999px; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(16,185,129,0.5); border: 2.5px solid white;">
            <i class="fa-solid fa-store text-sm"></i>
          </div>
        `,
        iconSize: [34, 34],
        iconAnchor: [17, 34]
      });

      L.marker(driverLatLng, { icon: driverIcon })
        .addTo(map)
        .bindPopup(
          `<div dir="rtl" style="font-family:'Cairo',sans-serif; font-size:11px; text-align:right;"><b>🏍️ موقعك الحالي (السائق)</b></div>`
        );

      L.marker(shopLatLng, { icon: shopIcon })
        .addTo(map)
        .bindPopup(
          `<div dir="rtl" style="font-family:'Cairo',sans-serif; font-size:11px; text-align:right;"><b>🏪 محل: ${params.shopName || 'المحل'}</b></div>`
        );

      map.fitBounds(polyline.getBounds(), { padding: [50, 50] });
      mapInstanceRef.current = map;
    } catch (e) {
      console.error(e);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [params]);

  const handleCenterRoute = () => {
    if (mapInstanceRef.current) {
      const bounds = L.latLngBounds([driverLatLng, shopLatLng]);
      mapInstanceRef.current.fitBounds(bounds, { padding: [40, 40] });
      showToast('تم ضبط الخريطة على مسار الرحلة', 'info');
    }
  };

  const handleConfirmDelivery = () => {
    showConfirm(
      'تأكيد إتمام التوصيل',
      `هل تؤكد إتمام توصيل طلب محل "${params.shopName}" بنجاح وتسليم الحساب؟`,
      () => {
        showToast('تم تأكيد التوصيل بنجاح! شكراً لك على المجهود.', 'success');
        navigateTo('offers');
      },
      false
    );
  };

  return (
    <div className="space-y-3 relative select-none">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigateTo('offers')}
          className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer"
        >
          <i className="fa-solid fa-arrow-right"></i> عودة للعروض
        </button>
        <h2 className="text-sm font-black text-slate-900 dark:text-white">
          تتبع مسار التوصيل
        </h2>
      </div>

      {/* Map with Route line */}
      <div className="relative w-full h-[440px] rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg bg-slate-900">
        <div ref={mapContainerRef} className="w-full h-full" />

        {/* Floating map controls */}
        <div className="absolute left-3 top-3 z-20 flex flex-col gap-2">
          <button
            onClick={handleCenterRoute}
            className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-900 text-slate-800 dark:text-white shadow-md flex items-center justify-center border border-slate-200 dark:border-slate-800 active:scale-95 cursor-pointer"
            title="توسيط المسار"
          >
            <i className="fa-solid fa-crosshairs text-sm text-blue-600"></i>
          </button>
        </div>

        {/* Bottom Sheet Card */}
        <div className="absolute bottom-3 left-3 right-3 z-20 bg-white dark:bg-slate-900 p-4 rounded-3xl shadow-2xl border border-slate-200/80 dark:border-slate-800 space-y-3 animate-scale-up">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-lg">
                <i className="fa-solid fa-bag-shopping"></i>
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  {params.shopName || 'محل تجاري'}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {params.shopCity} • {params.district}
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="block text-xs font-black text-amber-500">
                {params.price || 0} درهم
              </span>
              <span className="text-[10px] text-slate-400">أجرة التوصيل</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
            <span className="flex items-center gap-1.5">
              <i className="fa-regular fa-clock text-blue-500"></i> التوقيت التقديري:{' '}
              <strong className="text-slate-900 dark:text-white">12 دقيقة</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <i className="fa-solid fa-route text-emerald-500"></i> المسافة:{' '}
              <strong className="text-slate-900 dark:text-white">3.4 كلم</strong>
            </span>
          </div>

          {/* Confirm Delivery button */}
          <button
            onClick={handleConfirmDelivery}
            className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 text-white font-black text-xs sm:text-sm shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <i className="fa-solid fa-circle-check text-emerald-500 text-sm"></i>
            <span>CONFIRM DELIVERY</span>
          </button>
        </div>
      </div>
    </div>
  );
};
