import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Scanner } from "@/components/Scanner";
import { ScanLine, Lock, Zap, Globe, FileType, Camera, Download, Check, FileText, Edit3, Smartphone, Monitor } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="px-4 pt-12 pb-10 md:pt-20 md:pb-14">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--primary)] bg-[var(--primary-bg)] px-3 py-1.5 rounded-full mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
              Free · Private · Browser-only
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 leading-tight">
              Free <span className="text-[var(--primary)]">MicLens</span> PDF Scanner &amp; Editor
            </h1>
            <p className="text-lg text-[var(--muted)] max-w-3xl mx-auto mb-10 leading-relaxed">
              MicLens is a free online document scanner, OCR engine, and PDF editor that runs entirely in your browser
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
                body="Open MicLens on your phone and tap the camera button to capture a page directly from your phone
                camera. The image is processed instantly on-device, so even sensitive material like contracts, ID
                documents, medical reports, and invoices stays on your phone. There is no app to install, no signup, and
                no usage cap."
              />
              <ToolBlock
                icon={<Edit3 className="w-5 h-5" />}
                title="PDF to Text &amp; Editor"
                body="Pull plain text out of any PDF — both native PDFs and scanned ones. For text-based PDFs the
                extraction is instant; for scanned PDFs, MicLens automatically routes the pages through OCR. You can
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
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Why MicLens?</h2>
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
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-3">How MicLens works</h2>
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
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-3">What people scan with MicLens</h2>
            <p className="text-[var(--muted)] text-center max-w-2xl mx-auto mb-12">
              Whatever the source material, MicLens turns it into something searchable and editable.
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
              MicLens is an open, browser-based document scanner and OCR (optical character recognition) tool. It is
              built on well-established WebAssembly OCR engines and runs entirely on your device, so the photos and
              PDFs you scan never leave your browser. There is no signup, no usage limit, and no watermark on the
              output. If you are searching for a free, lightweight, privacy-first alternative to desktop scanner apps
              or cloud OCR services, MicLens covers the most common workflows in a single page.
            </p>

            <h3 className="text-xl font-bold mt-10 mb-3">Why a browser-based scanner matters</h3>
            <p className="text-[var(--muted)] mb-4 leading-relaxed">
              Most online scanners upload your file to a remote server, which means a copy of your document leaves
              your computer the moment you press the upload button. For sensitive material — medical reports,
              contracts, ID documents, salary statements, legal correspondence — that is rarely acceptable. MicLens
              uses a WebAssembly build of the open-source Tesseract OCR engine that runs in the browser tab itself.
              Once the model is loaded (a few megabytes, cached after the first scan), every subsequent scan happens
              locally with no network traffic involved. You can verify it yourself by opening the network tab in your
              browser developer tools while scanning.
            </p>

            <h3 className="text-xl font-bold mt-10 mb-3">When to use OCR online</h3>
            <p className="text-[var(--muted)] mb-4 leading-relaxed">
              OCR is the fastest way to convert an image of text into something you can search, edit, copy, or feed
              into another application. Whether you have a receipt, a contract page, a slide from a lecture, a snapshot
              of a whiteboard, or a screenshot of code, dropping it into MicLens gives you back clean editable text
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

            <h3 className="text-xl font-bold mt-10 mb-3">MicLens on PC, Mac, and mobile</h3>
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
              scanning on a laptop, MicLens fills that gap. It is independent and not affiliated with Microsoft Lens,
              Adobe Scan, CamScanner, or any other product. It is simply a free public utility that uses well-known
              open-source OCR libraries and modern browser features to bring scanning to the web. Bookmark the page,
              come back whenever you need it, and your files always stay on your device.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-3">Frequently asked questions</h2>
            <p className="text-[var(--muted)] text-center mb-10">Everything you might want to know before you scan.</p>
            <div className="space-y-4">
              <Faq q="Is MicLens really free?" a="Yes. There is no usage limit, no signup, and no watermark. MicLens runs in your browser and uses your device's resources, which means there are no server costs to recoup." />
              <Faq q="Do I need to install anything?" a="No. MicLens is a website. Open it on any modern browser — Chrome, Safari, Firefox, Edge — and start scanning. You can also save it to your phone's home screen as a Progressive Web App." />
              <Faq q="Where does my image go?" a="Nowhere. Files are processed in your browser tab and discarded when you close it. Nothing is uploaded to any server. You can verify this by opening the developer tools network panel while scanning." />
              <Faq q="Why is the first scan slower?" a="The OCR model is downloaded the first time you scan in a given language. After that it is cached, so subsequent scans for that language are much faster — typically a few seconds for a single page." />
              <Faq q="How accurate is the OCR?" a="Accuracy depends on image quality and language. Clean, high-contrast Latin-script documents typically reach above 95% character accuracy. Handwriting, low-light photos, and unusual fonts are harder." />
              <Faq q="Which file types can I upload?" a="JPG/JPEG, PNG, WEBP, BMP, GIF, HEIC, AVIF, and TIFF images are all supported. Native PDFs are extracted directly; scanned PDFs are routed through OCR automatically." />
              <Faq q="Which languages are supported?" a="More than 100. Common ones include English, Turkish, German, French, Spanish, Portuguese, Italian, Russian, Polish, Czech, Greek, Arabic, Hebrew, Chinese (Simplified and Traditional), Japanese, Korean, Hindi, and Vietnamese." />
              <Faq q="Can I export to PDF?" a="Yes. After scanning you can download a clean A4 PDF where every recognised word is real selectable text, not just an image. The PDF is generated in your browser using pdf-lib." />
              <Faq q="Is MicLens affiliated with Microsoft Lens?" a="No. MicLens is an independent product and is not affiliated with, endorsed by, or sponsored by Microsoft. Microsoft Lens and Office Lens are trademarks of their respective owners and are mentioned only descriptively for comparison." />
              <Faq q="Can I use MicLens on my phone?" a="Yes. Open this page in Chrome or Safari on your phone and tap Use camera. You can also save the site to your home screen for quick access." />
            </div>
            <div className="text-center mt-10">
              <Link href="#scanner" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-medium">
                <ScanLine className="w-4 h-4" /> Try MicLens now
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
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
