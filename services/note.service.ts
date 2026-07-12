import { noteRepository } from "@/repositories/note.repository";
import { Note } from "@/types/note";

export class NoteService {
  static getAll(): Note[] {
    return noteRepository.getAll();
  }

  static create(title: string, content: string): Note {
    const notes = noteRepository.getAll();

    const now = new Date().toISOString();

    const newNote: Note = {
      id: crypto.randomUUID(),
      title,
      content,
      createdAt: now,
      updatedAt: now,
    };

    notes.unshift(newNote);

    noteRepository.save(notes);

    return newNote;
  }

  static update(
    id: string,
    title: string,
    content: string
  ): void {
    const updated = noteRepository.getAll().map((note) =>
      note.id === id
        ? {
            ...note,
            title,
            content,
            updatedAt: new Date().toISOString(),
          }
        : note
    );

    noteRepository.save(updated);
  }

  static delete(id: string): void {
    const updated = noteRepository
      .getAll()
      .filter((note) => note.id !== id);

    noteRepository.save(updated);
  }

  static search(query: string): Note[] {
    const value = query.toLowerCase();

    return noteRepository.getAll().filter(
      (note) =>
        note.title.toLowerCase().includes(value) ||
        note.content.toLowerCase().includes(value)
    );
  }
}