var get_collection, get_collection_view_fields,
  __slice = [].slice;

Template.collection_view.helpers({
  headers: function() {
    return get_collection_view_fields();
  },
  nonid_headers: function() {
    return get_collection_view_fields().slice(1);
  },
  collection_name: function() {
    return "" + (Session.get('collection_name'));
  },
  document_url: function() {
    return "/admin/" + (Session.get('collection_name')) + "/" + this._id;
  },
  document_id: function() {
    return this._id + "";
  },
  rows: function() {
    var query, sort_by, _ref;
    sort_by = {};
    sort_by[Session.get('key')] = Session.get('sort_order');
    query = _.extend({}, Session.get('top_selector'), Session.get('field_selectors'));
    return (_ref = get_collection()) != null ? _ref.find(query, {
      sort: sort_by
    }).fetch() : void 0;
  },
  values_in_order: function() {
    var field_name, fields_in_order, name, names_in_order, value, values, _i, _len, _ref, _ref1, _results;
    fields_in_order = _.pluck(get_collection_view_fields(), 'name');
    names_in_order = _.clone(fields_in_order);
    values = (function() {
      var _i, _len, _ref, _results;
      _ref = fields_in_order.slice(1);
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        field_name = _ref[_i];
        _results.push(lookup(this, field_name));
      }
      return _results;
    }).call(this);
    _ref = _.zip(values, names_in_order.slice(1));
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      _ref1 = _ref[_i], value = _ref1[0], name = _ref1[1];
      _results.push({
        value: value,
        name: name
      });
    }
    return _results;
  }
});

get_collection = function() {
  return window["inspector_" + (Session.get('collection_name'))];
};

get_collection_view_fields = function() {
  return get_fields(get_collection().find({}, {
    limit: 50
  }).fetch());
};

Template.collection_view.events({
  "click a.home": function(e) {
    return Meteor.go("/admin/");
  },
  "click a.sort": function(e) {
    e.preventDefault();
    if (Session.get('key') === this.name) {
      return Session.set('sort_order', Session.get('sort_order') * -1);
    } else {
      Session.set('key', this.name);
      return Session.set('sort_order', 1);
    }
  },
  'keyup #filter_selector': function(event) {
    var error, selector_json;
    if (event.keyCode !== 13) {
      return;
    }
    try {
      selector_json = JSON.parse($('#filter_selector').val());
      return Session.set('top_selector', selector_json);
    } catch (_error) {
      error = _error;
      return Session.set('top_selector', {});
    }
  },
  'dblclick .collection-field': function(e) {
    var $this;
    $this = $(e.currentTarget);
    $this.removeClass('collection-field');
    $this.html("<input type='text' value='" + ($this.text()) + "'>");
    $this.find('input').select();
    return $this.find('input').on('blur', function() {
      var field_name, id, update_dict, updated_val;
      updated_val = $this.find('input').val();
      $this.html(updated_val);
      $this.addClass('collection-field');
      id = $('td:first-child a', $this.parents('tr')).html();
      field_name = $this.data('field');
      update_dict = {};
      update_dict[field_name] = updated_val;
      return Meteor.call("admin_" + (Session.get('collection_name')) + "_update", id, {
        $set: update_dict
      });
    });
  },
  'change .column_filter': function() {
    var event, field_selectors;
    event = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    field_selectors = {};
    $('.column_filter').each(function(idx, item) {
      if (item.value) {
        return field_selectors[item.name] = item.value;
      }
    });
    return Session.set('field_selectors', field_selectors);
  },
  'click .admin-delete-doc': function(e) {
    var id;
    e.preventDefault();
    id = $(e.currentTarget).data('id');
    return Meteor.call("admin_" + (Session.get('collection_name')) + "_delete", id);
  },
  'click .admin-create-doc': function(e) {
    var $create_row, field, new_doc, _i, _len, _ref;
    e.preventDefault();
    $create_row = $('#admin-create-row');
    new_doc = {};
    _ref = $create_row.find('input[type="text"]');
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      field = _ref[_i];
      new_doc[field.name] = field.value;
      field.value = '';
    }
    return Meteor.call("admin_" + (Session.get('collection_name')) + "_insert", new_doc);
  }
});