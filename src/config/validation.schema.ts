import Joi from "joi";

export const validationSchema = Joi.object({
	// NODE_ENV must be a string, one of 'development', 'production', 'test'.
	// If not specified, defaults to 'development'.
	NODE_ENV: Joi.string()
		.valid("development", "production", "test")
		.default("development"),

	// PORT must be a number, defaults to 3000.
	PORT: Joi.number().default(3000),

	// All database variables are required.
	// If any of them is missing in .env, the application will not start.
	DB_HOST: Joi.string().required(),
	DB_PORT: Joi.number().required(),
	DB_USERNAME: Joi.string().required(),
	DB_PASSWORD: Joi.string().required(),
	DB_NAME: Joi.string().required(),

	// Secret key for JWT also required.
	JWT_SECRET: Joi.string().required(),
	JWT_EXPIRES_IN: Joi.string().required(),
});
