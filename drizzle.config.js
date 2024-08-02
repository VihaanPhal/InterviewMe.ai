/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:0jYakQVTJmh5@ep-nameless-base-a5eqfqt0.us-east-2.aws.neon.tech/InterviewMe.ai?sslmode=require",
  },
};
