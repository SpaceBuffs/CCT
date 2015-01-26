/*
Collaborative Campaign Tool
GRAVITEAM by SPACEBUFFS

Chris Acuna, Heather Dykstra, Sierra Flynn, Semere Ghebrecristos, Hope Sanford, Josh Weaver

global.js is the file where we keep track of our collections

Version 2.02
1/25/2015
*/

UserAccounts = new Mongo.Collection('user');

// activities
Activities = new Mongo.Collection("activities");

if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    activities: function () {
      return Activities.find({});
    }
  });
}

//window.load = function() {
//  var div1 = document.getElementById('app_window').innerHTML;
//  var div2 = "There's the div 2 contents!";
//  var div3 = "There's the div 3 contents!";

// document.getElementById('div1').onclick = function() {
//   document.getElementById('app_window').innerHTML = div1;
// }
// document.getElementById('div2').onclick = function() {
//   document.getElementById('app_window').innerHTML = div2;
// }
// document.getElementById('div3').onclick = function() {
//   document.getElementById('app_window').innerHTML = div3;
// }
//}

//--------------------------------------------------------------
