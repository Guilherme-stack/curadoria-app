-- CreateTable
CREATE TABLE "fragmentos" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "tags" TEXT[],
    "fonte" TEXT DEFAULT '',
    "insight" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "fragmentos_pkey" PRIMARY KEY ("id")
);
