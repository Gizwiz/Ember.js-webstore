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
        console.log("init");
        this.checkSession();
    },
    checkSession() {
        $.ajax({
            url: "authentication/checkSession",
            method: "POST",
            component: this,
            // controller: this.controller,
            success: function (res) {
                if (res.status === "active") {
                    var user = JSON.parse(localStorage.getItem('user'));
                    this.component.set('activeSession', true);
                    this.component.set('user', user);
                } else {
                    this.component.set('activeSession', false);
                    this.component.set('user', '');
                }
            }
        }).then(function () {
        });
    },
    actions: {

        login() {
            this.get('router').transitionTo('login');
        },
        //end session
        logout() {
            $.ajax({
                url: "authentication/logout",
                method: 'POST',
                component: this,
                success: function () {
                    //if server receives logout request, also change front
                    this.component.set('activeSession', false);
                    this.component.set('user', '');
                }
            });
        },
        showLoginMenu() {
            document.getElementById('log-in-menu').style.display = 'block';
        },
        hideLoginMenu() {
            document.getElementById('log-in-menu').style.display = 'none';
        },

        invalidateSession() {
            this.get('session').invalidate();
        }
    },
    model() {
        return this.store.createRecord('user');
    },
});
