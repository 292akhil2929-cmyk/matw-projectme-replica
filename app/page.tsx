"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function Image({ fill, priority, sizes, ...props }: any) {
  return <img {...props} loading={priority ? "eager" : "lazy"} style={{ ...(fill ? { position: "absolute", inset: 0, width: "100%", height: "100%" } : {}), ...(props.style || {}) }} />;
}

const A = "/assets/";

const appeals = [
  ["Gaza Hospital Rebuild", "/gaza-hospital-rebuild", "08872255-6849-4c3e-b8ad-b94db6bc8458.png"],
  ["Forgotten Ummah", "/forgotten-ummah", "legacy11.81a5d3462eb095e5e34f.png"],
  ["Gaza Food & Water", "/gaza-food-water", "legacy12.753a665c4fe79de4b973.png"],
  ["Water Aid", "/water-aid", "legacy13.db02f131140dccb74bfa.png"],
  ["Sudan Crisis", "/sudan-crisis", "legacy14.4db13bce9dcade936ae7.png"],
  ["Build a Masjid", "/sadaqah-jariyah/build-a-masjid", "legacy1.a8b028fabe3d17e78334.png"],
  ["Orphans of the Ummah", "/orphans-of-ummah", "legacy2.f2c1f66541a79098c42b.png"],
  ["Give Zakat", "/zakat", "zakat.4b8e5d8777306e3a7621.png"],
];

const routeCopy: Record<string, { eyebrow: string; title: string; body: string; image: string }> = {
  "/zakat": { eyebrow: "Islamic Giving", title: "Give your Zakat where it is needed most", body: "Your Zakat can provide food, safety, medical care and dignity to families facing crisis around the world.", image: "zakat.4b8e5d8777306e3a7621.png" },
  "/forgotten-ummah": { eyebrow: "Urgent Appeals", title: "Stand with the Forgotten Ummah", body: "From food parcels to clean water and shelter, your donation reaches communities that cannot wait.", image: "legacy11.81a5d3462eb095e5e34f.png" },
  "/sudan-crisis": { eyebrow: "Sudan Emergency", title: "Help families survive the Sudan crisis", body: "Millions have been displaced and are facing hunger. Your support brings emergency relief closer to families in need.", image: "legacy14.4db13bce9dcade936ae7.png" },
  "/water-aid": { eyebrow: "Sadaqah Jariyah", title: "Give the gift of clean water", body: "A water well creates health, opportunity and lasting reward for generations to come.", image: "legacy13.db02f131140dccb74bfa.png" },
  "/sadaqah-jariyah": { eyebrow: "A Legacy That Lives On", title: "Make your Sadaqah Jariyah count", body: "Build a lasting source of mercy through a mosque, well, healthcare project or support for orphans.", image: "legacy1.a8b028fabe3d17e78334.png" },
  "/ali-banat": { eyebrow: "Our Founder", title: "Ali Banat's vision was clear: build a legacy", body: "The MATW Project began with one man's decision to turn time into a gift. Today, that legacy reaches millions of Muslims around the world.", image: "ali-banat-top.88a224fc9abb884ac15f.png" },
  "/annual-reports": { eyebrow: "Our Impact", title: "See the difference your giving makes", body: "Explore the reports, stories and milestones behind MATW's work across the globe.", image: "view-our-reports.49a29687b1bc114c4c8c.jpg" },
};

export function Header() {
  return <>
    <div className="ticker"><span> Gaza: Rebuild what was lost</span><Link href="/gaza-emergency">Learn more →</Link></div>
    <header className="site-header"><Link className="brand" href="/"><span className="brand-mark">MATW</span><span>MATW<br /><small>Project</small></span></Link><nav><Link href="/top-10">Donate</Link><Link href="/zakat">Give Zakat</Link><Link href="/sadaqah-jariyah">Sadaqah Jariyah</Link><Link href="/ali-banat">Our Story</Link><Link href="/contact">Contact</Link></nav><div className="header-actions"><span className="locale">◎ EN</span><a href="tel:+61297589037">+61 2 9758 9037</a><Link className="button button-dark" href="/top-10">Donate</Link></div></header>
  </>;
}

export function Footer() {
  return <footer><div className="footer-top"><div><div className="footer-brand">MATW <span>Project</span></div><p>Muslims Around The World Project is a charity supporting communities with food, water, medical aid and shelter.</p></div><div><h4>Get involved</h4><Link href="/annual-reports">Our impact</Link><Link href="/volunteer">Volunteer</Link><Link href="/fundraising">Fundraise with us</Link><Link href="/contact">Contact</Link></div><div><h4>Give</h4><Link href="/top-10">Donate</Link><Link href="/zakat">Zakat</Link><Link href="/sadaqah">Sadaqah</Link><Link href="/subscription">Regular giving</Link></div><div><h4>Stay connected</h4><p>Follow MATW and keep up with the work.</p><div className="socials"><span>f</span><span>◎</span><span>▶</span><span>♪</span></div></div></div><div className="footer-bottom"><span>100% secure checkout</span><span>100% Donation Policy</span><span>© 2016–2026 MATW Project</span></div></footer>;
}

function DonationBar() { return <section className="donation-bar"><div><span className="eyebrow">Most Needed Now</span><strong>Choose your donation</strong></div><div className="amounts"><button>$50</button><button className="active">$120</button><button>$200</button><button>$500</button><input aria-label="Custom donation amount" placeholder="$ Other" /></div><Link href="/top-10" className="button button-teal">Quick Donate</Link></section>; }

function Home() { return <><section className="hero"><div className="hero-copy"><span className="eyebrow">Gaza emergency appeal</span><h1>Help families survive the worst of crisis.</h1><p>Food, water and shelter are urgently needed by families in Gaza and Sudan right now.</p><Link href="/gaza-food-water" className="button button-orange">Give now <span>↗</span></Link></div><div className="hero-art"><Image src={A + "08872255-6849-4c3e-b8ad-b94db6bc8458.png"} alt="Families receiving aid" fill priority sizes="(max-width: 700px) 100vw, 55vw" /></div></section><DonationBar /><section className="section"><div className="section-heading"><div><span className="eyebrow">Urgent appeals</span><h2>Help where it matters most</h2></div><Link href="/all-appeals" className="text-link">View all appeals →</Link></div><div className="appeal-grid">{appeals.map(([title, href, image]) => <Link href={href} className="appeal-card" key={href}><div className="card-image"><Image src={A + image} alt="" fill sizes="(max-width: 700px) 80vw, 22vw" /></div><div className="card-copy"><h3>{title}</h3><p>Support families with essential aid today.</p><span>Donate now →</span></div></Link>)}</div></section><section className="promise"><div><span className="eyebrow">Our promise to you</span><h2>100% of your donation goes to the project.</h2><p>When you donate to a project, 100% of your donation (after merchant and banking fees) will be used for direct project costs and donor engagement.</p><Link href="/100-donation-policy" className="button button-dark">Read our policy</Link></div><div className="promise-art"><Image src={A + "policy100.aa465a15ceb7a44e6880.png"} alt="100% donation policy" width={260} height={260} /></div></section><section className="story"><div className="story-image"><Image src={A + "ali-banat-top.88a224fc9abb884ac15f.png"} alt="Ali Banat" fill sizes="50vw" /></div><div><span className="eyebrow">Ali Banat's legacy</span><h2>One life. A lasting impact.</h2><p>The MATW Project started as a legacy of compassion and has grown to reach over 19 million Muslims in some of the poorest and most vulnerable regions.</p><Link href="/ali-banat" className="button button-teal">Learn more about Ali</Link></div></section><section className="involved section"><div className="section-heading"><div><span className="eyebrow">Get involved today</span><h2>Build your legacy with MATW</h2></div></div><div className="involved-grid"><Link href="/annual-reports"><Image src={A + "view-our-reports.49a29687b1bc114c4c8c.jpg"} alt="" fill /><b>View our reports</b></Link><Link href="/volunteer"><Image src={A + "volunteer-with-us.efada332413c08a69ad3.jpg"} alt="" fill /><b>Volunteer with us</b></Link><Link href="/all-appeals"><Image src={A + "all-appeals.6a4c1516fca9e55cb5ca.jpg"} alt="" fill /><b>All appeals</b></Link></div></section></> }

export function InnerPage({ path }: { path: string }) { const copy = routeCopy[path] || { eyebrow: "MATW Project", title: path === "/top-10" ? "Your donation can change a life today" : "Support Muslims around the world", body: "Together, we deliver food, clean water, medical aid and shelter to families in need. Give with purpose and build your legacy.", image: "legacy12.753a665c4fe79de4b973.png" }; return <><section className="inner-hero"><div><span className="eyebrow">{copy.eyebrow}</span><h1>{copy.title}</h1><p>{copy.body}</p><Link href="/top-10" className="button button-orange">Donate now ↗</Link></div><div className="inner-image"><Image src={A + copy.image} alt="" fill priority sizes="50vw" /></div></section><DonationBar /><section className="content-block"><span className="eyebrow">A little can go a long way</span><h2>Make an impact that lasts</h2><p>Your generosity helps MATW respond with dignity and care. Every project is designed around the needs of the community, from emergency appeals to sustainable Sadaqah Jariyah projects.</p><div className="feature-row"><div><strong>19m+</strong><span>people reached</span></div><div><strong>100%</strong><span>donation policy</span></div><div><strong>40+</strong><span>countries served</span></div></div></section><section className="dark-callout"><span className="eyebrow">Ready to make a difference?</span><h2>Give today. Build your Akhirah.</h2><Link href="/top-10" className="button button-orange">Donate now</Link></section></> }

export default function Page() { const path = usePathname() || "/"; return <><Header />{path === "/" ? <Home /> : <InnerPage path={path} />}<Footer /></>; }
