export const configuration = () => ({
	env: process.env.NODE_ENV,
	port: parseInt(process.env.PORT ?? "", 10) || 3000,

	database: {
		host: process.env.DB_HOST,
		port: parseInt(process.env.DB_PORT ?? "", 10) || 5432,
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
	},

	jwt: {
		secret: process.env.JWT_SECRET,
		expiresIn: process.env.JWT_EXPIRES_IN,
	},
});

export type AppConfig = ReturnType<typeof configuration>;
