"use client";

import { useEffect, useState } from "react";

import { Note } from "@/types/note";
import { NoteService } from "@/services/note.service";

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);

  const refresh = (): void => {
    setNotes(NoteService.getAll());
  };

  useEffect(() => {
    refresh();
  }, []);

  const create = (
    title: string,
    content: string
  ): void => {
    NoteService.create(title, content);
    refresh();
  };

  const update = (
    id: string,
    title: string,
    content: string
  ): void => {
    NoteService.update(id, title, content);
    refresh();
  };

  const remove = (id: string): void => {
    NoteService.delete(id);
    refresh();
  };

  return {
    notes,
    create,
    update,
    remove,
    refresh,
  };
}