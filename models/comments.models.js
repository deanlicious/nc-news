const db = require("../db/connection");

exports.removeComment = (comment_id) => {
  return db
    .query(
      `
DELETE FROM
    comments 
WHERE 
    comment_id = $1
RETURNING comment_id
    `,
      [comment_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "comment_id given does not exist",
        });
      }
    });
};
