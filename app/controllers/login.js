import Controller from '@ember/controller';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
export default Controller.extend({
    session: Ember.inject.service('session'),
    serverError: ' ',
    emailError: ' ',
    passwordError: ' ',
    testError: 'Test Error',
    router: service(),
    actions: {
        authenticate() {
          let { identification, password } = this.getProperties('identification', 'password');
          console.log(this.get('session').authenticate('authenticator:oauth2', identification, password).catch((reason) => {
            this.set('errorMessage', reason.error || reason);
          }));
          this.get('session').authenticate('authenticator:oauth2', identification, password).catch((reason) => {
            this.set('errorMessage', reason.error || reason);
          });;
        },
    },
});