"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, Loader2, Copy, Download, FileText, Camera, X, Check, FileType } from "lucide-react";

type Status = "idle" | "loading" | "processing" | "done" | "error";

const LANGS: { code: string; label: string }[] = [
  { code: "eng", label: "English" },
  { code: "tur", label: "Türkçe" },
  { code: "deu", label: "Deutsch" },
  { code: "fra", label: "Français" },
  { code: "spa", label: "Español" },
  { code: "por", label: "Português" },
  { code: "rus", label: "Русский" },
  { code: "ara", label: "العربية" },
  { code: "chi_sim", label: "中文 (简)" },
  { code: "jpn", label: "日本語" },
  { code: "kor", label: "한국어" },
];

export function Scanner() {
  const [status, setStatus] = useState<Status>("idle");
  const [progress, setProgress] = useState(0);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [lang, setLang] = useState("eng");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);

  const reset = () => {
    setStatus("idle");
    setProgress(0);
    setImagePreview(null);
    setText("");
    setError(null);
    setCopied(false);
  };

  const runOCR = useCallback(async (file: File) => {
    setStatus("loading");
    setError(null);
    setText("");
    const url = URL.createObjectURL(file);
    setImagePreview(url);

    try {
      const Tesseract = (await import("tesseract.js")).default;
      setStatus("processing");
      const { data } = await Tesseract.recognize(file, lang, {
        logger: (m) => {
          if (m.status === "recognizing text") setProgress(Math.round(m.progress * 100));
        },
      });
      setText(data.text.trim());
      setStatus("done");
    } catch (e) {
      console.error(e);
      setError("Could not read text from this image. Try a clearer photo.");
      setStatus("error");
    }
  }, [lang]);

  const onFile = (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file (JPG, PNG, WEBP, BMP, GIF, HEIC).");
      setStatus("error");
      return;
    }
    runOCR(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    dropRef.current?.classList.remove("ring-2");
    const file = e.dataTransfer.files?.[0];
    onFile(file);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    dropRef.current?.classList.add("ring-2");
  };

  const onDragLeave = () => dropRef.current?.classList.remove("ring-2");

  const copy = async () => {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const downloadTxt = () => {
    if (!text) return;
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `miclens-${Date.now()}.txt`;
    a.click();
  };

  const downloadPdf = async () => {
    if (!text) return;
    const { PDFDocument, StandardFonts } = await import("pdf-lib");
    const doc = await PDFDocument.create();
    const font = await doc.embedFont(StandardFonts.Helvetica);
    const page = doc.addPage([595, 842]); // A4
    const fontSize = 11;
    const margin = 50;
    const maxWidth = 595 - margin * 2;
    let y = 842 - margin;
    const wrapped: string[] = [];
    for (const line of text.split("\n")) {
      let buf = "";
      for (const word of line.split(" ")) {
        const test = buf ? `${buf} ${word}` : word;
        if (font.widthOfTextAtSize(test, fontSize) > maxWidth) {
          wrapped.push(buf);
          buf = word;
        } else buf = test;
      }
      wrapped.push(buf);
    }
    for (const line of wrapped) {
      if (y < margin) { y = 842 - margin; doc.addPage([595, 842]); }
      page.drawText(line, { x: margin, y, size: fontSize, font });
      y -= fontSize * 1.4;
    }
    const bytes = await doc.save();
    const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `miclens-${Date.now()}.pdf`;
    a.click();
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-5">
        {/* Upload zone */}
        <div
          ref={dropRef}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          className="rounded-2xl border-2 border-dashed border-[var(--border)] bg-[var(--bg-2)] min-h-[360px] p-6 flex flex-col items-center justify-center text-center transition-all hover:border-[var(--primary)] ring-[var(--primary)] ring-offset-0"
        >
          {!imagePreview ? (
            <>
              <div className="w-16 h-16 rounded-2xl bg-[var(--primary-bg)] text-[var(--primary)] flex items-center justify-center mb-4">
                <Upload className="w-7 h-7" />
              </div>
              <h3 className="font-semibold text-lg mb-1">Drop image here</h3>
              <p className="text-sm text-[var(--muted)] mb-5">or use one of the options below</p>
              <div className="flex flex-wrap gap-2 justify-center">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-medium text-sm"
                >
                  <FileType className="w-4 h-4" /> Choose file
                </button>
                <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border)] hover:border-[var(--primary)] font-medium text-sm cursor-pointer">
                  <Camera className="w-4 h-4" /> Use camera
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={(e) => onFile(e.target.files?.[0])}
                  />
                </label>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => onFile(e.target.files?.[0])}
              />
              <p className="mt-5 text-xs text-[var(--muted)]">JPG, PNG, WEBP, BMP, GIF, HEIC up to 25 MB</p>
            </>
          ) : (
            <div className="relative w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imagePreview} alt="preview" className="w-full max-h-[420px] object-contain rounded-xl" />
              <button
                onClick={reset}
                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/65 text-white flex items-center justify-center hover:bg-black/80"
                aria-label="Remove"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Output panel */}
        <div className="rounded-2xl border border-[var(--border)] bg-white min-h-[360px] p-5 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[var(--primary)]" />
              <h3 className="font-semibold">Extracted text</h3>
            </div>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              disabled={status === "loading" || status === "processing"}
              className="text-xs border border-[var(--border)] rounded-md px-2 py-1 bg-white"
            >
              {LANGS.map((l) => (
                <option key={l.code} value={l.code}>{l.label}</option>
              ))}
            </select>
          </div>

          <div className="flex-1 relative">
            {status === "idle" && (
              <p className="text-sm text-[var(--muted)]">Upload an image to extract its text. Processing happens entirely in your browser — your file never leaves your device.</p>
            )}
            {(status === "loading" || status === "processing") && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <Loader2 className="w-8 h-8 text-[var(--primary)] animate-spin mb-3" />
                <p className="text-sm font-medium">{status === "loading" ? "Loading model…" : `Reading text… ${progress}%`}</p>
                <p className="text-xs text-[var(--muted)] mt-1">First scan takes a few seconds while the OCR model loads.</p>
              </div>
            )}
            {status === "done" && (
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full h-full min-h-[260px] resize-none border border-[var(--border)] rounded-lg p-3 text-sm font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              />
            )}
            {status === "error" && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">{error}</div>
            )}
          </div>

          {status === "done" && (
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                onClick={copy}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--primary-bg)] text-[var(--primary)] text-sm font-medium hover:bg-[var(--primary)] hover:text-white"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied" : "Copy"}
              </button>
              <button
                onClick={downloadTxt}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-[var(--border)] text-sm font-medium hover:bg-[var(--bg-2)]"
              >
                <Download className="w-4 h-4" /> .txt
              </button>
              <button
                onClick={downloadPdf}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-[var(--border)] text-sm font-medium hover:bg-[var(--bg-2)]"
              >
                <Download className="w-4 h-4" /> .pdf
              </button>
              <button
                onClick={reset}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-[var(--border)] text-sm font-medium hover:bg-[var(--bg-2)] ml-auto"
              >
                <X className="w-4 h-4" /> New scan
              </button>
            </div>
          )}
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-[var(--muted)]">
        100% private. All recognition runs locally with WebAssembly. No image is uploaded to any server.
      </p>
    </div>
  );
}
