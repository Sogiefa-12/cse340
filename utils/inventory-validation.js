module.exports = {
    validateInventory: async function (data) {
    if (data.inv_make.length < 1) {
    return { errors: { inv_make: "Make is required" } };
    }
    if (data.inv_model.length < 1) {
        return { errors: { inv_model: "Model is required" } };
    }
    if (data.inv_type.length < 1) {
        return { errors: { inv_type: "Type is required" } };
        }
    if (data.inv_price === "") {
        return { errors: { inv_price: "Price is required" } };
        }
    if (data.inv_avail.length < 1) {
        return { errors: { inv_avail: "Availability is required" } };
    }
    if (data.inv_start_date.length < 1) {
        return { errors: { inv_start_date: "Start date is required" } };
    }
    if (data.inv_end_date.length < 1) {
        return { errors: { inv_end_date: "End date is required" } };
    }
    return {};
},
validateNewInventory: async function (body) {
    let errors = {};
    if (!body.inv_make) {
    errors.inv_make = "Make is required";
    }
    if (!body.inv_model) {
        errors.inv_model = "Model is required";
    }
    if (!body.inv_type) {
    errors.inv_type = "Type is required";
    }
    if (body.inv_price === "") {
        errors.inv_start_date = "Start date is required";
}
if (!body.inv_end_date) {
errors.inv_end_date = "End date is required";
}
return errors;
}
};
