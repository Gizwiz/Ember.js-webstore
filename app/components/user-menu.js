import Component from '@ember/component';
import $ from 'jquery';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
export default Component.extend({
    /*
    session: false,
    user: '',
    router: service(),
    */
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
                    this.component.set('session', true);
                    this.component.set('user', user);
                } else {
                    this.component.set('session', false);
                    this.component.set('user', '');
                }
            }
        }).then(function () {
        });
    },
    actions: {
        showLoginMenu() {
            document.getElementById('log-in-menu').style.display = 'block';
        },
        hideLoginMenu() {
            document.getElementById('log-in-menu').style.display = 'none';
        },
        login() {
            console.log("login")
        },
        logout() {
            $.ajax({
                url: "authentication/logout",
                method: 'POST',
                component: this,
                success: function () {
                    this.component.set('session', false);
                    this.component.set('user', '');
                }
            });
        },
    }/*
    actions: {

        login() {
            this.get('router').transitionTo('login');
        },
        logout() {
            $.ajax({
                url: "authentication/logout",
                method: 'POST',
                component: this,
                success: function () {
                    this.component.set('session', false);
                    this.component.set('user', '');
                }
            });
        },

    },
    model() {
        return this.store.createRecord('user');
    },*/
});
