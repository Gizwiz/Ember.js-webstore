import Route from '@ember/routing/route';

export default Route.extend({
    model(params) {
        //check if model is loaded with a peek for id 1. no network request is made. 
        let bikes_loaded_check = this.get('store').peekRecord('bike',1);
        console.log(bikes_loaded_check);
        //if nothing found, assumption is that the model is not loaded, thus making it necessary to load the model.
        if (bikes_loaded_check === null) {
            this.get('store').findAll('bike');
        }
        return this.get('store').filter('bike', function (bike) {
            if (bike.get('category') === 'urban') { return true; }
        });
    }
});

