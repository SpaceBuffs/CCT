var __slice = [].slice;

Graviteam._admin_user_exists = function() {
  return Graviteam._admins.find().count() > 0;
};

Graviteam.becomeAdmin = function() {
  return Graviteam._call('make_admin', Meteor.userId(), function() {
    Graviteam._subscribe_to_collections();
    return Graviteam._go('Dashboard_page');
  });
};

Graviteam._subscribe_to_collections = function() {
  if (Graviteam._collections_sub != null) {
    Graviteam._collections_sub.stop();
  }
  return Graviteam._collections_sub = Graviteam._subscribe('collections');
};

Handlebars.registerHelper('currentUserIsAdmin', function() {
  return Graviteam._user_is_admin(Meteor.userId());
});

Handlebars.registerHelper('adminUserExists', Graviteam._admin_user_exists);

if (Graviteam._collections == null) {
  Graviteam._collections = {};
}

Graviteam._get_collection = function(collection_name) {
  Graviteam._collections[collection_name] = Meteor.connection._mongo_livedata_collections[collection_name] || new Meteor.Collection(collection_name);
  return Graviteam._collections[collection_name];
};

Graviteam._session = function() {
  var key;
  key = Graviteam._Graviteamize(arguments[0]);
  if (arguments.length === 1) {
    return Session.get(key);
  } else if (arguments.length === 2) {
    return Session.set(key, arguments[1]);
  }
};

Graviteam._call = function() {
  var args, name;
  name = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
  return Meteor.call.apply(Meteor, [Graviteam._Graviteamize(name)].concat(__slice.call(args)));
};

Graviteam._nested_field_lookup = function(object, path) {
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

Graviteam._convert_to_correct_type = function(field, val, collection) {
  var constructor, find_obj, sample_val;
  find_obj = {};
  find_obj[field] = {
    $exists: true
  };
  sample_val = Graviteam._nested_field_lookup(collection.findOne(find_obj), field);
  constructor = sample_val.constructor;
  if (typeof sample_val === 'object') {
    return new constructor(val);
  } else if (typeof sample_val === 'boolean') {
    return val === 'true';
  } else {
    return constructor(val);
  }
};

Graviteam._get_type = function(field, collection) {
  var find_obj, sample_val;
  find_obj = {};
  find_obj[field] = {
    $exists: true
  };
  sample_val = Graviteam._nested_field_lookup(collection.findOne(find_obj), field);
  return typeof sample_val;
};