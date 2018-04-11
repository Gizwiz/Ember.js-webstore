import $ from 'jquery';
import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
    router: service(),
    actions: {
        redirect(category) {
            // $(".page_wrapper").fadeOut(200);
            var r = category.name.toLowerCase();
            this.get('router').transitionTo(r);
        },
        login() {
            console.log("loginn");
            this.get('router').transitionTo('login');
        },
        logout() {
            $.ajax({
                url: "authentication/logout",
                method: 'POST',
                success: function (res) {
                    document.getElementById('logged-in-user').innerHTML = "";
                }
            });
        },
        toHome() {
            this.get('router').transitionTo('/');
        },
        populateDropdown(cats) {
            document.getElementById('ddc').style.display = 'block';
            document.getElementById('link-list').innerHTML = "<h3>" + cats.name + "</h3>";

            for (var i = 0; i < cats.subcategories.length; i++) {
                document.getElementById('link-list').innerHTML += "<a>" + cats.subcategories[i] + "</a>";
            }
            document.getElementById('link-list-image-container').innerHTML = "<img class='link-list-image' src='" + cats.image + "' alt=''>";
        },
        closeDropdown() {
            console.log("close dropdown");
            document.getElementById('ddc').style.display = 'none';
        },
        openDropdown() {
            console.log("open dropdown");
            document.getElementById('ddc').style.display = 'block';
        },
        checkSession(){
            $.ajax({
                url: "authentication/checkSession",
                method: 'POST',
                success: function (res) {
                    console.log(res);
                }
            }); 
        }
    }
});
