import React, { useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Baby,
  BadgeCheck,
  Camera,
  Check,
  ChevronDown,
  CircleDollarSign,
  Globe2,
  Heart,
  MapPin,
  Minus,
  Plus,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from "lucide-react";

const MATW_APPEALS = "https://matwproject.org/en/all-appeals";
const MATW_AQEEQAH = "https://donor.matwproject.org/aqiqah";
const MATW_POLICY = "https://matwproject.org/our-promise/100-donation-policy";
const MATW_REPORT = "https://matwproject.org/pdf/Achievements%20Report%202023.pdf";

const products = [
  { id: "aqeeqah", name: "Aqeeqah Sheep", place: "Africa", price: 90, note: "Welcome new life", kind: "sheep" },
  { id: "nidr", name: "Nidr Sheep", place: "Africa", price: 90, note: "Fulfil a vow", kind: "sheep" },
  { id: "walimah", name: "Walimah Sheep", place: "Africa", price: 90, note: "Celebrate a union", kind: "sheep" },
  { id: "cow", name: "Sadaqah Cow", place: "Africa", price: 520, note: "Share generously", kind: "cow" },
  { id: "goat", name: "Sadaqah Goat", place: "Bangladesh", price: 140, note: "Give sincerely", kind: "goat" },
];

const meanings = [
  {
    title: "Aqeeqah",
    label: "A new beginning",
    icon: Baby,
    copy: "A Sunnah sacrifice offered with gratitude for the arrival of a child.",
    colour: "blue",
  },
  {
    title: "Nidr",
    label: "A promise kept",
    icon: Sparkles,
    copy: "A sacrifice offered to fulfil a vow or express thanks to Allah.",
    colour: "pink",
  },
  {
    title: "Walimah",
    label: "A joy shared",
    icon: Heart,
    copy: "A marriage feast that shares celebration with family, guests and people in need.",
    colour: "sky",
  },
  {
    title: "Sadaqah",
    label: "A gift freely given",
    icon: Users,
    copy: "A voluntary act of charity, offered sincerely at the giver’s discretion.",
    colour: "navy",
  },
];

const faqs = [
  {
    q: "What is the difference between Nidr and Aqeeqah?",
    a: "MATW describes Nidr as a sacrifice that can be given for any reason or to fulfil a vow. Aqeeqah commemorates the arrival of a newborn.",
  },
  {
    q: "Can these sacrifices be given throughout the year?",
    a: "Yes. MATW states that its General Sacrifice and Aqeeqah program operates throughout the year.",
  },
  {
    q: "Who receives the meat?",
    a: "MATW says sacrifices support vulnerable people in impoverished communities, including families with widows, orphans and elderly people.",
  },
  {
    q: "Will I receive proof?",
    a: "MATW says proof can be requested and may include images and, in some cases, video. The exact format can vary by project.",
  },
  {
    q: "What does the 100% Donation Policy mean?",
    a: "After merchant and banking fees, MATW says donations support direct project costs and/or donor engagement and fundraising reinvested into MATW projects.",
  },
];

function Logo() {
  return (
    <a className="logo" href="#top" aria-label="MATW sacrifice story home">
      <span className="logo-mark"><Globe2 size={21} strokeWidth={1.7} /></span>
      <span><strong>MATW</strong><small>PROJECT</small></span>
    </a>
  );
}

function Reveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function AnimalGlyph({ kind = "sheep" }) {
  if (kind === "cow") {
    return (
      <svg viewBox="0 0 110 80" aria-hidden="true">
        <path d="M21 30c12-8 43-8 57 0l8 14-8 15H28l-9-13z" />
        <path d="M77 29l10-8 10 4-2 14-12 5M31 57l-2 17M70 57l3 17M45 58l1 16M92 26l7-8M22 34l-10-7" />
        <circle cx="91" cy="31" r="2.4" />
      </svg>
    );
  }
  if (kind === "goat") {
    return (
      <svg viewBox="0 0 110 80" aria-hidden="true">
        <path d="M25 34c11-9 40-9 52 0l5 18H30l-8-11z" />
        <path d="M75 33l9-14 11 5 1 15-14 7M34 51l-3 22M68 51l4 22M84 25l-2-12M92 24l5-11M24 35l-11-7" />
        <circle cx="91" cy="32" r="2.4" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 110 80" aria-hidden="true">
      <path d="M22 39c0-14 14-22 31-19 15-6 34 4 32 21 1 13-12 19-29 16-18 6-35-2-34-18z" />
      <path d="M80 29l12-9 9 7-5 16-13 2M34 55l-3 19M68 56l4 18M22 36l-10-5M92 23l-2-8" />
      <circle cx="94" cy="32" r="2.4" />
    </svg>
  );
}

function Hero() {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const artY = useTransform(scrollYProgress, [0, 1], ["0%", reduceMotion ? "0%" : "14%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", reduceMotion ? "0%" : "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.82], [1, 0.12]);

  return (
    <section className="hero" id="top" ref={ref}>
      <div className="hero-noise" />
      <motion.div className="hero-copy" style={{ y: copyY, opacity: fade }}>
        <span className="eyebrow light"><Sparkles size={14} /> A sacrifice story</span>
        <h1>
          <span>One intention.</span>
          <span className="pink-stroke">A world of</span>
          <em>nourishment.</em>
        </h1>
        <p>
          Aqeeqah, Nidr, Walimah or Sadaqah—an act of devotion that becomes
          fresh food, shared with families in need.
        </p>
        <div className="hero-actions">
          <a className="button button-pink" href="#story">Enter the story <ArrowDown size={18} /></a>
          <a className="text-link light" href="#choose">Skip to giving <ArrowRight size={16} /></a>
        </div>
      </motion.div>

      <motion.div className="hero-visual" style={{ y: artY }}>
        <div className="hero-sun" />
        <div className="hero-arch">
          <img src="/matw-sacrifice-hero.png" alt="White mosque landscape and sheep in MATW blue" />
        </div>
        <motion.div
          className="floating-sticker sticker-one"
          animate={reduceMotion ? {} : { rotate: [-5, 4, -5], y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          YEAR-ROUND
        </motion.div>
        <motion.div
          className="floating-sticker sticker-two"
          animate={reduceMotion ? {} : { rotate: [4, -3, 4], y: [0, 8, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Heart size={16} fill="currentColor" /> WITH CARE
        </motion.div>
      </motion.div>

      <div className="hero-ribbon">
        <motion.div
          animate={reduceMotion ? {} : { x: ["0%", "-50%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        >
          <span>INTENTION BECOMES ACTION</span><Star size={18} fill="currentColor" />
          <span>ACTION BECOMES NOURISHMENT</span><Star size={18} fill="currentColor" />
          <span>INTENTION BECOMES ACTION</span><Star size={18} fill="currentColor" />
          <span>ACTION BECOMES NOURISHMENT</span><Star size={18} fill="currentColor" />
        </motion.div>
      </div>
    </section>
  );
}

function StoryFrame({ progress, range, className = "", children }) {
  const reduceMotion = useReducedMotion();
  const [start, end] = range;
  const edge = Math.min(0.065, (end - start) / 3);
  const opacity = useTransform(progress, [start, start + edge, end - edge, end], [0, 1, 1, 0]);
  const y = useTransform(progress, [start, start + edge, end - edge, end], reduceMotion ? [0, 0, 0, 0] : [70, 0, 0, -70]);
  const scale = useTransform(progress, [start, start + edge, end - edge, end], reduceMotion ? [1, 1, 1, 1] : [0.94, 1, 1, 1.04]);
  return <motion.article className={`story-frame ${className}`} style={{ opacity, y, scale }}>{children}</motion.article>;
}

function ScrollStory() {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const background = useTransform(
    scrollYProgress,
    [0, 0.28, 0.52, 0.76, 1],
    ["#f4f7fc", "#3567a8", "#49a4d7", "#ed0065", "#091b35"],
  );
  const orbX = useTransform(scrollYProgress, [0, 1], ["-18vw", "18vw"]);
  const orbRotate = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 260]);
  const storyScale = useSpring(useTransform(scrollYProgress, [0, 1], [0.12, 1]), {
    stiffness: 90,
    damping: 25,
  });

  return (
    <motion.section className="story-scroll" id="story" ref={ref} style={{ backgroundColor: background }}>
      <div className="story-sticky">
        <motion.div className="story-progress" style={{ scaleX: storyScale }} />
        <motion.div className="story-orb" style={{ x: orbX, rotate: orbRotate }} />
        <div className="story-label">Scroll to carry the story</div>

        <StoryFrame progress={scrollYProgress} range={[0, 0.27]} className="scene-intention">
          <div className="scene-copy">
            <span className="eyebrow">It begins quietly</span>
            <h2>A private intention.</h2>
            <p>A birth. A promise. A marriage. Or simply the wish to give.</p>
          </div>
          <div className="intention-visual" aria-hidden="true">
            <motion.div
              className="heart-core"
              animate={reduceMotion ? {} : { scale: [1, 1.08, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            >
              <Heart size={58} fill="currentColor" />
            </motion.div>
            <span className="word-orbit orbit-a">AQEEQAH</span>
            <span className="word-orbit orbit-b">NIDR</span>
            <span className="word-orbit orbit-c">WALIMAH</span>
            <span className="word-orbit orbit-d">SADAQAH</span>
          </div>
        </StoryFrame>

        <StoryFrame progress={scrollYProgress} range={[0.25, 0.51]} className="scene-amanah">
          <div className="scene-copy light-copy">
            <span className="eyebrow light">Then it is entrusted</span>
            <h2>Care crosses distance.</h2>
            <p>MATW arranges its year-round sacrifice program across communities in need.</p>
            <div className="place-chips">
              <span><MapPin size={15} /> Africa</span>
              <span><MapPin size={15} /> Bangladesh</span>
            </div>
          </div>
          <div className="world-visual" aria-hidden="true">
            <Globe2 />
            <motion.div
              className="world-ring ring-one"
              animate={reduceMotion ? {} : { rotate: 360 }}
              transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="world-ring ring-two"
              animate={reduceMotion ? {} : { rotate: -360 }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            />
            <span className="world-dot dot-a" />
            <span className="world-dot dot-b" />
          </div>
        </StoryFrame>

        <StoryFrame progress={scrollYProgress} range={[0.49, 0.76]} className="scene-table">
          <div className="table-visual" aria-hidden="true">
            <div className="plate plate-one"><AnimalGlyph /></div>
            <div className="plate plate-two"><Heart size={42} fill="currentColor" /></div>
            <div className="plate plate-three"><Users size={46} /></div>
            <span className="spark s1">✦</span><span className="spark s2">✦</span><span className="spark s3">✦</span>
          </div>
          <div className="scene-copy ink-copy">
            <span className="eyebrow">And becomes nourishment</span>
            <h2>The table grows.</h2>
            <p>Fresh meat is shared with vulnerable people in impoverished communities.</p>
          </div>
        </StoryFrame>

        <StoryFrame progress={scrollYProgress} range={[0.74, 1]} className="scene-proof">
          <div className="scene-copy light-copy">
            <span className="eyebrow light">The story can return</span>
            <h2>Request the proof.</h2>
            <p>MATW says donors can request delivery proof, including images and sometimes video.</p>
            <a href="#choose" className="button button-white">Choose your sacrifice <ArrowDown size={18} /></a>
          </div>
          <div className="proof-visual" aria-hidden="true">
            <motion.div className="proof-photo photo-back" whileHover={{ rotate: -10, y: -8 }}>
              <Camera size={34} /><span>DELIVERED</span>
            </motion.div>
            <motion.div className="proof-photo photo-front" whileHover={{ rotate: 7, y: -8 }}>
              <img src="/matw-sacrifice-hero.png" alt="" /><Check size={30} />
            </motion.div>
          </div>
        </StoryFrame>
      </div>
    </motion.section>
  );
}

function MeaningDeck() {
  return (
    <section className="meaning-section" id="meaning">
      <Reveal className="section-heading">
        <span className="eyebrow">Four moments. Four meanings.</span>
        <h2>What brings you here?</h2>
        <p>Each sacrifice begins with a different human moment. Hover, tap or simply explore.</p>
      </Reveal>
      <div className="meaning-grid">
        {meanings.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.article
              key={item.title}
              className={`meaning-card ${item.colour}`}
              initial={{ opacity: 0, y: 55, rotate: index % 2 ? 1.5 : -1.5 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              whileHover={{ y: -12, rotate: index % 2 ? -1 : 1 }}
              viewport={{ once: true, amount: 0.28 }}
              transition={{ duration: 0.7, delay: index * 0.06 }}
            >
              <div className="meaning-top"><span>{item.label}</span><Icon size={28} /></div>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
              <div className="meaning-arrow"><ArrowRight /></div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

function ProductCard({ product, qty, setQty, index }) {
  return (
    <motion.article
      className={`product-card ${qty ? "selected" : ""}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, delay: index * 0.055 }}
    >
      <button
        className="product-toggle"
        type="button"
        aria-label={`Select ${product.name}`}
        onClick={() => setQty(product.id, qty ? 0 : 1)}
      >
        {qty ? <Check size={18} /> : <Plus size={18} />}
      </button>
      <div className="product-animal"><AnimalGlyph kind={product.kind} /></div>
      <span className="product-note">{product.note}</span>
      <h3>{product.name}</h3>
      <div className="product-meta"><span>{product.place}</span><b>${product.price} <small>USD</small></b></div>
      <div className="stepper" aria-label={`Quantity for ${product.name}`}>
        <button type="button" aria-label={`Decrease ${product.name}`} onClick={() => setQty(product.id, Math.max(0, qty - 1))}><Minus size={16} /></button>
        <output>{qty}</output>
        <button type="button" aria-label={`Increase ${product.name}`} onClick={() => setQty(product.id, qty + 1)}><Plus size={16} /></button>
      </div>
    </motion.article>
  );
}

function SacrificeSelector({ quantities, setQuantity }) {
  const total = useMemo(
    () => products.reduce((sum, item) => sum + item.price * (quantities[item.id] || 0), 0),
    [quantities],
  );
  const itemCount = Object.values(quantities).reduce((sum, value) => sum + value, 0);

  return (
    <section className="selector-section" id="choose">
      <Reveal className="selector-heading">
        <div>
          <span className="eyebrow light"><BadgeCheck size={15} /> Official MATW listings</span>
          <h2>Choose the act.<br />Carry the feeling.</h2>
        </div>
        <p>Current USD prices on MATW’s global appeals page, checked July 2026.</p>
      </Reveal>
      <div className="product-grid">
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            index={index}
            qty={quantities[product.id] || 0}
            setQty={setQuantity}
          />
        ))}
      </div>
      <AnimatePresence>
        {itemCount > 0 && (
          <motion.div
            className="basket-bar"
            initial={{ y: 110, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 110, opacity: 0 }}
          >
            <div><span>{itemCount} {itemCount === 1 ? "sacrifice" : "sacrifices"}</span><b>${total} USD</b></div>
            <a href={MATW_APPEALS} target="_blank" rel="noreferrer">Continue with MATW <ArrowRight size={18} /></a>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function ImpactBurst() {
  return (
    <section className="impact-section" id="impact">
      <motion.div
        className="impact-word"
        initial={{ x: "18%" }}
        whileInView={{ x: "-8%" }}
        viewport={{ amount: 0.2 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden="true"
      >
        COMPASSION IN MOTION
      </motion.div>
      <Reveal className="impact-heading">
        <span className="eyebrow light">Published 2023 impact</span>
        <h2>One country<br />became thirty.</h2>
        <p>These are dated report figures—not presented as live totals.</p>
      </Reveal>
      <div className="impact-cards">
        <article className="impact-card card-sky"><strong>30</strong><span>countries reached in the 2023 report</span></article>
        <article className="impact-card card-pink"><strong>2M+</strong><span>people supported yearly, reported in 2023</span></article>
        <article className="impact-card card-white"><strong>96M</strong><span>meals served since inception, reported in 2023</span></article>
      </div>
      <a className="report-link" href={MATW_REPORT} target="_blank" rel="noreferrer">Open MATW’s 2023 report <ArrowRight size={17} /></a>
    </section>
  );
}

function PromiseSection() {
  const cards = [
    [ShieldCheck, "100% Donation Policy", "Read MATW’s exact policy wording before giving."],
    [Globe2, "30 countries", "MATW’s 2023 report describes growth from Togo to 30 countries."],
    [Camera, "Proof on request", "Delivery images—and sometimes video—can be requested."],
  ];
  return (
    <section className="promise-section">
      <Reveal className="promise-copy">
        <span className="eyebrow">Trust needs plain language</span>
        <h2>No vague promises.<br />Just what MATW says.</h2>
        <p>
          Founded by Ali Banat in 2016, MATW describes a legacy that began in
          Togo and grew into work across 30 countries.
        </p>
        <a className="text-link" href={MATW_AQEEQAH} target="_blank" rel="noreferrer">Read the official Aqeeqah page <ArrowRight size={16} /></a>
      </Reveal>
      <div className="promise-cards">
        {cards.map(([Icon, title, text], index) => (
          <Reveal className="promise-card" delay={index * 0.08} key={title}>
            <Icon size={26} />
            <div><h3>{title}</h3><p>{text}</p></div>
            {index === 0 && <a href={MATW_POLICY} target="_blank" rel="noreferrer" aria-label="Read MATW donation policy"><ArrowRight /></a>}
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="faq-section" id="faq">
      <Reveal className="faq-heading">
        <span className="eyebrow">Ask before you give</span>
        <h2>Clear answers.<br /><em>Open hearts.</em></h2>
      </Reveal>
      <div className="faq-list">
        {faqs.map((item, index) => (
          <article className={open === index ? "open" : ""} key={item.q}>
            <button type="button" onClick={() => setOpen(open === index ? -1 : index)}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {item.q}
              <motion.i animate={{ rotate: open === index ? 180 : 0 }}><ChevronDown size={20} /></motion.i>
            </button>
            <AnimatePresence initial={false}>
              {open === index && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                  <p>{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </article>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="footer-shape" aria-hidden="true"><AnimalGlyph /></div>
      <div className="footer-cta">
        <span className="eyebrow light">Your turn</span>
        <h2>Let one intention<br /><em>travel further.</em></h2>
        <a className="button button-white" href="#choose">Choose your sacrifice <ArrowRight size={18} /></a>
      </div>
      <div className="footer-bottom">
        <Logo />
        <p>MATW INTERNATIONAL LTD · ABN 60 610 666 325 · Registered charity and Public Benevolent Institution.</p>
        <div>
          <a href={MATW_APPEALS} target="_blank" rel="noreferrer">Official appeals</a>
          <a href={MATW_POLICY} target="_blank" rel="noreferrer">Donation policy</a>
          <a href={MATW_REPORT} target="_blank" rel="noreferrer">2023 report</a>
        </div>
      </div>
      <p className="concept-note">Independent design concept using public MATW facts. Donations continue on MATW’s official website.</p>
    </footer>
  );
}

export default function App() {
  const [quantities, setQuantities] = useState({});
  const { scrollYProgress } = useScroll();
  const pageProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 24, restDelta: 0.001 });
  const setQuantity = (id, value) => setQuantities((current) => ({ ...current, [id]: Math.min(20, Math.max(0, value)) }));

  return (
    <>
      <motion.div className="top-progress" style={{ scaleX: pageProgress }} />
      <header>
        <Logo />
        <nav aria-label="Primary navigation">
          <a href="#story">The story</a>
          <a href="#meaning">The meaning</a>
          <a href="#impact">Impact</a>
          <a href="#faq">FAQs</a>
        </nav>
        <a className="nav-cta" href="#choose"><CircleDollarSign size={17} /> Give now</a>
      </header>
      <main>
        <Hero />
        <ScrollStory />
        <MeaningDeck />
        <SacrificeSelector quantities={quantities} setQuantity={setQuantity} />
        <ImpactBurst />
        <PromiseSection />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
