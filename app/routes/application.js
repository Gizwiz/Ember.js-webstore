import Route from '@ember/routing/route';

export default Route.extend({
    model() {
        $.ajax({
            url:"authentication/session/check",
            method: "GET",
            success: function(res){
                console.log(res);
            }
        })
        return [
            {
                name: 'MTB',
                subcategories: ["Hardtail", "Full Suspension", "Enduro", "FreeRide", "Trail", "XC", "Women's Hardtail", "Women's Full Suspension"],
                image: 'mtb/enduro_1.jpg',
            },
            {
                name: 'Road',
                subcategories: ["Aluminum","Carbon", "Gravel", "Triathlon", "Cyclocross", "Women's Road Bikes"],
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
                subcategories: ["E-Mountain","E-Road", "E-Cross", "E-Trekking"],
            },
        ]
    }
});
