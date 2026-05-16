export type RiskLevel = 'Low' | 'Medium' | 'High';

export type ScanRecord = {
  value: string;
  category: string;
  length: number;
  risk: RiskLevel;
  suggestion: string;
  date: string;
};

export type DemoUser = {
  name: string;
  email: string;
  password?: string;
  role?: string;
};

export type CartItem = {
  id: string;
  title: string;
  category: string;
  price: number;
  description: string;
};

const HISTORY_KEY = 'scanHistory';
const USERS_KEY = 'smartQRUsers';
const CURRENT_USER_KEY = 'smartQRCurrentUser';
const THEME_KEY = 'smartQRTheme';
const CART_KEY = 'smartQRCart';

export const toolCatalog: CartItem[] = [
  { id: 'qr-scan', title: 'QR Scanner Tool', category: 'Scanner', price: 0, description: 'Camera, image upload and manual QR reading tool.' },
  { id: 'data-analysis', title: 'Data Analyzer Tool', category: 'Analytics', price: 0, description: 'Category detection, length checking and QR safety suggestion.' },
  { id: 'record-manager', title: 'Record Manager', category: 'Dashboard', price: 0, description: 'Insert, update, delete and view saved QR records.' },
  { id: 'risk-review', title: 'Risk Review Tool', category: 'Security', price: 0, description: 'Highlights suspicious URL, payment and WiFi QR patterns.' }
];

export function analyzeQRData(rawValue: string): ScanRecord {
  const value = String(rawValue || '').trim();
  let category = 'Plain Text';
  let risk: RiskLevel = 'Low';
  let suggestion = 'The data appears to be simple text.';

  if (/^https?:\/\//i.test(value)) {
    category = 'Website URL';
    suggestion = 'Open only when the website source is trusted.';

    if (!/^https:\/\//i.test(value) || value.length > 90 || /login|verify|password|bank|free|gift|offer|claim/i.test(value)) {
      risk = 'Medium';
      suggestion = 'This URL may require careful checking before opening.';
    }
  } else if (/^mailto:/i.test(value) || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    category = 'Email Address';
    suggestion = 'Verify the sender or receiver before sharing sensitive information.';
  } else if (/^tel:/i.test(value) || /^\+?\d{8,15}$/.test(value)) {
    category = 'Phone Number';
    suggestion = 'This QR code contains phone/contact information.';
  } else if (/BEGIN:VCARD/i.test(value) || /MECARD:/i.test(value)) {
    category = 'Contact Card';
    suggestion = 'Review contact details before saving them.';
  } else if (/WIFI:/i.test(value)) {
    category = 'WiFi Network';
    risk = 'Medium';
    suggestion = 'Connect only to networks that belong to trusted sources.';
  } else if (/^[0-9]{8,14}$/.test(value)) {
    category = 'Product Code';
    suggestion = 'This looks like a barcode, EAN, UPC, or product identifier.';
  } else if (/upi:|bitcoin:|ethereum:|wallet|payment|iban/i.test(value)) {
    category = 'Payment or Wallet Data';
    risk = 'High';
    suggestion = 'Check payment details carefully before proceeding.';
  } else if (value.length > 120) {
    category = 'Long Text/Data';
    suggestion = 'Large QR data should be reviewed before use.';
  }

  return {
    value,
    category,
    length: value.length,
    risk,
    suggestion,
    date: new Date().toLocaleString()
  };
}

export function loadHistory(): ScanRecord[] {
  try {
    const data = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]') as ScanRecord[];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export function saveHistory(records: ScanRecord[]): void {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(records.slice(0, 50)));
}

export function addRecord(value: string): ScanRecord[] {
  const record = analyzeQRData(value);
  if (!record.value) {
    return loadHistory();
  }
  const updated = [record, ...loadHistory()].slice(0, 50);
  saveHistory(updated);
  return updated;
}

export function updateRecord(index: number, value: string): ScanRecord[] {
  const records = loadHistory();
  if (index >= 0 && index < records.length && value.trim()) {
    records[index] = analyzeQRData(value);
    saveHistory(records);
  }
  return records;
}

export function deleteRecord(index: number): ScanRecord[] {
  const records = loadHistory();
  if (index >= 0 && index < records.length) {
    records.splice(index, 1);
    saveHistory(records);
  }
  return records;
}

export function clearAllRecords(): void {
  localStorage.removeItem(HISTORY_KEY);
}

export function categoryCounts(records: ScanRecord[]): Record<string, number> {
  return records.reduce<Record<string, number>>((counts, item) => {
    counts[item.category] = (counts[item.category] || 0) + 1;
    return counts;
  }, {});
}

export function mediumHighRiskCount(records: ScanRecord[]): number {
  return records.filter((item) => item.risk === 'Medium' || item.risk === 'High').length;
}

export function loadUsers(): DemoUser[] {
  try {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]') as DemoUser[];
    return Array.isArray(users) ? users : [];
  } catch {
    return [];
  }
}

export function saveUsers(users: DemoUser[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function setCurrentUser(user: DemoUser): void {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify({ name: user.name, email: user.email, role: user.role || 'Student User' }));
}

export function getCurrentUser(): DemoUser | null {
  try {
    const user = JSON.parse(localStorage.getItem(CURRENT_USER_KEY) || 'null') as DemoUser | null;
    return user && user.name && user.email ? user : null;
  } catch {
    return null;
  }
}

export function logoutUser(): void {
  localStorage.removeItem(CURRENT_USER_KEY);
}

export function getSavedTheme(): 'light' | 'dark' {
  const savedTheme = localStorage.getItem(THEME_KEY);
  return savedTheme === 'dark' ? 'dark' : 'light';
}

export function applySavedTheme(): void {
  const savedTheme = getSavedTheme();
  document.documentElement.classList.toggle('dark', savedTheme === 'dark');
}

export function setThemeMode(theme: 'light' | 'dark'): void {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  localStorage.setItem(THEME_KEY, theme);
}

export function toggleThemeMode(): 'light' | 'dark' {
  const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setThemeMode(newTheme);
  return newTheme;
}

export function loadCart(): CartItem[] {
  try {
    const items = JSON.parse(localStorage.getItem(CART_KEY) || '[]') as CartItem[];
    return Array.isArray(items) ? items : [];
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]): void {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function addToCart(item: CartItem): CartItem[] {
  const current = loadCart();
  if (current.some((cartItem) => cartItem.id === item.id)) {
    return current;
  }
  const updated = [...current, item];
  saveCart(updated);
  return updated;
}

export function removeFromCart(id: string): CartItem[] {
  const updated = loadCart().filter((item) => item.id !== id);
  saveCart(updated);
  return updated;
}

export function clearCart(): void {
  localStorage.removeItem(CART_KEY);
}
