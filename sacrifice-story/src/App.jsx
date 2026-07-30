import React, { useMemo, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Camera,
  Check,
  ChevronDown,
  ClipboardCheck,
  Globe2,
  HandHeart,
  Heart,
  Mail,
  MapPinned,
  Minus,
  Play,
  Plus,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

const MATW_APPEALS = "https://matwproject.org/en/all-appeals";
const MATW_POLICY = "https://matwproject.org/our-promise/100-donation-policy";
const MATW_REPORT_2024 = "https://matwproject.org/pdf/MATW_General_2024_Achievements_Report_V7.pdf";
const MATW_ZAKAT_2024 = "https://matwproject.org/pdf/MATW_Zakat_2024_Report_V5.pdf";

const sacrifices = [
  { id: "aqeeqah", name: "Aqeeqah Sheep Sacrifice", place: "Africa", note: "A sheep of around 22 kg can provide fresh meat to 80–100 beneficiaries.", price: 90, animal: "sheep", image: "/matw-aqeeqah.jpg" },
  { id: "nidr", name: "Nidr Sheep Sacrifice", place: "Africa", note: "A sheep of around 22 kg can provide fresh meat to 80–100 beneficiaries.", price: 90, animal: "sheep", image: "/matw-nidr.jpg" },
  { id: "walimah", name: "Walimah Sheep Sacrifice", place: "Africa", note: "Share the joy of a marriage and provide meat to 80–100 beneficiaries.", price: 90, animal: "sheep", image: "/matw-walimah.jpg" },
  { id: "cow", name: "Sadaqah Cow Sacrifice", place: "Africa", note: "A cow can provide fresh, nutritious meat to 800–1,000 people.", price: 520, animal: "cow", image: "/matw-cow.jpg" },
  { id: "goat", name: "Sadaqah Goat Sacrifice", place: "Bangladesh", note: "A voluntary sacrifice supporting vulnerable families in Bangladesh.", price: 140, animal: "goat", image: "/matw-goat.jpg" },
];

const faqs = [
  ["What is the difference between Aqeeqah, Nidr and Walimah?", "Aqeeqah marks the arrival of a child, Nidr may fulfil a vow or express gratitude, and Walimah shares the joy of a marriage."],
  ["How is my sacrifice performed?", "MATW coordinates sacrifice delivery through its project teams and partners, with distribution directed to vulnerable communities."],
  ["When will I receive my report?", "Reporting formats and timing vary by project. MATW says proof may be requested and can include images and, in some cases, video."],
  ["Can I choose where my sacrifice is carried out?", "Available destinations depend on the current appeal. The options shown here reflect Africa and Bangladesh listings."],
  ["Will I receive photos or video?", "MATW says delivery proof can be requested. The exact format is subject to the project and operating conditions."],
];

function Logo() {
  return (
    <a className="bp-logo" href="#top" aria-label="MATW Sacrifice home">
      <span><img src="/matw-official-logo.png" alt="" /></span>
      <strong>MATW PROJECT</strong>
      <small>MUSLIMS AROUND THE WORLD</small>
    </a>
  );
}

function SheepMark({ type = "sheep", large = false }) {
  const horn = type === "goat";
  const cow = type === "cow";
  return (
    <svg className={`sheep-mark ${large ? "large" : ""}`} viewBox="0 0 180 120" role="img" aria-label={cow ? "Cow" : horn ? "Goat" : "Sheep"}>
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d={cow ? "M28 42c15-17 73-18 98 0 10 8 10 34-3 44-21 14-72 13-94-2-12-9-12-31-1-42Z" : "M30 44c7-20 28-27 46-21 13-13 37-11 47 4 18-2 31 10 31 27 0 20-17 34-37 32-18 13-49 10-61-5-22 3-38-12-36-31 1-3 5-5 10-6Z"} strokeWidth="4" />
        <path d="M126 42c12-9 27-8 36 1 8 8 8 22 0 30-7 7-20 8-31 1" strokeWidth="4" />
        <path d="M151 45c7-5 14-4 18 2M153 70c7 3 13 1 16-4" strokeWidth="3" />
        <circle cx="152" cy="56" r="2.6" fill="currentColor" stroke="none" />
        <path d="M47 84v25M68 86v23M113 86v23M132 82v27" strokeWidth="4" />
        <path d="M42 109h11M63 109h11M108 109h11M127 109h11" strokeWidth="4" />
        <path d="M22 50c-8 4-9 11-2 16" strokeWidth="3" />
        {horn && <path d="M145 41c-4-13 8-18 14-9M153 41c4-12 15-12 18-5" strokeWidth="3" />}
        {cow && <path d="M143 39l-8-12M157 39l9-12" strokeWidth="3" />}
      </g>
    </svg>
  );
}

function PageProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 130, damping: 28, mass: 0.25 });
  return <motion.div className="page-progress" style={{ scaleX }} aria-hidden="true" />;
}

function Reveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 34, clipPath: "inset(0 0 12% 0)" }}
      whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.78, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ValuesBand() {
  const phrase = "SACRIFICE WITH MEANING  •  AQEEQAH  •  NIDR  •  WALIMAH  •  AMANAH IN ACTION  •  ";
  return (
    <div className="values-band" aria-label="Sacrifice with meaning">
      <div><span>{phrase}</span><span aria-hidden="true">{phrase}</span></div>
    </div>
  );
}

function Header() {
  return (
    <header className="bp-header">
      <Logo />
      <nav aria-label="Primary navigation">
        <a href="#top">Home</a>
        <a href="#meaning">About Sacrifice</a>
        <a href="#how">How It Works</a>
        <a href="#impact">Impact</a>
        <a href="#faq">FAQs</a>
      </nav>
      <div className="bp-header-actions">
        <span>USD <ChevronDown size={13} /></span>
        <a href="#choose">Donate Now</a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="bp-hero" id="top">
      <div className="hero-grid-mark" aria-hidden="true" />
      <motion.div
        className="bp-hero-copy"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1>Honour a Sunnah.<br />Fulfil a Commitment.<br /><em>Bring Joy to Lives.</em></h1>
        <p>Whether it is Aqeeqah, Nidr, Walimah or a general sacrifice, your offering is an act of devotion and a means of providing fresh meat to families in need.</p>
        <div className="hero-values">
          <article>
            <span>01</span><ShieldCheck />
            <div><strong>A sacred intention</strong><small>Rooted in Islamic values</small></div>
          </article>
          <article>
            <span>02</span><Heart />
            <div><strong>Mercy multiplied</strong><small>Devotion becomes nourishment</small></div>
          </article>
          <article>
            <span>03</span><Users />
            <div><strong>80–100 people</strong><small>May benefit from one sheep</small></div>
          </article>
          <article>
            <span>04</span><BadgeCheck />
            <div><strong>Amanah documented</strong><small>Clear project reporting</small></div>
          </article>
        </div>
        <div className="hero-buttons">
          <a className="primary-button" href="#choose">Give Your Sacrifice <ArrowRight size={17} /></a>
          <a className="outline-button" href="#how"><Play size={15} fill="currentColor" /> How It Works</a>
        </div>
      </motion.div>
      <motion.div
        className="bp-hero-visual"
        initial={{ opacity: 0, x: 38, rotate: 1.5 }}
        animate={{ opacity: 1, x: 0, rotate: 0 }}
        transition={{ duration: 1, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
      >
        <img className="hero-line-art" src="/matw-line-hero-v2.png" alt="Blue line illustration of a sheep standing in front of a mosque" />
      </motion.div>
    </section>
  );
}

function ChoiceSection() {
  const [quantities, setQuantities] = useState(() => Object.fromEntries(sacrifices.map((item) => [item.id, 0])));
  const total = useMemo(() => sacrifices.reduce((sum, item) => sum + item.price * quantities[item.id], 0), [quantities]);
  const adjust = (id, delta) => setQuantities((current) => ({ ...current, [id]: Math.max(0, current[id] + delta) }));

  return (
    <section className="choice-section" id="choose">
      <div className="section-title-row">
        <div>
          <span>01 · Choose</span>
          <h2>Choose Your Sacrifice</h2>
          <p>Select the type of sacrifice you would like to offer.</p>
        </div>
        <span className="currency-pill">USD <ChevronDown size={14} /></span>
      </div>
      <div className="product-list">
        {sacrifices.map((item) => (
          <motion.article className={quantities[item.id] ? "selected" : ""} key={item.id} whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 360, damping: 28 }}>
            <button className="product-check" onClick={() => adjust(item.id, quantities[item.id] ? -quantities[item.id] : 1)} aria-label={`Select ${item.name} in ${item.place}`} aria-pressed={quantities[item.id] > 0}>
              {quantities[item.id] > 0 && <Check size={15} />}
            </button>
            <div className="product-photo"><img src={item.image} alt="" /></div>
            <div className="product-copy">
              <h3>{item.name} <span>— {item.place}</span></h3>
              <p>{item.note}</p>
            </div>
            <div className="quantity-control" aria-label={`${item.name} quantity`}>
              <button onClick={() => adjust(item.id, -1)} aria-label={`Decrease ${item.name}`}><Minus size={14} /></button>
              <output>{quantities[item.id]}</output>
              <button onClick={() => adjust(item.id, 1)} aria-label={`Increase ${item.name}`}><Plus size={14} /></button>
            </div>
            <strong>${item.price} <small>USD</small></strong>
          </motion.article>
        ))}
      </div>
      <div className="choice-footer">
        <div className="assurance-strip">
          <span><ShieldCheck /> Shariah conscious</span>
          <span><HandHeart /> Fresh, nutritious meat</span>
          <span><ClipboardCheck /> Transparent reporting</span>
          <span><Users /> Distributed to families</span>
        </div>
        <div className="official-policy"><img src="/matw-policy-logos.png" alt="MATW Project donation policy marks" /></div>
        <div className="choice-total">
          <span>Your intention</span>
          <strong>${total} <small>USD</small></strong>
          <a href={MATW_APPEALS} target="_blank" rel="noreferrer">Continue with MATW <ArrowRight size={16} /></a>
        </div>
      </div>
    </section>
  );
}

function MeaningSection() {
  const cards = [
    ["Nidr", "A sacrifice connected to a vow or an expression of gratitude.", Sparkles],
    ["Walimah", "A marriage sacrifice that shares joy with family, guests and people in need.", Heart],
    ["General Sacrifice", "A voluntary offering that provides fresh food to vulnerable families.", HandHeart],
  ];
  return (
    <section className="meaning-section" id="meaning">
      <Reveal className="section-heading">
        <span>02 · Meaning</span>
        <h2>The Significance of Each Sacrifice</h2>
      </Reveal>
      <motion.article className="aqeeqah-feature" whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 280, damping: 24 }}>
        <div className="big-sheep">
          <img src="/matw-aqeeqah.jpg" alt="Official MATW Aqeeqah sheep sacrifice project" />
          <span><SheepMark /></span>
        </div>
        <div>
          <span className="meaning-label">AQEEQAH</span>
          <h3>A beautiful Sunnah for the arrival of a child.</h3>
          <p>It is a way to thank Allah, seek blessings for the child and share the joy of a new life with family and people in need.</p>
          <div className="recommendation">
            <span><strong>2 sacrifices</strong> commonly recommended for a boy</span>
            <i />
            <span><strong>1 sacrifice</strong> commonly recommended for a girl</span>
          </div>
        </div>
      </motion.article>
      <div className="meaning-cards">
        {cards.map(([title, copy, Icon], index) => (
          <motion.article key={title} whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 320, damping: 24 }}>
            <span className="card-number">0{index + 1}</span><Icon /><h3>{title}</h3><p>{copy}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function Explainer() {
  return (
    <section className="explainer-section" id="how">
      <div className="video-panel">
        <img src="/matw-sadaqah-sheep.jpg" alt="Official MATW Sadaqah sheep sacrifice project" />
        <span><Play size={25} fill="currentColor" /></span>
      </div>
      <div>
        <span className="section-index">03 · How it works</span>
        <h2>One intention.<br />A carefully delivered sacrifice.</h2>
        <ul>
          <li><Check /> Choose the meaning and destination</li>
          <li><Check /> MATW coordinates delivery through its teams and partners</li>
          <li><Check /> Fresh meat reaches vulnerable families</li>
          <li><Check /> Proof may be requested subject to project conditions</li>
        </ul>
      </div>
    </section>
  );
}

function Locations() {
  return (
    <section className="locations-section">
      <Reveal className="section-heading">
        <span>04 · Places</span>
        <h2>Where We Sacrifice</h2>
        <p>Current sacrifice options shown on this page are available in Africa and Bangladesh.</p>
      </Reveal>
      <div className="location-grid">
        <motion.article whileHover={{ y: -8, rotate: -0.5 }}><MapPinned /><strong>Africa</strong><small>Sheep and cow options</small></motion.article>
        <motion.article whileHover={{ y: -8, rotate: 0.5 }}><MapPinned /><strong>Bangladesh</strong><small>Goat sacrifice option</small></motion.article>
        <motion.article className="coming" whileHover={{ y: -8 }}><Globe2 /><strong>More locations</strong><small>Subject to current appeals</small></motion.article>
      </div>
    </section>
  );
}

function LegacyAndProof() {
  const steps = [
    [SheepMark, "Sacrifice completed", "Carried out according to the selected appeal"],
    [Mail, "Email confirmation", "Details sent to the donor"],
    [ClipboardCheck, "Project update", "Reporting depends on the project"],
    [Camera, "Photo or video proof", "May be requested where available"],
  ];
  return (
    <>
      <section className="legacy-section">
        <div className="legacy-portrait"><span>AB</span><i /></div>
        <div>
          <span className="section-index">05 · Legacy</span>
          <h2>A word shaped by Ali Banat’s legacy.</h2>
          <p>After a rare cancer diagnosis, Ali Banat redirected his life toward service. MATW continues the work he began with a focus on worship, dignity and responsibility.</p>
          <a href={MATW_ZAKAT_2024} target="_blank" rel="noreferrer">Read the published story <ArrowRight size={15} /></a>
        </div>
        <blockquote>“Your sacrifice is a means of hope, dignity and mercy.”</blockquote>
      </section>
      <section className="proof-section">
        <Reveal className="section-heading">
          <span>06 · Reporting</span>
          <h2>Your Sacrifice. Their Amanah.</h2>
        </Reveal>
        <div className="proof-grid">
          {steps.map(([Icon, title, copy], index) => (
            <motion.article key={title} whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 320, damping: 24 }}>
              <span>0{index + 1}</span>
              {Icon === SheepMark ? <SheepMark /> : <Icon />}
              <h3>{title}</h3>
              <p>{copy}</p>
            </motion.article>
          ))}
        </div>
        <a className="policy-link" href={MATW_POLICY} target="_blank" rel="noreferrer"><ShieldCheck /> Read MATW’s exact donation policy</a>
      </section>
    </>
  );
}

function Impact() {
  return (
    <section className="impact-section" id="impact">
      <span className="section-index">07 · 2024 field impact</span>
      <div><strong>325</strong><p>relief trucks coordinated for Gaza in MATW’s 2024 report</p></div>
      <i />
      <div><strong>26.7M</strong><p>litres of clean water distributed in Gaza, reported for 2024</p></div>
      <a href={MATW_REPORT_2024} target="_blank" rel="noreferrer">Open the report <ArrowRight size={15} /></a>
    </section>
  );
}

function FAQ() {
  return (
    <section className="faq-section" id="faq">
      <div className="section-heading">
        <span>08 · Questions</span>
        <h2>Frequently Asked Questions</h2>
      </div>
      <div className="faq-list">
        {faqs.map(([question, answer], index) => (
          <details key={question} open={index === 0}>
            <summary><span>0{index + 1}</span>{question}<Plus size={17} /></summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bp-footer">
      <Logo />
      <div><strong>Quick Links</strong><a href="#meaning">About Sacrifice</a><a href="#how">How It Works</a><a href="#impact">Impact</a></div>
      <div><strong>Help & Support</strong><a href={MATW_APPEALS} target="_blank" rel="noreferrer">Official Appeals</a><a href={MATW_POLICY} target="_blank" rel="noreferrer">Donation Policy</a></div>
      <div className="footer-cta"><span>Stay Connected</span><p>Continue securely on MATW’s official website.</p><a href={MATW_APPEALS} target="_blank" rel="noreferrer">Donate with MATW <ArrowRight size={15} /></a></div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="blueprint-page">
      <PageProgress />
      <Header />
      <main>
        <Hero />
        <ValuesBand />
        <ChoiceSection />
        <MeaningSection />
        <Explainer />
        <Locations />
        <LegacyAndProof />
        <Impact />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
