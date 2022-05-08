const express = require('express');
const router = express.Router();
const controller = require('../controllers/websiteControllers.js');
const {login} = require('../auth/auth')
const {verify} = require('../auth/auth')

router.post('/toggle', verify, controller.toggle_availability);
router.get('/toggle', verify, controller.toggle_availability);
router.get('/edit', verify, controller.show_edit_entries);
router.post('/edit', verify, controller.edit_entry);
router.post('/delete',verify,controller.delete_entry);
router.get('/delete',verify,controller.delete_entry);
router.get('/login', controller.show_login);
router.post('/login', login, controller.handle_login);
router.get("/menu", controller.landing_page);
router.get('/new',verify,controller.show_new_entries);
router.post('/new', verify, controller.post_new_entry);
router.get('/posts/:author', controller.show_user_entries);
router.get('/register', verify, controller.show_register_page);
router.post('/register', verify, controller.post_new_user);
router.get("/admin",verify, controller.loggedIn_landing);
router.get("/logout", controller.logout);

/*router.use(function(req, res) {
        res.status(404);
        res.type('text/plain');
        res.send('404 Not found.');
    });
router.use(function(err, req, res, next) {
        res.status(500);
        res.type('text/plain');
        res.send('Internal Server Error.');
    });*/
module.exports = router;