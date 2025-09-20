const pool = require("../utils/db");

const getAssignments = async () => {
  const res = await pool.query(
    'SELECT id, text, "order" FROM assignments WHERE "order" IS NOT NULL ORDER BY "order" ASC'
  );
  return res.rows;
};

module.exports = { getAssignments };
