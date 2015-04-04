/*var __slice = [].slice;

GraviTeam._admin_user_exists = function() {
  return GraviTeam._admins.find().count() > 0;
};

GraviTeam.becomeAdmin = function() {
  return GraviTeam._call('make_admin', Meteor.userId(), function() {
    GraviTeam._subscribe_to_collections();
    return GraviTeam._go('Dashboard_page');
  });
};

GraviTeam._subscribe_to_collections = function() {
  if (GraviTeam._collections_sub != null) {
    GraviTeam._collections_sub.stop();
  }
  return GraviTeam._collections_sub = GraviTeam._subscribe('collections');
};

Handlebars.registerHelper('currentUserIsAdmin', function() {
  return GraviTeam._user_is_admin(Meteor.userId());
});

Handlebars.registerHelper('adminUserExists', GraviTeam._admin_user_exists);

if (GraviTeam._collections == null) {
  GraviTeam._collections = {};
}

GraviTeam._get_collection = function(collection_name) {
  GraviTeam._collections[collection_name] = Meteor.connection._mongo_livedata_collections[collection_name] || new Meteor.Collection(collection_name);
  return GraviTeam._collections[collection_name];
};

GraviTeam._session = function() {
  var key;
  key = GraviTeam._GraviTeamize(arguments[0]);
  if (arguments.length === 1) {
    return Session.get(key);
  } else if (arguments.length === 2) {
    return Session.set(key, arguments[1]);
  }
};

GraviTeam._call = function() {
  var args, name;
  name = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
  return Meteor.call.apply(Meteor, [GraviTeam._GraviTeamize(name)].concat(__slice.call(args)));
};

GraviTeam._nested_field_lookup = function(object, path) {
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
  if (typeof result !== 'object' || result instanceof Date) {
    return result;
  } else {
    return '';
  }
};

GraviTeam._convert_to_correct_type = function(field, val, collection) {
  var constructor, find_obj, sample_val;
  find_obj = {};
  find_obj[field] = {
    $exists: true
  };
  sample_val = GraviTeam._nested_field_lookup(collection.findOne(find_obj), field);
  constructor = sample_val.constructor;
  if (typeof sample_val === 'object') {
    return new constructor(val);
  } else if (typeof sample_val === 'boolean') {
    return val === 'true';
  } else {
    return constructor(val);
  }
};

GraviTeam._get_type = function(field, collection) {
  var find_obj, sample_val;
  find_obj = {};
  find_obj[field] = {
    $exists: true
  };
  sample_val = GraviTeam._nested_field_lookup(collection.findOne(find_obj), field);
  return typeof sample_val;
};*/