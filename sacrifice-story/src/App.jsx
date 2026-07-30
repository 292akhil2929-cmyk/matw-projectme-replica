import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useMotionValue,
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
  Minus,
  Plus,
  ShieldCheck,
  Sparkles,
  Sun,
  Users,
} from "lucide-react";

const MATW_APPEALS = "https://matwproject.org/en/all-appeals";
const MATW_POLICY = "https://matwproject.org/our-promise/100-donation-policy";
const MATW_REPORT_2024 = "https://matwproject.org/pdf/MATW_General_2024_Achievements_Report_V7.pdf";
const MATW_ZAKAT_2024 = "https://matwproject.org/pdf/MATW_Zakat_2024_Report_V5.pdf";
const LIMBS_OF_HOPE = "https://donate.matwproject.org/limbs-of-hope-palestine62431543";

const lightMotes = Array.from({ length: 26 }, (_, index) => ({
  id: index,
  left: `${(index * 37 + 11) % 98}%`,
  top: `${(index * 53 + 7) % 92}%`,
  size: 2 + (index % 4),
  delay: (index % 9) * 0.37,
  duration: 4.8 + (index % 6) * 0.7,
  tone: index % 5 === 0 ? "pink" : index % 3 === 0 ? "sky" : "warm",
}));

const sacrifices = [
  {
    id: "aqeeqah",
    name: "Aqeeqah",
    descriptor: "For the arrival of a child",
    animal: "Sheep · Africa",
    price: 90,
    icon: Baby,
  },
  {
    id: "nidr",
    name: "Nidr",
    descriptor: "To fulfil a vow or give thanks",
    animal: "Sheep · Africa",
    price: 90,
    icon: Sparkles,
  },
  {
    id: "walimah",
    name: "Walimah",
    descriptor: "To share the joy of a marriage",
    animal: "Sheep · Africa",
    price: 90,
    icon: Heart,
  },
  {
    id: "sadaqah-cow",
    name: "General Sacrifice",
    descriptor: "A voluntary act of charity",
    animal: "Cow · Africa",
    price: 520,
    icon: Users,
  },
  {
    id: "sadaqah-goat",
    name: "General Sacrifice",
    descriptor: "A voluntary act of charity",
    animal: "Goat · Bangladesh",
    price: 140,
    icon: Users,
  },
];

const faqs = [
  {
    q: "What is the difference between Aqeeqah and Nidr?",
    a: "Aqeeqah marks the arrival of a newborn. MATW describes Nidr as a sacrifice that may be offered to fulfil a vow or express gratitude.",
  },
  {
    q: "Can I offer a sacrifice throughout the year?",
    a: "Yes. MATW’s General Sacrifice and Aqeeqah programs operate throughout the year.",
  },
  {
    q: "Who receives the meat?",
    a: "MATW distributes fresh meat in impoverished communities, supporting vulnerable families including widows, orphans and elderly people.",
  },
  {
    q: "Can I request proof?",
    a: "MATW says delivery proof can be requested and may include images and, in some cases, video. The exact reporting format varies by project.",
  },
  {
    q: "What does the 100% Donation Policy mean?",
    a: "After merchant and banking fees, MATW says donations support direct project costs and/or donor engagement and fundraising reinvested into MATW projects.",
  },
];

function Logo() {
  return (
    <a className="logo" href="#top" aria-label="MATW Sacrifice home">
      <span className="logo-orbit"><Globe2 size={20} strokeWidth={1.4} /></span>
      <span>
        <strong>MATW</strong>
        <small>MUSLIMS AROUND THE WORLD</small>
      </span>
    </a>
  );
}

function Reveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 42, clipPath: "inset(0 0 18% 0)" }}
      whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function LightCursor() {
  const reduce = useReducedMotion();
  const cursorX = useMotionValue(-120);
  const cursorY = useMotionValue(-120);
  const x = useSpring(cursorX, { stiffness: 520, damping: 38, mass: 0.22 });
  const y = useSpring(cursorY, { stiffness: 520, damping: 38, mass: 0.22 });

  useEffect(() => {
    if (reduce) return undefined;
    const move = (event) => {
      cursorX.set(event.clientX - 22);
      cursorY.set(event.clientY - 22);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [cursorX, cursorY, reduce]);

  if (reduce) return null;

  return (
    <motion.div className="light-cursor" style={{ x, y }} aria-hidden="true">
      <span />
      <i />
    </motion.div>
  );
}

function JoyRibbon() {
  const phrases = ["NIYYAH", "AMANAH", "COMPASSION", "EXCELLENCE", "LIGHT IN MOTION"];
  return (
    <section className="joy-ribbon" aria-label="MATW values in motion">
      <div className="ribbon-track">
        {[...phrases, ...phrases].map((phrase, index) => (
          <React.Fragment key={`${phrase}-${index}`}>
            <span>{phrase}</span>
            <i aria-hidden="true" />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.08]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "10%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "26%"]);
  const fade = useTransform(scrollYProgress, [0, 0.82], [1, 0]);
  const beamOpacity = useTransform(scrollYProgress, [0, 0.7], [0.25, 1]);

  return (
    <section className="hero" id="top" ref={ref}>
      <motion.img
        className="hero-landscape"
        src="/light-journey-hero.png"
        alt="Sculptural night landscape illuminated by a golden path"
        style={{ scale: imageScale, y: imageY }}
      />
      <div className="hero-shade" />
      <motion.div className="hero-light-line" style={{ opacity: beamOpacity }} />
      <motion.div className="hero-copy" style={{ y: copyY, opacity: fade }}>
        <span className="kicker"><Sun size={13} /> MATW Sacrifice</span>
        <h1>
          Give light
          <br />
          <em>a way to travel.</em>
        </h1>
        <p>
          A private act of worship can travel farther than you will ever see—
          becoming nourishment, dignity and relief for a family in need.
        </p>
        <div className="hero-actions">
          <a className="button button-gold" href="#journey">Follow the light <ArrowDown size={17} /></a>
          <a className="quiet-link" href="#give">Complete your intention <ArrowRight size={16} /></a>
        </div>
      </motion.div>
      <div className="hero-footnote">
        <span>Scroll slowly</span>
        <i />
        <span>One continuous journey</span>
      </div>
    </section>
  );
}

function StoryScene({ progress, range, className = "", children }) {
  const reduce = useReducedMotion();
  const [start, end] = range;
  const edge = Math.min(0.045, (end - start) / 3);
  const opacity = useTransform(progress, [start, start + edge, end - edge, end], [0, 1, 1, 0]);
  const y = useTransform(progress, [start, start + edge, end - edge, end], reduce ? [0, 0, 0, 0] : [72, 0, 0, -72]);
  const blur = useTransform(progress, [start, start + edge, end - edge, end], reduce ? ["blur(0px)", "blur(0px)", "blur(0px)", "blur(0px)"] : ["blur(8px)", "blur(0px)", "blur(0px)", "blur(8px)"]);
  return (
    <motion.article className={`story-scene ${className}`} style={{ opacity, y, filter: blur }}>
      {children}
    </motion.article>
  );
}

function LightJourney() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const beamX = useTransform(scrollYProgress, [0, 0.22, 0.48, 0.74, 1], ["62vw", "18vw", "52vw", "7vw", "45vw"]);
  const beamRotate = useTransform(scrollYProgress, [0, 0.5, 1], [-18, reduce ? -18 : 8, reduce ? -18 : -12]);
  const beamWidth = useTransform(scrollYProgress, [0, 0.42, 0.62, 1], ["8vw", "12vw", "36vw", "16vw"]);
  const beamDrop = useTransform(scrollYProgress, [0, 0.18, 0.42, 0.68, 0.84, 1], ["-5vh", "7vh", "18vh", "30vh", "42vh", "56vh"]);
  const beamScaleY = useTransform(scrollYProgress, [0, 0.16, 0.42, 0.72, 1], [0.28, 0.48, 0.76, 0.98, 1.16]);
  const impactY = useTransform(scrollYProgress, [0, 0.2, 0.46, 0.72, 1], ["5vh", "24vh", "46vh", "64vh", "78vh"]);
  const impactScale = useTransform(scrollYProgress, [0, 0.28, 0.56, 0.82, 1], [0.35, 0.65, 1.15, 0.82, 1.3]);
  const impactOpacity = useTransform(scrollYProgress, [0, 0.08, 0.48, 0.92, 1], [0, 0.52, 0.9, 0.72, 0.25]);
  const bloomX = useTransform(scrollYProgress, [0, 0.3, 0.58, 0.82, 1], ["-9vw", "10vw", "-4vw", "12vw", "2vw"]);
  const bloomY = useTransform(scrollYProgress, [0, 0.45, 1], ["-8vh", "14vh", "-2vh"]);
  const bloomRotate = useTransform(scrollYProgress, [0, 1], [-8, reduce ? -8 : 24]);
  const tableReveal = useTransform(scrollYProgress, [0.39, 0.48, 0.61, 0.69], ["inset(48% 48% 48% 48% round 50%)", "inset(0% 0% 0% 0% round 0%)", "inset(0% 0% 0% 0% round 0%)", "inset(44% 44% 44% 44% round 50%)"]);
  const progressScale = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section className="light-journey" id="journey" ref={ref}>
      <div className="journey-stage">
        <motion.div className="journey-progress" style={{ scaleX: progressScale }} />
        <div className="journey-grain" />
        <motion.div className="stage-aurora" style={{ x: bloomX, y: bloomY, rotate: bloomRotate }} aria-hidden="true">
          <span className="bloom bloom-blue" />
          <span className="bloom bloom-sky" />
          <span className="bloom bloom-pink" />
        </motion.div>
        <div className="light-motes" aria-hidden="true">
          {lightMotes.map((mote) => (
            <motion.i
              key={mote.id}
              className={`light-mote mote-${mote.tone}`}
              style={{ left: mote.left, top: mote.top, width: mote.size, height: mote.size }}
              animate={reduce ? {} : { y: [0, -18 - mote.size * 2, 0], opacity: [0.12, 0.82, 0.12], scale: [0.7, 1.45, 0.7] }}
              transition={{ duration: mote.duration, delay: mote.delay, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </div>
        <motion.div
          className="travelling-beam"
          style={{ x: beamX, y: beamDrop, rotate: beamRotate, width: beamWidth, scaleY: beamScaleY }}
        >
          <span className="beam-core" />
        </motion.div>
        <motion.div
          className="beam-impact"
          style={{ x: beamX, y: impactY, scale: impactScale, opacity: impactOpacity }}
          aria-hidden="true"
        >
          <span />
          <i />
        </motion.div>

        <StoryScene progress={scrollYProgress} range={[0, 0.22]} className="scene-faith">
          <div className="scene-copy">
            <span className="scene-label">Before the action</span>
            <h2>It begins<br />where no one<br />can see.</h2>
            <p>
              With niyyah—an intention known to Allah before it is known to
              anyone else.
            </p>
          </div>
          <div className="niyyah-mark" aria-hidden="true">
            <span />
            <i />
            <b>نِيَّة</b>
            <small>NIYYAH · INTENTION</small>
          </div>
        </StoryScene>

        <StoryScene progress={scrollYProgress} range={[0.2, 0.43]} className="scene-meaning">
          <div className="scene-copy">
            <span className="scene-label">The meaning takes form</span>
            <h2>Four moments.<br />One devotion.</h2>
            <p>
              A new child. A promise kept. A marriage celebrated. A gift freely
              offered.
            </p>
          </div>
          <div className="meaning-constellation" aria-label="Aqeeqah, Nidr, Walimah and General Sacrifice">
            {[
              ["Aqeeqah", "New life"],
              ["Nidr", "A vow"],
              ["Walimah", "A union"],
              ["Sadaqah", "A gift"],
            ].map(([name, note], index) => (
              <motion.div
                key={name}
                className={`meaning-stone stone-${index + 1}`}
                animate={reduce ? {} : { y: [0, index % 2 ? 9 : -9, 0] }}
                transition={{ duration: 5 + index, repeat: Infinity, ease: "easeInOut" }}
              >
                <span>0{index + 1}</span><strong>{name}</strong><small>{note}</small>
              </motion.div>
            ))}
          </div>
        </StoryScene>

        <StoryScene progress={scrollYProgress} range={[0.41, 0.67]} className="scene-provision">
          <motion.div className="table-reveal" style={{ clipPath: tableReveal }}>
            <img src="/light-shared-table.png" alt="A family sharing a meal beneath warm light" />
            <div />
          </motion.div>
          <div className="scene-copy scene-copy-over">
            <span className="scene-label">The light arrives</span>
            <h2>From your hands.<br />Into theirs.</h2>
            <p>
              The sacrifice becomes fresh food—shared with dignity in
              communities where nourishment is not taken for granted.
            </p>
          </div>
        </StoryScene>

        <StoryScene progress={scrollYProgress} range={[0.65, 0.84]} className="scene-amanah">
          <div className="scene-copy">
            <span className="scene-label">Amanah · Trust</span>
            <h2>Care should<br />leave evidence.</h2>
            <p>
              MATW says proof can be requested, including images and, in some
              cases, video.
            </p>
          </div>
          <div className="evidence-stack" aria-hidden="true">
            <motion.div className="evidence-card evidence-a" whileHover={{ rotate: -7, y: -10 }}>
              <Camera size={28} />
              <span>DELIVERY PROOF</span>
              <b>Available on request</b>
            </motion.div>
            <motion.div className="evidence-card evidence-b" whileHover={{ rotate: 5, y: -10 }}>
              <ShieldCheck size={28} />
              <span>100% POLICY</span>
              <b>Read the exact terms</b>
            </motion.div>
            <div className="evidence-seal"><Check size={24} /></div>
          </div>
        </StoryScene>

        <StoryScene progress={scrollYProgress} range={[0.82, 1]} className="scene-legacy">
          <div className="legacy-year">2016</div>
          <div className="scene-copy">
            <span className="scene-label">Ali Banat’s legacy</span>
            <h2>One life<br />became a light<br />for millions.</h2>
            <p>
              After a rare cancer diagnosis, Ali Banat redirected his life
              toward service. MATW continues the work he began.
            </p>
            <a className="quiet-link" href={MATW_ZAKAT_2024} target="_blank" rel="noreferrer">
              Read the published story <ArrowRight size={16} />
            </a>
          </div>
          <div className="legacy-horizon" aria-hidden="true"><span /><i /><b /></div>
        </StoryScene>
      </div>
    </section>
  );
}

function FieldNote() {
  return (
    <section className="field-note">
      <Reveal className="field-heading">
        <span className="kicker gold"><BadgeCheck size={14} /> Current field evidence</span>
        <h2>Light should reach<br />where dignity was taken.</h2>
      </Reveal>
      <div className="field-grid">
        <Reveal className="field-story">
          <span className="field-index">GAZA · 2024 REPORT</span>
          <h3>Limbs of Hope</h3>
          <p>
            MATW’s 2024 report documents its partnership with the Jordan
            Hashemite Charity Organisation to provide prosthetic limbs to
            amputees affected by the conflict in Gaza.
          </p>
          <a href={LIMBS_OF_HOPE} target="_blank" rel="noreferrer">See the current appeal <ArrowRight size={16} /></a>
        </Reveal>
        <Reveal className="field-stat" delay={0.08}>
          <strong>325</strong>
          <span>relief trucks coordinated for Gaza in MATW’s 2024 report</span>
        </Reveal>
        <Reveal className="field-stat" delay={0.14}>
          <strong>26.7M</strong>
          <span>litres of clean water distributed in Gaza, reported for 2024</span>
        </Reveal>
      </div>
      <a className="report-source" href={MATW_REPORT_2024} target="_blank" rel="noreferrer">
        Open the complete 2024 Achievements Report <ArrowRight size={16} />
      </a>
    </section>
  );
}

function GiveSection() {
  const [selected, setSelected] = useState("aqeeqah");
  const [quantity, setQuantity] = useState(1);
  const choice = useMemo(() => sacrifices.find((item) => item.id === selected), [selected]);
  const total = choice.price * quantity;

  return (
    <section className="give-section" id="give">
      <div className="give-intro">
        <span className="kicker"><Sun size={13} /> Complete the intention</span>
        <h2>Choose with<br />understanding.</h2>
        <p>
          Select the meaning that brought you here. Prices are current USD
          listings from MATW’s global appeals page, checked July 2026.
        </p>
        <div className="policy-cue"><ShieldCheck size={20} /><span><b>100% Donation Policy</b>Exact terms available before you continue.</span></div>
      </div>

      <div className="sacrifice-form">
        <div className="choice-list" role="radiogroup" aria-label="Choose a sacrifice">
          {sacrifices.map((item) => {
            const Icon = item.icon;
            const active = item.id === selected;
            return (
              <button
                key={item.id}
                className={`choice-row ${active ? "active" : ""}`}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => { setSelected(item.id); setQuantity(1); }}
              >
                <span className="choice-radio">{active && <i />}</span>
                <Icon size={22} strokeWidth={1.4} />
                <span className="choice-copy">
                  <strong>{item.name}</strong>
                  <small>{item.descriptor}</small>
                </span>
                <span className="choice-place">{item.animal}</span>
                <b>${item.price}</b>
              </button>
            );
          })}
        </div>

        <aside className="intention-summary">
          <span className="summary-label">Your intention</span>
          <h3>{choice.name}</h3>
          <p>{choice.animal}</p>
          <div className="quantity-row">
            <span>Quantity</span>
            <div>
              <button type="button" aria-label="Decrease quantity" onClick={() => setQuantity((value) => Math.max(1, value - 1))}><Minus size={16} /></button>
              <output>{quantity}</output>
              <button type="button" aria-label="Increase quantity" onClick={() => setQuantity((value) => Math.min(20, value + 1))}><Plus size={16} /></button>
            </div>
          </div>
          <div className="total-row"><span>Total</span><strong>${total} <small>USD</small></strong></div>
          <a className="complete-button" href={MATW_APPEALS} target="_blank" rel="noreferrer">
            Continue with MATW <ArrowRight size={18} />
          </a>
          <small className="handoff-note">Secure donation continues on MATW’s official website.</small>
        </aside>
      </div>
    </section>
  );
}

function PromiseSection() {
  const values = [
    ["Islamic", "Guided by faith"],
    ["Compassion", "Human dignity first"],
    ["Excellence", "Ihsan in delivery"],
    ["Confidence", "Trust made visible"],
  ];
  return (
    <section className="promise-section">
      <div className="promise-light" />
      <Reveal className="promise-copy">
        <span className="kicker gold">What MATW holds sacred</span>
        <h2>The gift is yours.<br />The amanah is theirs.</h2>
        <p>
          MATW’s policy states that after merchant and banking fees, donations
          support direct project costs and/or donor engagement and fundraising
          reinvested into MATW projects.
        </p>
        <a href={MATW_POLICY} target="_blank" rel="noreferrer">Read the exact policy <ArrowRight size={16} /></a>
      </Reveal>
      <div className="values-grid">
        {values.map(([name, note], index) => (
          <Reveal className="value-item" delay={index * 0.06} key={name}>
            <span>0{index + 1}</span><strong>{name}</strong><small>{note}</small>
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
        <span className="kicker">Before you give</span>
        <h2>Clarity brings<br />confidence.</h2>
      </Reveal>
      <div className="faq-list">
        {faqs.map((item, index) => (
          <article className={open === index ? "open" : ""} key={item.q}>
            <button type="button" onClick={() => setOpen(open === index ? -1 : index)}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {item.q}
              <motion.i animate={{ rotate: open === index ? 180 : 0 }}><ChevronDown size={18} /></motion.i>
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
      <div className="footer-glow" />
      <div className="footer-path" />
      <div className="footer-copy">
        <span className="kicker gold">The light is waiting</span>
        <h2>Carry it<br /><em>further.</em></h2>
        <a className="button button-pink" href="#give">Complete your intention <ArrowRight size={18} /></a>
      </div>
      <div className="footer-bottom">
        <Logo />
        <p>MATW INTERNATIONAL LTD · ABN 60 610 666 325 · Registered charity and Public Benevolent Institution.</p>
        <div>
          <a href={MATW_APPEALS} target="_blank" rel="noreferrer">Official appeals</a>
          <a href={MATW_POLICY} target="_blank" rel="noreferrer">Donation policy</a>
          <a href={MATW_REPORT_2024} target="_blank" rel="noreferrer">2024 report</a>
        </div>
      </div>
      <p className="concept-note">Independent campaign concept using verified public MATW information. Donations continue on MATW’s official website.</p>
    </footer>
  );
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 24, restDelta: 0.001 });

  return (
    <>
      <LightCursor />
      <motion.div className="page-progress" style={{ scaleX: progress }} />
      <header>
        <Logo />
        <nav aria-label="Primary navigation">
          <a href="#journey">The journey</a>
          <a href="#give">Sacrifice</a>
          <a href="#faq">Questions</a>
        </nav>
        <a className="header-cta" href="#give">Give with intention <ArrowRight size={15} /></a>
      </header>
      <main>
        <Hero />
        <LightJourney />
        <JoyRibbon />
        <FieldNote />
        <GiveSection />
        <PromiseSection />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
