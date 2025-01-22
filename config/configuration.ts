export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    /**
     * with this option enable,every model register in forFeature() will auto added to models:[]
     */
    autoLoadModels: true,
    synchronize: true,
  },
});
