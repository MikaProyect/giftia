import clientDB from "../db.js";

export const m_getData = async () => {
  const query = `
    SELECT
      rys.*, us.raw_user_meta_data->>'display_name' as user
    FROM
      rys
      INNER JOIN auth.users AS us ON rys.user_id = us.id
    WHERE
      rys.is_deleted = false;
  `;
  try {
    const res = await clientDB.query(query);
    return JSON.parse(JSON.stringify(res.rows));
  } catch (error) {
    throw error;
  }
};

export const m_getDataByUser = async (id) => {
  console.log(id)
  const query = `
    SELECT
      rys.*, us.raw_user_meta_data->>'display_name' as user
    FROM
      rys
      INNER JOIN auth.users AS us ON rys.user_id = us.id
    WHERE
      rys.user_id = '${id}';
  `;
  try {
    const res = await clientDB.query(query);
    return JSON.parse(JSON.stringify(res.rows));
  } catch (error) {
    throw error;
  }
};
