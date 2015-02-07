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
  user.meta_information = params.meta_information;
  return user;
});
