import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
export default Controller.extend({
  init(){
    this._super(...arguments);
  },

    session: service('session'),
    serverError: ' ',
    emailError: ' ',
    passwordError: ' ',
    testError: 'Test Error',
    router: service(),
    actions: {
        authenticate() {
          var cd = this;
          let { identification, password } = this.getProperties('identification', 'password');
          this.get('session').authenticate('authenticator:oauth2', identification, password).catch((reason) => {
            this.set('errorMessage', reason.error || reason);
          }).then(function(){
            window.location.href = "/";
          });
        }
    },
});