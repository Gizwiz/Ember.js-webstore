import Route from '@ember/routing/route';

export default Route.extend({
    queryParams: {
        id: {
            refreshModel: true
        }
    },
    model(queryParams){
        console.log(queryParams.id)
        var item =  this.get('store').query('bike', {
            filter: {
                id: queryParams.id
            }
        });
        console.log(item)
        return item;

    }
});
