const User = require('../models/user.model.js');
// Create and Save a new User
exports.create = (req, res) => {
    // Create a user
if (req.body.resource==="registration") {


  if (req.body.action==="add") {

    // Validate request
    if(!req.body.data.firstname) {
        return res.status(400).send({
            message: "User first name can not be empty"
        });
    }
    if(!req.body.data.lastname) {
        return res.status(400).send({
            message: "User last name can not be empty"
        });
    }
    if(!req.body.data.email) {
        return res.status(400).send({
            message: "User email can not be empty"
        });
    }
    if(!req.body.data.contact) {
        return res.status(400).send({
            message: "User contact can not be empty"
        });
    }
    const user = new User({
        firstname: req.body.data.firstname || "Untitled User",
        lastname: req.body.data.lastname,
        email: req.body.data.email,
        evaluated:false,
        hobbies: req.body.data.hobbies,
        contact: req.body.data.contact
    });
      // Save user in the database
    user.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating user."
        });
    });
  }
}
};
// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
    User.find()
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};


//find all records with hobbies of type 
exports.findAllHobbies = (req, res) => {
    User.find({"hobbies":req.params.type})
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving hobbies."
        });
    });


}
// Find a single user with a userId
exports.findOne = (req, res) => {
    User.findById(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.userId
        });
    });
};
// Update a user identified by the userId in the request
exports.update = (req, res) => {
  // Validate Request
  if (req.body.resource==="update") {
    if (req.body.action==="details") {
      // Find user and update it with the request body
      User.findByIdAndUpdate(req.params.userId, {
        //   firstname: req.body.data.firstname || "Untitled User",
        //   lastname: req.body.data.lastname,
        //   hobbies: req.body.data.hobbies,
        //   email: req.body.data.email,
          evaluated:req.body.data.evaluated,
        //   contact: req.body.data.contact
      }, {new: true})
      .then(user => {
          if(!user) {
              return res.status(404).send({
                  message: "User not found with id " + req.params.userId
              });
          }
          res.send(user);
      }).catch(err => {
          if(err.kind === 'ObjectId') {
              return res.status(404).send({
                  message: "User not found with id " + req.params.userId
              });
          }
          return res.status(500).send({
              message: "Error updating user with id " + req.params.userId
          });
      });
    }
  }
};
// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send({message: "User deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.userId
        });
    });
};
