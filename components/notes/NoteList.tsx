"use client";

import { useState } from "react";

import { useNotes } from "@/hooks/useNotes";
import { SearchBar } from "@/components/common/SearchBar";
import { EmptyState } from "@/components/common/EmptyState";

import { NoteForm } from "./NoteForm";
import { NoteCard } from "./NoteCard";

export function NoteList() {
  const {
    notes,
    create,
    update,
    remove,
  } = useNotes();

  const [search, setSearch] = useState("");

  const filtered = notes.filter(
    (note) =>
      note.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      note.content
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <NoteForm onAdd={create} />

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search notes..."
      />

      {filtered.length === 0 ? (
        <EmptyState
          title="No Notes"
          description="Create your first note."
        />
      ) : (
        <div className="space-y-4">
          {filtered.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onUpdate={update}
              onDelete={remove}
            />
          ))}
        </div>
      )}
    </div>
  );
}