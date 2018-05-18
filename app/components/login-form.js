import Component from '@ember/component';
import $ from 'jquery';
import { inject as service } from '@ember/service';

export default Component.extend({
    session: service('session'),
    router: service(),
    actions: {
        authenticate() {
            let { identification, password } = this.getProperties('identification', 'password');
            this.get('session').authenticate('authenticator:oauth2', identification, password).catch((reason) => {
                this.set('errorMessage', reason.error || reason);
            })
        }
    },

    validateEmail(email) {
        //check if email is of example email@email.com
        var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email);
    },

});
