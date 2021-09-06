"use strict";

const debug = require("debug")("ibc-backend:models:user");
const Form = require("../Models/Form");
const configConsts = require("../config/constants");
const moment = require("moment");
const bcrypt = require("bcrypt");

// Create
exports.addForm = async (req, res) => {
    console.log("req.body data full", req.body);

    try {
        var formData = new Form({ ...req.body, created_by: req.user.id });

        console.log("Form Data", formData);

        const result = await formData.save();
        console.log("result", result);
        return res.status(200).json({
            error: false,
            errors: [],
            data: {
                msg: "Saved!!",
                form: [result],
            },
        });
    } catch (err) {
        return res.status(400).json({
            error: true,
            errors: [err],
            data: {
                msg: "Form is not created!",
            },
        });
    }
};
exports.getUserForm = async (req, res) => {
    var userId = req.user.id;
    const userFormList = await Form.getFormsCreatedBy(userId);
    res.send({
        error: false,
        errors: [],
        data: userFormList,
    });
};
