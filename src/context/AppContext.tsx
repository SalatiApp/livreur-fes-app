import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Offer, Driver, UserRole, AppPage, ToastMessage, DeliveryRouteParams } from '../types';
import { INITIAL_OFFERS, INITIAL_DRIVERS } from '../data/mockData';
import { MOROCCO_CITIES } from '../data/cities';

interface ConfirmModalState {
  isOpen: boolean;
  title: string;
  message: string;
  isDanger: boolean;
  onConfirm: () => void;
}

interface AppContextType {
  offers: Offer[];
  drivers: Driver[];
  userRole: UserRole;
  selectedCity: string;
  theme: 'dark' | 'light';
  activePage: AppPage;
  pageParams: any;
  toasts: ToastMessage[];
  confirmModal: ConfirmModalState;
  isRoleModalOpen: boolean;
  isOfflineModalOpen: boolean;
  
  // Actions
  setUserRole: (role: UserRole) => void;
  setSelectedCity: (cityId: string) => void;
  toggleTheme: () => void;
  navigateTo: (page: AppPage, params?: any) => void;
  openRoleModal: () => void;
  closeRoleModal: () => void;
  closeOfflineModal: () => void;
  
  addOffer: (offerData: Omit<Offer, 'id' | 'createdAt' | 'status'>) => void;
  updateOffer: (id: string, updates: Partial<Offer>) => void;
  deleteOffer: (id: string) => void;
  toggleOfferStatus: (id: string) => void;
  
  addDriver: (driverData: Omit<Driver, 'id' | 'createdAt' | 'isAvailable'>) => void;
  updateDriver: (id: string, updates: Partial<Driver>) => void;
  deleteDriver: (id: string) => void;
  
  showToast: (text: string, type?: 'info' | 'success' | 'error') => void;
  showConfirm: (title: string, message: string, onConfirm: () => void, isDanger?: boolean) => void;
  closeConfirm: () => void;
  resetAllData: () => void;
  checkOnlineAction: (action: () => void) => void;
}

const STORAGE_KEYS = {
  OFFERS: 'livrer_fes_offers_v1',
  DRIVERS: 'livrer_fes_drivers_v1',
  ROLE: 'livrer_fes_user_role',
  CITY: 'livrer_fes_city',
  THEME: 'livrer_fes_theme'
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME);
    if (saved === 'dark' || saved === 'light') return saved;
    return 'dark';
  });

  // Role state
  const [userRole, setUserRoleState] = useState<UserRole>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ROLE);
    return (saved === 'shop' || saved === 'driver') ? (saved as UserRole) : 'shop';
  });

  // Selected global city
  const [selectedCity, setSelectedCityState] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEYS.CITY) || 'all';
  });

  // Active navigation page
  const [activePage, setActivePage] = useState<AppPage>('home');
  const [pageParams, setPageParams] = useState<any>({});

  // Modals state
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isOfflineModalOpen, setIsOfflineModalOpen] = useState(false);
  const [confirmModal, setConfirmModal] = useState<ConfirmModalState>({
    isOpen: false,
    title: '',
    message: '',
    isDanger: true,
    onConfirm: () => {}
  });

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Offers state
  const [offers, setOffers] = useState<Offer[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.OFFERS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_OFFERS;
  });

  // Drivers state
  const [drivers, setDrivers] = useState<Driver[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DRIVERS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_DRIVERS;
  });

  // Sync theme with document element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  }, [theme]);

  // Sync offers to storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.OFFERS, JSON.stringify(offers));
  }, [offers]);

  // Sync drivers to storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DRIVERS, JSON.stringify(drivers));
  }, [drivers]);

  const showToast = (text: string, type: 'info' | 'success' | 'error' = 'info') => {
    const id = 'toast-' + Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts(prev => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3200);
  };

  const checkOnlineAction = (action: () => void) => {
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      setIsOfflineModalOpen(true);
      return;
    }
    action();
  };

  const setUserRole = (role: UserRole) => {
    setUserRoleState(role);
    localStorage.setItem(STORAGE_KEYS.ROLE, role);
    setIsRoleModalOpen(false);
    showToast(role === 'shop' ? 'تم تحويل التطبيق لوضع: صاحب محل' : 'تم تحويل التطبيق لوضع: ليفرور', 'success');
  };

  const setSelectedCity = (cityId: string) => {
    setSelectedCityState(cityId);
    localStorage.setItem(STORAGE_KEYS.CITY, cityId);
    const cityName = MOROCCO_CITIES[cityId]?.nameAr || 'المغرب';
    showToast(`تم تغيير المدينة إلى: ${cityName}`, 'info');
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const navigateTo = (page: AppPage, params: any = {}) => {
    setActivePage(page);
    setPageParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openRoleModal = () => setIsRoleModalOpen(true);
  const closeRoleModal = () => setIsRoleModalOpen(false);
  const closeOfflineModal = () => setIsOfflineModalOpen(false);

  const showConfirm = (title: string, message: string, onConfirm: () => void, isDanger = true) => {
    setConfirmModal({
      isOpen: true,
      title,
      message,
      isDanger,
      onConfirm
    });
  };

  const closeConfirm = () => {
    setConfirmModal(prev => ({ ...prev, isOpen: false }));
  };

  const addOffer = (offerData: Omit<Offer, 'id' | 'createdAt' | 'status'>) => {
    checkOnlineAction(() => {
      const cityObj = MOROCCO_CITIES[offerData.city];
      const baseCoords = cityObj ? cityObj.coords : [34.0331, -5.0003];
      const newOffer: Offer = {
        ...offerData,
        id: 'off-' + Date.now(),
        createdAt: new Date().toISOString().split('T')[0],
        status: 'open',
        lat: baseCoords[0] + (Math.random() * 0.02 - 0.01),
        lng: baseCoords[1] + (Math.random() * 0.02 - 0.01)
      };
      setOffers(prev => [newOffer, ...prev]);
      showToast('تم نشر عرض العمل بنجاح!', 'success');
      navigateTo('offers');
    });
  };

  const updateOffer = (id: string, updates: Partial<Offer>) => {
    setOffers(prev => prev.map(o => (o.id === id ? { ...o, ...updates } : o)));
  };

  const toggleOfferStatus = (id: string) => {
    const offer = offers.find(o => o.id === id);
    if (!offer) return;
    const nextStatus = offer.status === 'open' ? 'closed' : 'open';
    updateOffer(id, { status: nextStatus });
    showToast(`تم ${nextStatus === 'closed' ? 'إغلاق' : 'تنشيط'} العرض بنجاح`, 'success');
  };

  const deleteOffer = (id: string) => {
    setOffers(prev => prev.filter(o => o.id !== id));
    showToast('تم حذف العرض بنجاح', 'success');
  };

  const addDriver = (driverData: Omit<Driver, 'id' | 'createdAt' | 'isAvailable'>) => {
    checkOnlineAction(() => {
      const cityObj = MOROCCO_CITIES[driverData.city];
      const baseCoords = cityObj ? cityObj.coords : [34.0331, -5.0003];
      const newDriver: Driver = {
        ...driverData,
        id: 'drv-' + Date.now(),
        createdAt: new Date().toISOString().split('T')[0],
        isAvailable: true,
        lat: baseCoords[0] + (Math.random() * 0.02 - 0.01),
        lng: baseCoords[1] + (Math.random() * 0.02 - 0.01)
      };
      setDrivers(prev => [newDriver, ...prev]);
      showToast('تم تسجيل ملفك كليفرور بنجاح!', 'success');
      navigateTo('drivers');
    });
  };

  const updateDriver = (id: string, updates: Partial<Driver>) => {
    setDrivers(prev => prev.map(d => (d.id === id ? { ...d, ...updates } : d)));
  };

  const deleteDriver = (id: string) => {
    setDrivers(prev => prev.filter(d => d.id !== id));
    showToast('تم حذف بيانات السائق', 'success');
  };

  const resetAllData = () => {
    setOffers(INITIAL_OFFERS);
    setDrivers(INITIAL_DRIVERS);
    localStorage.setItem(STORAGE_KEYS.OFFERS, JSON.stringify(INITIAL_OFFERS));
    localStorage.setItem(STORAGE_KEYS.DRIVERS, JSON.stringify(INITIAL_DRIVERS));
    showToast('تمت إعادة ضبط واستعادة البيانات الأولية بنجاح', 'success');
  };

  return (
    <AppContext.Provider
      value={{
        offers,
        drivers,
        userRole,
        selectedCity,
        theme,
        activePage,
        pageParams,
        toasts,
        confirmModal,
        isRoleModalOpen,
        isOfflineModalOpen,
        setUserRole,
        setSelectedCity,
        toggleTheme,
        navigateTo,
        openRoleModal,
        closeRoleModal,
        closeOfflineModal,
        addOffer,
        updateOffer,
        deleteOffer,
        toggleOfferStatus,
        addDriver,
        updateDriver,
        deleteDriver,
        showToast,
        showConfirm,
        closeConfirm,
        resetAllData,
        checkOnlineAction
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
