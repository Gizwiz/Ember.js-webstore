import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('about');
  this.route('mtb');
  this.route('road');
  this.route('cyclocross');
  this.route('triathlon');
  this.route('trekking');
  this.route('urban');
  this.route('electric');
  this.route('admin');
  this.route('item');
  this.route('login');
  this.route('register');
});

export default Router;
