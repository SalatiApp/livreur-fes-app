import React from 'react';
import { useApp } from '../context/AppContext';

export const RoleModal: React.FC = () => {
  const { isRoleModalOpen, closeRoleModal, setUserRole } = useApp();

  if (!isRoleModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 select-none"
      onClick={closeRoleModal}
      dir="rtl"
    >
      <div
        className="bg-[#09152b] rounded-3xl p-6 max-w-xs w-full shadow-2xl border border-blue-900/50 text-center animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-base font-black text-white mb-1">
          اختر نوع الاستخدام
        </h3>
        <p className="text-xs text-slate-400 mb-5">
          كي يخصص التطبيق تجربتك بشكل أفضل
        </p>

        <div className="space-y-3">
          <button
            onClick={() => setUserRole('shop')}
            className="w-full p-4 rounded-2xl border-2 border-blue-500/30 hover:border-blue-500 bg-[#050d1c] flex items-center gap-3 text-right active:scale-98 transition-all cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center text-lg shrink-0 shadow-md">
              <i className="fa-solid fa-store"></i>
            </div>
            <div>
              <h4 className="font-black text-sm text-white">
                أنا صاحب محل / مطعم
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                أبحث عن ليفرور لتوصيل الطلبات
              </p>
            </div>
          </button>

          <button
            onClick={() => setUserRole('driver')}
            className="w-full p-4 rounded-2xl border-2 border-amber-500/30 hover:border-amber-500 bg-[#050d1c] flex items-center gap-3 text-right active:scale-98 transition-all cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center text-lg shrink-0 shadow-md">
              <i className="fa-solid fa-motorcycle"></i>
            </div>
            <div>
              <h4 className="font-black text-sm text-white">
                أنا ليفرور (سائق توصيل)
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                أبحث عن عروض عمل وتوصيل
              </p>
            </div>
          </button>
        </div>

        <button
          onClick={closeRoleModal}
          className="mt-5 text-xs font-bold text-slate-400 hover:text-white cursor-pointer"
        >
          إلغاء
        </button>
      </div>
    </div>
  );
};
