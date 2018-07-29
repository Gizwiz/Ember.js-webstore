import Route from '@ember/routing/route';

export default Route.extend({
    queryParams: {
        category: {
            refreshModel: true
        }
    },
    model() {
        let testIfStore = this.get('store').peekRecord('bike', '59072a5373e4ea1178781fc2')
        if(testIfStore === null){
            
            var bikes = []
            this.get('store').findAll('bike').then(function(bike){
                bike.forEach(function (b){
                    bikes.push({_id:b.id, "type":"bike" ,"data":{"attributes":b.data}})
                })
            })
            this.get('store').push({data:bikes})
            this.set('bikes', this.get('store').peekAll('bike'))
            this.set('category', this.queryParams.category)
            return this.get('bikes');

        } else {
            this.set('bikes', this.get('store').peekAll('bike'))
            this.set('category', this.queryParams.category)
            return this.get('bikes')
        }
        
    },

});
