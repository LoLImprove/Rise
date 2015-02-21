Meteor.methods({
  'user-auth:register': function(params) {
    console.log('Trying to create user with : ', params);
    Accounts.createUser({
      username: params.username,
      email: params.email,
      password: params.password
    });

    // TODO: AAAAAAH ! Seems really unsafe, StackOverflow pls ?
    return { email: params.email, password: params.password };
  }
});

Accounts.onCreateUser(function(params, user) {
  // TODO : Fix everything wrong with this
  user.meta_information = { league : 'Gold V' };
  return user;
});
