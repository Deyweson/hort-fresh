-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user_info" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "street" TEXT,
    "number" INTEGER,
    "city" TEXT,
    "state" TEXT,
    "zip_code" INTEGER,
    "phone" TEXT,
    "verify" BOOLEAN DEFAULT false,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "user_info_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_user_info" ("city", "id", "number", "phone", "state", "street", "user_id", "verify", "zip_code") SELECT "city", "id", "number", "phone", "state", "street", "user_id", "verify", "zip_code" FROM "user_info";
DROP TABLE "user_info";
ALTER TABLE "new_user_info" RENAME TO "user_info";
CREATE UNIQUE INDEX "user_info_user_id_key" ON "user_info"("user_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
