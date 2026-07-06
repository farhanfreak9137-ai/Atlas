export class Storage {
  static get<T>(key: string): T | null {
    if (typeof window === "undefined") return null;

    const value = localStorage.getItem(key);

    if (!value) return null;

    return JSON.parse(value);
  }

  static set<T>(key: string, value: T) {
    if (typeof window === "undefined") return;

    localStorage.setItem(key, JSON.stringify(value));
  }

  static remove(key: string) {
    if (typeof window === "undefined") return;

    localStorage.removeItem(key);
  }
}