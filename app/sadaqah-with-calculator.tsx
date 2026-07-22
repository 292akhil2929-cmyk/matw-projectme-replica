import DonationImpactCalculator from "./sadaqah-calculator/page";
import { SadaqahJariyahPage } from "./priority-pages";

export default function SadaqahWithCalculator() {
  return <><section className="sadaqah-calculator-embed"><div className="priority-heading"><span className="eyebrow">Plan your impact</span><h2>See what your Sadaqah Jariyah can keep giving.</h2><p>Use our impact calculator to explore the people served, years of benefit and ongoing acts of charity your gift can support.</p></div><DonationImpactCalculator /></section><SadaqahJariyahPage /> </>;
}
