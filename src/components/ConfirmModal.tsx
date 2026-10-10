import React from 'react';
import { useApp } from '../context/AppContext';

export const ConfirmModal: React.FC = () => {
  const { confirmModal, closeConfirm } = useApp();

  if (!confirmModal.isOpen) return null;

  const handleConfirm = () => {
    confirmModal.onConfirm();
    closeConfirm();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-xs w-full shadow-2xl border border-slate-100 dark:border-slate-800 text-center animate-scale-up">
        <div
          className={`w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center text-xl ${
            confirmModal.isDanger
              ? 'bg-red-100 text-red-600 dark:bg-red-950/50 dark:text-red-400'
              : 'bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400'
          }`}
        >
          <i
            className={`fa-solid ${
              confirmModal.isDanger
                ? 'fa-triangle-exclamation'
                : 'fa-circle-question'
            }`}
          ></i>
        </div>
        <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-2">
          {confirmModal.title}
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
          {confirmModal.message}
        </p>
        <div className="flex gap-2">
          <button
            onClick={closeConfirm}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-95 transition-all cursor-pointer"
          >
            إلغاء
          </button>
          <button
            onClick={handleConfirm}
            className={`flex-1 py-2.5 rounded-xl text-white font-bold text-xs shadow-md active:scale-95 transition-all cursor-pointer ${
              confirmModal.isDanger
                ? 'bg-red-600 hover:bg-red-700 shadow-red-500/20'
                : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/20'
            }`}
          >
            تأكيد
          </button>
        </div>
      </div>
    </div>
  );
};
