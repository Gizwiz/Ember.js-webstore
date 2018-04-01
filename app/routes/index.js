import Route from '@ember/routing/route';

export default Route.extend({
    model() {
            //check if model is loaded with a peek all. no network request is made. 
            let bikes_loaded_check = this.get('store').peekRecord('bike',1);
            console.log(bikes_loaded_check);
            //if 0 results, assumption is that the model is not loaded, thus making it necessary to load the model.
            if(bikes_loaded_check === null){
                this.get('store').findAll('bike');
            }
        return [
            {
                name: 'MTB',
            },
            {
                name: 'Road',
            },
            {
                name: 'Cyclocross',
            },
            {
                name: 'Triathlon',
            },
            {
                name: 'Trekking',
            },
            {
                name: 'Urban',
            },
            {
                name: 'Electric'
            },
        ]
    }
});
