import Ember from 'ember';
import Route from '@ember/routing/route';
import $ from 'jquery';
import { inject } from '@ember/controller';


export default Route.extend({
    session: false,
    user: '',
    test: 'asdasd',
    getSession() {
        return this.session;
    },
    model() {
        return {
            categories: [
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
            ],
            session: {session: this.getSession(), user: this.user},
            refresh: false,
        }
    },
});
