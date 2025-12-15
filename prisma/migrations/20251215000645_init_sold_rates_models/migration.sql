-- CreateTable
CREATE TABLE "Brand" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logoUrl" TEXT,
    "sourceType" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "priority" INTEGER NOT NULL DEFAULT 0,
    "registerBaseUrl" TEXT,
    "apiBaseUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductIndex" (
    "id" TEXT NOT NULL,
    "brandCode" TEXT NOT NULL,
    "brandName" TEXT NOT NULL,
    "productExternalId" TEXT NOT NULL,
    "prdUrl" TEXT NOT NULL,
    "lastModified" TEXT,
    "lastSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastHash" TEXT,

    CONSTRAINT "ProductIndex_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RawProduct" (
    "id" TEXT NOT NULL,
    "brandCode" TEXT NOT NULL,
    "productExternalId" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "hash" TEXT NOT NULL,
    "fetchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RawProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "brandId" TEXT NOT NULL,
    "externalId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "channel" TEXT NOT NULL,
    "purpose" TEXT NOT NULL,
    "ownerTypes" TEXT NOT NULL,
    "repaymentTypes" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductRate" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "lvrMax" DOUBLE PRECISION NOT NULL,
    "rateType" TEXT NOT NULL,
    "annualRate" DOUBLE PRECISION NOT NULL,
    "comparisonRate" DOUBLE PRECISION,
    "fixedTermMonths" INTEGER,
    "revertAnnualRate" DOUBLE PRECISION,
    "effectiveFrom" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "effectiveTo" TIMESTAMP(3),

    CONSTRAINT "ProductRate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Brand_code_key" ON "Brand"("code");

-- CreateIndex
CREATE INDEX "ProductIndex_brandCode_idx" ON "ProductIndex"("brandCode");

-- CreateIndex
CREATE UNIQUE INDEX "ProductIndex_brandCode_productExternalId_key" ON "ProductIndex"("brandCode", "productExternalId");

-- CreateIndex
CREATE INDEX "RawProduct_brandCode_productExternalId_idx" ON "RawProduct"("brandCode", "productExternalId");

-- CreateIndex
CREATE INDEX "Product_externalId_idx" ON "Product"("externalId");

-- CreateIndex
CREATE INDEX "Product_brandId_idx" ON "Product"("brandId");

-- CreateIndex
CREATE INDEX "ProductRate_productId_idx" ON "ProductRate"("productId");

-- CreateIndex
CREATE INDEX "ProductRate_effectiveFrom_idx" ON "ProductRate"("effectiveFrom");

-- AddForeignKey
ALTER TABLE "ProductIndex" ADD CONSTRAINT "ProductIndex_brandCode_fkey" FOREIGN KEY ("brandCode") REFERENCES "Brand"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RawProduct" ADD CONSTRAINT "RawProduct_brandCode_fkey" FOREIGN KEY ("brandCode") REFERENCES "Brand"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductRate" ADD CONSTRAINT "ProductRate_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
