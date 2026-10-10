import React from 'react';
import { useApp } from '../context/AppContext';

export const ToastContainer: React.FC = () => {
  const { toasts } = useApp();

  return (
    <div className="fixed top-16 left-4 right-4 z-50 pointer-events-none flex flex-col items-center gap-2 max-w-sm mx-auto">
      {toasts.map((toast) => {
        let icon = 'fa-circle-info';
        let bg = 'bg-slate-800 text-white dark:bg-white dark:text-slate-900';

        if (toast.type === 'success') {
          icon = 'fa-circle-check';
          bg = 'bg-emerald-600 text-white';
        } else if (toast.type === 'error') {
          icon = 'fa-circle-xmark';
          bg = 'bg-red-600 text-white';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-xl font-bold text-xs transform transition-all duration-300 animate-scale-up ${bg}`}
          >
            <i className={`fa-solid ${icon} text-sm`}></i>
            <span>{toast.text}</span>
          </div>
        );
      })}
    </div>
  );
};
