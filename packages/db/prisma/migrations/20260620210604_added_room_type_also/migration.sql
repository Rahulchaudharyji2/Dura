-- CreateEnum
CREATE TYPE "TypeofRoom" AS ENUM ('voice', 'chat', 'VideoRoom', 'gamingRoom');

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "typeofRoom" "TypeofRoom" NOT NULL DEFAULT 'chat';
