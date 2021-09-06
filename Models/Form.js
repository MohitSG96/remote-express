const mongoose = require("mongoose");

const FormSchema = new mongoose.Schema(
    {
        company_name: { type: String, default: null },
        company_email: { type: String, default: null },
        phone: { type: String, default: null },
        address: { type: String, default: null },
        message: { type: String, default: null },
        designation: { type: String, default: null },
        created_by: { type: mongoose.Schema.Types.ObjectId, default: null },
    },
    { timestamps: true }
);
FormSchema.statics.getFormsCreatedBy = (userId) => {
    return Form.find({ created_by: userId })
        .sort({ comoany_name: 1 })
        .then((result) => {
            return result;
        })
        .catch((err) => {
            throw err;
        });
};

const Form = (module.exports = mongoose.model("Form", FormSchema));
