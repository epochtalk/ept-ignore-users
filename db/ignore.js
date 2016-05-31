var path = require('path');
var dbc = require(path.normalize(__dirname + '/db'));
var db = dbc.db;
var helper = dbc.helper;

module.exports = function(userId, ignoreUserId) {
  userId = helper.deslugify(userId);
  ignoreUserId = helper.deslugify(ignoreUserId);
  var q = 'INSERT INTO users.ignored (user_id, ignored_user_id, created_at) VALUES ($1, $2, now())';
  return db.sqlQuery(q, [userId, ignoreUserId])
  .then(function() { return; });
};
