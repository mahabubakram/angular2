/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';
import Talk from '../api/talk/talk.model';

var currentDateTime = new Date();

Talk.find({}).remove()
  .then(() => {
    Talk.create({
      event: 'Für die Planung der "IBM InterConnect 2016 comes to you" / Architektentag, 11.07.2016',
      uuid : '9ea82280-41c9-11e6-beb8-9e71128cae77',
      talks: [
      {
      talkNumber: 1,
      name: 'Joachim Gucker/ARS, Michael Heiß/ARS',
      title: 'Architekturen',
      startDateTime: '09:00',
      endDateTime: '09:45',
      optionValue: 'Option1'
    }, {
      talkNumber: 2,
      name: 'Joachim Gucker/ARS, Michael Heiß/ARS',
      title: 'APIs',
      startDateTime: '09:50',
      endDateTime: '10:25',
      optionValue: 'Option2'
    }, {
      talkNumber: 3,
      name: 'Reinhard Hohberger/ARS, Dietmar Rager/ARS',
      title: 'Programmiermodelle',
      startDateTime: '10:45',
      endDateTime: '11:25',
      optionValue: 'Option3'
    }, {
      talkNumber: 4,
      name: 'Joachim Gucker/ARS, Jonas Grundler/VKB',
      title: 'BPM und Rules',
      startDateTime: '11:30',
      endDateTime: '12:10',
      optionValue: 'Option4'
    }, {
      talkNumber: 5,
      name: 'Joachim Gucker/ARS, Reinhard Hohberger/ARS',
      title: 'Cloud: Bluemix IBM Hybrid Cloud',
      startDateTime: '13:15',
      endDateTime: '13:45',
      optionValue: 'Option5'
    }, {
      talkNumber: 6,
      name: 'Michael Hofmann/ARS, Joachim Gucker/ARS',
      title: 'DevOps',
      startDateTime: '13:50',
      endDateTime: '14:35',
      optionValue: 'Option6'
    }, {
      talkNumber: 7,
      name: 'Joachim Gucker/ARS',
      title: 'Cognitive und IBM Watson Update',
      startDateTime: '14:40',
      endDateTime: '15:20',
      optionValue: 'Option7'
    }, {
      talkNumber: 8,
      name: 'Joachim Gucker/ARS, Jörg Wende/IBM',
      title: 'Integration',
      startDateTime: '15:35',
      endDateTime: '16:00',
      optionValue: 'Option8'
    }, {
      talkNumber: 9,
      name: 'Joachim Gucker/ARS, Tobias Leicher/IBM',
      title: 'System z Trends',
      startDateTime: '16:05',
      endDateTime: '16:40',
      optionValue: 'Option9'
    }]});
  });

Thing.find({}).remove()
  .then(() => {
    Thing.create({
      name: 'Development Tools',
      info: 'Integration with popular tools such as Bower, Grunt, Babel, Karma, ' +
             'Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, ' +
             'Stylus, Sass, and Less.'
    }, {
      name: 'Server and Client integration',
      info: 'Built with a powerful and fun stack: MongoDB, Express, ' +
             'AngularJS, and Node.'
    }, {
      name: 'Smart Build System',
      info: 'Build system ignores `spec` files, allowing you to keep ' +
             'tests alongside code. Automatic injection of scripts and ' +
             'styles into your index.html'
    }, {
      name: 'Modular Structure',
      info: 'Best practice client and server structures allow for more ' +
             'code reusability and maximum scalability'
    }, {
      name: 'Optimized Build',
      info: 'Build process packs up your templates as a single JavaScript ' +
             'payload, minifies your scripts/css/images, and rewrites asset ' +
             'names for caching.'
    }, {
      name: 'Deployment Ready',
      info: 'Easily deploy your app to Heroku or Openshift with the heroku ' +
             'and openshift subgenerators'
    });
  });

User.find({}).remove()
  .then(() => {
    User.create({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    })
    .then(() => {
      console.log('finished populating users');
    });
  });
