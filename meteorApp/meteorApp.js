if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });

  Template.login.events({
      'click #facebook-login': function(event) {
          Meteor.loginWithFacebook({}, function(err){
              if (err) {
                  throw new Meteor.Error("Facebook login failed");
              }
          });
      },

      'click #logout': function(event) {
          Meteor.logout(function(err){
              if (err) {
                  throw new Meteor.Error("Logout failed");
              }
          })
      }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function() {
    ServiceConfiguration.configurations.remove({
      service: "facebook"
    });
    ServiceConfiguration.configurations.insert({
      service: "facebook",
      appId: Meteor.settings.public.facebook.AppID,
      loginStyle: "popup",
      secret: Meteor.settings.facebook.AppSecret
    });
  })

  // Accounts.onCreateUser(function(options, user) {
  //     if (options.profile) {
  //         options.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
  //         user.profile = options.profile;
  //     }
  //     return user;
  // });
}
