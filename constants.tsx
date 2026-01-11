
import { MobilePhone, MobileBrand, Condition } from './types';

export const MOCK_PHONES: MobilePhone[] = [
  {
    id: '1',
    brand: MobileBrand.APPLE,
    model: 'iPhone 14 Pro Max',
    price: 84999,
    originalPrice: 139900,
    storage: '256GB',
    condition: Condition.LIKE_NEW,
    warranty: '10 Months',
    image: 'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    brand: MobileBrand.SAMSUNG,
    model: 'Galaxy S23 Ultra',
    price: 74999,
    originalPrice: 124999,
    storage: '512GB',
    condition: Condition.EXCELLENT,
    warranty: '8 Months',
    image: 'https://images.unsplash.com/photo-1678911820864-e2c567c655d7?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    brand: MobileBrand.GOOGLE,
    model: 'Pixel 7 Pro',
    price: 39999,
    originalPrice: 84999,
    storage: '128GB',
    condition: Condition.GOOD,
    warranty: '6 Months',
    image: 'https://images.unsplash.com/photo-1664478546384-d97ff39f9a2c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '4',
    brand: MobileBrand.APPLE,
    model: 'iPhone 13 Mini',
    price: 31900,
    originalPrice: 64900,
    storage: '128GB',
    condition: Condition.EXCELLENT,
    warranty: '7 Months',
    image: 'https://images.unsplash.com/photo-1634403665482-750404688435?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '5',
    brand: MobileBrand.ONEPLUS,
    model: 'OnePlus 11',
    price: 42999,
    originalPrice: 56999,
    storage: '256GB',
    condition: Condition.LIKE_NEW,
    warranty: '11 Months',
    image: 'https://images.unsplash.com/photo-1673431668141-86088e5d003b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '6',
    brand: MobileBrand.SAMSUNG,
    model: 'Galaxy Z Flip 4',
    price: 32999,
    originalPrice: 94999,
    storage: '256GB',
    condition: Condition.FAIR,
    warranty: '4 Months',
    image: 'https://images.unsplash.com/photo-1659970977464-3259b139369e?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '7',
    brand: MobileBrand.XIAOMI,
    model: 'Xiaomi 13 Pro',
    price: 48999,
    originalPrice: 79999,
    storage: '256GB',
    condition: Condition.EXCELLENT,
    warranty: '9 Months',
    image: 'https://images.unsplash.com/photo-1661347333292-cc76c2438848?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '8',
    brand: MobileBrand.APPLE,
    model: 'iPhone 12',
    price: 25999,
    originalPrice: 59900,
    storage: '64GB',
    condition: Condition.GOOD,
    warranty: '5 Months',
    image: 'https://images.unsplash.com/photo-1603891128711-11b4b03bb138?auto=format&fit=crop&q=80&w=800'
  }
];
