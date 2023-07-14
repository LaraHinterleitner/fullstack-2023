-- CreateTable
CREATE TABLE "Users" (
    "userId" SERIAL PRIMARY KEY,
    "username" VARCHAR(191) NOT NULL,
    "password" VARCHAR(191) NOT NULL,
    "email" VARCHAR(191) NOT NULL,
    "paypal" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Groups" (
    "groupId" SERIAL PRIMARY KEY,
    "groupname" VARCHAR(191) NOT NULL
);

-- CreateTable
CREATE TABLE "UserInGroup" (
    "userGroupId" SERIAL PRIMARY KEY,
    "groupId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "UserTransaction" (
    "userTransactionId" SERIAL PRIMARY KEY,
    "transactionId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL
);

-- CreateTable
CREATE TABLE "Transactions" (
    "transactionId" SERIAL PRIMARY KEY,
    "groupId" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "payedBy" INTEGER NOT NULL,
    "comment" VARCHAR(191),
    "title" VARCHAR(191) NOT NULL,
    "createdAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- AddForeignKey
ALTER TABLE "UserInGroup" ADD CONSTRAINT "UserInGroup_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Groups"("groupId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserInGroup" ADD CONSTRAINT "UserInGroup_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTransaction" ADD CONSTRAINT "UserTransaction_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transactions"("transactionId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTransaction" ADD CONSTRAINT "UserTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Groups"("groupId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_payedBy_fkey" FOREIGN KEY ("payedBy") REFERENCES "Users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;