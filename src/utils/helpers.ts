import { MOROCCO_CITIES } from '../data/cities';

export function cleanPhoneNumber(phone: string): string {
  if (!phone) return '';
  let clean = phone.replace(/[^0-9]/g, '');
  if (clean.startsWith('0')) {
    clean = '212' + clean.substring(1);
  } else if (!clean.startsWith('212')) {
    clean = '212' + clean;
  }
  return clean;
}

export function makeWhatsAppLink(phone: string, contextTitle: string): string {
  const cleaned = cleanPhoneNumber(phone);
  const text = encodeURIComponent(`السلام عليكم، تواصلت معك عبر منصة LIVLINK MA بخصوص ${contextTitle || 'خدمة التوصيل'}.`);
  return `https://wa.me/${cleaned}?text=${text}`;
}

export function getCityName(cityId: string): string {
  return MOROCCO_CITIES[cityId] ? MOROCCO_CITIES[cityId].nameAr : 'المغرب';
}
