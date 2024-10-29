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


/* *****************************
* Return account data using email address
* ***************************** */
async function getAccountByEmail (account_email) {
  try {
    const result = await pool.query(
      'SELECT account_id, account_firstname, account_lastname, account_email, account_type, account_password FROM account WHERE account_email = $1',
      [account_email])
    return result.rows[0]
  } catch (error) {
    return new Error("No matching email found")
  }
}

// Get account By Id
const getAccountById = async (account_id) => {
  const result = await pool.query(
    'SELECT * FROM account WHERE account_id=$1',
    [account_id],
  );
  return result.rows[0];
};


const updateAccountInfo = async (firstName, lastName, email, account_id) => {
  try {
    const result = await pool.query(
      'UPDATE account SET account_firstname=$1, account_lastname=$2, account_email=$3 WHERE account_id=$4',
      [firstName, lastName, email, account_id],
    );
    return result;
  } catch (error) {
    throw new Error('An error occurred while updating your account information.');
  }
};



const updatePassword = async (account_password, account_id) => {
  try {
    const result = await pool.query(
      'UPDATE account SET account_password=$1 WHERE account_id=$2',
      [account_passwordpassword, account_id],
    );
    return result;
  } catch (error) {
    throw new Error('An error occurred while updating your password.');
  }
};

  module.exports = {registerAccount, checkExistingEmail, checkLoginData, getAccountByEmail, updateAccountInfo, updatePassword}