(function() {
  var company, old_sync, root,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  old_sync = Backbone.sync;

  Backbone.sync = function(method, model, options) {
    options.username = "albert@acroca.com";
    options.password = "albertpassword";
    return old_sync(method, model, options);
  };

  root.Company = (function(_super) {

    __extends(Company, _super);

    function Company() {
      Company.__super__.constructor.apply(this, arguments);
    }

    Company.prototype.url = "/company";

    return Company;

  })(Backbone.Model);

  company = new Company;

  company.fetch({
    success: function(model) {
      return console.log("Cool");
    },
    error: function() {
      var new_name;
      new_name = prompt("Name your company");
      company.set({
        name: new_name
      });
      console.log(company);
      return company.save;
    }
  });

}).call(this);
