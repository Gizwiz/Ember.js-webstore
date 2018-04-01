import Route from '@ember/routing/route';

export default Route.extend({
    model() {
        var bikes = this.get('store').filter('bike', function (bike) {
            if (bike.get('category')==='triathlon') { return true; }
        });
        return bikes;
    }
});
