/*
  Warnings:

  - You are about to drop the column `members_count` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the `_GroupToUser` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Group` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `owner_id` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_GroupToUser" DROP CONSTRAINT "_GroupToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_GroupToUser" DROP CONSTRAINT "_GroupToUser_B_fkey";

-- AlterTable
ALTER TABLE "Group" DROP COLUMN "members_count",
ADD COLUMN     "owner_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "_GroupToUser";

-- CreateTable
CREATE TABLE "_group_members" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_group_members_AB_unique" ON "_group_members"("A", "B");

-- CreateIndex
CREATE INDEX "_group_members_B_index" ON "_group_members"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Group_slug_key" ON "Group"("slug");

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_group_members" ADD CONSTRAINT "_group_members_A_fkey" FOREIGN KEY ("A") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_group_members" ADD CONSTRAINT "_group_members_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
