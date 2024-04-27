-- CreateTable
CREATE TABLE "user_info" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "street" TEXT,
    "number" INTEGER,
    "city" TEXT,
    "state" TEXT,
    "zip_code" INTEGER,
    "phone" TEXT,
    "verify" BOOLEAN,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "user_info_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "user_info_user_id_key" ON "user_info"("user_id");
