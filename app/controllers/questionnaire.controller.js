const Questionnaire = require('../models/questionnaire.model.js');
// Create and Save a new User
exports.create = (req, res) => {
    // Create a user
// if (req.body.resource==="registration") {



    const questionnaire = new Questionnaire({
        Questionnaire: req.body.questionnaire
    });
      // Save user in the database
      questionnaire.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating user."
        });
    });
  

};
// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
    Questionnaire.find()
    .then(questionnaire => {
        res.send(questionnaire);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving questionnaire."
        });
    });
};


//find all records with answer of food 
exports.findAllByAnswer = (req, res) => {
    Questionnaire.find({'Questionnaire.answer':req.params.type})
    .then(questionnaire => {
        res.send(questionnaire);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving answer of type."
        });
    });


}
// Find a single questionnaire with a questionnaireId
exports.findOneQuestionnaire = (req, res) => {
    Questionnaire.findById(req.params.questionnaireId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "Questionnaire not found with id " + req.params.questionnaireId
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "QuestionnaireId not found with id " + req.params.questionnaireId
            });
        }
        return res.status(500).send({
            message: "Error retrieving questionnaire with id " + req.params.questionnaireId
        });
    });
};
// Update a Questionnaire identified by the QuestionnaireId in the request
exports.updateQuestionnaire = (req, res) => {
        Questionnaire.findByIdAndUpdate(req.params.questionnaireId, {
            evaluated:req.body.evaluated,
            evaluator:req.body.evaluator, 
            total_score:req.body.total_score,
            score:req.body.score,
        }, {new: true})
        .then(questionnaire => {
            if(!questionnaire) {
                return res.status(404).send({
                    message: "Questionnaire not found with id " + req.params.questionnaireId
                });
            }
            res.send(questionnaire);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Questionnaire not found with id " + req.params.questionnaireId
                });
            }
            return res.status(500).send({
                message: "Error updating questionnaire with id " + req.params.questionnaireId
            });
        });
  };
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
