var providers = require("../models/providers");

//List Provider
module.exports.list = function (req, res) {
  res.render("providers/providers-list", {
    title: "Service Provider",
    providers: providers,
  });
};

//Details of Provider
module.exports.details = function (req, res) {
  let { id } = req.params;
  let provider = providers.find((provider) => provider.id == id);
  res.render("providers/providers-details", {
    title: "Service Providers Details",
    id: id,
    company: provider.company,
  });
};

//Edit Form
module.exports.edit = function (req, res) {
  let { id } = req.params;
  let provider = providers.find((provider) => provider.id == id);
  res.render("providers/providers-edit", {
    title: "Edit Provider",
    provider: provider,
  });
};

//Uodate Form
module.exports.update = function (req, res) {
  let { id } = req.params;
  let provider = providers.find((provider) => provider.id == id);
  let {
    firstname,
    lastname,
    position,
    company_name,
    address,
    address2,
    city,
    state,
    postal_code,
    phone,
    email,
    description,
    tagline,
  } = req.body;
  provider.firstname = firstname;
  provider.lastname = lastname;
  provider.position = position;
  provider.company.company_name = company_name;
  provider.company.address = address;
  provider.company.address2 = address2;
  provider.company.city = city;
  provider.company.state = state;
  provider.company.postal_code = postal_code;
  provider.company.phone = phone;
  provider.company.email = email;
  provider.company.description = description;
  provider.company.tagline = tagline;
  res.render("providers/providers-update", { title: "Update" });
};

//Add Form
module.exports.addform = function(req,res){
  res.render('providers/providers-add-form',{title:'Add Provider'});
}
//Add Provider
module.exports.add = function(req,res){
  let min =100000
  let max = 999999;
  let id = Math.floor(Math.random()*(max-min)+min);

  let provider ={
    id:id,
    firstname:req.body.firstname,
    lastname:req.body.lastname,
    position:req.body.position,
    company:{
      company_name:req.body.company_name,
      address:req.body.address,
      address2:req.body.address2,
      city:req.body.city,
      state:req.body.state,
      postal_code:req.body.postal_code,
      phone:req.body.phone,
      email:req.body.email,
      description:req.body.description,
      tagline:req.body.tagline

    }
  }
  providers.push(provider);
  res.render('providers/providers-add',{title:'Added'})
}

module.exports.delete = function(req,res){
  let id = req.params.id;
  let provider = providers.find(provider => provider.id == id);
  let idx = providers.indexOf(providers.find(provider => provider.id == id));
  providers.splice(idx,1);
  console.log(idx);
  res.render('providers/providers-delete',{title:'Delete', provider:provider})
}
