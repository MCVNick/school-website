const pool = require("../utils/db");

const getResourceCards = async () => {
  const res = await pool.query("SELECT * FROM resource_cards");
  return res.rows;
};

const getResourceCard = async (id) => {
  const res = await pool.query("SELECT * FROM resource_cards WHERE id = $1", [
    id,
  ]);
  return res.rows[0];
};

const createResourceCard = async (args) => {
  const {
    title,
    description,
    internalLink,
    externalLink,
    externalLinkTitle,
    photo,
    iframe,
    type,
  } = args;
  const res = await pool.query(
    `INSERT INTO resource_cards (title, description, internalLink, externalLink, externalLinkTitle, photo, iframe, type)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    [
      title,
      description,
      internalLink,
      externalLink,
      externalLinkTitle,
      photo,
      iframe,
      type,
    ]
  );
  return res.rows[0];
};

module.exports = {
  getResourceCards,
  getResourceCard,
  createResourceCard,
};
