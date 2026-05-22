export function getEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Variável de ambiente obrigatória não definida: ${key}`);
  }
  return value;
}

export const env = {
  GEMINI_API_KEY: getEnv("GEMINI_API_KEY"),
  DATABASE_URL: getEnv("DATABASE_URL"),
  JWT_SECRET: getEnv("JWT_SECRET"),
  PORT: process.env.PORT || 3000,
};
