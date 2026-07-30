import React, { useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
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
  Globe2,
  Heart,
  Mail,
  MapPin,
  Minus,
  Play,
  Plus,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

const MATW_APPEALS = "https://matwproject.org/en/all-appeals";
const MATW_AQEEQAH = "https://donor.matwproject.org/aqiqah";
const MATW_POLICY = "https://matwproject.org/our-promise/100-donation-policy";
const MATW_REPORT = "https://matwproject.org/pdf/Achievements%20Report%202023.pdf";

const products = [
  {
    id: "aqeeqah",
    name: "Aqeeqah Sheep",
    location: "Africa",
    price: 90,
    type: "A sacred welcome",
    detail:
      "A Sunnah sacrifice offered for the arrival of a child, expressing gratitude to Allah and sharing meat with family and people in need.",
  },
  {
    id: "nidr",
    name: "Nidr Sheep",
    location: "Africa",
    price: 90,
    type: "A vow fulfilled",
    detail:
      "A general sacrifice offered to give thanks to Allah or fulfil a vow. MATW’s program operates throughout the year.",
  },
  {
    id: "walimah",
    name: "Walimah Sheep",
    location: "Africa",
    price: 90,
    type: "A union shared",
    detail:
      "A marriage feast that celebrates a new union while sharing food with family, guests and those in need.",
  },
  {
    id: "cow",
    name: "Sadaqah Cow",
    location: "Africa",
    price: 520,
    type: "A generous act",
    detail:
      "MATW states that a cow sacrifice in Africa can provide fresh meat to 800–1,000 beneficiaries.",
  },
  {
    id: "goat",
    name: "Sadaqah Goat",
    location: "Bangladesh",
    price: 140,
    type: "Charity with sincerity",
    detail:
      "A voluntary act of charity carried out at the giver’s discretion, helping provide fresh meat to families in need.",
  },
];

const chapters = [
  ["01", "Choose"],
  ["02", "Meaning"],
  ["03", "Journey"],
  ["04", "Places"],
  ["05", "Legacy"],
  ["06", "Proof"],
  ["07", "Impact"],
  ["08", "Questions"],
];

const faqs = [
  {
    q: "What is the difference between Nidr and Aqeeqah?",
    a: "MATW describes a general or Nidr sacrifice as one given for any reason, while Aqeeqah commemorates the arrival of a newborn.",
  },
  {
    q: "Can Aqeeqah and Nidr be given throughout the year?",
    a: "Yes. MATW states that its General Sacrifice and Aqeeqah program operates throughout the year.",
  },
  {
    q: "Who receives the meat?",
    a: "MATW says sacrifices are delivered in impoverished communities, supporting vulnerable people including families with widows, orphans and elderly people.",
  },
  {
    q: "Will I receive proof?",
    a: "MATW says proof of delivery and sacrifice can be requested, including images and, in some cases, video. The exact reporting format may vary by project.",
  },
  {
    q: "What does the 100% Donation Policy mean?",
    a: "MATW states that, after merchant and banking fees, donations are used for direct project costs and/or donor engagement and fundraising that is reinvested into the project or other MATW projects.",
  },
];

function Logo() {
  return (
    <a className="logo" href="#top" aria-label="MATW sacrifice concept home">
      <span className="logo-mark">
        <Globe2 size={22} strokeWidth={1.7} />
      </span>
      <span>
        <strong>MATW</strong>
        <small>PROJECT</small>
      </span>
    </a>
  );
}

function ScrollRail({ progress }) {
  return (
    <aside className="scroll-rail" aria-hidden="true">
      <div className="rail-track">
        <motion.div className="rail-progress" style={{ scaleY: progress }} />
      </div>
      <div className="rail-labels">
        {chapters.map(([n, label]) => (
          <span key={n}>
            <b>{n}</b>
            {label}
          </span>
        ))}
      </div>
    </aside>
  );
}

function Reveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 42 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function AnimalGlyph({ type }) {
  if (type === "cow") {
    return (
      <svg viewBox="0 0 96 72" aria-hidden="true">
        <path d="M21 25c8-7 34-8 48-1l7 11-5 14H28l-7-9z" />
        <path d="M70 24l9-7 8 3-2 12-10 4M28 48l-2 16M63 48l3 16M39 48l1 16M75 37l7 3M22 27l-8-7" />
        <circle cx="82" cy="25" r="2" />
      </svg>
    );
  }
  if (type === "goat") {
    return (
      <svg viewBox="0 0 96 72" aria-hidden="true">
        <path d="M23 30c10-8 34-8 46 0l4 16H27l-7-9z" />
        <path d="M67 29l8-12 9 4 1 13-12 6M30 45l-3 18M61 45l3 18M74 23l-2-10M81 21l4-9M21 31l-8-7" />
        <circle cx="81" cy="27" r="2" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 96 72" aria-hidden="true">
      <path d="M20 34c0-12 12-19 27-17 13-5 29 3 28 18 1 11-10 17-25 14-16 5-31-2-30-15z" />
      <path d="M70 25l10-8 8 6-4 14-11 2M30 47l-3 17M60 48l4 16M20 31l-8-4M80 20l-2-7" />
      <circle cx="82" cy="27" r="2" />
    </svg>
  );
}

function Hero() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const artY = useTransform(scrollYProgress, [0, 1], ["0%", "17%"]);
  const artScale = useTransform(scrollYProgress, [0, 1], [1, 1.09]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.78], [1, 0]);

  return (
    <section className="hero" id="top" ref={heroRef}>
      <div className="hero-grid" />
      <motion.div className="hero-copy" style={{ y: copyY, opacity }}>
        <span className="eyebrow light">
          <Sparkles size={14} /> Sacrifice with intention
        </span>
        <h1>
          <span>Honour a Sunnah.</span>
          <span>Fulfil a commitment.</span>
          <em>Bring joy to lives.</em>
        </h1>
        <p>
          Aqeeqah, Nidr, Walimah or Sadaqah—an act of devotion carried out
          with care, and fresh meat shared with families in need.
        </p>
        <div className="hero-actions">
          <a className="button button-pink" href="#choose">
            Choose your sacrifice <ArrowRight size={18} />
          </a>
          <a className="text-link light" href="#meaning">
            Discover the meaning <ArrowDown size={16} />
          </a>
        </div>
      </motion.div>

      <motion.div className="hero-art" style={{ y: artY, scale: artScale }}>
        <div className="arch-frame">
          <img src="/matw-sacrifice-hero.png" alt="Layered white and MATW-blue mosque landscape with a sheep" />
        </div>
        <motion.div
          className="orbit orbit-one"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 28, ease: "linear" }}
        />
        <motion.div
          className="orbit orbit-two"
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 38, ease: "linear" }}
        />
        <div className="hero-note">
          <span>Year-round program</span>
          <b>Africa · Bangladesh</b>
        </div>
      </motion.div>

      <div className="hero-trust">
        {[
          [ShieldCheck, "100% Donation Policy"],
          [Heart, "Islamic values"],
          [Users, "Families in need"],
          [Camera, "Proof can be requested"],
        ].map(([Icon, label], i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 + i * 0.08 }}
          >
            <Icon size={20} />
            <span>{label}</span>
          </motion.div>
        ))}
      </div>
      <div className="scroll-cue">
        <span>Scroll the story</span>
        <i />
      </div>
    </section>
  );
}

function ProductRow({ product, qty, setQty, index }) {
  return (
    <motion.article
      className={`product-row ${qty > 0 ? "selected" : ""}`}
      initial={{ opacity: 0, x: 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.65, delay: index * 0.06 }}
    >
      <button
        className="product-select"
        type="button"
        aria-label={`Select ${product.name}`}
        onClick={() => setQty(product.id, qty ? 0 : 1)}
      >
        <span className="check-box">{qty > 0 && <Check size={14} />}</span>
      </button>
      <div className="animal-glyph" aria-hidden="true">
        <AnimalGlyph type={product.id} />
      </div>
      <div className="product-copy">
        <span>{product.type}</span>
        <h3>{product.name}</h3>
        <p>{product.location}</p>
      </div>
      <div className="product-price">
        <b>${product.price}</b>
        <small>USD</small>
      </div>
      <div className="stepper" aria-label={`Quantity for ${product.name}`}>
        <button type="button" onClick={() => setQty(product.id, Math.max(0, qty - 1))} aria-label="Decrease">
          <Minus size={16} />
        </button>
        <output>{qty}</output>
        <button type="button" onClick={() => setQty(product.id, qty + 1)} aria-label="Increase">
          <Plus size={16} />
        </button>
      </div>
    </motion.article>
  );
}

function SacrificeSelector({ quantities, setQuantity }) {
  const total = useMemo(
    () => products.reduce((sum, item) => sum + item.price * (quantities[item.id] || 0), 0),
    [quantities],
  );
  const items = Object.values(quantities).reduce((sum, value) => sum + value, 0);

  return (
    <section className="section selector-section" id="choose">
      <div className="section-number">01</div>
      <div className="selector-intro">
        <span className="eyebrow">Choose with clarity</span>
        <h2>Your intention, made tangible.</h2>
        <p>
          Select one or more sacrifices. Prices shown are the current USD
          listings on MATW’s global appeals page as checked in July 2026.
        </p>
        <div className="source-pill">
          <BadgeCheck size={17} />
          Official MATW listed prices
        </div>
      </div>
      <div className="product-list">
        {products.map((product, index) => (
          <ProductRow
            key={product.id}
            product={product}
            index={index}
            qty={quantities[product.id] || 0}
            setQty={setQuantity}
          />
        ))}
      </div>
      <AnimatePresence>
        {items > 0 && (
          <motion.div
            className="basket-bar"
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 120, opacity: 0 }}
          >
            <div>
              <span>{items} {items === 1 ? "sacrifice" : "sacrifices"}</span>
              <b>${total} USD</b>
            </div>
            <a href={MATW_APPEALS} target="_blank" rel="noreferrer">
              Continue with MATW <ArrowRight size={18} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Meaning() {
  const cards = [
    {
      title: "Aqeeqah",
      kicker: "Gratitude for new life",
      icon: Baby,
      body: "A sacred rite for the arrival of a newborn. The classical ruling described in the brief is two sheep or goats for a boy and one for a girl.",
      accent: "2 for a boy · 1 for a girl",
    },
    {
      title: "Nidr",
      kicker: "A vow or thanks",
      icon: Sparkles,
      body: "A general sacrifice offered to fulfil a vow or give thanks to Allah. It can be given at any time of year.",
      accent: "Available year-round",
    },
    {
      title: "Walimah",
      kicker: "A union shared",
      icon: Heart,
      body: "A marriage feast that celebrates the union and shares food with family, guests and those in need.",
      accent: "Celebration with generosity",
    },
    {
      title: "Sadaqah",
      kicker: "Charity with sincerity",
      icon: Users,
      body: "Voluntary charity, unlike obligatory Zakat. The amount and form are left to the giver’s discretion.",
      accent: "A voluntary act",
    },
  ];

  return (
    <section className="meaning-section" id="meaning">
      <div className="section-number light-number">02</div>
      <div className="meaning-heading">
        <span className="eyebrow light">Four intentions. One thread.</span>
        <h2>
          Every sacrifice begins
          <br />
          <em>with meaning.</em>
        </h2>
      </div>
      <div className="meaning-track">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.article
              key={card.title}
              className="meaning-card"
              initial={{ opacity: 0, y: 90, rotate: index % 2 ? 2 : -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.85, delay: index * 0.08 }}
            >
              <div className="meaning-icon"><Icon size={25} /></div>
              <span>0{index + 1} / {card.kicker}</span>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
              <b>{card.accent}</b>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

function Journey() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const pathLength = useSpring(useTransform(scrollYProgress, [0.12, 0.82], [0, 1]), {
    stiffness: 65,
    damping: 18,
  });

  const steps = [
    ["Intention", "Choose the sacrifice that matches the moment in your life."],
    ["Amanah", "MATW arranges the year-round program through its delivery network."],
    ["Nourishment", "Fresh meat reaches vulnerable people in impoverished communities."],
    ["Proof", "Delivery proof can be requested, including images and sometimes video."],
  ];

  return (
    <section className="journey-section" id="journey" ref={sectionRef}>
      <div className="section-number">03</div>
      <Reveal className="journey-copy">
        <span className="eyebrow">How it works</span>
        <h2>From a private intention to shared nourishment.</h2>
        <p>
          The journey is designed around care, Shariah-conscious delivery and
          transparent reporting—without promising a reporting format MATW does
          not guarantee.
        </p>
      </Reveal>
      <div className="journey-canvas">
        <svg viewBox="0 0 1000 360" role="img" aria-label="Animated path connecting the four stages of sacrifice">
          <path className="route-ghost" d="M60 230 C220 40 320 330 475 165 S735 70 940 210" />
          <motion.path
            className="route-live"
            d="M60 230 C220 40 320 330 475 165 S735 70 940 210"
            style={{ pathLength }}
          />
        </svg>
        <div className="journey-steps">
          {steps.map(([title, text], index) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ delay: index * 0.12 }}
            >
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Locations() {
  return (
    <section className="locations-section" id="locations">
      <div className="section-number light-number">04</div>
      <Reveal className="locations-copy">
        <span className="eyebrow light">Where this page serves</span>
        <h2>Two places. One shared table.</h2>
        <p>
          The five sacrifices shown here are currently listed for Africa and
          Bangladesh on MATW’s global appeals page.
        </p>
      </Reveal>
      <div className="map-stage">
        <div className="map-grid" />
        <motion.div
          className="map-ring ring-africa"
          animate={{ scale: [1, 1.3, 1], opacity: [0.8, 0.2, 0.8] }}
          transition={{ repeat: Infinity, duration: 3.2 }}
        />
        <motion.div
          className="map-ring ring-bangladesh"
          animate={{ scale: [1, 1.3, 1], opacity: [0.8, 0.2, 0.8] }}
          transition={{ repeat: Infinity, duration: 3.2, delay: 0.8 }}
        />
        <svg className="map-route" viewBox="0 0 900 460" aria-hidden="true">
          <motion.path
            d="M220 280 C400 210 510 330 700 205"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </svg>
        <div className="place place-africa">
          <MapPin size={18} />
          <span>Africa</span>
          <b>Sheep · Cow</b>
        </div>
        <div className="place place-bangladesh">
          <MapPin size={18} />
          <span>Bangladesh</span>
          <b>Goat</b>
        </div>
        <div className="map-statement">More locations can be added when MATW confirms them.</div>
      </div>
    </section>
  );
}

function Legacy() {
  return (
    <section className="legacy-section" id="legacy">
      <div className="section-number">05</div>
      <div className="legacy-visual">
        <div className="legacy-window">
          <img src="/matw-sacrifice-hero.png" alt="" />
        </div>
        <span className="vertical-copy">A legacy of compassion · 2016—2026</span>
      </div>
      <Reveal className="legacy-copy">
        <span className="eyebrow">Founded by Ali Banat</span>
        <h2>A life redirected. A legacy still moving.</h2>
        <p className="large-copy">
          MATW says it was founded by Ali Banat in 2016 and now works across 30
          countries. The organisation began in one country—Togo—and grew through
          a community committed to continuing his legacy.
        </p>
        <a className="text-link" href={MATW_AQEEQAH} target="_blank" rel="noreferrer">
          Read MATW’s Aqeeqah page <ArrowRight size={16} />
        </a>
      </Reveal>
    </section>
  );
}

function Reporting() {
  const proof = [
    [Check, "Donation processed", "Your selected appeal is confirmed through MATW."],
    [ShieldCheck, "Program delivered", "MATW arranges the sacrifice and distribution."],
    [Mail, "Proof requested", "Donors can request proof of delivery and sacrifice."],
    [Camera, "Images or video", "MATW states proof includes images and, in some cases, video."],
  ];

  return (
    <section className="reporting-section" id="reporting">
      <div className="section-number">06</div>
      <Reveal className="reporting-heading">
        <span className="eyebrow">Amanah, made visible</span>
        <h2>Proof without overpromising.</h2>
        <p>
          The wireframe promised fixed email and WhatsApp updates. MATW’s public
          page is more precise: proof can be requested and may include images or
          video. This page uses that verified wording.
        </p>
      </Reveal>
      <div className="proof-strip">
        {proof.map(([Icon, title, text], index) => (
          <Reveal className="proof-card" delay={index * 0.08} key={title}>
            <span>0{index + 1}</span>
            <Icon size={24} />
            <h3>{title}</h3>
            <p>{text}</p>
          </Reveal>
        ))}
      </div>
      <div className="policy-banner">
        <ShieldCheck size={30} />
        <div>
          <b>100% Donation Policy</b>
          <p>
            After merchant/banking fees, MATW says donations support direct
            project costs and/or donor engagement and fundraising reinvested
            into the project or other MATW projects.
          </p>
        </div>
        <a href={MATW_POLICY} target="_blank" rel="noreferrer">
          Read the policy <ArrowRight size={16} />
        </a>
      </div>
    </section>
  );
}

function CountUp({ value, suffix = "" }) {
  const ref = useRef(null);
  const seen = useInView(ref, { once: true, margin: "-20%" });
  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={seen ? { opacity: 1, y: 0 } : {}}
    >
      {value}{suffix}
    </motion.span>
  );
}

function Impact() {
  return (
    <section className="impact-section" id="impact">
      <div className="section-number light-number">07</div>
      <div className="impact-orbit" />
      <Reveal className="impact-heading">
        <span className="eyebrow light">Published impact</span>
        <h2>One country became thirty.</h2>
        <p>
          Figures below come from MATW’s published 2023 Achievements Report and
          are labelled by reporting period rather than presented as live totals.
        </p>
      </Reveal>
      <div className="impact-grid">
        <article>
          <CountUp value="30" />
          <p>countries reached in the 2023 report</p>
        </article>
        <article>
          <CountUp value="2M" suffix="+" />
          <p>people supported each year, as reported in 2023</p>
        </article>
        <article>
          <CountUp value="96M" />
          <p>meals served since inception, reported in 2023</p>
        </article>
        <article className="impact-source">
          <a href={MATW_REPORT} target="_blank" rel="noreferrer">
            Open MATW’s 2023 report <ArrowRight size={18} />
          </a>
        </article>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="faq-section" id="faq">
      <div className="section-number">08</div>
      <Reveal className="faq-heading">
        <span className="eyebrow">Questions, answered plainly</span>
        <h2>Give with understanding.</h2>
      </Reveal>
      <div className="faq-list">
        {faqs.map((item, index) => (
          <article className={open === index ? "open" : ""} key={item.q}>
            <button type="button" onClick={() => setOpen(open === index ? -1 : index)}>
              <span>0{index + 1}</span>
              {item.q}
              <motion.i animate={{ rotate: open === index ? 180 : 0 }}>
                <ChevronDown size={20} />
              </motion.i>
            </button>
            <AnimatePresence initial={false}>
              {open === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
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
      <div className="footer-cta">
        <span className="eyebrow light">Begin with intention</span>
        <h2>Your sacrifice can become someone’s nourishment.</h2>
        <a className="button button-pink" href="#choose">
          Choose your sacrifice <ArrowRight size={18} />
        </a>
      </div>
      <div className="footer-bottom">
        <Logo />
        <p>
          MATW INTERNATIONAL LTD · ABN 60 610 666 325 · Registered charity and
          Public Benevolent Institution.
        </p>
        <div>
          <a href={MATW_APPEALS} target="_blank" rel="noreferrer">Official appeals</a>
          <a href={MATW_POLICY} target="_blank" rel="noreferrer">Donation policy</a>
          <a href={MATW_REPORT} target="_blank" rel="noreferrer">Impact report</a>
        </div>
      </div>
      <p className="concept-note">
        Independent design concept using public MATW facts. Donations continue
        on MATW’s official website.
      </p>
    </footer>
  );
}

export default function App() {
  const [quantities, setQuantities] = useState({});
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 25, restDelta: 0.001 });

  const setQuantity = (id, value) => {
    setQuantities((current) => ({ ...current, [id]: Math.min(20, Math.max(0, value)) }));
  };

  return (
    <>
      <motion.div className="top-progress" style={{ scaleX: progress }} />
      <header>
        <Logo />
        <nav aria-label="Primary navigation">
          <a href="#meaning">Meaning</a>
          <a href="#journey">How it works</a>
          <a href="#impact">Impact</a>
          <a href="#faq">FAQs</a>
        </nav>
        <a className="nav-cta" href="#choose">Give now</a>
      </header>
      <ScrollRail progress={progress} />
      <main>
        <Hero />
        <SacrificeSelector quantities={quantities} setQuantity={setQuantity} />
        <Meaning />
        <Journey />
        <Locations />
        <Legacy />
        <Reporting />
        <Impact />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
