const pool = require("../utils/db");

const getAnnouncements = async () => {
  const res = await pool.query(
    'SELECT id, text, "order" FROM announcements WHERE "order" IS NOT NULL ORDER BY "order" ASC'
  );
  return res.rows;
};

module.exports = { getAnnouncements };
