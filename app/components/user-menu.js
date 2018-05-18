import Component from '@ember/component';
import $ from 'jquery';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
export default Component.extend({
    activeSession: false,
    user: '',
    router: service(),
    session: service('session'),
    init() {
        this._super(...arguments);
        this.errors = [];
        this.checkSession();
    },
    checkSession() {
        console.log(this.get('session'));
        console.log(this.get('session').session.isAuthenticated);
        if(this.get('session').session.isAuthenticated===true){
            console.log("Authenticated");
        } else {
            console.log("No session active");
        }
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
