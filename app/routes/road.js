import Route from '@ember/routing/route';

export default Route.extend({
    model() {
        var bikes = [];
        return $.ajax({
            url: '/api/',
            method: 'POST',
            data: {category:'road'},
            success: function (res) {
                bikes = res;
            }
        }).then(function (){
            return bikes;
        })

    }
});

