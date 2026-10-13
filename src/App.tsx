import React from 'react';
import { useApp } from './context/AppContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { RoleModal } from './components/RoleModal';
import { ConfirmModal } from './components/ConfirmModal';
import { OfflineModal } from './components/OfflineModal';
import { ToastContainer } from './components/ToastContainer';
import { HomePage } from './pages/HomePage';
import { OffersPage } from './pages/OffersPage';
import { DriversPage } from './pages/DriversPage';
import { CreatePage } from './pages/CreatePage';
import { AccountPage } from './pages/AccountPage';
import { DeliveryRouteView } from './components/DeliveryRouteView';

export const App: React.FC = () => {
  const { activePage, pageParams } = useApp();

  const renderCurrentView = () => {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'offers':
        return <OffersPage />;
      case 'drivers':
        return <DriversPage />;
      case 'create':
        return <CreatePage initialMode={pageParams?.mode || 'offer'} />;
      case 'account':
        return <AccountPage />;
      case 'deliveryMap':
        return <DeliveryRouteView params={pageParams} />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col transition-colors duration-200 antialiased selection:bg-blue-600 selection:text-white">
      {/* Top Header Fixed */}
      <Header />

      {/* Main Content Container:
          pt-[calc(62px+env(safe-area-inset-top,0px)+12px)]:
          62px (Header bar) + safe-area-inset-top + 12px comfortable margin
          pb-[calc(58px+env(safe-area-inset-bottom,0px)+16px)]:
          58px (Bottom nav) + safe-area-inset-bottom + 16px bottom breathing room
      */}
      <main className="flex-1 max-w-md w-full mx-auto px-3.5 pt-[calc(74px+env(safe-area-inset-top,0px))] pb-[calc(74px+env(safe-area-inset-bottom,0px))]">
        {renderCurrentView()}
      </main>

      {/* Bottom Navigation Fixed */}
      <BottomNav />

      {/* Modals & Overlays */}
      <RoleModal />
      <ConfirmModal />
      <OfflineModal />
      <ToastContainer />
    </div>
  );
};
