import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { useApp } from '../context/AppContext';
import { MOROCCO_CITIES } from '../data/cities';
import { getCityName } from '../utils/helpers';

export const MapView: React.FC = () => {
  const { selectedCity, offers, drivers, showToast } = useApp();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [isOffline, setIsOffline] = useState(
    typeof navigator !== 'undefined' ? !navigator.onLine : false
  );

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
      selectedCity && MOROCCO_CITIES[selectedCity]
        ? MOROCCO_CITIES[selectedCity]
        : MOROCCO_CITIES['all'] || MOROCCO_CITIES['casablanca'];

    try {
      const map = L.map(mapContainerRef.current, {
        zoomControl: true,
        attributionControl: false,
        dragging: true,
        scrollWheelZoom: true
      }).setView(cityData.coords, cityData.zoom);

      // OpenStreetMap standard tiles (completely free, no API key required)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        subdomains: ['a', 'b', 'c']
      }).addTo(map);

      // Center Pin
      const cityMarkerIcon = L.divIcon({
        className: 'custom-city-pin',
        html: `
          <div style="background-color: #2563eb; color: white; border-radius: 9999px; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(37,99,235,0.4); border: 2.5px solid white;">
            <i class="fa-solid fa-location-dot" style="font-size: 14px;"></i>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 32]
      });

      const cityMarker = L.marker(cityData.coords, { icon: cityMarkerIcon }).addTo(map);
      cityMarker.bindPopup(`
        <div dir="rtl" style="font-family:'Cairo',sans-serif; font-size:11px; font-weight:bold; text-align:right;">
          📍 <b>${cityData.id === 'all' ? 'المملكة المغربية' : `مركز ${cityData.nameAr}`}</b><br/>
          <span style="font-size:9.5px; color:#64748b;">${
            cityData.id === 'all'
              ? 'تغطية شاملة لجميع المدن المغربية'
              : 'منطقة التوصيل والنشاط الحالية'
          }</span>
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
            <div style="background-color: #10b981; color: white; border-radius: 9999px; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 8px rgba(16,185,129,0.4); border: 2px solid white;">
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
            <div style="background-color: #f59e0b; color: white; border-radius: 9999px; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 8px rgba(245,158,11,0.4); border: 2px solid white;">
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
              <div style="background-color: #ef4444; color: white; border-radius: 9999px; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(239,68,68,0.6); border: 2.5px solid white;">
                <i class="fa-solid fa-crosshairs text-base"></i>
              </div>
            `,
            iconSize: [34, 34],
            iconAnchor: [17, 34]
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
    <div className="space-y-2.5 select-none" dir="rtl">
      {/* Map Header Bar matching reference image */}
      <div className="flex items-center justify-between px-1">
        {/* Right side in RTL: LIVLINK MAP title */}
        <h3 className="text-sm font-black text-white flex items-center gap-2">
          <span>LIVLINK MAP</span>
          <i className="fa-solid fa-map-location-dot text-emerald-400 text-base"></i>
        </h3>

        {/* Left side in RTL: Green pill "موقعي الحالي" */}
        <button
          onClick={handleLocateMe}
          className="text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
        >
          <i className="fa-solid fa-location-crosshairs text-xs"></i>
          <span>موقعي الحالي</span>
        </button>
      </div>

      {/* Map container rounded with smooth shadow */}
      <div className="relative w-full h-[270px] rounded-2xl overflow-hidden border border-slate-800 shadow-xl z-10 bg-slate-900">
        <div ref={mapContainerRef} className="w-full h-full" />
        {isOffline && (
          <div className="absolute inset-0 bg-slate-950/90 flex flex-col items-center justify-center p-4 text-center z-20">
            <i className="fa-solid fa-wifi-slash text-amber-400 text-2xl mb-2"></i>
            <p className="text-xs font-bold text-white mb-1">
              تحميل الخريطة يحتاج إلى اتصال بالإنترنت
            </p>
            <p className="text-[10px] text-slate-400">
              بيانات التطبيق وعروض العمل ستستمر بالعمل دون انقطاع.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
