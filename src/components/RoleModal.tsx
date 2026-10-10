import React from 'react';
import { useApp } from '../context/AppContext';

export const RoleModal: React.FC = () => {
  const { isRoleModalOpen, closeRoleModal, setUserRole } = useApp();

  if (!isRoleModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-xs w-full shadow-2xl border border-slate-100 dark:border-slate-800 text-center animate-scale-up">
        <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-1">
          اختر نوع الاستخدام
        </h3>
        <p className="text-xs text-slate-500 mb-5">
          كي يخصص التطبيق تجربتك بشكل أفضل
        </p>

        <div className="space-y-3">
          <button
            onClick={() => setUserRole('shop')}
            className="w-full p-4 rounded-2xl border-2 border-blue-500/20 hover:border-blue-500 bg-blue-50/50 dark:bg-slate-800/80 flex items-center gap-3 text-right active:scale-98 transition-all cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center text-lg shrink-0">
              <i className="fa-solid fa-store"></i>
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                أنا صاحب محل / مطعم
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                أبحث عن ليفرور لتوصيل الطلبات
              </p>
            </div>
          </button>

          <button
            onClick={() => setUserRole('driver')}
            className="w-full p-4 rounded-2xl border-2 border-amber-500/20 hover:border-amber-500 bg-amber-50/50 dark:bg-slate-800/80 flex items-center gap-3 text-right active:scale-98 transition-all cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center text-lg shrink-0">
              <i className="fa-solid fa-motorcycle"></i>
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                أنا ليفرور (سائق توصيل)
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                أبحث عن عروض عمل وتوصيل
              </p>
            </div>
          </button>
        </div>

        <button
          onClick={closeRoleModal}
          className="mt-4 text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
        >
          إغلاق
        </button>
      </div>
    </div>
  );
};
