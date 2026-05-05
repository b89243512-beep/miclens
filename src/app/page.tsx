import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Scanner } from "@/components/Scanner";
import { PDFTools } from "@/components/PDFTools";
import { ScanLine, Lock, Zap, Globe, FileType, Camera, Download, Check, FileText, Edit3, Smartphone, Combine, Scissors, RotateCw, Trash2, Hash, Droplet, Minimize2, ArrowDownUp, FileOutput, FlipVertical, Copy, Tag, FilePlus, AlignLeft, Crop } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="px-4 pt-6 pb-8 md:pt-8 md:pb-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-3 leading-[1.05]">
              Free Microsoft Lens
              <span className="text-xl md:text-3xl font-medium text-[var(--muted)] tracking-normal align-baseline ml-2">
                alt
              </span>
              <br />
              PDF Scanner &amp; <span className="text-[var(--primary)]">Editor</span>
            </h1>
            <p className="text-sm font-medium text-[var(--primary)] mb-4">
              Mic Lens — totally free PDF Scanner &amp; Editor, no signup.
            </p>
            <p className="text-sm text-[var(--muted)] max-w-2xl mx-auto mb-8 leading-relaxed">
              Mic Lens is a free online document scanner, OCR engine, and PDF editor that runs entirely in your browser
              on PC, Mac, iPhone, iPad and Android. Scan paper documents with your camera, extract text from photos,
              convert images to searchable PDFs, edit pages, and export everything in seconds — without uploading your
              files to any server. A fast, privacy-first alternative for people looking for a Microsoft Lens-style
              experience on the web.
            </p>
          </div>
          <div id="scanner">
            <Scanner />
          </div>
        </section>

        {/* PDF Editor — free tools */}
        <section id="pdf-editor" className="px-4 py-16 bg-gradient-to-b from-[var(--bg-2)] to-white border-y border-[var(--border)]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[var(--primary)] bg-[var(--primary-bg)] px-3 py-1.5 rounded-full mb-3">
                Free PDF Editor
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                Free PDF Editor &amp; Scanner
              </h2>
              <p className="text-[var(--muted)] max-w-2xl mx-auto">
                Merge, split, rotate, delete pages, add page numbers, add watermark, compress — all free, all client-side,
                no upload, no signup.
              </p>
            </div>
            <PDFTools />
          </div>
        </section>

        {/* PDF Editor feature list */}
        <section className="px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Everything a PDF editor should do</h2>
              <p className="text-[var(--muted)] max-w-2xl mx-auto">
                The most-used PDF operations, all delivered as a single browser app — no installation, no fees.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <PDFFeature icon={<Combine className="w-5 h-5" />} title="Merge PDFs" body="Combine any number of PDFs into one continuous document, in the order you choose." />
              <PDFFeature icon={<Scissors className="w-5 h-5" />} title="Split PDF" body="Pull out specific page ranges and download each range as its own PDF file." />
              <PDFFeature icon={<FileOutput className="w-5 h-5" />} title="Extract Pages" body="Pick the pages you need and export them as a single new PDF in one click." />
              <PDFFeature icon={<ArrowDownUp className="w-5 h-5" />} title="Reorder Pages" body="Type a new page order (e.g. 3,1,2,4) to instantly rearrange your document." />
              <PDFFeature icon={<FlipVertical className="w-5 h-5" />} title="Reverse Pages" body="Flip the entire page order so the last page becomes the first." />
              <PDFFeature icon={<Copy className="w-5 h-5" />} title="Duplicate Pages" body="Duplicate selected pages a chosen number of times in place — handy for handouts." />
              <PDFFeature icon={<RotateCw className="w-5 h-5" />} title="Rotate Pages" body="Rotate selected pages by 90°, 180° or 270° to fix sideways or upside-down scans." />
              <PDFFeature icon={<Trash2 className="w-5 h-5" />} title="Delete Pages" body="Remove unwanted pages — blank pages, ads, cover sheets — from any PDF." />
              <PDFFeature icon={<FilePlus className="w-5 h-5" />} title="Insert Blank Pages" body="Drop blank pages after specific page numbers — perfect for double-sided printing." />
              <PDFFeature icon={<Hash className="w-5 h-5" />} title="Add Page Numbers" body="Stamp clean page numbers in the footer of every page in your document." />
              <PDFFeature icon={<AlignLeft className="w-5 h-5" />} title="Header / Footer" body="Add custom header or footer text in any of six positions on every page." />
              <PDFFeature icon={<Droplet className="w-5 h-5" />} title="Add Watermark" body="Apply a diagonal text watermark like CONFIDENTIAL or DRAFT to every page." />
              <PDFFeature icon={<Crop className="w-5 h-5" />} title="Crop Pages" body="Trim equal margins from every page to remove white borders or scanning artefacts." />
              <PDFFeature icon={<Tag className="w-5 h-5" />} title="Edit Metadata" body="Set or update PDF title, author, subject and keywords in seconds." />
              <PDFFeature icon={<Minimize2 className="w-5 h-5" />} title="Compress PDF" body="Re-save with object-stream compression to shrink file size for email and storage." />
              <PDFFeature icon={<FileText className="w-5 h-5" />} title="PDF to Text" body="Extract clean editable text from any PDF — works on both native and scanned files." />
              <PDFFeature icon={<FileType className="w-5 h-5" />} title="Image to PDF" body="Turn JPG, PNG, WEBP or HEIC photos into a polished, searchable PDF document." />
            </div>
          </div>
        </section>

        {/* Tool sections (consolidated from former sub-pages) */}
        <section id="tools" className="px-4 py-16 bg-[var(--bg-2)] border-y border-[var(--border)]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Everything in one app</h2>
              <p className="text-[var(--muted)] max-w-2xl mx-auto">
                Four scanning tools rolled into a single, private, browser-based workflow.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <ToolBlock
                icon={<FileText className="w-5 h-5" />}
                title="Image to Text"
                body="Drop a JPG, PNG, WEBP, BMP, GIF or HEIC photo and pull out clean editable text in seconds. The OCR
                engine supports more than 100 languages, including Latin, Cyrillic, CJK, Arabic, and Greek scripts.
                Perfect for receipts, screenshots, lecture slides, book passages, and handwritten notes that you do not
                want to retype."
              />
              <ToolBlock
                icon={<FileType className="w-5 h-5" />}
                title="Image to PDF"
                body="Turn any photo into a polished PDF document with proper margins and embedded fonts. Optional OCR
                makes the resulting PDF fully searchable — every word is selectable text rather than just a bitmap, so
                you can search with Cmd-F, copy passages, or feed the file into another tool that expects machine-readable
                content."
              />
              <ToolBlock
                icon={<Camera className="w-5 h-5" />}
                title="Scan Document Online"
                body="Open Mic Lens on your phone and tap the camera button to capture a page directly from your phone
                camera. The image is processed instantly on-device, so even sensitive material like contracts, ID
                documents, medical reports, and invoices stays on your phone. There is no app to install, no signup, and
                no usage cap."
              />
              <ToolBlock
                icon={<Edit3 className="w-5 h-5" />}
                title="PDF to Text &amp; Editor"
                body="Pull plain text out of any PDF — both native PDFs and scanned ones. For text-based PDFs the
                extraction is instant; for scanned PDFs, Mic Lens automatically routes the pages through OCR. You can
                review, correct, and edit the result in place before exporting it as a TXT file or back into a clean
                searchable PDF."
              />
            </div>
          </div>
        </section>

        {/* Features grid */}
        <section className="px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Why Mic Lens?</h2>
              <p className="text-[var(--muted)] max-w-2xl mx-auto">
                A modern, private, free alternative to clunky desktop scanners and cloud-based OCR services.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              <Feature icon={<Lock className="w-5 h-5" />} title="100% Private" body="Your image never touches a server. OCR runs in your browser tab via WebAssembly. Closing the tab clears everything." />
              <Feature icon={<Zap className="w-5 h-5" />} title="Instant Results" body="A typical scan completes in 3–10 seconds depending on image size and language. The OCR model is cached after the first use." />
              <Feature icon={<Globe className="w-5 h-5" />} title="100+ Languages" body="Recognise Latin, Cyrillic, CJK, Arabic, Hebrew, Greek and more — out of the box, no extra downloads." />
              <Feature icon={<FileType className="w-5 h-5" />} title="Many Formats In" body="JPG, PNG, WEBP, BMP, GIF, HEIC. Drag, paste, or capture from your camera. Files up to 25 MB." />
              <Feature icon={<Download className="w-5 h-5" />} title="Many Formats Out" body="Copy to clipboard, download as TXT, save a clean searchable PDF — or all three at once." />
              <Feature icon={<Smartphone className="w-5 h-5" />} title="Works Everywhere" body="Mobile, tablet, laptop, desktop. Any modern browser — Chrome, Safari, Firefox, Edge — runs the full app." />
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="px-4 py-16 bg-[var(--bg-2)] border-y border-[var(--border)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-3">How Mic Lens works</h2>
            <p className="text-[var(--muted)] text-center max-w-2xl mx-auto mb-12">
              Three short steps from raw photo to clean editable text or a polished PDF.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <Step n={1} title="Drop your image" body="Upload a photo, paste a screenshot, or open the page on your phone and tap Use camera. JPG, PNG, WEBP, BMP, GIF and HEIC all work." />
              <Step n={2} title="Choose a language" body="Pick the language of the text in your image. The OCR model loads once on first use, then is cached locally for every future scan." />
              <Step n={3} title="Copy or download" body="Edit the recognised text in place, copy it to your clipboard, save a TXT file, or export a clean searchable PDF." />
            </div>
          </div>
        </section>

        {/* Use cases */}
        <section id="use-cases" className="px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-3">What people scan with Mic Lens</h2>
            <p className="text-[var(--muted)] text-center max-w-2xl mx-auto mb-12">
              Whatever the source material, Mic Lens turns it into something searchable and editable.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <UseCase title="Receipts" body="Turn paper receipts into searchable text for monthly expense reports." />
              <UseCase title="Whiteboards" body="Capture meeting notes from a whiteboard photo and edit them later." />
              <UseCase title="Books and articles" body="Quote a passage from a book or printed paper without retyping it." />
              <UseCase title="Business cards" body="Extract names, titles, and contact details directly into your CRM." />
              <UseCase title="Handwritten notes" body="Convert clean handwriting from a notebook into editable digital text." />
              <UseCase title="Invoices and forms" body="Pull line items, totals, and form fields straight into a spreadsheet." />
              <UseCase title="Screenshots" body="Grab text from videos, slides, error messages, terminal output, or app screens." />
              <UseCase title="Foreign documents" body="Extract text first, then paste into your translator of choice." />
              <UseCase title="ID documents" body="Privately extract numbers and details — your photo never leaves the device." />
              <UseCase title="Schoolwork" body="Snap a textbook page and turn the answers into editable study notes." />
              <UseCase title="Old archives" body="Make decades-old scanned PDFs searchable for the first time." />
              <UseCase title="Recipes" body="Save your grandmother's handwritten recipes into a clean shareable doc." />
            </div>
          </div>
        </section>

        {/* Long-form SEO content */}
        <section className="px-4 py-16 bg-[var(--bg-2)] border-y border-[var(--border)]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">A free document scanner that respects your privacy</h2>
            <p className="text-[var(--muted)] mb-4 leading-relaxed">
              Mic Lens is an open, browser-based document scanner and OCR (optical character recognition) tool. It is
              built on well-established WebAssembly OCR engines and runs entirely on your device, so the photos and
              PDFs you scan never leave your browser. There is no signup, no usage limit, and no watermark on the
              output. If you are searching for a free, lightweight, privacy-first alternative to desktop scanner apps
              or cloud OCR services, Mic Lens covers the most common workflows in a single page.
            </p>

            <h3 className="text-xl font-bold mt-10 mb-3">Why a browser-based scanner matters</h3>
            <p className="text-[var(--muted)] mb-4 leading-relaxed">
              Most online scanners upload your file to a remote server, which means a copy of your document leaves
              your computer the moment you press the upload button. For sensitive material — medical reports,
              contracts, ID documents, salary statements, legal correspondence — that is rarely acceptable. Mic Lens
              uses a WebAssembly build of the open-source Tesseract OCR engine that runs in the browser tab itself.
              Once the model is loaded (a few megabytes, cached after the first scan), every subsequent scan happens
              locally with no network traffic involved. You can verify it yourself by opening the network tab in your
              browser developer tools while scanning.
            </p>

            <h3 className="text-xl font-bold mt-10 mb-3">When to use OCR online</h3>
            <p className="text-[var(--muted)] mb-4 leading-relaxed">
              OCR is the fastest way to convert an image of text into something you can search, edit, copy, or feed
              into another application. Whether you have a receipt, a contract page, a slide from a lecture, a snapshot
              of a whiteboard, or a screenshot of code, dropping it into Mic Lens gives you back clean editable text
              within seconds. From there you can paste it into your notes app, your CRM, a spreadsheet, a translation
              tool, or back into a clean searchable PDF.
            </p>

            <h3 className="text-xl font-bold mt-10 mb-3">Tips for the best results</h3>
            <ul className="text-[var(--muted)] space-y-2 leading-relaxed">
              <li>• Make sure the page is well lit and roughly aligned with the camera frame.</li>
              <li>• Avoid heavy shadows, glare, and motion blur. A tripod or a stack of books helps for documents.</li>
              <li>• Crop the image to the area you actually want before scanning — it improves both speed and accuracy.</li>
              <li>• Pick the correct language. Mixed-language documents work best when scanned in passes per language.</li>
              <li>• For handwriting, write clearly with a dark pen on a light background. Cursive recognition is limited.</li>
              <li>• If a scan looks messy, try a higher-resolution photo or screenshot before re-running OCR.</li>
              <li>• For long PDFs, run a few pages at a time so you can review the output as you go.</li>
            </ul>

            <h3 className="text-xl font-bold mt-10 mb-3">Mic Lens on PC, Mac, and mobile</h3>
            <p className="text-[var(--muted)] mb-4 leading-relaxed">
              On a desktop or laptop, drag any image file from your file manager into the upload zone, or paste a
              screenshot directly from the clipboard. On mobile, open the page in Chrome or Safari, tap{" "}
              <strong>Use camera</strong>, and capture the document directly with your phone camera. The interface is
              touch-friendly and works equally well in portrait and landscape. There is no app to install — the entire
              tool is delivered as a regular web page that you can bookmark or save to your home screen as a Progressive
              Web App.
            </p>

            <h3 className="text-xl font-bold mt-10 mb-3">A privacy-first alternative</h3>
            <p className="text-[var(--muted)] mb-4 leading-relaxed">
              If you have been using a scanner app on your phone but want a quick web-based option for occasional
              scanning on a laptop, Mic Lens fills that gap. It is independent and not affiliated with Microsoft Lens,
              Adobe Scan, CamScanner, or any other product. It is simply a free public utility that uses well-known
              open-source OCR libraries and modern browser features to bring scanning to the web. Bookmark the page,
              come back whenever you need it, and your files always stay on your device.
            </p>

            <h3 className="text-xl font-bold mt-10 mb-3">A free web alt to Office Lens</h3>
            <p className="text-[var(--muted)] mb-4 leading-relaxed">
              For users searching for an Office Lens alt, Mic Lens delivers the same core workflow — capture, OCR,
              export — without leaving the browser tab. Unlike most Lens app alternatives, Mic Lens does not require a
              login, an installation, or even a continuous internet connection after the first scan loads. It is a
              fast, friction-free alt to Office Lens that lives at a single URL and runs anywhere you have a modern
              browser. There is no mobile-only restriction, no Microsoft account, and no telemetry; the entire app is
              one static page plus a WebAssembly OCR worker that the browser caches after first use.
            </p>
            <p className="text-[var(--muted)] mb-4 leading-relaxed">
              People sometimes describe Mic Lens as a "lens app alternative for the desktop", because it lets you do
              from a laptop what office workers usually have to do from a phone. Plug a webcam in, hold a page in front
              of it, and you have a working scanner. Drop in an existing photo or screenshot and you get the same
              result. Either way, the recognised text and exported PDF are downloaded directly to your machine — no
              cloud round trip and no opaque server-side processing.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-3">Frequently asked questions</h2>
            <p className="text-[var(--muted)] text-center mb-10">Everything you might want to know before you scan.</p>
            <div className="space-y-4">
              <Faq q="Is Mic Lens really free?" a="Yes. There is no usage limit, no signup, and no watermark. Mic Lens runs in your browser and uses your device's resources, which means there are no server costs to recoup." />
              <Faq q="Do I need to install anything?" a="No. Mic Lens is a website. Open it on any modern browser — Chrome, Safari, Firefox, Edge — and start scanning. You can also save it to your phone's home screen as a Progressive Web App." />
              <Faq q="Where does my image go?" a="Nowhere. Files are processed in your browser tab and discarded when you close it. Nothing is uploaded to any server. You can verify this by opening the developer tools network panel while scanning." />
              <Faq q="Why is the first scan slower?" a="The OCR model is downloaded the first time you scan in a given language. After that it is cached, so subsequent scans for that language are much faster — typically a few seconds for a single page." />
              <Faq q="How accurate is the OCR?" a="Accuracy depends on image quality and language. Clean, high-contrast Latin-script documents typically reach above 95% character accuracy. Handwriting, low-light photos, and unusual fonts are harder." />
              <Faq q="Which file types can I upload?" a="JPG/JPEG, PNG, WEBP, BMP, GIF, HEIC, AVIF, and TIFF images are all supported. Native PDFs are extracted directly; scanned PDFs are routed through OCR automatically." />
              <Faq q="Which languages are supported?" a="More than 100. Common ones include English, Turkish, German, French, Spanish, Portuguese, Italian, Russian, Polish, Czech, Greek, Arabic, Hebrew, Chinese (Simplified and Traditional), Japanese, Korean, Hindi, and Vietnamese." />
              <Faq q="Can I export to PDF?" a="Yes. After scanning you can download a clean A4 PDF where every recognised word is real selectable text, not just an image. The PDF is generated in your browser using pdf-lib." />
              <Faq q="Is this an Office Lens alternative?" a="Yes. Mic Lens is an independent, free, browser-based alternative to Microsoft Office Lens. It delivers the same core workflow — capture, recognise, export — but runs as a web app at miclens.com instead of a mobile app, so you can use it on a laptop or desktop without installing anything. We built Mic Lens specifically as a quick alt to Office Lens for desktop users." />
              <Faq q="Is Mic Lens affiliated with Microsoft Lens?" a="No. Mic Lens is an independent product and is not affiliated with, endorsed by, or sponsored by Microsoft. Microsoft Lens and Office Lens are trademarks of their respective owners and are mentioned only descriptively for comparison." />
              <Faq q="Can I use Mic Lens on my phone?" a="Yes. Open this page in Chrome or Safari on your phone and tap Use camera. You can also save the site to your home screen for quick access." />
            </div>
            <div className="text-center mt-10">
              <Link href="#scanner" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-medium">
                <ScanLine className="w-4 h-4" /> Try Mic Lens now
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function PDFFeature({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="bg-white border border-[var(--border)] rounded-2xl p-5 hover:border-[var(--primary)] transition-colors">
      <div className="w-10 h-10 rounded-lg bg-[var(--primary-bg)] text-[var(--primary)] flex items-center justify-center mb-3">{icon}</div>
      <h3 className="font-bold mb-1">{title}</h3>
      <p className="text-sm text-[var(--muted)] leading-relaxed">{body}</p>
    </div>
  );
}

function Feature({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="bg-white border border-[var(--border)] rounded-2xl p-5">
      <div className="w-10 h-10 rounded-lg bg-[var(--primary-bg)] text-[var(--primary)] flex items-center justify-center mb-3">{icon}</div>
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-sm text-[var(--muted)] leading-relaxed">{body}</p>
    </div>
  );
}

function ToolBlock({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="bg-white border border-[var(--border)] rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-[var(--primary-bg)] text-[var(--primary)] flex items-center justify-center">{icon}</div>
        <h3 className="font-bold text-lg">{title}</h3>
      </div>
      <p className="text-sm text-[var(--muted)] leading-relaxed">{body}</p>
    </div>
  );
}

function Step({ n, title, body }: { n: number; title: string; body: string }) {
  return (
    <div className="text-center">
      <div className="w-12 h-12 rounded-full bg-[var(--primary)] text-white flex items-center justify-center mx-auto mb-4 font-bold">{n}</div>
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-sm text-[var(--muted)] leading-relaxed">{body}</p>
    </div>
  );
}

function UseCase({ title, body }: { title: string; body: string }) {
  return (
    <div className="bg-white border border-[var(--border)] rounded-xl p-4">
      <div className="flex items-center gap-2 mb-1">
        <Check className="w-4 h-4 text-[var(--primary)]" />
        <h3 className="font-semibold text-sm">{title}</h3>
      </div>
      <p className="text-sm text-[var(--muted)] leading-relaxed">{body}</p>
    </div>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <details className="bg-white border border-[var(--border)] rounded-xl p-4 group">
      <summary className="font-semibold cursor-pointer list-none flex items-center justify-between">
        <span>{q}</span>
        <span className="text-[var(--primary)] group-open:rotate-45 transition-transform text-xl leading-none">+</span>
      </summary>
      <p className="text-sm text-[var(--muted)] mt-3 leading-relaxed">{a}</p>
    </details>
  );
}
