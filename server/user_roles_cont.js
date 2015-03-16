/*Meteor.methods({
// addUsersToRoles(users, roles, [group]) { };
// Add users to roles. Will create roles as needed.

user = Meteor.user(username);
Roles.addUsersToRoles(user, ['Chris','staff']);
// user.roles = ['admin','staff']

Roles.addUsersToRoles(user, ['Chris','Some Title'], 'SpaceBuffs');
// user.roles = {
//   'SpaceBuffs': ['admin','Some Title']
// }

// setUserRoles(users, roles, [group]) { };
// Set a users roles/permissions.

//user = Meteor.user();
Roles.setUserRoles(user, 'Chris');

// Prevent non-authorized users from creating new users:
Accounts.validateNewUser(function (user) {
  var loggedInUser = Meteor.user();

  if (Roles.userIsInRole(loggedInUser, 'Chris')) {
    return true;
  }

  throw new Meteor.Error(403, "Not authorized to create new users");
  });

// createRole(role) { };
// Whitespace will be trimmed.

Roles.createRole('Chris');

// deleteRole(role) { };
// Will throw "Role in use" error
// if any users are currently assigned to the target role

//Roles.deleteRole('admin'); 

// getAllRoles() { };
// Retrieve set of all existing roles.

roles = Roles.getAllRoles();

// getRolesForUser(user, [group]) { };
// Retrieve user roles

//user = Meteor.user();
roles = Roles.getRolesForUser(user);

// getUsersInRole(role, [group]) { };
// Retrieve all users who are in target role.
// This is an expensive query

//users = Roles.getUsersInRole('admin');

// removeUsersFromRoles(users, roles, [group]) { };
// Remove users from roles

users = Meteor.users.find({state: 'inactive'});
Roles.removeUsersFromRoles(users, 'Chris');
});
*/