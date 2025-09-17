-- CreateTable
CREATE TABLE "public"."Store" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Billboard" (
    "id" TEXT NOT NULL,
    "storeID" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Billboard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Category" (
    "id" TEXT NOT NULL,
    "storeID" TEXT NOT NULL,
    "billboardID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Billboard_storeID_idx" ON "public"."Billboard"("storeID");

-- CreateIndex
CREATE INDEX "Category_storeID_idx" ON "public"."Category"("storeID");

-- CreateIndex
CREATE INDEX "Category_billboardID_idx" ON "public"."Category"("billboardID");

-- AddForeignKey
ALTER TABLE "public"."Billboard" ADD CONSTRAINT "Billboard_storeID_fkey" FOREIGN KEY ("storeID") REFERENCES "public"."Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Category" ADD CONSTRAINT "Category_storeID_fkey" FOREIGN KEY ("storeID") REFERENCES "public"."Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Category" ADD CONSTRAINT "Category_billboardID_fkey" FOREIGN KEY ("billboardID") REFERENCES "public"."Billboard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
