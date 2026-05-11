import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {

    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {

        token = req.headers.authorization.split(" ")[1];

        try {

            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET
            );

            req.user = decoded;

            next();

        } catch (error) {

            return res.status(401).json({
                message: "Token Failed",
            });

        }

    }

    if (!token) {
        return res.status(401).json({
            message: "No Token",
        });
    }
};

export const adminOnly = (req, res, next) => {

    if (req.user.role !== "admin") {

        return res.status(403).json({
            message: "Admin Access Only",
        });

    }

    next();
};