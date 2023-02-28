import React, { useCallback, useEffect, useRef, useState } from "react";
import Quill from "quill";
import DOMPurify from "dompurify";
import "quill/dist/quill.snow.css";

let toolbarOptions = [
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block"],

  [{ header: 1 }, { header: 2 }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ direction: "rtl" }],

  [{ size: ["small", false, "large", "huge"] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],

  ["clean"],
];

export default function TextEditor() {
  const quillRef = useRef(null);

  const createLink = (text) => {
    return `<a href="https://example.com">${text}</a>`;
  };

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper === null) return;
    wrapper.innerHTML = "";

    const editor = document.createElement("div");
    wrapper.append(editor);
    const quill = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: toolbarOptions },
    });
    quillRef.current = quill;
  }, []);

  //   const handleSelectStrikeThrough = () => {
  //     if (quillRef.current) {
  //       const quill = quillRef.current;
  //       const contents = quill.getContents();

  //       const strikeThroughText = [];
  //       contents.ops.forEach((op) => {
  //         if (op.attributes && op.attributes.strike) {
  //           strikeThroughText.push(op.insert);
  //         }
  //       });

  //       //   quill.setSelection(0, quill.getLength());
  //       quill.format("strike", false); // Remove the strike-through formatting

  //       const linkText = createLink(strikeThroughText.join(" "));
  //       quill.clipboard.dangerouslyPasteHTML(linkText);

  //       console.log(strikeThroughText);
  //     }
  //   };

  const handleSelectStrikeThrough = () => {
    if (quillRef.current) {
      const quill = quillRef.current;
      const contents = quill.getContents();

      const newContents = [];

      contents.ops.forEach((op) => {
        if (op.attributes && op.attributes.strike) {
          const text = op.insert;
          const link = createLink(text);
          const sanitizedLink = DOMPurify.sanitize(link, {
            ALLOWED_TAGS: ["a"],
            ALLOWED_ATTR: ["href"],
          });

          const stringToHTML = function (str) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(str, "text/html");
            return doc.body;
          };

          const linkNode = stringToHTML(sanitizedLink).firstChild;
          newContents.push({
            attributes: { link: "https://example.com" },
            insert: text,
            link: linkNode,
          });
          console.log(newContents);
        } else {
          newContents.push(op);
        }
      });

      quill.setContents(newContents);
    }
  };

  return (
    <>
      <div className="container-q" ref={wrapperRef}></div>
      <div className="w-full flex justify-center items-center mb-8">
        <button
          onClick={handleSelectStrikeThrough}
          className="p-2 bg-blue-400 text-white rounded-lg"
        >
          Generate Link
        </button>
      </div>
    </>
  );
}
