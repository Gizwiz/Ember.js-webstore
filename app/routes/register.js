import Route from '@ember/routing/route';
import $ from 'jquery';
export default Route.extend({
    model() {
        return this.store.createRecord('user');
    },
    actions: {
        createAccount() {
            let newUser = this.modelFor(this.routeName);
            var fn = newUser.get('firstName');
            var ln = newUser.get('lastName');
            var email = newUser.get('email');
            var psw = newUser.get('password');
            var fnOk, lnOk, emailOk, pswOk = false;

            document.getElementById('fn-error').innerHTML = "";
            document.getElementById('ln-error').innerHTML = "";
            document.getElementById('email-error').innerHTML = "";
            document.getElementById('psw-error').innerHTML = "";

            //validations  
            try {
                fn = fn.replace(/^\s+/, '').replace(/\s+$/, '');
            } catch (e) {
                fn = "";
            }
            if (fn === "") {
                //if (fn === "" && !fn.replace(/\s/g, '').length) {
                document.getElementById('register-firstName').style.borderColor = "red";
                document.getElementById('fn-error').innerHTML = "First name cannot be empty";
                fnOk = false;
            } else {
                fnOk = true;
                document.getElementById('register-firstName').style.borderColor = "lime";
                document.getElementById('fn-error').innerHTML = "";
            }
            try {
                ln = ln.replace(/^\s+/, '').replace(/\s+$/, '');
            } catch (e) {
                ln = "";
            }
            if (ln === "") {
                document.getElementById('register-lastName').style.borderColor = "red";
                document.getElementById('ln-error').innerHTML = "Last name cannot be empty";
                fnOk = false;
            } else {
                lnOk = true;
                document.getElementById('register-lastName').style.borderColor = "lime";
                document.getElementById('ln-error').innerHTML = "";
            }

            if (!this.validateEmail(email)) {
                document.getElementById('register-email').style.borderColor = "red";
                document.getElementById('email-error').innerHTML = "Email must be of form 'email@example.com'";
                emailOk = false;
            } else {
                emailOk = true;
                document.getElementById('register-email').style.borderColor = "lime";
                document.getElementById('email-error').innerHTML = "";
            }

            try {
                psw = psw.replace(/^\s+/, '').replace(/\s+$/, '');
            } catch (e) {
                psw = "";
            }

            if (psw.length < 6 || !this.hasUpperCase(psw)) {
                document.getElementById('register-password').style.borderColor = "red";
                document.getElementById('psw-error').innerHTML = "Password must be at least 6 characters and have at least one capital letter.";
                pswOk = false;
            }
            else {
                pswOk = true;
                document.getElementById('register-password').style.borderColor = "lime";
                document.getElementById('psw-error').innerHTML = "";
            }

            if (fnOk && lnOk && emailOk && pswOk) {
                var data = { firstName: fn, lastName: ln, email: email, password: psw };
                $.ajax({
                    url: "/authentication/register",
                    method: "POST",
                    data: data,
                    success: function (res) {
                        if (res.state === "error") {
                            document.getElementById('server-response').innerHTML = "An account with this email already exists. Please try another email address.";
                            document.getElementById('register-email').style.borderColor = "red";
                        } else if (res.state === "success") {
                            document.getElementById('server-response').innerHTML = "Success";
                        } else {
                            document.getElementById('server-response').innerHTML = "An error occured. The server responded with something it shouldn't!";
                        }
                    },
                    error: function () {
                        document.getElementById('server-response').innerHTML = "An server error occured. Server authentication failed.";
                    }
                })
            }
        }

    },
    validateEmail(email) {
        //check if email is of example email@email.com
        var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email);
    },
    hasUpperCase(psw) {
        return (/[A-Z]/.test(psw));
    }
});
