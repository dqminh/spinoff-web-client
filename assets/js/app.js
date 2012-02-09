(function() {
  var company, root,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  root.Company = (function(_super) {

    __extends(Company, _super);

    Company.prototype.url = "/company";

    function Company() {}

    return Company;

  })(Backbone.Model);

  company = new Company({
    name: "Name of the new company"
  });

  company.save();

}).call(this);
