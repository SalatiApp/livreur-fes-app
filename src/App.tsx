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
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-200">
      {/* Top Header */}
      <Header />

      {/* Main Content View Container */}
      <main className="max-w-md mx-auto px-3.5 pt-4 pb-safe">
        {renderCurrentView()}
      </main>

      {/* Bottom Sticky Navigation */}
      <BottomNav />

      {/* Floating Modals and Toasts */}
      <RoleModal />
      <ConfirmModal />
      <OfflineModal />
      <ToastContainer />
    </div>
  );
};
