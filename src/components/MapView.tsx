import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { useApp } from '../context/AppContext';
import { MOROCCO_CITIES } from '../data/cities';
import { getCityName } from '../utils/helpers';

export const MapView: React.FC = () => {
  const { selectedCity, offers, drivers, showToast } = useApp();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const cityData =
      selectedCity !== 'all' && MOROCCO_CITIES[selectedCity]
        ? MOROCCO_CITIES[selectedCity]
        : MOROCCO_CITIES['fes'] || MOROCCO_CITIES['casablanca'];

    try {
      const map = L.map(mapContainerRef.current, {
        zoomControl: true,
        attributionControl: false,
        dragging: true,
        scrollWheelZoom: true
      }).setView(cityData.coords, cityData.zoom);

      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          maxZoom: 19
        }
      ).addTo(map);

      // Custom HTML Icons for modern look
      const cityMarkerIcon = L.divIcon({
        className: 'custom-city-pin',
        html: `
          <div style="background-color: #2563eb; color: white; border-radius: 9999px; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.2); border: 2px solid white;">
            <i class="fa-solid fa-location-dot text-sm"></i>
          </div>
        `,
        iconSize: [30, 30],
        iconAnchor: [15, 30]
      });

      const cityMarker = L.marker(cityData.coords, { icon: cityMarkerIcon }).addTo(map);
      cityMarker.bindPopup(`
        <div dir="rtl" style="font-family:'Cairo',sans-serif; font-size:11px; font-weight:bold; text-align:right;">
          📍 <b>مركز ${cityData.nameAr}</b><br/>
          <span style="font-size:9.5px; color:#64748b;">منطقة التوصيل والنشاط الحالية</span>
        </div>
      `);

      // Filtered offers & drivers
      const currentOffers = offers.filter(
        (o) => selectedCity === 'all' || o.city === selectedCity
      );
      const currentDrivers = drivers.filter(
        (d) => selectedCity === 'all' || d.city === selectedCity
      );

      // Add Offer markers (Store Pin)
      currentOffers.forEach((offer, idx) => {
        const lat = offer.lat || cityData.coords[0] + Math.sin(idx + 1) * 0.015;
        const lng = offer.lng || cityData.coords[1] + Math.cos(idx + 1) * 0.015;

        const storeIcon = L.divIcon({
          className: 'store-pin',
          html: `
            <div style="background-color: #10b981; color: white; border-radius: 9999px; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.25); border: 2px solid white;">
              <i class="fa-solid fa-store" style="font-size: 11px;"></i>
            </div>
          `,
          iconSize: [28, 28],
          iconAnchor: [14, 28]
        });

        const marker = L.marker([lat, lng], { icon: storeIcon }).addTo(map);
        marker.bindPopup(`
          <div dir="rtl" style="font-family:'Cairo',sans-serif; font-size:11px; text-align:right;">
            <div style="font-weight:bold; color:#0f172a; margin-bottom:2px;">🏪 ${offer.shopName}</div>
            <div style="color:#64748b; font-size:10px;">${offer.shopType || 'محل تجاري'}</div>
            <div style="color:#f59e0b; font-weight:bold; margin-top:2px;">${offer.price} درهم (${offer.paymentType})</div>
          </div>
        `);
      });

      // Add Driver markers (Scooter Pin)
      currentDrivers.forEach((driver, idx) => {
        const lat = driver.lat || cityData.coords[0] + Math.cos(idx + 2) * 0.018;
        const lng = driver.lng || cityData.coords[1] + Math.sin(idx + 2) * 0.018;

        const driverIcon = L.divIcon({
          className: 'driver-pin',
          html: `
            <div style="background-color: #f59e0b; color: white; border-radius: 9999px; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.25); border: 2px solid white;">
              <i class="fa-solid fa-motorcycle" style="font-size: 11px;"></i>
            </div>
          `,
          iconSize: [28, 28],
          iconAnchor: [14, 28]
        });

        const marker = L.marker([lat, lng], { icon: driverIcon }).addTo(map);
        marker.bindPopup(`
          <div dir="rtl" style="font-family:'Cairo',sans-serif; font-size:11px; text-align:right;">
            <div style="font-weight:bold; color:#0f172a; margin-bottom:2px;">🏍️ ${driver.name}</div>
            <div style="color:#64748b; font-size:10px;">وسيلة: ${driver.vehicle}</div>
            <div style="color:${driver.isAvailable ? '#10b981' : '#94a3b8'}; font-weight:bold; margin-top:2px;">
              ${driver.isAvailable ? '● متاح للتوصيل الآن' : '○ غير متاح حالياً'}
            </div>
          </div>
        `);
      });

      mapInstanceRef.current = map;
    } catch (err) {
      console.error('Leaflet init error:', err);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [selectedCity, offers, drivers]);

  const handleLocateMe = () => {
    if (!mapInstanceRef.current) return;
    if (!navigator.geolocation) {
      showToast('متصفحك لا يدعم تحديد الموقع الجغرافي', 'error');
      return;
    }

    showToast('جاري طلب إذن الوصول للموقع...', 'info');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        if (mapInstanceRef.current) {
          mapInstanceRef.current.setView([lat, lng], 16);

          const myPinIcon = L.divIcon({
            className: 'my-pin',
            html: `
              <div style="background-color: #ef4444; color: white; border-radius: 9999px; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(239,68,68,0.5); border: 2.5px solid white;">
                <i class="fa-solid fa-crosshairs text-sm"></i>
              </div>
            `,
            iconSize: [32, 32],
            iconAnchor: [16, 32]
          });

          L.marker([lat, lng], { icon: myPinIcon })
            .addTo(mapInstanceRef.current)
            .bindPopup(
              `<div dir="rtl" style="font-family:'Cairo',sans-serif; font-size:11px; font-weight:bold; text-align:right;">📍 موقعك الحالي</div>`
            )
            .openPopup();
          showToast('تم تحديد موقعك بنجاح', 'success');
        }
      },
      (err) => {
        console.error(err);
        showToast('يرجى تمكين إذن الموقع لتحديد مكانك بدقة', 'error');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  return (
    <div className="space-y-2 select-none">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <i className="fa-solid fa-map-location-dot text-emerald-500"></i>
          <span>LIVLINK MAP ({getCityName(selectedCity)})</span>
        </h3>
        <button
          onClick={handleLocateMe}
          className="text-[10px] font-bold text-white bg-emerald-600 hover:bg-emerald-700 px-3 py-1 rounded-lg flex items-center gap-1.5 shadow active:scale-95 transition-all cursor-pointer"
        >
          <i className="fa-solid fa-location-crosshairs"></i>
          <span>موقعي الحالي</span>
        </button>
      </div>

      <div className="relative w-full h-64 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md z-10 bg-slate-900">
        <div ref={mapContainerRef} className="w-full h-full" />

        {isOffline && (
          <div className="absolute inset-0 bg-slate-900/90 flex flex-col items-center justify-center p-4 text-center z-20">
            <i className="fa-solid fa-wifi-slash text-amber-400 text-2xl mb-2"></i>
            <p className="text-xs font-bold text-white mb-1">
              تحميل الخريطة يحتاج إلى اتصال بالإنترنت
            </p>
            <p className="text-[10px] text-slate-400">
              ستستمر بيانات التطبيق وعروض العمل في العمل دون انقطاع.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
