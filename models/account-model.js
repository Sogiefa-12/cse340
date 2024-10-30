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

async function checkLoginData(account_email, account_password) {
  let results

  try {
    const accountData = await getAccountByEmail(account_email);

    if (accountData) {
      results = await bcrypt.compare(account_password, accountData.account_password);
      if (results) {
        return accountData;
      }
    }
  } catch (error) {
    console.error(error);
    return null;
  }
  return null;
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
      [account_password, account_id],
    );
    return result;
  } catch (error) {
    throw new Error('An error occurred while updating your password.');
  }
};

  module.exports = {registerAccount, checkExistingEmail, checkLoginData, getAccountByEmail, getAccountById, updateAccountInfo, updatePassword}



// const pool = require("../database");

// /* *****************************
// *   Register new account
// * *************************** */
// async function registerAccount(account_firstname, account_lastname, account_email, account_password) {
//   console.log("[registerAccount] Function started");

//   try {
//     const sql = "INSERT INTO account (account_firstname, account_lastname, account_email, account_password, account_type) VALUES ($1, $2, $3, $4, 'Client') RETURNING *";
//     console.log("[registerAccount] SQL query: " + sql);
//     const result = await pool.query(sql, [account_firstname, account_lastname, account_email, account_password]);
//     console.log("[registerAccount] Query executed");

//     return result;
//   } catch (error) {
//     console.error("[registerAccount] Error occurred: " + error.message);
//     return error.message;
//   } finally {
//     console.log("[registerAccount] Function ended");
//   }
// }


// /* **********************
//  *   Check for existing email
//  * ********************* */
// async function checkExistingEmail(account_email) {
//   console.log("[checkExistingEmail] Function started");

//   try {
//     const sql = "SELECT * FROM account WHERE account_email = $1";
//     const email = await pool.query(sql, [account_email]);
//     console.log("[checkExistingEmail] Query executed");

//     return email.rowCount;
//   } catch (error) {
//     console.error("[checkExistingEmail] Error occurred: " + error.message);
//     return error.message;
//   } finally {
//     console.log("[checkExistingEmail] Function ended");
//   }
// }


// async function checkLoginData(account_email, account_password) {
//   console.log("[checkLoginData] Function started");
//   let results;

//   try {
//     const accountData = await getAccountByEmail(account_email);

//     if (accountData) {
//       results = await bcrypt.compare(account_password, accountData.account_password);
//       console.log("[checkLoginData] Password comparison completed");
//       if (results) {
//         console.log("[checkLoginData] Valid credentials");
//         return accountData;
//       }
//     }
//   } catch (error) {
//     console.error("[checkLoginData] Error occurred: " + error.message);
//     return null;
//   } finally {
//     console.log("[checkLoginData] Function ended");
//   }
//   return null;
// }


// /* *****************************
// * Return account data using email address
// * ***************************** */
// async function getAccountByEmail(account_email) {
//   console.log("[getAccountByEmail] Function started");

//   try {
//     const result = await pool.query(
//       'SELECT account_id, account_firstname, account_lastname, account_email, account_type, account_password FROM account WHERE account_email = $1',
//       [account_email]
//     );
//     console.log("[getAccountByEmail] Query executed");

//     return result.rows[0];
//   } catch (error) {
//     console.error("[getAccountByEmail] Error occurred: " + error.message);
//     return new Error("No matching email found");
//   } finally {
//     console.log("[getAccountByEmail] Function ended");
//   }
// }


// // Get account By Id
// const getAccountById = async (account_id) => {
//   console.log("[getAccountById] Function started");

//   const result = await pool.query(
//     'SELECT * FROM account WHERE account_id=$1',
//     [account_id]
//   );
//   console.log("[getAccountById] Query executed");
// return result.rows[0];
// };
// const updateAccountInfo = async (firstName, lastName, email, account_id) => {
// console.log("[updateAccountInfo] Function started");
// try {
// const result = await pool.query(
// 'UPDATE account SET account_firstname=$1, account_lastname=$2, account_email=$3 WHERE account_id=$4',
// [firstName, lastName, email, account_id]
// );
// console.log("[updateAccountInfo] Query executed");
// return result;
// } catch (error) {
// console.error("[updateAccountInfo] Error occurred: " + error.message);
// throw new Error('An error occurred while updating your account information.');
// } finally {
// console.log("[updateAccountInfo] Function ended");
// }
// };
// const updatePassword = async (account_password, account_id) => {
// console.log("[updatePassword] Function started");
// try {
// const result = await pool.query(
// 'UPDATE account SET account_password=$1 WHERE account_id=$2',
// [account_password, account_id]
// );
// console.log("[updatePassword] Query executed");
// return result;
// } catch (error) {
// console.error("[updatePassword] Error occurred: " + error.message);
// throw new Error('An error occurred while updating your password.');
// } finally {
// console.log("[updatePassword] Function ended");
// }
// };
// module.exports = {
// registerAccount,
// checkExistingEmail,
// checkLoginData,
// getAccountByEmail,
// getAccountById,
// updateAccountInfo,
// updatePassword
// };
