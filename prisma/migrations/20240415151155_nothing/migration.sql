-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DownLoadVerification" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "expiresAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "productId" TEXT NOT NULL,
    CONSTRAINT "DownLoadVerification_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_DownLoadVerification" ("createdAt", "expiresAt", "id", "productId") SELECT "createdAt", "expiresAt", "id", "productId" FROM "DownLoadVerification";
DROP TABLE "DownLoadVerification";
ALTER TABLE "new_DownLoadVerification" RENAME TO "DownLoadVerification";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
