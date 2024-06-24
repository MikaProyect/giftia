import clientDB from "../db.js";

export const m_updateUser = async (id, username, email) => {
  console.log(id, username, email)
  let editQuery = ''
  if (username) {
    editQuery += `raw_user_meta_data = jsonb_set(raw_user_meta_data, '{display_name}', '"${username}"'), `
  }
  if (email) {
    editQuery += `email = '${email}', `
  }
  editQuery = editQuery.slice(0, -2);

  const query = `
    UPDATE auth.users 
    SET
      ${editQuery}
    WHERE
      id = '${id}';
  `;
  console.log(query)
  try {
    const res = await clientDB.query(query);
    console.log(res)
    return JSON.parse(JSON.stringify(res.rows));
  } catch (error) {
    throw error;
  }
};
