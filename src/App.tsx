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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-200 antialiased selection:bg-blue-500 selection:text-white">
      {/* Top Header Fixed */}
      <Header />

      {/* Main Content:
          pt-[calc(3.5rem+env(safe-area-inset-top,0px)+0.75rem)]:
          3.5rem (56px Header) + safe-area-inset-top + 12px (0.75rem) comfortable breathing room
          pb-[calc(4rem+env(safe-area-inset-bottom,0px)+1rem)]:
          prevents bottom nav overlap completely without giant blank spaces
      */}
      <main className="flex-1 max-w-md w-full mx-auto px-3.5 pt-[calc(4.25rem+env(safe-area-inset-top,0px))] pb-[calc(4.5rem+env(safe-area-inset-bottom,0px))] space-y-4">
        {renderCurrentView()}
      </main>

      {/* Bottom Navigation */}
      <BottomNav />

      {/* Modals & Overlays */}
      <RoleModal />
      <ConfirmModal />
      <OfflineModal />
      <ToastContainer />
    </div>
  );
};
