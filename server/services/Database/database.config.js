const { DB_URL } = process.env;
export const DATABASE_URL =
  `${DB_URL}/profiler` || "mongodb://localhost:27017/profiler";
