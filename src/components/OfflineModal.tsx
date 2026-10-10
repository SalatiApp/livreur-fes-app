import React from 'react';
import { useApp } from '../context/AppContext';

export const OfflineModal: React.FC = () => {
  const { isOfflineModalOpen, closeOfflineModal } = useApp();

  if (!isOfflineModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-xs w-full shadow-2xl border border-slate-100 dark:border-slate-800 text-center animate-scale-up space-y-4">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center text-2xl">
          <i className="fa-solid fa-wifi-slash"></i>
        </div>
        <div>
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-1">
            لا يوجد اتصال بالإنترنت
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            يرجى الاتصال بالشبكة للمتابعة وإكمال هذا الإجراء عبر الخوادم.
          </p>
        </div>
        <button
          onClick={closeOfflineModal}
          className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 active:scale-95 transition-all cursor-pointer"
        >
          حسناً، فهمت
        </button>
      </div>
    </div>
  );
};
