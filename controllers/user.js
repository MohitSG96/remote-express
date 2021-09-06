"use strict";

const debug = require("debug")("ibc-backend:models:user");
const User = require("../Models/User");
const tokenHelper = require("../helpers/tokenHelper");
const atob = require("atob");

exports.validateAuthCredentials = (req, res, next) => {
    req.getValidationResult().then((result) => {
        if (!result.isEmpty()) {
            result.useFirstErrorOnly();
            return res.status(400).json({
                error: true,
                errors: result.array(),
                data: [],
            });
        }
        next();
    });
};

async function createUser(name, email, password) {
    let user = new User({ name, email, password });
    return await user.save();
}

exports.signIn = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let name = req.body.name;
    debug("sign in called");

    // User.checkIfUserExists(email, "email").then(async (existingUser) => {
    //   if (!existingUser || !existingUser._id) {
    User.checkIfUserExists(email, "email").then(async (existingUser) => {
        if (!existingUser || !existingUser._id) {
            return createUser(name, email, password)
                .then((user) => {
                    const token = tokenHelper.sign({
                        id: user._id,
                        name: user.name || null,
                        phone: user.phone || null,
                        email: user.email,
                    });

                    return res.status(200).json({
                        error: false,
                        errors: [],
                        data: {
                            user: user,
                            token,
                        },
                    });
                })
                .catch((err) =>
                    res.status(400).json({
                        error: true,
                        errors: [err.message],
                        data: null,
                    })
                );
        }

        let isMatch = await existingUser.comparePassword(password);

        if (isMatch) {
            const token = tokenHelper.sign({
                id: existingUser._id,
                name: existingUser.name || null,
                phone: existingUser.phone || null,
                email: existingUser.email,
            });

            return res.status(200).json({
                error: false,
                errors: [],
                data: {
                    user: existingUser,
                    token,
                },
            });
        } else {
            return res.status(401).json({
                error: true,
                errors: [
                    {
                        param: "password",
                        msg: "Wrong password entered.",
                    },
                ],
                msg: "Incorrect password.",
            });
            // return done(null, false, { msg: 'Invalid username or password.' });
        }
    });
};
