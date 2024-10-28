const pool = require("../database");


/* *****************************
*   Register new account
* *************************** */
async function registerAccount(account_firstname, account_lastname, account_email, account_password){
    try {
      const sql = "INSERT INTO account (account_firstname, account_lastname, account_email, account_password, account_type) VALUES ($1, $2, $3, $4, 'Client') RETURNING *"
      console.log('SQL query:' + sql);
      return await pool.query(sql, [account_firstname, account_lastname, account_email, account_password])
    } catch (error) {
      return error.message
    }
  }



/* **********************
 *   Check for existing email
 * ********************* */
async function checkExistingEmail(account_email){
  try {
    const sql = "SELECT * FROM account WHERE account_email = $1"
    const email = await pool.query(sql, [account_email])
    return email.rowCount
  } catch (error) {
    return error.message
  }
}

async function checkLoginData (account_email, account_password)  {
  let results
  try {
    results = await Account.findOne({
      where: {
        account_email,
        account_password
      }
    })
  } catch (error) {
    console.error(error)
    return null
  }
  if (results) {
    return results
  } else {
    return null
  }
}



  module.exports = {registerAccount, checkExistingEmail, checkLoginData}