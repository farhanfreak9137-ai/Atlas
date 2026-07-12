"use client";

import { useState } from "react";
import { Note } from "@/types/note";
import { Pencil, Trash2 } from "lucide-react";

interface NoteCardProps {
  note: Note;
  onUpdate: (
    id: string,
    title: string,
    content: string
  ) => void;
  onDelete: (id: string) => void;
}

export function NoteCard({
  note,
  onUpdate,
  onDelete,
}: NoteCardProps) {
  const [editing, setEditing] = useState(false);

  const [title, setTitle] = useState(note.title);

  const [content, setContent] = useState(
    note.content
  );

  if (editing) {
    return (
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6">
        <input
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="mb-4 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3"
        />

        <textarea
          rows={6}
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          }
          className="mb-4 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3"
        />

        <div className="flex gap-3">
          <button
            onClick={() => {
              onUpdate(
                note.id,
                title,
                content
              );

              setEditing(false);
            }}
            className="rounded-xl bg-blue-600 px-4 py-2"
          >
            Save
          </button>

          <button
            onClick={() => {
              setEditing(false);
              setTitle(note.title);
              setContent(note.content);
            }}
            className="rounded-xl bg-zinc-700 px-4 py-2"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold">
            {note.title}
          </h2>

          <p className="mt-2 whitespace-pre-wrap text-zinc-400">
            {note.content}
          </p>

          <p className="mt-4 text-xs text-zinc-500">
            Updated{" "}
            {new Date(
              note.updatedAt
            ).toLocaleString()}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setEditing(true)}
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={() =>
              onDelete(note.id)
            }
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}