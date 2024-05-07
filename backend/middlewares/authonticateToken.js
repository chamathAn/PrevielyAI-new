const { ClerkExpressRequireAuth } = require("@clerk/clerk-sdk-node");
const createError = require("../utils/error");
require("dotenv").config();

const public_key = process.env.CLERK_PUBLIC_KEY;

const authonticateToken = (req, res, next) => {
    ClerkExpressRequireAuth({
        audience: "previely-ai-new.vercel.app",
        authorizedParties: ["previely-ai-new.vercel.app"],
        jwtKey: public_key,
        onerror: (err) => {
            next(createError(401, err.message));
        },
    })(req, res, next); // Call the middleware function
};

module.exports = { authonticateToken };
