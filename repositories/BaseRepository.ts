import { Storage } from "@/lib/storage/storage";

export class BaseRepository<T> {
  constructor(private readonly key: string) {}

  getAll(): T[] {
    return Storage.get<T[]>(this.key) ?? [];
  }

  save(items: T[]): void {
    Storage.set(this.key, items);
  }

  clear(): void {
    Storage.remove(this.key);
  }
}