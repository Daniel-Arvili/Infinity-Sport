-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "onSale" SET DEFAULT false,
ALTER COLUMN "salePercent" DROP NOT NULL;
