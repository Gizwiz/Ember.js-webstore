import Route from '@ember/routing/route';

export default Route.extend({
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
            document.getElementById('login-email-error').innerHTML = "";
            document.getElementById('login-psw-error').innerHTML = "";
            if (!this.validateEmail(email)) {
                document.getElementById('login-email').style.borderColor = "red";
                document.getElementById('login-email-error').innerHTML = "Email must be of form 'email@example.com'";
                emailOk = false;
            } else {
                emailOk = true;
                document.getElementById('login-email').style.borderColor = "lightgrey";
                document.getElementById('login-email-error').innerHTML = "";
            }
            if (psw === undefined || psw.length === 0 || psw === "" || psw === null) {
                document.getElementById('login-password').style.borderColor = "red";
                document.getElementById('login-psw-error').innerHTML = "Enter a password";
                pswOk = false;
            }
            else {
                pswOk = true;
                document.getElementById('login-password').style.borderColor = "lightgrey";
                document.getElementById('login-psw-error').innerHTML = "";
            }
            if (emailOk && pswOk) {
                var data = { email: email, password: psw };
                $.ajax({
                    url: "/authentication/login",
                    method: "POST",
                    data: data,
                    success: function (res) {
                        
                        if (res.email && res.password) {
                            
                            $.ajax({
                                url:"/authentication/sessionate",
                                method: "POST",
                                success: function(res){
                                    console.log("sessionate front end res");
                                },error: function(err){
                                    console.log(err);
                                }
                            })
                        }
                    },
                    error: function (err) {
                        document.getElementById('login-server-response').innerHTML = "An server error occured. Server authentication failed.";
                    }
                })
            }

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
