const { check, validationResult } = require('express-validator')

const createError = require('http-errors');
const User = require('../../models/userModel');


const addUserValidators = [
    check("name")
        .isLength({ min: 1 })
        .withMessage('name is required')
     
        .trim(),


    check("email")
        .isEmail()
        .withMessage('invalid email')
        .trim()
        .custom(async (value) => {
            try {
                const user = await User.findOne({ email: value });
                if (user) {
                    throw new Error('Email already exists');
                }
            } catch (err) {
                throw createError(err.message)

            }
        })


]


const addUserValidationHandlers = function (req, res, next) {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped()
    if (Object.keys(mappedErrors).length === 0) {
        next()
    }
    else {
        res.status(400).json({
            errors: mappedErrors,
        })
    }


}

module.exports = {
    addUserValidators,
    addUserValidationHandlers,
}