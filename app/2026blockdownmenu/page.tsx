import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const menuItems = [
  "Grilled Chicken Breast",
  "Grilled Ahi Tuna Steak",
  "Alfredo Pasta Shells",
  "Brussels Sprouts",
  "Garlic Bread",
  "Dessert à la Blockdown",
];

function Ornament() {
  return (
    <div className="flex items-center justify-center gap-3 text-[#b09a6d]">
      <span className="block h-px w-12 bg-[#b09a6d]/50" />
      <span className="text-sm">❦</span>
      <span className="block h-px w-12 bg-[#b09a6d]/50" />
    </div>
  );
}

export default function BlockdownMenu() {
  return (
    <div
      className={`${cormorant.className} min-h-screen bg-[#f7f2e7] text-[#2d2a24] px-6 py-12`}
    >
      <div className="max-w-md mx-auto text-center">
        {/* Header */}
        <p className="uppercase tracking-[0.35em] text-xs text-[#b09a6d]">
          Est. Tonight
        </p>
        <h1 className="text-5xl mt-4 font-medium">Monkey Mansion Garden & Table</h1>
        <p className="text-2xl italic mt-1">2026</p>
        <p className="uppercase tracking-[0.25em] text-sm mt-6 text-[#6b6355]">
          An Evening of Fine(ish) Dining
        </p>

        <div className="mt-8">
          <Ornament />
        </div>

        <p className="italic mt-8 leading-relaxed text-[#6b6355]">
          This dinner is served on Kauaʻi, the ancestral homeland of Native
          Hawaiians (Kānaka Maoli). We thank Kanaloa, god of the ocean, for
          delivering tonight&apos;s ahi — and Safeway for delivering literally
          everything else.
        </p>

        <p className="italic text-lg mt-6 leading-relaxed text-[#6b6355]">
          Made with love (and a few YouTube tutorials)
          <br />
          by your favorite sous chefs
        </p>

        {/* Menu */}
        <div className="mt-10 border-y border-[#b09a6d]/40 py-10 space-y-8 text-left">
          {menuItems.map((name) => (
            <div key={name} className="flex items-baseline gap-2">
              <h3 className="text-xl font-semibold">{name}</h3>
              <span className="flex-1 border-b border-dotted border-[#b09a6d] mb-1" />
              <span className="text-lg">MP</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 space-y-2 text-[#6b6355]">
          <p className="text-sm uppercase tracking-[0.2em]">
            All dishes served family style
          </p>
        </div>
        <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[#b09a6d]">
          Reservations not required
        </p>
      </div>
    </div>
  );
}
