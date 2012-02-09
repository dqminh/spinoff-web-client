root = exports ? this

class root.Company extends Backbone.Model
  url: "/company"
  constructor: ->

company = new Company
  name: "Name of the new company"

company.save()