import $ from 'jquery';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
export default Route.extend({
    router: service(),
    model() {
        return this.store.createRecord('user');
    },
    actions: {

        authenticateLogin() {
            let user = this.modelFor(this.routeName);
            var email = user.get('email');
            var psw = " ";
            psw = user.get('password');
            var emailOk = false;
            var pswOk = false;
            if (!this.validateEmail(email)) {
                document.getElementById('login-email').style.borderColor = "red";
                emailOk = false;
                this.controller.set('emailError', "Email must be of form 'email@example.com'");
            } else {
                emailOk = true;
                document.getElementById('login-email').style.borderColor = "lightgrey";
                this.controller.set('emailError', '');
            }
            if (psw === undefined || psw.length === 0 || psw === "" || psw === null) {
                document.getElementById('login-password').style.borderColor = "red";
                pswOk = false;
                this.controller.set('passwordError', 'Enter a password')
            }
            else {
                pswOk = true;
                document.getElementById('login-password').style.borderColor = "lightgrey";
                this.controller.set('passwordError', '')
            }
            if (emailOk && pswOk) {
                $.ajax({
                    url: "/authentication/login",
                    method: "POST",
                    data: { email: email, password: psw },
                    controller: this.controller, //jquery ajax redefines this, so have to refer to the ember controller like this
                    success: function (res) {
                        if (res.email && res.password) {
                            localStorage.setItem('user', JSON.stringify(res.user));
                            document.location.href = '/';
                        } else if (res.email && !res.password) {
                            document.getElementById('login-password').style.borderColor = "red";
                            this.controller.set('passwordError', 'Invalid password');
                        } else if (!res.email) {
                            this.controller.set('emailError', 'An account with this email was not found');
                        }
                    },
                    error: function () {
                        this.controller.set('serverError', "An server error occured. Server authentication failed");
                    }
                }).then(function () {

                })
            } else {
                this.controller.set('error', 'Invalid email');
            }

        },
        redirectToHome() {
            this.get('router').transitionTo('/');
        },
    },

    validateEmail(email) {
        //check if email is of example email@email.com
        var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email);
    },
    login(userId) {
        console.log("Loggin in user " + userId);
    }
});
