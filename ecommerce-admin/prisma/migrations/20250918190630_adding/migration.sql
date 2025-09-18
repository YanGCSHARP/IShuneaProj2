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

-- CreateTable
CREATE TABLE "public"."Size" (
    "id" TEXT NOT NULL,
    "storeID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Size_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Color" (
    "id" TEXT NOT NULL,
    "storeID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Color_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Product" (
    "id" TEXT NOT NULL,
    "storeID" TEXT NOT NULL,
    "categoryID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "sizeID" TEXT NOT NULL,
    "colorID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Image" (
    "id" TEXT NOT NULL,
    "productID" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Category_storeID_idx" ON "public"."Category"("storeID");

-- CreateIndex
CREATE INDEX "Category_billboardID_idx" ON "public"."Category"("billboardID");

-- CreateIndex
CREATE INDEX "Size_storeID_idx" ON "public"."Size"("storeID");

-- CreateIndex
CREATE INDEX "Color_storeID_idx" ON "public"."Color"("storeID");

-- CreateIndex
CREATE INDEX "Product_storeID_idx" ON "public"."Product"("storeID");

-- CreateIndex
CREATE INDEX "Product_categoryID_idx" ON "public"."Product"("categoryID");

-- CreateIndex
CREATE INDEX "Product_sizeID_idx" ON "public"."Product"("sizeID");

-- CreateIndex
CREATE INDEX "Product_colorID_idx" ON "public"."Product"("colorID");

-- CreateIndex
CREATE INDEX "Image_productID_idx" ON "public"."Image"("productID");

-- AddForeignKey
ALTER TABLE "public"."Category" ADD CONSTRAINT "Category_storeID_fkey" FOREIGN KEY ("storeID") REFERENCES "public"."Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Category" ADD CONSTRAINT "Category_billboardID_fkey" FOREIGN KEY ("billboardID") REFERENCES "public"."Billboard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Size" ADD CONSTRAINT "Size_storeID_fkey" FOREIGN KEY ("storeID") REFERENCES "public"."Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Color" ADD CONSTRAINT "Color_storeID_fkey" FOREIGN KEY ("storeID") REFERENCES "public"."Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Product" ADD CONSTRAINT "Product_storeID_fkey" FOREIGN KEY ("storeID") REFERENCES "public"."Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Product" ADD CONSTRAINT "Product_categoryID_fkey" FOREIGN KEY ("categoryID") REFERENCES "public"."Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Product" ADD CONSTRAINT "Product_sizeID_fkey" FOREIGN KEY ("sizeID") REFERENCES "public"."Size"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Product" ADD CONSTRAINT "Product_colorID_fkey" FOREIGN KEY ("colorID") REFERENCES "public"."Color"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Image" ADD CONSTRAINT "Image_productID_fkey" FOREIGN KEY ("productID") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
