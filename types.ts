
export enum MobileBrand {
  APPLE = 'Apple',
  SAMSUNG = 'Samsung',
  GOOGLE = 'Google',
  ONEPLUS = 'OnePlus',
  XIAOMI = 'Xiaomi'
}

export enum Condition {
  LIKE_NEW = 'Like New',
  EXCELLENT = 'Excellent',
  GOOD = 'Good',
  FAIR = 'Fair'
}

export interface MobilePhone {
  id: string;
  brand: MobileBrand;
  model: string;
  price: number;
  originalPrice: number;
  storage: string;
  condition: Condition;
  warranty: string;
  image: string;
}

export type Page = 'home' | 'mobiles' | 'features' | 'about' | 'contact' | 'login' | 'ai-edit';
