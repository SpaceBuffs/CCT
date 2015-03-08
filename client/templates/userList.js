"use strict"


Template.userList.events({
  'click .name': manageRolesClicked,
  'click .roles': manageRolesClicked
})

Template.userList.helpers({
  users: function () {
    return Meteor.users.find()
  },
  emailAddress: function () {
    var emails = this.emails

    if (emails && emails.length > 0) {
      return emails[0].address
    }

    return ""
  }
})

function manageRolesClicked (evt) {
  var $person,
      userId

  evt.preventDefault()

  $person = $(evt.target).closest('.person')
  userId = $person.attr('data-id')
  Session.set('selectedUserId', userId)
  $('#user-roles').modal()
}