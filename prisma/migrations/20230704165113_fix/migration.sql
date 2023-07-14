-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "FkeyGroupToTransaction";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "FkeyPayerToTransaction";

-- DropForeignKey
ALTER TABLE "userInGroup" DROP CONSTRAINT "FkeyGroupToUser";

-- DropForeignKey
ALTER TABLE "userInGroup" DROP CONSTRAINT "FkeyUserToGroup";

-- DropForeignKey
ALTER TABLE "userTransaction" DROP CONSTRAINT "FkeyTransactionToUser";

-- DropForeignKey
ALTER TABLE "userTransaction" DROP CONSTRAINT "FkeyUsertToTransaction";

-- DropTable
DROP TABLE "Groups";

-- DropTable
DROP TABLE "Transactions";

-- DropTable
DROP TABLE "UserInGroup";

-- DropTable
DROP TABLE "UserTransaction";

-- DropTable
DROP TABLE "Users";

-- CreateTable
CREATE TABLE "groups" (
    "groupId" SERIAL PRIMARY KEY,
    "groupname" VARCHAR(191) NOT NULL
);

-- CreateTable
CREATE TABLE "transactions" (
    "transactionId" SERIAL PRIMARY KEY,
    "groupId" INTEGER NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "payedBy" INTEGER NOT NULL,
    "comment" VARCHAR(191),
    "createdAt" TIMESTAMPTZ NOT NULL,
    "title" VARCHAR(191) NOT NULL
);

-- CreateTable
CREATE TABLE "userInGroup" (
    "userInGroupId" SERIAL PRIMARY KEY,
    "userId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "userTransaction" (
    "userTransactionId" SERIAL PRIMARY KEY,
    "userId" INTEGER NOT NULL,
    "transactionId" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL
);

-- CreateTable
CREATE TABLE "users" (
    "userId" SERIAL PRIMARY KEY,
    "username" VARCHAR(191) NOT NULL,
    "password" VARCHAR(191) NOT NULL,
    "email" VARCHAR(191) NOT NULL,
    "paypal" BOOLEAN NOT NULL DEFAULT false
);

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "FkeyGroupToTransaction" FOREIGN KEY ("groupId") REFERENCES "groups"("groupId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "FkeyPayerToTransaction" FOREIGN KEY ("payedBy") REFERENCES "users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userInGroup" ADD CONSTRAINT "FkeyGroupToUser" FOREIGN KEY ("groupId") REFERENCES "groups"("groupId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userInGroup" ADD CONSTRAINT "FkeyUserToGroup" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userTransaction" ADD CONSTRAINT "FkeyTransactionToUser" FOREIGN KEY ("transactionId") REFERENCES "transactions"("transactionId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userTransaction" ADD CONSTRAINT "FkeyUsertToTransaction" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;