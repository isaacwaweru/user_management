module.exports = (app) => {
    const users = require('../controllers/user.controller.js');
    const questionnaire = require('../controllers/questionnaire.controller.js');

    // Create a new user
    app.post('/users', users.create);

    //create a new questionnaire
    app.post('/questionnaire', questionnaire.create);
    // Retrieve all questionnaires
    app.get('/questionnaires', questionnaire.findAll);

    //retrieve all with answer of type
    app.get('/answer/:type', questionnaire.findAllByAnswer);
    
    // Questionnaire a single user with questionnaire
    app.get('/questionnaire/:questionnaireId', questionnaire.findOneQuestionnaire);

    // Update a questionaire with questionaireId
    app.put('/evaluate/:questionnaireId', questionnaire.updateQuestionnaire);

    // Retrieve all users
    app.get('/users', users.findAll);

    // Retrieve a single user with usersId
    app.get('/users/:userId', users.findOne);

    // Retrieve all with hobbies is of type
    app.get('/hobbies/:type', users.findAllHobbies);

    // Update a Note with usersId
    app.put('/users/:userId', users.update);

    // Delete a Note with userId
    app.delete('/users/:userId', users.delete);
}
