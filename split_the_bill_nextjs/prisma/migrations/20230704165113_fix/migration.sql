/*
  Warnings:

  - You are about to drop the `Groups` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Transactions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserInGroup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserTransaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Transactions` DROP FOREIGN KEY `Transactions_groupId_fkey`;

-- DropForeignKey
ALTER TABLE `Transactions` DROP FOREIGN KEY `Transactions_payedBy_fkey`;

-- DropForeignKey
ALTER TABLE `UserInGroup` DROP FOREIGN KEY `UserInGroup_groupId_fkey`;

-- DropForeignKey
ALTER TABLE `UserInGroup` DROP FOREIGN KEY `UserInGroup_userId_fkey`;

-- DropForeignKey
ALTER TABLE `UserTransaction` DROP FOREIGN KEY `UserTransaction_transactionId_fkey`;

-- DropForeignKey
ALTER TABLE `UserTransaction` DROP FOREIGN KEY `UserTransaction_userId_fkey`;

-- DropTable
DROP TABLE `Groups`;

-- DropTable
DROP TABLE `Transactions`;

-- DropTable
DROP TABLE `UserInGroup`;

-- DropTable
DROP TABLE `UserTransaction`;

-- DropTable
DROP TABLE `Users`;

-- CreateTable
CREATE TABLE `groups` (
    `groupId` INTEGER NOT NULL AUTO_INCREMENT,
    `groupname` VARCHAR(191) NOT NULL,

    INDEX `groupname_index`(`groupname`),
    PRIMARY KEY (`groupId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transactions` (
    `transactionId` INTEGER NOT NULL AUTO_INCREMENT,
    `groupId` INTEGER NOT NULL,
    `total` DOUBLE NOT NULL,
    `payedBy` INTEGER NOT NULL,
    `comment` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL,
    `title` VARCHAR(191) NOT NULL,

    INDEX `transactions_date_index`(`createdAt`),
    INDEX `transactions_group_index`(`groupId`),
    INDEX `transactions_payer_index`(`payedBy`),
    PRIMARY KEY (`transactionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `userInGroup` (
    `userInGroupId` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `groupId` INTEGER NOT NULL,

    INDEX `userInGroupGroup`(`groupId`),
    INDEX `userInGroupUser`(`userId`),
    PRIMARY KEY (`userInGroupId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `userTransaction` (
    `userTransactionId` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `transactionId` INTEGER NOT NULL,
    `amount` DOUBLE NOT NULL,

    INDEX `usertransaction_transactionindex`(`transactionId`),
    INDEX `usertransaction_userindex`(`userId`),
    PRIMARY KEY (`userTransactionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `userId` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `paypal` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `users_username_key`(`username`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `FkeyGroupToTransaction	` FOREIGN KEY (`groupId`) REFERENCES `groups`(`groupId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `FkeyPayerToTransaction` FOREIGN KEY (`payedBy`) REFERENCES `users`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `userInGroup` ADD CONSTRAINT `FkeyGroupToUser` FOREIGN KEY (`groupId`) REFERENCES `groups`(`groupId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `userInGroup` ADD CONSTRAINT `FkeyUserToGroup	` FOREIGN KEY (`userId`) REFERENCES `users`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `userTransaction` ADD CONSTRAINT `FkeyTransactionToUser` FOREIGN KEY (`transactionId`) REFERENCES `transactions`(`transactionId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `userTransaction` ADD CONSTRAINT `FkeyUsertToTransaction` FOREIGN KEY (`userId`) REFERENCES `users`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
