-- CreateTable
CREATE TABLE "monthly_chart_data" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "expenses" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "budget_balance" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "monthly_chart_data_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "monthly_chart_data_date_key" ON "monthly_chart_data"("date");
