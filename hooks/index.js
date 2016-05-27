var _ = require('lodash');

function isIgnored(request) {
  var data = request.pre.processed;
  var userId;
  if (request.auth.isAuthenticated) { userId = request.auth.credentials.id; }
  var userIds = _.map(data.posts, function(post) { return post.user.id; });

  return request.db.ignoreUsers.isIgnored(userId, userIds)
  .then(function(ignoredUsers) {
    _.map(ignoredUsers, function(ignoredUser) {
      _.map(data.posts, function(post) {
        if (post.user.id === ignoredUser.ignored_user_id) {
          post.user.ignored = true;
          post.user._ignored = true;
        }
      });
    });
  });
}


module.exports = [
  { path: 'posts.byThread.post', method: isIgnored }
];
