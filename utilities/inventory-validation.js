const { check, validationResult, matchedData } = require('express-validator/check');

// Get all form fields
const getFormFields = () => {
  return [
    'inv_make',
    'inv_model',
    'inv_year',
    'inv_description',
    'inv_image',
    'inv_thumbnail',
    'inv_price',
    'inv_miles',
    'inv_color',
    'classification_id',
    'inv_id'
  ];
};

// Validation rules
const validationRules = () => {
  return [
    // Make is required
    check('inv_make').trim().notEmpty().withMessage('Please provide a make.'),

    // Model is required
    check('inv_model').trim().notEmpty().withMessage('Please provide a model.'),

    // Year is required
    check('inv_year').trim().notEmpty().withMessage('Please provide a year.'),

    // Description is required
    check('inv_description').trim().notEmpty().withMessage('Please provide a description.'),

    // Price is required and should be numeric
    check('inv_price').trim().notEmpty().isNumeric().withMessage('Please provide a valid price.'),

    // Miles is required
    check('inv_miles').trim().notEmpty().withMessage('Please provide the mileage.'),

    // Color is required
    check('inv_color').trim().notEmpty().withMessage('Please provide a color.'),

    // Classification is required
    check('classification_id').trim().notEmpty().withMessage('Please select a classification.'),

    // Inventory ID is required
    check('inv_id').trim().notEmpty().withMessage('Please provide a valid inventory ID.'),
  ];
};

// Check if the inventory data validation succeeded
const checkInventoryData = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  return next();
};

// Check if the update inventory data validation succeeded
const checkUpdateData = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Change the comment to reflect that errors will be directed back to the edit view
    return res.status(400).render('inventory/edit-inventory', {
      // Change the render view to the "edit" view for inventory items
      // Update the title: to be the same as the title when delivering the edit view in the inventory controller
      title: 'Edit Inventory Item',
      // Add the "inv_id" to the list of variables being sent back to the view in the data object
      inv_id: req.params.id,
      errors: errors.array()
    });
  }

  return next();
};

// Get validated and sanitized data from the form
const getSanitizedData = (req, res, next) => {
  const data = matchedData(req);
  return next(null, data);
};

module.exports = {
  getFormFields,
  validationRules,
  checkInventoryData,
  checkUpdateData,
  getSanitizedData
};