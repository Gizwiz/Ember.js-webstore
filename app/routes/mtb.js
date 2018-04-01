import Route from '@ember/routing/route';

export default Route.extend({
    model(params) {
        var t = this.get('store').query('bike', {
            filter: {
              category: 'mtb'
            }
          }).then(function(bike) {
            console.log(bike)
          });
        return this.get('store').filter('bike', function (bike) {
            if (bike.get('category').match(/mtb$/)) { return true; }
        });
    }
});

