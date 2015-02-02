Meteor.methods({
  'user-auth:register': function(params) {
    console.log('Trying to create user with : ', params);
    Accounts.createUser({
      username: params.username,
      email: params.email,
      password: params.password,
      meta_information: params.meta_information
    });

    // TODO: Seems really unsafe, StackOverflow pls ?
    return { email: params.email, password: params.password };
  }
});
