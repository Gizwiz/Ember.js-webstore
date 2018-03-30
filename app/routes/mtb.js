import Route from '@ember/routing/route';

export default Route.extend({

    model() {
        return this.get('store').findAll('bike').filter((bike) => {
            return bike.category === 'mtb';
        });

    }
});

