/**
* Templates
*/

Template.test.events({
  'click a[target=_blank]': function (event) {
    event.preventDefault();
    window.open(event.target.href, '_blank');
  }
});
