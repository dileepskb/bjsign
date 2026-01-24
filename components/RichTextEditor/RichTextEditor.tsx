"use client";

import { RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "@mantine/tiptap/styles.css";

type BlogEditorProps = {
  onChange: (html: string) => void;
};

export default function BlogEditor({ onChange }: BlogEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    immediatelyRender: false,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  return (
    <RichTextEditor editor={editor}>
      <RichTextEditor.Toolbar>
        <RichTextEditor.Bold />
        <RichTextEditor.Italic />
        <RichTextEditor.BulletList />
        <RichTextEditor.OrderedList />
        <RichTextEditor.H1 />
        <RichTextEditor.H2 />
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor>
  );
}

