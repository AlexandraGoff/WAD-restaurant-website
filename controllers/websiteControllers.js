const menuDAO = require("../models/websiteModel");
const userDao = require("../models/userModel.js");
const res = require("express/lib/response");

const db = new menuDAO('item.db');


exports.toggle_availability = function (req,res){
  console.log("processing edit_entry controller");
  db.toggleAvailability(req.body.dish, req.body.availability);
  res.redirect("/admin");
  
}


exports.delete_entry = function (req,res){
  let name = req.params.dish;
  db.deleteEntry(req.body.dish);
  console.log('deleted entry' + name);
  res.redirect("/admin");
}

exports.show_login = function (req, res) {
  res.render("user/login");
};

exports.handle_login = function (req, res) {
  res.redirect("/admin");
};

exports.landing_page = function (req, res) {
    db.getAvailableEntries()
    .then((list) => {
      res.render("entries", {
        title: "Menu",
        entries: list,
      });
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};

exports.show_new_entries = function (req, res) {
  res.render("newEntry", {
    title: "Menu",
    user: "user",
  });
};

exports.show_edit_entries = function (req, res) {
  res.render("editEntry", {
    title: "Menu",
    user: "user",
  });
};

exports.edit_entry = function (req,res){
  console.log("processing edit_entry controller");
  if (!req.body.dish) {
    response.status(400).send("Edits must have a name.");
    return;
  }
  db.updateEntry(req.body.dish, req.body.description, req.body.type, req.body.availability, req.body.ingredients,req.body.allergens, req.body.price);
  res.redirect("/admin");
}

exports.post_new_entry = function (req, res) {
  console.log("processing post-new_entry controller");
  if (!req.body.dish) {
    response.status(400).send("Entries must have a name.");
    return;
  }
  db.addEntry(req.body.dish, req.body.description, req.body.type, req.body.availability, req.body.ingredients,req.body.allergens, req.body.price);
  res.redirect("/admin");
};

exports.show_user_entries = function (req, res) {
  let user = req.params.author;
  db.getEntriesByUser(user)
    .then((entries) => {
      res.render("entries", {
        title: "Menu",
        user: "user",
        entries: entries,
      });
    })
    .catch((err) => {
      console.log("Error: ");
      console.log(JSON.stringify(err));
    });

    db.sortByType(type);

    db.getEntriesByType(type);
};

exports.show_register_page = function (req, res) {
  res.render("user/register", {
    user: "user",
  });
};

exports.post_new_user = function (req, res) {
  const user = req.body.username;
  const password = req.body.pass;

  if (!user || !password) {
    res.send(401, "no user or no password");
    return;
  }
  userDao.lookup(user, function (err, u) {
    if (u) {
      res.send(401, "User exists:", user);
      return;
    }
    userDao.create(user, password);
    console.log("register user", user, "password", password);
    res.redirect("/login");
  });
};

exports.loggedIn_landing = function (req, res) {
  db.getAllEntries()
    .then((list) => {
      res.render("entries", {
        title: "Menu",
        user: "user",
        entries: list,
      });
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};

exports.logout = function (req, res) {
  res.clearCookie("jwt").status(200).redirect("/");
};
