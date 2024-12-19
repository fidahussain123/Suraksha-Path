// API configuration
export const API_CONFIG = {
  GROQ_API_KEY: import.meta.env.VITE_GROQ_API_KEY || "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",
  GROQ_API_URL: "https://api.groq.com/v1/chat/completions",
  MODEL: "mixtral-8x7b-32768"
} as const;