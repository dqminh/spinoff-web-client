root = exports ? this

old_sync = Backbone.sync
Backbone.sync = (method, model, options) ->
  options.username = "albert@acroca.com"
  options.password = "albertpassword"
  old_sync(method, model, options)

class root.Company extends Backbone.Model
  url: "/company"
  
  
company = new Company
company.fetch
  success: (model) ->
    console.log("Cool")
  error: () ->
    new_name = prompt("Name your company")
    company.set(name: new_name)
    console.log(company)
    company.save