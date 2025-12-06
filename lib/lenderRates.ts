// lib/lenderRates.ts

export type LenderType = "OO" | "INV";

type LvrBand = {
  maxLvr: number; // inclusive upper bound, e.g. 60 => 0–60% LVR
  rate: number;   // p.a. %
};

type Lender = {
  id: string;
  name: string;
  type: LenderType;
  bands: LvrBand[];
};

export type OptionPick = {
  key: "A" | "B" | "C";
  lenderId: string;
  lenderName: string;
  indicativeRate: number;
};

// Rough but realistic headline refi rates per LVR band.
// Tune these whenever you like – logic elsewhere will just work.
export const lenders: Lender[] = [
  {
    id: "amp_oo",
    name: "AMP",
    type: "OO",
    bands: [
      { maxLvr: 60, rate: 5.20 },
      { maxLvr: 80, rate: 5.30 },
      { maxLvr: 90, rate: 5.39 },
    ],
  },
  {
    id: "bankaust_oo",
    name: "Bank Australia",
    type: "OO",
    bands: [
      { maxLvr: 60, rate: 5.28 },
      { maxLvr: 80, rate: 5.40 },
      { maxLvr: 90, rate: 5.75 },
    ],
  },
  {
    id: "boc_oo",
    name: "Bank of China",
    type: "OO",
    bands: [
      { maxLvr: 60, rate: 5.30 },
      { maxLvr: 80, rate: 5.50 },
      { maxLvr: 90, rate: 5.99 },
    ],
  },
  {
    id: "bendigo_oo",
    name: "Bendigo Bank",
    type: "OO",
    bands: [
      { maxLvr: 60, rate: 5.50 },
      { maxLvr: 80, rate: 5.79 },
      { maxLvr: 90, rate: 5.99 },
    ],
  },
  {
    id: "beyond_oo",
    name: "Beyond Bank",
    type: "OO",
    bands: [
      { maxLvr: 60, rate: 5.25 },
      { maxLvr: 80, rate: 5.84 },
      { maxLvr: 90, rate: 5.94 },
    ],
  },
  {
    id: "gsb_oo",
    name: "Great Southern Bank",
    type: "OO",
    bands: [
      { maxLvr: 60, rate: 5.45 },
      { maxLvr: 80, rate: 5.64 },
      { maxLvr: 90, rate: 5.94 },
    ],
  },
  {
    id: "ing_oo",
    name: "ING",
    type: "OO",
    bands: [
      { maxLvr: 60, rate: 5.49 },
      { maxLvr: 80, rate: 5.69 },
      { maxLvr: 90, rate: 6.19 },
    ],
  },
  {
    id: "macq_oo",
    name: "Macquarie",
    type: "OO",
    bands: [
      { maxLvr: 60, rate: 5.35 },
      { maxLvr: 80, rate: 5.89 },
      { maxLvr: 90, rate: 6.09 },
    ],
  },
  {
    id: "me_oo",
    name: "ME Bank",
    type: "OO",
    bands: [
      { maxLvr: 60, rate: 5.89 },
      { maxLvr: 80, rate: 5.99 },
      { maxLvr: 90, rate: 6.29 },
    ],
  },
  {
    id: "move_oo",
    name: "Move Bank",
    type: "OO",
    bands: [
      { maxLvr: 60, rate: 5.49 },
      { maxLvr: 80, rate: 5.65 },
      { maxLvr: 90, rate: 5.95 },
    ],
  },
  {
    id: "qudos_oo",
    name: "Qudos",
    type: "OO",
    bands: [
      { maxLvr: 60, rate: 5.49 },
      { maxLvr: 80, rate: 5.70 },
      { maxLvr: 90, rate: 5.95 },
    ],
  },
  {
    id: "ubank_oo",
    name: "Ubank",
    type: "OO",
    bands: [
      { maxLvr: 60, rate: 5.65 },
      { maxLvr: 80, rate: 5.84 },
      { maxLvr: 90, rate: 5.95 },
    ],
  },

  // Investor – rough uplift on OO
  {
    id: "amp_inv",
    name: "AMP",
    type: "INV",
    bands: [
      { maxLvr: 60, rate: 6.29 },
      { maxLvr: 80, rate: 6.49 },
      { maxLvr: 90, rate: 6.69 },
    ],
  },
  {
    id: "bankaust_inv",
    name: "Bank Australia",
    type: "INV",
    bands: [
      { maxLvr: 60, rate: 6.25 },
      { maxLvr: 80, rate: 6.35 },
      { maxLvr: 90, rate: 6.55 },
    ],
  },
  {
    id: "boc_inv",
    name: "Bank of China",
    type: "INV",
    bands: [
      { maxLvr: 60, rate: 6.30 },
      { maxLvr: 80, rate: 6.39 },
      { maxLvr: 90, rate: 6.59 },
    ],
  },
  {
    id: "bendigo_inv",
    name: "Bendigo Bank",
    type: "INV",
    bands: [
      { maxLvr: 60, rate: 6.39 },
      { maxLvr: 80, rate: 6.59 },
      { maxLvr: 90, rate: 6.79 },
    ],
  },
  {
    id: "beyond_inv",
    name: "Beyond Bank",
    type: "INV",
    bands: [
      { maxLvr: 60, rate: 6.34 },
      { maxLvr: 80, rate: 6.54 },
      { maxLvr: 90, rate: 6.74 },
    ],
  },
  {
    id: "gsb_inv",
    name: "Great Southern Bank",
    type: "INV",
    bands: [
      { maxLvr: 60, rate: 6.29 },
      { maxLvr: 80, rate: 6.44 },
      { maxLvr: 90, rate: 6.64 },
    ],
  },
  {
    id: "ing_inv",
    name: "ING",
    type: "INV",
    bands: [
      { maxLvr: 60, rate: 6.09 },
      { maxLvr: 80, rate: 6.29 },
      { maxLvr: 90, rate: 6.49 },
    ],
  },
  {
    id: "macq_inv",
    name: "Macquarie",
    type: "INV",
    bands: [
      { maxLvr: 60, rate: 6.04 },
      { maxLvr: 80, rate: 6.19 },
      { maxLvr: 90, rate: 6.39 },
    ],
  },
  {
    id: "me_inv",
    name: "ME Bank",
    type: "INV",
    bands: [
      { maxLvr: 60, rate: 6.19 },
      { maxLvr: 80, rate: 6.39 },
      { maxLvr: 90, rate: 6.59 },
    ],
  },
  {
    id: "move_inv",
    name: "Move Bank",
    type: "INV",
    bands: [
      { maxLvr: 60, rate: 6.25 },
      { maxLvr: 80, rate: 6.45 },
      { maxLvr: 90, rate: 6.65 },
    ],
  },
  {
    id: "qudos_inv",
    name: "Qudos",
    type: "INV",
    bands: [
      { maxLvr: 60, rate: 6.25 },
      { maxLvr: 80, rate: 6.35 },
      { maxLvr: 90, rate: 6.55 },
    ],
  },
  {
    id: "ubank_inv",
    name: "Ubank",
    type: "INV",
    bands: [
      { maxLvr: 60, rate: 6.04 },
      { maxLvr: 80, rate: 6.14 },
      { maxLvr: 90, rate: 6.34 },
    ],
  },
];

function pickRateForLvr(lender: Lender, lvr?: number | null): number {
  if (!lvr || !isFinite(lvr)) {
    // default to the <=80 band as a sensible middle
    const mid = lender.bands.find((b) => b.maxLvr === 80);
    return mid ? mid.rate : lender.bands[0]?.rate ?? 6.5;
  }

  const band = lender.bands.find((b) => lvr <= b.maxLvr);
  return band ? band.rate : lender.bands[lender.bands.length - 1].rate;
}

export function pickLenderOptions(input: {
  ownerOrInvestor?: LenderType | null;
  lvr?: number | null;
}): { optionA: OptionPick; optionB: OptionPick; optionC: OptionPick } {
  const type: LenderType = input.ownerOrInvestor || "OO";

  const pool = lenders
    .filter((l) => l.type === type)
    .map((l) => ({
      lenderId: l.id,
      lenderName: l.name,
      rate: pickRateForLvr(l, input.lvr),
    }))
    .sort((a, b) => a.rate - b.rate);

  const [p1, p2, p3] = [
    pool[0] || pool[0],
    pool[1] || pool[0] || pool[1],
    pool[2] || pool[1] || pool[0],
  ];

  return {
    optionA: {
      key: "A",
      lenderId: p1.lenderId,
      lenderName: p1.lenderName,
      indicativeRate: p1.rate,
    },
    optionB: {
      key: "B",
      lenderId: p2.lenderId,
      lenderName: p2.lenderName,
      indicativeRate: p2.rate,
    },
    optionC: {
      key: "C",
      lenderId: p3.lenderId,
      lenderName: p3.lenderName,
      indicativeRate: p3.rate,
    },
  };
}
