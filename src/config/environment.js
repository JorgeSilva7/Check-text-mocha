const enviornment = {
	PORT: process.env.PORT || 4000,
	MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/checktext-api",
};

export default enviornment;
