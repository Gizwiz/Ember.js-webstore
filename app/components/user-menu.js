import Component from '@ember/component';
import { inject as service } from '@ember/service';
export default Component.extend({
  
    activeSession: false,
    user: '',
    router: service(),
    session: service('session'),
    init() {
        this._super(...arguments);
        this.errors = [];
    },
    actions: {
        showLoginMenu(){
            document.getElementById('login-menu').style.display = 'block';
        },
        hideLoginMenu(){
            document.getElementById('login-menu').style.display = 'none';
        },
        invalidateSession() {
            this.get('session').invalidate();
        }
    },
    model() {
        return this.store.createRecord('user');
    },

});
