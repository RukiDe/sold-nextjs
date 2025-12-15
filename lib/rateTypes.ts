// lib/rateTypes.ts

export type Purpose =
  | "PURCHASE"
  | "REFINANCE"
  | "CONSTRUCTION"
  | "LINE_OF_CREDIT";

export type OwnerType = "OO" | "INV";
export type RepaymentType = "P&I" | "IO";
export type RateType = "VARIABLE" | "FIXED";
export type Channel = "BROKER" | "DIRECT" | "SPECIAL";

export type RawProductIndexItem = {
  brandCode: string;
  brandName: string;
  productExternalId: string;
  prdUrl: string;
  lastModified?: string;
};

export type RawProductDetail = {
  brandCode: string;
  productExternalId: string;
  name: string;
  type: "home_loan" | "offset" | "package";
  rates: unknown;
  fees?: unknown;
  features?: unknown;
  eligibility?: unknown;
  source: "register" | "api" | "scrape";
  fetchedAt: string;
};

export type RateTier = {
  lvrMax: number;
  fixedTermMonths?: number;
  rateType: RateType;
  annualRate: number;
  comparisonRate?: number;
  revertAnnualRate?: number;
};

export type NormalisedProduct = {
  brandCode: string;
  productExternalId: string;
  name: string;
  channel: Channel;
  purpose: Purpose[];
  ownerTypes: OwnerType[];
  repaymentTypes: RepaymentType[];
  tiers: RateTier[];
  meta: {
    source: RawProductDetail["source"];
    lastFetchedAt: string;
  };
};
