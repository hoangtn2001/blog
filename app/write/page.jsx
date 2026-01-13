"use client";

import Image from "next/image";
import styles from "./write.module.css";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import ImageExtension from "@tiptap/extension-image";

const WritePage = () => {
  const router = useRouter();

  const {
    container,
    editor,
    button,
    add,
    input,
    tiptap,
    tiptapContainer,
    bubbleMenu,
    active,
    publish,
    select,
  } = styles;

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [catSlug, setCatSlug] = useState("coding");

  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const editorInstance = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: true,
        autolink: true,
        linkOnPaste: true,
      }),
      ImageExtension.configure({
        HTMLAttributes: {
          class: "tiptap-image",
        },
      }),
      Placeholder.configure({
        placeholder: "Tell your story...",
      }),
    ],
    content: "",
  });

  if (!editorInstance) return null;

  // ======================
  // INSERT IMAGE / VIDEO (LOCAL PREVIEW)
  // ======================
  const insertFile = async (file, type) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (type === "image") {
      editorInstance.chain().focus().setImage({ src: data.url }).run();
    }

    if (type === "video") {
      editorInstance.commands.insertContent(
        `<video controls src="${data.url}" style="max-width:100%"></video>`
      );
    }
  };

  // ======================
  // PUBLISH
  // ======================
  const handlePublish = async () => {
    const html = editorInstance.getHTML();

    if (!title || !html) {
      alert("Title và content không được rỗng");
      return;
    }

    // lấy ảnh đầu tiên làm cover
    const imgMatch = html.match(/<img[^>]+src="([^">]+)"/);
    const coverImg = imgMatch ? imgMatch[1] : null;

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        slug: title.toLowerCase().replace(/\s+/g, "-"),
        desc: html,
        img: coverImg,
        catSlug,
      }),
    });

    if (!res.ok) {
      alert("Publish thất bại");
      return;
    }

    const post = await res.json();
    router.push(`/posts/${post.slug}`);
  };

  return (
    <div className={container}>
      {/* TITLE */}
      <input
        type="text"
        placeholder="Title"
        className={input}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* CATEGORY */}
      <select
        value={catSlug}
        onChange={(e) => setCatSlug(e.target.value)}
        className={select}
      >
        <option value="coding">Coding</option>
        <option value="food">Food</option>
        <option value="fashion">Fashion</option>
        <option value="style">Style</option>
        <option value="culture">Culture</option>
        <option value="travel">Travel</option>
      </select>

      <div className={editor}>
        {/* ADD BUTTON */}
        <button className={button} onClick={() => setOpen(!open)}>
          <Image src="/images/plus.png" width={16} height={16} alt="plus" />
        </button>

        {/* ADD MENU */}
        {open && (
          <div className={add}>
            {/* IMAGE */}
            <button
              className={button}
              onClick={() => imageInputRef.current.click()}
            >
              <Image
                src="/images/image.png"
                width={16}
                height={16}
                alt="image"
              />
            </button>

            {/* VIDEO */}
            <button
              className={button}
              onClick={() => videoInputRef.current.click()}
            >
              <Image
                src="/images/video.png"
                width={16}
                height={16}
                alt="video"
              />
            </button>
          </div>
        )}

        {/* HIDDEN INPUTS */}
        <input
          type="file"
          accept="image/*"
          hidden
          ref={imageInputRef}
          onChange={(e) => insertFile(e.target.files[0], "image")}
        />

        <input
          type="file"
          accept="video/*"
          hidden
          ref={videoInputRef}
          onChange={(e) => insertFile(e.target.files[0], "video")}
        />

        {/* EDITOR */}
        <div className={tiptapContainer}>
          <BubbleMenu editor={editorInstance} tippyOptions={{ duration: 150 }}>
            <div className={bubbleMenu}>
              <button
                className={editorInstance.isActive("bold") ? active : ""}
                onClick={() =>
                  editorInstance.chain().focus().toggleBold().run()
                }
              >
                <b>B</b>
              </button>

              <button
                className={editorInstance.isActive("italic") ? active : ""}
                onClick={() =>
                  editorInstance.chain().focus().toggleItalic().run()
                }
              >
                <i>I</i>
              </button>

              <button
                className={editorInstance.isActive("strike") ? active : ""}
                onClick={() =>
                  editorInstance.chain().focus().toggleStrike().run()
                }
              >
                <s>S</s>
              </button>

              <button
                className={
                  editorInstance.isActive("heading", { level: 2 }) ? active : ""
                }
                onClick={() =>
                  editorInstance
                    .chain()
                    .focus()
                    .toggleHeading({ level: 2 })
                    .run()
                }
              >
                H2
              </button>

              <button
                className={
                  editorInstance.isActive("heading", { level: 3 }) ? active : ""
                }
                onClick={() =>
                  editorInstance
                    .chain()
                    .focus()
                    .toggleHeading({ level: 3 })
                    .run()
                }
              >
                H3
              </button>

              <button
                className={editorInstance.isActive("link") ? active : ""}
                onClick={() => {
                  if (editorInstance.isActive("link")) {
                    editorInstance.chain().focus().unsetLink().run();
                  } else {
                    const url = prompt("Nhập link:");
                    if (url) {
                      editorInstance
                        .chain()
                        .focus()
                        .extendMarkRange("link")
                        .setLink({ href: url })
                        .run();
                    }
                  }
                }}
              >
                🔗
              </button>
            </div>
          </BubbleMenu>

          <EditorContent editor={editorInstance} className={tiptap} />
        </div>
      </div>

      <button className={publish} onClick={handlePublish}>
        Publish
      </button>
    </div>
  );
};

export default WritePage;
