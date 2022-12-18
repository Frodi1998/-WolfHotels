/*
  Warnings:

  - A unique constraint covering the columns `[command]` on the table `Answer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[alias]` on the table `Question` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Answer_command_key" ON "Answer"("command");

-- CreateIndex
CREATE UNIQUE INDEX "Question_alias_key" ON "Question"("alias");
