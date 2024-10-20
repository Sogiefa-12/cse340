const pool = require("../database/")

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications(){
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}

/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      JOIN public.classification AS c 
      ON i.classification_id = c.classification_id 
      WHERE i.classification_id = $1`,
      [classification_id]
    )
    return data.rows
  } catch (error) {
    console.error("getclassificationsbyid error " + error)
  }
}

function getInventoryDetail(id) {
  const result = pool.query(`SELECT * FROM public.inventory`);
  const inventory = result.rows;
  const filteredInventory = inventory.filter(item => item.inv_id === id);
  if (filteredInventory.length > 0) {
    return filteredInventory[0];
  } else {
    return null;
  }
}



module.exports = {getClassifications, getInventoryByClassificationId, getInventoryDetail}





