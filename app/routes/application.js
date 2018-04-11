import Route from '@ember/routing/route';
import $ from 'jquery';

export default Route.extend({
    actions: {
        didTransition() {
            this.checkSession();
        },
        willTransition(transition) {
            this.checkSession();
        }
    },
    checkSession() {
        $.ajax({
            url: "authentication/checkSession",
            method: "POST",
            success: function (res) {
                if (res.status === "active") {
                    var user = JSON.parse(localStorage.getItem('user'));
                    document.getElementById('logged-in-user').innerHTML = user.firstName;
                } else {
                    document.getElementById('logged-in-user').innerHTML = "";
                }
            }
        })
    },
    model() {

        return [
            {
                name: 'MTB',
                subcategories: ["Hardtail", "Full Suspension", "Enduro", "FreeRide", "Trail", "XC", "Women's Hardtail", "Women's Full Suspension"],
                image: 'mtb/enduro_1.jpg',
            },
            {
                name: 'Road',
                subcategories: ["Aluminum", "Carbon", "Gravel", "Triathlon", "Cyclocross", "Women's Road Bikes"],
            },
            {
                name: 'Trekking',
                subcategories: ["Trekking Bikes", "Women's Trekking Bikes"],
            },
            {
                name: 'Urban',
                subcategories: ["Fixie", "Vintage", "Cruiser", "BMX"],
            },
            {
                name: 'Electric',
                subcategories: ["E-Mountain", "E-Road", "E-Cross", "E-Trekking"],
            },
        ]
    }
});
