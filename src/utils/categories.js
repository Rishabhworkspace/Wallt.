import { 
  Utensils, Plane, Lightbulb, Package,
  ShoppingBag, HeartPulse, GraduationCap, Gamepad2
} from 'lucide-react';

export const CATEGORIES = [
  { id: 'Food', label: 'Food & Dining', color: '#F97316', icon: Utensils },
  { id: 'Travel', label: 'Travel', color: '#3B82F6', icon: Plane },
  { id: 'Shopping', label: 'Shopping', color: '#EC4899', icon: ShoppingBag },
  { id: 'Health', label: 'Health & Fitness', color: '#EF4444', icon: HeartPulse },
  { id: 'Education', label: 'Education', color: '#06B6D4', icon: GraduationCap },
  { id: 'Entertainment', label: 'Entertainment', color: '#F43F5E', icon: Gamepad2 },
  { id: 'Utilities', label: 'Utilities & Bills', color: '#EAB308', icon: Lightbulb },
  { id: 'Other', label: 'Other', color: '#A855F7', icon: Package }
];

export const getCategory = (id) => CATEGORIES.find(c => c.id === id) || CATEGORIES[CATEGORIES.length - 1];
