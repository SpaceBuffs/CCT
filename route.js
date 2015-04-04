/*



*/
Router.configure({    
   timelineTemplate: 'timeline',
   profileTemplate: 'profile',
   whiteboardTemplate: 'whiteboard',
   chatTemplate: 'chat',
   notFoundTemplate: 'notFound',
   loadingTemplate: 'loading',
   model3dTemplate: 'model3d',
   activityTemplate: 'aed_activity',
   profileEditTemplate: 'profileEdit'

});

Router.map(function() {

   this.route('home', {path: '/'} );
   //this.route('Dashboard_page', {path: '/dashboard'} );

   // menus 
   this.route('my profile', { 
           path: '/profile',        
           template: 'profile'    
   });
 
   this.route('Whiteboard', { 
           path: '/whiteboard',        
           template: 'whiteboard',    
   });
  
   this.route('Chat', { 
           path: '/chat',        
           template: 'chat',    
   });

   this.route('3D Model', { 
           path: '/model3d',        
           template: 'model3d',    
   });

  this.route('Timeline Event', { 
           path: '/timeline',        
           template: 'timeline'    
   });
  this.route('Activity', { 
           path: '/activity',        
           template: 'aedactivity'    
   });
    this.route('Edit Profile',{
            path: '/edit_profile',
            template: 'editprofile',
    });
  

});

var requireLogin = function() { 
  if (! Meteor.user() ||  !Meteor.user().roles.admins) {
   // If user is not logged in render home
   this.render('home');
 }//else if (!Meteor.user().roles.admins){
  //this.render('_blank');
//}
else {
   //if user is logged in render whatever route was requested
   this.next(); 
 }
}
// Before any routing run the requireLogin function. 
// Except in the case of "home". 
// Note that you can add more pages in the exceptions if you want. (e.g. timeline, chat ...) 
Router.onBeforeAction(requireLogin, {except: ['home']});

/*var setup_collection;

setup_collection = function(collection_name) {
  var e, inspector_name, subscription_name;
  subscription_name = "admin_" + collection_name;
  inspector_name = "inspector_" + collection_name;
  if (!window[inspector_name]) {
    try {
      window[inspector_name] = new Meteor.Collection(collection_name);
    } catch (_error) {
      e = _error;
      window[inspector_name] = Meteor._LocalCollectionDriver.collections[collection_name];
    }
  }
  Meteor.subscribe(subscription_name);
  Session.set("collection_name", collection_name);
  return window[inspector_name];
};

Template.db_view.helpers({
  collections: function() {
    return Session.get("collections");
  }
});

Meteor.Router.add({
  '/admin': function() {
    Session.set("collections", Collections.find().fetch());
    return 'db_view';
  },
  '/admin/login': 'admin_login',
  '/admin/:collection': function(collection_name) {
    var collection;
    collection = setup_collection(collection_name);
    return 'collection_view';
  },
  '/admin/:collection/:document': function(collection_name, document_id) {
    var collection;
    collection = setup_collection(collection_name);
    Session.set('document_id', document_id);
    return 'document_view';
  }
});

Meteor.Router.filters({
  'isAdmin': function(page) {
    var _ref;
    if ((_ref = Meteor.user()) != null ? _ref.profile.admin : void 0) {
      return page;
    } else {
      return 'admin_login';
    }
  }
});

Meteor.Router.filter('isAdmin', {
  only: ['db_view', 'collection_view', 'document_view']
});

window.get_fields = function(documents) {
  var document, find_fields, key, key_to_type, value, _i, _len, _results;
  key_to_type = {
    _id: 'ObjectId'
  };
  find_fields = function(document, prefix) {
    var full_path_key, key, value, _ref, _results;
    if (prefix == null) {
      prefix = '';
    }
    _ref = _.omit(document, '_id');
    _results = [];
    for (key in _ref) {
      value = _ref[key];
      if (typeof value === 'object') {
        _results.push(find_fields(value, "" + prefix + key + "."));
      } else if (typeof value !== 'function') {
        full_path_key = "" + prefix + key;
        _results.push(key_to_type[full_path_key] = typeof value);
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };
  for (_i = 0, _len = documents.length; _i < _len; _i++) {
    document = documents[_i];
    find_fields(document);
  }
  _results = [];
  for (key in key_to_type) {
    value = key_to_type[key];
    _results.push({
      name: key,
      type: value
    });
  }
  return _results;
};

window.lookup = function(object, path) {
  var part, result, _i, _len, _ref;
  if (object == null) {
    return '';
  }
  if (path === '_id' && typeof object._id === 'object') {
    return object._id._str;
  }
  result = object;
  _ref = path.split(".");
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    part = _ref[_i];
    result = result[part];
    if (result == null) {
      return '';
    }
  }
  if (typeof result !== 'object') {
    return result;
  } else {
    return '';
  }
};
*/  

