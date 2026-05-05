"use client";

import { useState } from "react";
import {
  Combine, Scissors, RotateCw, Trash2, Hash, Droplet, Minimize2,
  ArrowDownUp, FileOutput, FlipVertical, Copy, Tag, FilePlus, AlignLeft, Crop,
  Loader2, Download, Upload, Check, X
} from "lucide-react";

type Tool =
  | "merge" | "split" | "rotate" | "delete" | "page-numbers" | "watermark" | "compress"
  | "reorder" | "extract" | "reverse" | "duplicate" | "metadata" | "insert-blank" | "header-footer" | "crop";

type ToolDef = {
  id: Tool;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  help: string;
};

const TOOLS: ToolDef[] = [
  { id: "merge", label: "Merge PDFs", icon: Combine, help: "Combine two or more PDF files into a single document." },
  { id: "split", label: "Split PDF", icon: Scissors, help: "Split a PDF by page ranges (e.g. 1-3,5,8-10) into a new file per range." },
  { id: "extract", label: "Extract Pages", icon: FileOutput, help: "Pull specific pages out of a PDF into one new file." },
  { id: "reorder", label: "Reorder Pages", icon: ArrowDownUp, help: "Set a new page order using a comma list (e.g. 3,1,2,4)." },
  { id: "reverse", label: "Reverse Pages", icon: FlipVertical, help: "Flip the page order of a PDF (last becomes first)." },
  { id: "duplicate", label: "Duplicate Pages", icon: Copy, help: "Duplicate selected pages a chosen number of times in place." },
  { id: "rotate", label: "Rotate Pages", icon: RotateCw, help: "Rotate selected pages by 90°, 180°, or 270°." },
  { id: "delete", label: "Delete Pages", icon: Trash2, help: "Remove specific pages from your PDF." },
  { id: "insert-blank", label: "Insert Blank", icon: FilePlus, help: "Insert blank pages after the given page numbers." },
  { id: "page-numbers", label: "Page Numbers", icon: Hash, help: "Stamp page numbers in the footer of every page." },
  { id: "header-footer", label: "Header / Footer", icon: AlignLeft, help: "Add a custom header or footer text to every page." },
  { id: "watermark", label: "Watermark", icon: Droplet, help: "Add a diagonal text watermark to every page." },
  { id: "crop", label: "Crop Pages", icon: Crop, help: "Trim equal margins (in points) from every page." },
  { id: "metadata", label: "Edit Metadata", icon: Tag, help: "Set the PDF's title, author, subject and keywords." },
  { id: "compress", label: "Compress", icon: Minimize2, help: "Re-save with object-stream compression to shrink size." },
];

function parsePages(input: string, totalPages: number): number[] {
  const result = new Set<number>();
  for (const part of input.split(",").map((s) => s.trim()).filter(Boolean)) {
    if (part.includes("-")) {
      const [a, b] = part.split("-").map((n) => parseInt(n, 10));
      if (!isNaN(a) && !isNaN(b)) {
        const lo = Math.max(1, Math.min(a, b));
        const hi = Math.min(totalPages, Math.max(a, b));
        for (let i = lo; i <= hi; i++) result.add(i);
      }
    } else {
      const n = parseInt(part, 10);
      if (!isNaN(n) && n >= 1 && n <= totalPages) result.add(n);
    }
  }
  return Array.from(result).sort((a, b) => a - b);
}

function parsePagesOrdered(input: string, totalPages: number): number[] {
  const result: number[] = [];
  for (const part of input.split(",").map((s) => s.trim()).filter(Boolean)) {
    const n = parseInt(part, 10);
    if (!isNaN(n) && n >= 1 && n <= totalPages) result.push(n);
  }
  return result;
}

function parseRanges(input: string, totalPages: number): { start: number; end: number }[] {
  const ranges: { start: number; end: number }[] = [];
  for (const part of input.split(",").map((s) => s.trim()).filter(Boolean)) {
    if (part.includes("-")) {
      const [a, b] = part.split("-").map((n) => parseInt(n, 10));
      if (!isNaN(a) && !isNaN(b)) {
        ranges.push({ start: Math.max(1, Math.min(a, b)), end: Math.min(totalPages, Math.max(a, b)) });
      }
    } else {
      const n = parseInt(part, 10);
      if (!isNaN(n) && n >= 1 && n <= totalPages) ranges.push({ start: n, end: n });
    }
  }
  return ranges;
}

function downloadBlob(bytes: Uint8Array, name: string) {
  const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = name;
  a.click();
}

type HFPosition = "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";

export function PDFTools() {
  const [tool, setTool] = useState<Tool>("merge");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  // Inputs
  const [files, setFiles] = useState<File[]>([]);
  const [pageInput, setPageInput] = useState("");
  const [degrees, setDegrees] = useState<90 | 180 | 270>(90);
  const [watermarkText, setWatermarkText] = useState("CONFIDENTIAL");
  const [duplicateCount, setDuplicateCount] = useState(1);
  const [metaTitle, setMetaTitle] = useState("");
  const [metaAuthor, setMetaAuthor] = useState("");
  const [metaSubject, setMetaSubject] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [hfText, setHfText] = useState("");
  const [hfPosition, setHfPosition] = useState<HFPosition>("top-center");
  const [cropMargin, setCropMargin] = useState(20);

  const reset = () => {
    setFiles([]);
    setPageInput("");
    setError(null);
    setDone(false);
    setBusy(false);
  };

  const onSelectTool = (t: Tool) => {
    setTool(t);
    reset();
  };

  const onFiles = (fl: FileList | null) => {
    if (!fl) return;
    const arr = Array.from(fl).filter((f) => f.type === "application/pdf");
    if (arr.length === 0) {
      setError("Please select PDF file(s).");
      return;
    }
    setError(null);
    setDone(false);
    setFiles(tool === "merge" ? [...files, ...arr] : arr.slice(0, 1));
  };

  const removeFile = (i: number) => setFiles(files.filter((_, idx) => idx !== i));

  const run = async () => {
    if (busy) return;
    if (files.length === 0) { setError("Choose a PDF file first."); return; }
    setBusy(true); setError(null); setDone(false);

    try {
      const { PDFDocument, degrees: pdfDegrees, StandardFonts, rgb } = await import("pdf-lib");

      if (tool === "merge") {
        if (files.length < 2) throw new Error("Pick at least two PDFs to merge.");
        const out = await PDFDocument.create();
        for (const f of files) {
          const buf = await f.arrayBuffer();
          const src = await PDFDocument.load(buf);
          const pages = await out.copyPages(src, src.getPageIndices());
          pages.forEach((p) => out.addPage(p));
        }
        downloadBlob(await out.save(), `merged-${Date.now()}.pdf`);
      }

      else if (tool === "split") {
        const buf = await files[0].arrayBuffer();
        const src = await PDFDocument.load(buf);
        const total = src.getPageCount();
        const ranges = parseRanges(pageInput || `1-${total}`, total);
        if (ranges.length === 0) throw new Error("Enter valid page ranges (e.g. 1-3,5,8-10).");
        for (const r of ranges) {
          const out = await PDFDocument.create();
          const indices: number[] = [];
          for (let p = r.start; p <= r.end; p++) indices.push(p - 1);
          const pages = await out.copyPages(src, indices);
          pages.forEach((p) => out.addPage(p));
          downloadBlob(await out.save(), `split-${r.start}-${r.end}.pdf`);
        }
      }

      else if (tool === "extract") {
        const buf = await files[0].arrayBuffer();
        const src = await PDFDocument.load(buf);
        const total = src.getPageCount();
        const targets = parsePages(pageInput, total);
        if (targets.length === 0) throw new Error("Enter pages to extract (e.g. 2,5-7).");
        const out = await PDFDocument.create();
        const pages = await out.copyPages(src, targets.map((n) => n - 1));
        pages.forEach((p) => out.addPage(p));
        downloadBlob(await out.save(), `extracted-${Date.now()}.pdf`);
      }

      else if (tool === "reorder") {
        const buf = await files[0].arrayBuffer();
        const src = await PDFDocument.load(buf);
        const total = src.getPageCount();
        const order = parsePagesOrdered(pageInput, total);
        if (order.length === 0) throw new Error("Enter the new page order, e.g. 3,1,2,4.");
        const out = await PDFDocument.create();
        const pages = await out.copyPages(src, order.map((n) => n - 1));
        pages.forEach((p) => out.addPage(p));
        downloadBlob(await out.save(), `reordered-${Date.now()}.pdf`);
      }

      else if (tool === "reverse") {
        const buf = await files[0].arrayBuffer();
        const src = await PDFDocument.load(buf);
        const total = src.getPageCount();
        const order = Array.from({ length: total }, (_, i) => total - 1 - i);
        const out = await PDFDocument.create();
        const pages = await out.copyPages(src, order);
        pages.forEach((p) => out.addPage(p));
        downloadBlob(await out.save(), `reversed-${Date.now()}.pdf`);
      }

      else if (tool === "duplicate") {
        const buf = await files[0].arrayBuffer();
        const src = await PDFDocument.load(buf);
        const total = src.getPageCount();
        const targets = pageInput.trim() ? parsePages(pageInput, total) : Array.from({ length: total }, (_, i) => i + 1);
        if (targets.length === 0) throw new Error("No valid pages selected.");
        if (duplicateCount < 1) throw new Error("Duplicate count must be at least 1.");
        const out = await PDFDocument.create();
        // Build new sequence: each original page followed by N copies
        const newSeq: number[] = [];
        const targetSet = new Set(targets);
        for (let i = 1; i <= total; i++) {
          newSeq.push(i - 1);
          if (targetSet.has(i)) {
            for (let c = 0; c < duplicateCount; c++) newSeq.push(i - 1);
          }
        }
        const pages = await out.copyPages(src, newSeq);
        pages.forEach((p) => out.addPage(p));
        downloadBlob(await out.save(), `duplicated-${Date.now()}.pdf`);
      }

      else if (tool === "rotate") {
        const buf = await files[0].arrayBuffer();
        const doc = await PDFDocument.load(buf);
        const total = doc.getPageCount();
        const targets = pageInput.trim() ? parsePages(pageInput, total) : Array.from({ length: total }, (_, i) => i + 1);
        if (targets.length === 0) throw new Error("No valid pages selected.");
        for (const n of targets) {
          const page = doc.getPage(n - 1);
          page.setRotation(pdfDegrees(page.getRotation().angle + degrees));
        }
        downloadBlob(await doc.save(), `rotated-${Date.now()}.pdf`);
      }

      else if (tool === "delete") {
        const buf = await files[0].arrayBuffer();
        const doc = await PDFDocument.load(buf);
        const total = doc.getPageCount();
        const targets = parsePages(pageInput, total);
        if (targets.length === 0) throw new Error("Enter pages to delete (e.g. 2,5-7).");
        if (targets.length >= total) throw new Error("Cannot delete every page.");
        for (const n of [...targets].sort((a, b) => b - a)) doc.removePage(n - 1);
        downloadBlob(await doc.save(), `pages-removed-${Date.now()}.pdf`);
      }

      else if (tool === "insert-blank") {
        const buf = await files[0].arrayBuffer();
        const src = await PDFDocument.load(buf);
        const total = src.getPageCount();
        const positions = parsePages(pageInput, total);
        if (positions.length === 0) throw new Error("Enter positions where to insert blanks (e.g. 1,3,5).");
        const firstPage = src.getPage(0);
        const { width, height } = firstPage.getSize();
        const out = await PDFDocument.create();
        const pages = await out.copyPages(src, src.getPageIndices());
        const posSet = new Set(positions);
        for (let i = 0; i < total; i++) {
          out.addPage(pages[i]);
          if (posSet.has(i + 1)) out.addPage([width, height]);
        }
        downloadBlob(await out.save(), `with-blanks-${Date.now()}.pdf`);
      }

      else if (tool === "page-numbers") {
        const buf = await files[0].arrayBuffer();
        const doc = await PDFDocument.load(buf);
        const font = await doc.embedFont(StandardFonts.Helvetica);
        const total = doc.getPageCount();
        for (let i = 0; i < total; i++) {
          const page = doc.getPage(i);
          const { width } = page.getSize();
          const text = `${i + 1} / ${total}`;
          const w = font.widthOfTextAtSize(text, 11);
          page.drawText(text, { x: width / 2 - w / 2, y: 24, size: 11, font, color: rgb(0.35, 0.35, 0.35) });
        }
        downloadBlob(await doc.save(), `numbered-${Date.now()}.pdf`);
      }

      else if (tool === "header-footer") {
        if (!hfText.trim()) throw new Error("Enter the header or footer text.");
        const buf = await files[0].arrayBuffer();
        const doc = await PDFDocument.load(buf);
        const font = await doc.embedFont(StandardFonts.Helvetica);
        const fontSize = 10;
        for (const page of doc.getPages()) {
          const { width, height } = page.getSize();
          const isTop = hfPosition.startsWith("top");
          const align = hfPosition.endsWith("left") ? "left" : hfPosition.endsWith("right") ? "right" : "center";
          const textWidth = font.widthOfTextAtSize(hfText, fontSize);
          const margin = 36;
          const y = isTop ? height - margin : margin;
          const x = align === "left" ? margin : align === "right" ? width - margin - textWidth : width / 2 - textWidth / 2;
          page.drawText(hfText, { x, y, size: fontSize, font, color: rgb(0.35, 0.35, 0.35) });
        }
        downloadBlob(await doc.save(), `header-footer-${Date.now()}.pdf`);
      }

      else if (tool === "watermark") {
        if (!watermarkText.trim()) throw new Error("Enter watermark text.");
        const buf = await files[0].arrayBuffer();
        const doc = await PDFDocument.load(buf);
        const font = await doc.embedFont(StandardFonts.HelveticaBold);
        for (const page of doc.getPages()) {
          const { width, height } = page.getSize();
          const fontSize = Math.min(width, height) * 0.12;
          const textWidth = font.widthOfTextAtSize(watermarkText, fontSize);
          page.drawText(watermarkText, {
            x: width / 2 - textWidth / 2,
            y: height / 2 - fontSize / 2,
            size: fontSize, font,
            color: rgb(0.85, 0.45, 0.05),
            opacity: 0.18,
            rotate: pdfDegrees(-30),
          });
        }
        downloadBlob(await doc.save(), `watermarked-${Date.now()}.pdf`);
      }

      else if (tool === "crop") {
        if (cropMargin < 0) throw new Error("Margin must be 0 or larger.");
        const buf = await files[0].arrayBuffer();
        const doc = await PDFDocument.load(buf);
        for (const page of doc.getPages()) {
          const { width, height } = page.getSize();
          const newW = Math.max(1, width - cropMargin * 2);
          const newH = Math.max(1, height - cropMargin * 2);
          page.setCropBox(cropMargin, cropMargin, newW, newH);
        }
        downloadBlob(await doc.save(), `cropped-${Date.now()}.pdf`);
      }

      else if (tool === "metadata") {
        const buf = await files[0].arrayBuffer();
        const doc = await PDFDocument.load(buf);
        if (metaTitle) doc.setTitle(metaTitle);
        if (metaAuthor) doc.setAuthor(metaAuthor);
        if (metaSubject) doc.setSubject(metaSubject);
        if (metaKeywords) doc.setKeywords(metaKeywords.split(",").map((k) => k.trim()).filter(Boolean));
        doc.setModificationDate(new Date());
        doc.setProducer("Mic Lens");
        downloadBlob(await doc.save(), `metadata-${Date.now()}.pdf`);
      }

      else if (tool === "compress") {
        const buf = await files[0].arrayBuffer();
        const doc = await PDFDocument.load(buf);
        const bytes = await doc.save({ useObjectStreams: true, addDefaultPage: false });
        const ratio = ((1 - bytes.length / buf.byteLength) * 100).toFixed(1);
        downloadBlob(bytes, `compressed-${Date.now()}.pdf`);
        if (Number(ratio) <= 0) {
          setError("This PDF is already optimised (no further reduction). File saved unchanged.");
        }
      }

      setDone(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Operation failed.");
    } finally {
      setBusy(false);
    }
  };

  const current = TOOLS.find((t) => t.id === tool)!;
  const Icon = current.icon;

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Tool selector */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {TOOLS.map((t) => {
          const TIcon = t.icon;
          const active = tool === t.id;
          return (
            <button
              key={t.id}
              onClick={() => onSelectTool(t.id)}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                active
                  ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                  : "bg-white text-[var(--fg)] border-[var(--border)] hover:border-[var(--primary)]"
              }`}
            >
              <TIcon className="w-3.5 h-3.5" />
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="rounded-2xl border border-[var(--border)] bg-white p-6 md:p-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-[var(--primary-bg)] text-[var(--primary)] flex items-center justify-center shrink-0">
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold">{current.label}</h3>
            <p className="text-sm text-[var(--muted)] mt-1">{current.help}</p>
          </div>
        </div>

        <label className="block">
          <div className="rounded-xl border-2 border-dashed border-[var(--border)] bg-[var(--bg-2)] p-6 text-center cursor-pointer hover:border-[var(--primary)] transition-colors">
            <Upload className="w-6 h-6 mx-auto mb-2 text-[var(--primary)]" />
            <p className="text-sm font-medium">{tool === "merge" ? "Add PDF files" : "Choose a PDF file"}</p>
            <p className="text-xs text-[var(--muted)] mt-1">PDF only · processing stays in your browser</p>
            <input type="file" accept="application/pdf" multiple={tool === "merge"} className="hidden" onChange={(e) => onFiles(e.target.files)} />
          </div>
        </label>

        {files.length > 0 && (
          <ul className="mt-4 space-y-2">
            {files.map((f, i) => (
              <li key={i} className="flex items-center justify-between text-sm bg-[var(--bg-2)] rounded-lg px-3 py-2">
                <span className="truncate">{i + 1}. {f.name} <span className="text-[var(--muted)]">· {(f.size / 1024 / 1024).toFixed(2)} MB</span></span>
                <button onClick={() => removeFile(i)} className="text-[var(--muted)] hover:text-[var(--danger)]"><X className="w-4 h-4" /></button>
              </li>
            ))}
          </ul>
        )}

        {/* Tool-specific options */}
        {(tool === "split" || tool === "delete" || tool === "rotate" || tool === "extract" || tool === "duplicate" || tool === "insert-blank" || tool === "reorder") && (
          <div className="mt-5">
            <label className="block text-sm font-medium mb-1.5">
              {tool === "split" && "Page ranges to extract"}
              {tool === "delete" && "Pages to delete"}
              {tool === "rotate" && "Pages to rotate (leave empty for all)"}
              {tool === "extract" && "Pages to extract"}
              {tool === "duplicate" && "Pages to duplicate (leave empty for all)"}
              {tool === "insert-blank" && "Insert blank after pages"}
              {tool === "reorder" && "New page order"}
            </label>
            <input
              type="text" value={pageInput} onChange={(e) => setPageInput(e.target.value)}
              placeholder={tool === "reorder" ? "e.g. 3,1,2,4" : "e.g. 1-3, 5, 8-10"}
              className="w-full border border-[var(--border)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
            <p className="text-xs text-[var(--muted)] mt-1">
              {tool === "reorder"
                ? <>Comma-separated list of every page in the new order (no ranges).</>
                : <>Use commas and dashes. Examples: <code>2,5,9</code>, <code>1-3,7-9</code>.</>}
            </p>
          </div>
        )}

        {tool === "rotate" && (
          <div className="mt-5">
            <label className="block text-sm font-medium mb-1.5">Rotation</label>
            <div className="flex gap-2">
              {[90, 180, 270].map((d) => (
                <button key={d} onClick={() => setDegrees(d as 90 | 180 | 270)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border ${
                    degrees === d ? "bg-[var(--primary)] text-white border-[var(--primary)]" : "bg-white border-[var(--border)] hover:border-[var(--primary)]"
                  }`}>{d}°</button>
              ))}
            </div>
          </div>
        )}

        {tool === "duplicate" && (
          <div className="mt-5">
            <label className="block text-sm font-medium mb-1.5">Number of duplicates per selected page</label>
            <input type="number" min={1} max={20} value={duplicateCount} onChange={(e) => setDuplicateCount(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-32 border border-[var(--border)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" />
          </div>
        )}

        {tool === "watermark" && (
          <div className="mt-5">
            <label className="block text-sm font-medium mb-1.5">Watermark text</label>
            <input type="text" value={watermarkText} onChange={(e) => setWatermarkText(e.target.value)} placeholder="CONFIDENTIAL" maxLength={40}
              className="w-full border border-[var(--border)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" />
          </div>
        )}

        {tool === "header-footer" && (
          <div className="mt-5 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Header / footer text</label>
              <input type="text" value={hfText} onChange={(e) => setHfText(e.target.value)} placeholder="Company name · Q1 2026" maxLength={80}
                className="w-full border border-[var(--border)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Position</label>
              <select value={hfPosition} onChange={(e) => setHfPosition(e.target.value as HFPosition)}
                className="border border-[var(--border)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]">
                <option value="top-left">Top left</option>
                <option value="top-center">Top center</option>
                <option value="top-right">Top right</option>
                <option value="bottom-left">Bottom left</option>
                <option value="bottom-center">Bottom center</option>
                <option value="bottom-right">Bottom right</option>
              </select>
            </div>
          </div>
        )}

        {tool === "crop" && (
          <div className="mt-5">
            <label className="block text-sm font-medium mb-1.5">Margin to trim (in points, all sides)</label>
            <input type="number" min={0} max={300} value={cropMargin} onChange={(e) => setCropMargin(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-32 border border-[var(--border)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" />
            <p className="text-xs text-[var(--muted)] mt-1">1 inch ≈ 72 points. 20 ≈ 7 mm.</p>
          </div>
        )}

        {tool === "metadata" && (
          <div className="mt-5 grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Title</label>
              <input type="text" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)}
                className="w-full border border-[var(--border)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Author</label>
              <input type="text" value={metaAuthor} onChange={(e) => setMetaAuthor(e.target.value)}
                className="w-full border border-[var(--border)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1.5">Subject</label>
              <input type="text" value={metaSubject} onChange={(e) => setMetaSubject(e.target.value)}
                className="w-full border border-[var(--border)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1.5">Keywords (comma-separated)</label>
              <input type="text" value={metaKeywords} onChange={(e) => setMetaKeywords(e.target.value)} placeholder="report, q1, internal"
                className="w-full border border-[var(--border)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]" />
            </div>
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-3 items-center">
          <button onClick={run} disabled={busy || files.length === 0}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed">
            {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            {busy ? "Processing…" : `Run ${current.label}`}
          </button>
          {done && !error && <span className="inline-flex items-center gap-1.5 text-sm text-[var(--success)] font-medium"><Check className="w-4 h-4" /> Done — file downloaded</span>}
          <button onClick={reset} className="text-sm text-[var(--muted)] hover:text-[var(--fg)] ml-auto">Clear</button>
        </div>

        {error && <div className="mt-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">{error}</div>}

        <p className="mt-5 text-xs text-[var(--muted)] text-center">
          All operations run locally in your browser. Your file is never uploaded to a server.
        </p>
      </div>
    </div>
  );
}
