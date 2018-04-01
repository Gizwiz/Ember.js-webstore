import Route from '@ember/routing/route';

export default Route.extend({
    model(params) {
        var bikes = this.get('store').filter('bike', function (bike) {
            if (bike.get('category')==='road') { return true; }
        });
        return bikes;
    }
});
