import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import resumeAsset from "@/assets/resume.pdf.asset.json";
import certCode from "@/assets/cert-code.asset.json";
import certHdfc from "@/assets/cert-hdfc.asset.json";
import certOutskill from "@/assets/cert-outskill.asset.json";
import luxeLaneImage from "@/assets/luxe-lane-fashion.jpg";

function scrollToId(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
  const el = document.getElementById(id);
  if (el) {
    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Ankita Sharma — Frontend Developer Portfolio" },
      {
        name: "description",
        content:
          "Ankita Sharma — Frontend Developer crafting responsive, modern, interactive web experiences with HTML, CSS, JavaScript, React, GSAP and Swiper.js.",
      },
      { property: "og:title", content: "Ankita Sharma — Frontend Developer" },
      {
        property: "og:description",
        content:
          "Portfolio of Ankita Sharma — Frontend Developer open to internships and entry-level roles in Mohali, Chandigarh and Remote.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const NAV = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];
const MOBILE_NAV = [{ id: "top", label: "Home" }, ...NAV];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-foreground/10">
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

/* ---------- NAV ---------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const previousBodyOverflowRef = useRef<string | null>(null);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!menuOpen) return;

    previousBodyOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onPointerDown = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !mobileNavRef.current?.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      if (previousBodyOverflowRef.current !== null) {
        document.body.style.overflow = previousBodyOverflowRef.current;
        previousBodyOverflowRef.current = null;
      }
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const handleMobileNavigation = (
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    if (previousBodyOverflowRef.current !== null) {
      document.body.style.overflow = previousBodyOverflowRef.current;
      previousBodyOverflowRef.current = null;
    }
    scrollToId(event, id);
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-background/75 border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10 h-16 flex items-center justify-between">
        <a href="#top" className="font-serif text-xl italic tracking-tight">
          Ankita<span className="text-muted-foreground">.</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-foreground/80">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="hover:text-foreground transition-colors"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          onClick={(e) => scrollToId(e, "contact")}
          className="hidden md:inline-flex items-center rounded-full border border-foreground/20 px-4 py-1.5 text-sm hover:bg-foreground hover:text-background transition-colors"
        >
          Get in touch
        </a>
        <div ref={mobileNavRef} className="relative md:hidden">
          <button
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-11 w-11 items-center justify-center text-foreground transition-colors hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {menuOpen ? <X aria-hidden="true" size={23} /> : <Menu aria-hidden="true" size={23} />}
          </button>
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            aria-hidden={!menuOpen}
            className={`absolute right-0 top-full mt-2 w-[min(20rem,calc(100vw-3rem))] origin-top-right overflow-hidden border border-border bg-background/95 shadow-lg backdrop-blur-md transition-[opacity,transform,max-height] duration-300 ease-out motion-reduce:transition-none ${
              menuOpen
                ? "max-h-[calc(100dvh-5rem)] translate-y-0 opacity-100"
                : "pointer-events-none max-h-0 -translate-y-2 opacity-0"
            }`}
          >
            <ul className="max-h-[calc(100dvh-5rem)] overflow-y-auto py-2">
              {MOBILE_NAV.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    tabIndex={menuOpen ? 0 : -1}
                    onClick={(event) => handleMobileNavigation(event, item.id)}
                    className="flex min-h-12 items-center px-5 text-sm text-foreground/85 transition-colors hover:bg-foreground/5 hover:text-foreground focus-visible:outline-none focus-visible:bg-foreground/5"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  return (
    <section id="top" className="relative pt-32 md:pt-40 pb-24 md:pb-32 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 md:px-10 grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-7 animate-fade-up">
          <p className="eyebrow mb-6">Ankita Sharma — Rupnagar, Punjab</p>
          <h1 className="font-serif text-5xl md:text-7xl leading-[1.02] tracking-tight">
            Frontend Developer crafting{" "}
            <em className="italic text-foreground/90">responsive, modern and interactive</em>{" "}
            web experiences.
          </h1>
          <p className="mt-8 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
            I build user-focused interfaces with{" "}
            <span className="text-foreground">HTML5, CSS3, JavaScript (ES6+)</span> and{" "}
            <span className="text-foreground">React.js</span> — animating them with{" "}
            <span className="text-foreground">GSAP</span> and{" "}
            <span className="text-foreground">Swiper.js</span>, versioned with{" "}
            <span className="text-foreground">Git & GitHub</span>. Currently open to{" "}
            <em className="italic">Frontend Developer internships and entry-level roles</em> in
            Mohali, Chandigarh and Remote.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="inline-flex items-center rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:bg-foreground/90 transition-colors"
            >
              View Projects
            </a>
            <a
              href={resumeAsset.url}
              download="Ankita-Sharma-Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full border border-foreground/25 px-5 py-2.5 text-sm font-medium hover:bg-foreground hover:text-background transition-colors"
            >
              Download Resume
            </a>
          </div>
        </div>

        <div className="md:col-span-5 relative h-[420px] md:h-[520px]">
          <BrowserMock
            className="absolute top-2 left-0 right-4 animate-drift"
            title="elementra-ai.dev"
            variant="hero"
          />
          <BrowserMock
            className="absolute bottom-0 left-8 right-0 md:left-14 animate-drift [animation-delay:1.2s]"
            title="sunset-glow.app"
            variant="sunset"
          />
        </div>
      </div>
    </section>
  );
}

/* Subtle browser-mock illustration */
function BrowserMock({
  className = "",
  title,
  variant,
  imageSrc,
}: {
  className?: string;
  title: string;
  variant: "hero" | "sunset" | "lab" | "ams";
  imageSrc?: string;
}) {
  const palettes: Record<string, { bg: string; a: string; b: string; c: string }> = {
    hero:   { bg: "from-[#1a1a1f] to-[#2b2b34]", a: "bg-white/80", b: "bg-white/30", c: "bg-white/15" },
    sunset: { bg: "from-[#f6c1a1] to-[#e78a6a]", a: "bg-white/85", b: "bg-white/50", c: "bg-white/25" },
    lab:    { bg: "from-[#efe9dd] to-[#d9d1bf]", a: "bg-foreground/80", b: "bg-foreground/40", c: "bg-foreground/15" },
    ams:    { bg: "from-[#22303c] to-[#3a4a58]", a: "bg-white/85", b: "bg-white/40", c: "bg-white/20" },
  };
  const p = palettes[variant];
  return (
    <div
      className={`rounded-xl border border-foreground/10 bg-background shadow-[0_20px_60px_-30px_rgba(30,20,10,0.35)] overflow-hidden ${className}`}
    >
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-foreground/10 bg-foreground/[0.03]">
        <span className="h-2 w-2 rounded-full bg-foreground/25" />
        <span className="h-2 w-2 rounded-full bg-foreground/20" />
        <span className="h-2 w-2 rounded-full bg-foreground/15" />
        <span className="ml-3 text-[10px] tracking-wide text-muted-foreground truncate">
          {title}
        </span>
      </div>
      <div className={`h-48 md:h-56 ${imageSrc ? "" : `bg-gradient-to-br ${p.bg} relative`}`}>
        {imageSrc ? (
          <img
            src={imageSrc}
            alt="Editorial fashion preview for the LUXE LANE storefront"
            loading="lazy"
            width={1360}
            height={912}
            className="h-full w-full object-cover object-center"
          />
        ) : (
          <div className="absolute inset-0 p-5 flex flex-col justify-end gap-2">
            <div className={`h-2.5 w-2/3 rounded-full ${p.a}`} />
            <div className={`h-2 w-1/2 rounded-full ${p.b}`} />
            <div className="flex gap-2 pt-2">
              <div className={`h-6 w-16 rounded-full ${p.c}`} />
              <div className={`h-6 w-10 rounded-full ${p.c}`} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- SECTION SHELL ---------- */
function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="py-24 md:py-32 border-t border-border">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 mb-14">
          <div className="md:col-span-3">
            <p className="eyebrow">{eyebrow}</p>
          </div>
          <div className="md:col-span-9">
            <h2 className="font-serif text-3xl md:text-5xl leading-tight tracking-tight">
              {title}
            </h2>
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}

/* ---------- ABOUT ---------- */
function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title={
        <>
          A BCA graduate and Frontend Developer building{" "}
          <em className="italic">clean, responsive interfaces</em> from Figma to code.
        </>
      }
    >
      <div className="grid md:grid-cols-12 gap-12">
        <div className="md:col-start-4 md:col-span-9 space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
          <p>
            I recently completed my <span className="text-foreground">BCA</span> and finished a
            Frontend Developer internship at{" "}
            <span className="text-foreground">The Code Technologies</span>, where I contributed
            to live client projects — translating <span className="text-foreground">Figma
            designs into responsive, production-ready code</span>.
          </p>
          <p>
            My day-to-day sits with <span className="text-foreground">HTML, CSS, JavaScript</span>{" "}
            and <span className="text-foreground">React</span>, layered with{" "}
            <span className="text-foreground">GSAP</span> animations and{" "}
            <span className="text-foreground">Swiper.js</span> for motion and interaction. I care
            about the small details — spacing, rhythm, easing — that separate a template from a
            finished product.
          </p>
          <p>
            Alongside frontend work, I'm strengthening my fundamentals in{" "}
            <span className="text-foreground">C Programming and Data Structures & Algorithms</span>.
            I'm currently seeking <em className="italic">Frontend Developer opportunities</em>
            where I can keep shipping and keep learning.
          </p>
        </div>
      </div>
    </Section>
  );
}

/* ---------- EXPERIENCE ---------- */
function Experience() {
  const bullets = [
    "Built responsive landing, product, upsell, downsell and thank-you pages for live funnels.",
    "Converted Figma designs into pixel-accurate, responsive frontend code.",
    "Implemented interactive UI behaviour with vanilla JavaScript.",
    "Crafted motion with GSAP and integrated Swiper.js carousels.",
    "Supported live Funnelish work for the Bloom Cooking brand.",
    "Contributed AI-assisted image preparation and swatch workflows for Virgin Hair Beauty.",
  ];
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title={
        <>
          Shipping real work for real clients — <em className="italic">from Figma to funnel</em>.
        </>
      }
    >
      <div className="grid md:grid-cols-12 gap-8">
        <div className="md:col-span-4">
          <p className="text-sm text-muted-foreground">Mar 2026 — Jul 2026</p>
          <p className="mt-2 font-serif text-2xl">The Code Technologies</p>
          <p className="text-sm text-muted-foreground">Frontend Developer Intern</p>
        </div>
        <ul className="md:col-span-8 space-y-4">
          {bullets.map((b) => (
            <li key={b} className="flex gap-4 text-base text-foreground/85 leading-relaxed">
              <span className="mt-2.5 h-px w-6 bg-foreground/40 shrink-0" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

/* ---------- PROJECTS ---------- */
type Project = {
  title: string;
  kind: string;
  year?: string;
  description: string;
  stack: string[];
  variant: "hero" | "sunset" | "lab" | "ams";
  domain: string;
  live: string;
  imageSrc?: string;
  status?: string;
  passwordNote?: string;
};
const PROJECTS: Project[] = [
  {
    title: "Elementra AI",
    kind: "Interactive frontend website",
    year: "2026",
    description:
      "A dynamic, animated marketing site with a responsive layout and rich micro-interactions built from scratch.",
    stack: ["HTML5", "CSS3", "JavaScript", "GSAP"],
    variant: "hero",
    domain: "elementra.netlify.app",
    live: "https://elementra.netlify.app/",
  },
  {
    title: "Sunset Glow",
    kind: "Responsive Figma-to-Code website",
    year: "2026",
    description:
      "A warm, editorial landing page translated pixel-for-pixel from Figma into fully responsive frontend code.",
    stack: ["HTML5", "CSS3", "Responsive", "Figma"],
    variant: "sunset",
    domain: "my-figma-preview.netlify.app",
    live: "https://my-figma-preview.netlify.app/",
  },
  {
    title: "Frontend Learning Lab",
    kind: "JavaScript practice collection",
    year: "2025",
    description:
      "A growing set of small apps — Calculator, Weather API, Dark Mode toggle — focused on DOM manipulation and interactive UI.",
    stack: ["JavaScript", "DOM", "REST API"],
    variant: "lab",
    domain: "frontendlearninglab.netlify.app",
    live: "https://frontendlearninglab.netlify.app/",
  },
  {
    title: "Bloom Cooking",
    kind: "Live client sales page",
    year: "2026",
    description:
      "Developed a responsive Funnelish sales page for a live client project with a clean UI and conversion-focused user experience.",
    stack: ["HTML5", "CSS3", "Funnelish", "Responsive"],
    variant: "ams",
    domain: "pages.bloomcooking.com",
    live: "https://pages.bloomcooking.com/gfbg-short-sl?preview=4170704#next-step",
  },
  {
    title: "LUXE LANE – Shopify E-commerce Store",
    kind: "Shopify Development | E-commerce",
    description:
      "Designed and set up a premium fashion e-commerce storefront using Shopify. The store features an editorial luxury-inspired design, product listings, product images, multiple collections, responsive layouts, navigation, and essential storefront pages.",
    stack: [
      "Shopify",
      "12 sample products · 5 collections",
      "Responsive desktop & mobile",
      "About · Contact · FAQ",
      "Shopping cart interface",
      "Header & footer navigation",
    ],
    variant: "hero",
    domain: "4qwtqd-j0.myshopify.com",
    live: "https://4qwtqd-j0.myshopify.com/",
    imageSrc: luxeLaneImage,
    status: "Portfolio Demonstration Store",
    passwordNote: "Password-protected demo | Password: eampau",
  },
];

function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Selected Work"
      title={
        <>
          Recent projects — <em className="italic">interfaces, funnels and small tools</em>.
        </>
      }
    >
      <div className="grid md:grid-cols-2 gap-8 md:gap-10">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.title} p={p} />
        ))}
      </div>
    </Section>
  );
}

function ProjectCard({ p }: { p: Project }) {
  return (
    <article className="group rounded-2xl border border-border bg-background/40 p-5 md:p-6 transition-colors hover:border-foreground/30">
      <div className="rounded-xl overflow-hidden border border-foreground/10">
        <BrowserMock
          title={p.domain}
          variant={p.variant}
          imageSrc={p.imageSrc}
          className="!shadow-none !border-0 rounded-none"
        />
      </div>
      <div className="mt-6 flex items-baseline justify-between gap-4">
        <h3 className="font-serif text-2xl md:text-3xl tracking-tight">{p.title}</h3>
        {p.year && <span className="text-xs text-muted-foreground shrink-0">{p.year}</span>}
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{p.kind}</p>
      {p.status && <p className="mt-1 text-xs text-muted-foreground">{p.status}</p>}
      <p className="mt-4 text-base text-foreground/85 leading-relaxed">{p.description}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {p.stack.map((s) => (
          <span
            key={s}
            className="inline-flex items-center rounded-full border border-foreground/15 px-3 py-1 text-xs text-foreground/80"
          >
            {s}
          </span>
        ))}
      </div>
      <a
        href={p.live}
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-flex items-center rounded-full border border-foreground/25 px-4 py-1.5 text-sm hover:bg-foreground hover:text-background transition-colors"
      >
        Live Demo
      </a>
      {p.passwordNote && (
        <p className="mt-2 text-sm text-muted-foreground">{p.passwordNote}</p>
      )}
    </article>
  );
}

/* ---------- SKILLS ---------- */
const SKILL_GROUPS = [
  {
    label: "Core",
    items: ["HTML5", "CSS3", "JavaScript (ES6+)", "React.js", "Bootstrap"],
  },
  {
    label: "Craft",
    items: ["Responsive Web Design", "Figma to Code", "GSAP", "Swiper.js", "REST APIs"],
  },
  {
    label: "Workflow",
    items: ["Git", "GitHub", "Problem Solving", "Continuous Learning"],
  },
];
function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title={
        <>
          A frontend toolkit — <em className="italic">focused, practical, growing</em>.
        </>
      }
    >
      <div className="space-y-10">
        {SKILL_GROUPS.map((g) => (
          <div key={g.label} className="grid md:grid-cols-12 gap-6 items-start">
            <p className="md:col-span-3 eyebrow pt-2">{g.label}</p>
            <div className="md:col-span-9 flex flex-wrap gap-2">
              {g.items.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center rounded-full border border-foreground/20 px-4 py-1.5 text-sm text-foreground/85 hover:bg-foreground hover:text-background transition-colors"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- CERTIFICATIONS ---------- */
type Cert = {
  title: string;
  issuer: string;
  note: string;
  date?: string;
  image: string;
};
const CERTS: Cert[] = [
  {
    title: "Internship Completion Certificate",
    issuer: "The Code Technologies",
    note: "Frontend Developer Intern",
    image: certCode.url,
  },
  {
    title: "Junior Software Developer",
    issuer: "HDFC Bank Parivartan",
    note: "Software development fundamentals",
    image: certHdfc.url,
  },
  {
    title: "Generative AI Mastermind",
    issuer: "Outskill",
    note: "Applied generative AI workflows",
    image: certOutskill.url,
  },
];
function Certifications() {
  const [open, setOpen] = useState<null | Cert>(null);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return (
    <Section
      id="certifications"
      eyebrow="Certifications"
      title={
        <>
          Learning that <em className="italic">shows up in the work</em>.
        </>
      }
    >
      <div className="grid md:grid-cols-3 gap-6">
        {CERTS.map((c) => (
          <article
            key={c.title}
            className="group rounded-2xl border border-border bg-background/40 p-5 md:p-6 transition-colors hover:border-foreground/30"
          >
            <p className="eyebrow">{c.issuer}</p>
            <h3 className="font-serif text-xl md:text-2xl mt-3 leading-snug">
              {c.title}
            </h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              {c.note}
            </p>
            {c.date && (
              <p className="mt-3 text-xs text-muted-foreground">{c.date}</p>
            )}
            <button
              type="button"
              onClick={() => setOpen(c)}
              className="mt-6 inline-flex items-center rounded-full border border-foreground/25 px-4 py-1.5 text-sm hover:bg-foreground hover:text-background transition-colors"
            >
              View Certificate
            </button>
          </article>
        ))}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60 p-6"
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="max-w-4xl w-full rounded-2xl bg-background p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 mb-3">
              <div>
                <p className="eyebrow">{open.issuer}</p>
                <h3 className="font-serif text-lg mt-1">{open.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setOpen(null)}
                className="rounded-full border border-foreground/25 px-3 py-1 text-sm hover:bg-foreground hover:text-background transition-colors"
              >
                Close
              </button>
            </div>
            <img
              src={open.image}
              alt={`${open.title} — ${open.issuer}`}
              className="w-full max-h-[75vh] object-contain rounded-xl"
            />
          </div>
        </div>
      )}
    </Section>
  );
}

/* ---------- CONTACT ---------- */
function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title={
        <>
          Have a role or a project? <em className="italic">Let's talk.</em>
        </>
      }
    >
      <div className="grid md:grid-cols-12 gap-8">
        <div className="md:col-span-6 space-y-4 text-muted-foreground leading-relaxed">
          <p>
            I'm currently open to <span className="text-foreground">Frontend Developer
            internships</span> and <span className="text-foreground">entry-level roles</span>{" "}
            in Mohali, Chandigarh and Remote.
          </p>
          <p>
            The fastest way to reach me is by email. I usually reply within a day.
          </p>
        </div>
        <ul className="md:col-span-6 divide-y divide-border border-y border-border">
          <ContactRow
            label="Email"
            value="ankitasdev187@gmail.com"
            href="mailto:ankitasdev187@gmail.com"
          />
          <ContactRow label="Phone" value="+91 9646552029" href="tel:+919646552029" />
          <ContactRow
            label="LinkedIn"
            value="linkedin.com/in/ankita-sharma-a107762bb"
            href="https://www.linkedin.com/in/ankita-sharma-a107762bb"
            onClick={(e) => {
              e.preventDefault();
              window.open("https://www.linkedin.com/in/ankita-sharma-a107762bb", "_blank", "noopener,noreferrer");
            }}
          />
          <ContactRow
            label="GitHub"
            value="github.com/ankita2005-dev"
            href="https://github.com/ankita2005-dev"
          />
          <ContactRow label="Based in" value="Rupnagar, Punjab, India" />
        </ul>
      </div>
    </Section>
  );
}
function ContactRow({
  label,
  value,
  href,
  onClick,
}: {
  label: string;
  value: string;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  const inner = (
    <div className="flex items-center justify-between py-4 group">
      <span className="eyebrow">{label}</span>
      <span className="text-foreground/90 group-hover:text-foreground transition-colors">
        {value}
      </span>
    </div>
  );
  return (
    <li>
      {href ? (
        <a
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel="noreferrer"
          onClick={onClick}
        >
          {inner}
        </a>
      ) : (
        inner
      )}
    </li>
  );
}

/* ---------- FOOTER ---------- */
function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 md:px-10 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <p className="font-serif italic text-lg">Ankita Sharma</p>
        <p className="text-sm text-muted-foreground">© 2026 Ankita Sharma</p>
        <p className="text-sm text-muted-foreground">Rupnagar, Punjab · Open to work</p>
      </div>
    </footer>
  );
}
