const pool = require("../database/");

/* ***************************
 *  Get all classification data
 * ************************** */
// const getClassifications = async () => {
//   return await pool.query("SELECT * FROM public.classification ORDER BY classification_name");
// };

const getClassifications = async () => {
  const { rows } = await pool.query("SELECT * FROM public.classification ORDER BY classification_name");
  return rows;
};

/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
const getInventoryByClassificationId = async (classification_id) => {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i
      JOIN public.classification AS c
      ON i.classification_id = c.classification_id
      WHERE i.classification_id = $1`,
      [classification_id]
    );
    return data.rows;
  } catch (error) {}
};

const getVehicleDetail = async (inventoryId) => {
  const sql = 'SELECT inv_id, inv_make, inv_model, inv_year, inv_price,  inv_miles, inv_image, inv_description FROM inventory WHERE inv_id=$1';
  const result = await pool.query(sql, [inventoryId]);

  if (result.rows.length === 0) {
    throw new Error('No vehicle found with the provided ID.');
  }

  return result.rows[0];
};

const getVehiclesByType = async (typeId) => {
  try {
    const sql = 'SELECT inv_id, inv_make, inv_model, inv_year, inv_price, inv_miles, inv_image, inv_description FROM inventory WHERE inv_id=$1';
    const result = await pool.query(sql, [typeId]);
    return result.rows;
  } catch (error) {
    console.error(error);
  }
};


const addClassification = async (classification) => {
  // Check if classification_name is null or empty
  if (classification.classification_name === null || classification.classification_name.trim() === "") {
    return false;  // Return false if the value is null or empty
  }

  return await pool.query(
    `INSERT INTO public.classification (classification_name) VALUES ($1)`,
    [classification.classification_name]
  );
};


const addInventoryItem = async (inventoryItem) => {
  return await pool.query(
    `INSERT INTO public.inventory (
        classification_id,
        inv_make,
        inv_model,
        inv_year,
        inv_image,
        inv_price,
        inv_color,
        inv_miles,
        inv_description
    ) VALUES (
        ${inventoryItem.classification_id},
        ${inventoryItem.inv_make},
        ${inventoryItem.inv_model},
        ${inventoryItem.inv_year},
        ${inventoryItem.inv_image},
        ${inventoryItem.inv_price},
        ${inventoryItem.inv_color},
        ${inventoryItem.miles},
        ${inventoryItem.description}
    )`
  );
};

/* ***************************
 *  Update Inventory Data
 * ************************** */
async function updateInventory(
  inv_id,
  inv_make,
  inv_model,
  inv_description,
  inv_image,
  inv_thumbnail,
  inv_price,
  inv_year,
  inv_miles,
  inv_color,
  classification_id
) {
  try {
    const sql =
      "UPDATE public.inventory SET inv_make = $1, inv_model = $2, inv_description = $3, inv_image = $4, inv_thumbnail = $5, inv_price = $6, inv_year = $7, inv_miles = $8, inv_color = $9, classification_id = $10 WHERE inv_id = $11 RETURNING *"
    const data = await pool.query(sql, [
      inv_make,
      inv_model,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_year,
      inv_miles,
      inv_color,
      classification_id,
      inv_id
    ])
    return data.rows[0]
  } catch (error) {
    console.error("model error: " + error)
  }
}

module.exports = {
  getClassifications,
  getInventoryByClassificationId,
  getVehicleDetail,
  getVehiclesByType,
  addInventoryItem,
  addClassification,
  updateInventory
};