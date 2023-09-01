/*
  Warnings:

  - You are about to drop the `Health` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Health";

-- CreateTable
CREATE TABLE "health" (
    "id" SERIAL NOT NULL,
    "route" TEXT NOT NULL,
    "health_names" TEXT NOT NULL,

    CONSTRAINT "health_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "health_id_key" ON "health"("id");

-- CreateIndex
CREATE UNIQUE INDEX "health_route_key" ON "health"("route");

-- CreateIndex
CREATE UNIQUE INDEX "health_health_names_key" ON "health"("health_names");
