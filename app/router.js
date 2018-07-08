import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('/');
  this.route('about');
  //this.route('mtb');
  this.route('admin');
  this.route('item');
  this.route('login');
  this.route('register');
  /*
  NOTE THIS WILL STOP RENDERING INDEX.HBS IF NOT AUTHENTICATED
  this.route('authenticated', { path: '' }, function() {
    // all routes that require the session to be authenticated
  });*/
  this.route('rt');
  this.route('bikes');
});

export default Router;
