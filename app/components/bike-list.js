import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
    router: service(),
    init(){
        this._super(...arguments);
        this.filterCategory = this.get('category')
        this.sortProps = ['price']
    },
    didUpdate(){
        this.set('filterCategory', this.get('category'))
    },
    filterCategory: 'all',
    queryParams: ["category"],
    filteredBikes: computed('filterCategory', 'bikes', function(){
        let bikes = this.get('bikes');
        let category = this.get('filterCategory');
        if(category){
            if(bikes.filterBy('category', category).length===0){
                return bikes;
            } else {
                return bikes.filterBy('category', category)
            }

        }else {
            return bikes
        }
    }),
    sortedBikes: computed.sort('filteredBikes', 'sortProps'),

    actions: {
                 
    sortAction(order) {
        console.log(order)
        switch (order) {
            case '0': {
                this.set('sortProps', ['popularity'])
                break;
            }
            case '1': {
                this.set('sortProps', ['price'])
                break;
            }
            case '2': {
                this.set('sortProps', ['price:desc'])
                break;
            }
            case '3': {
                this.set('sortProps', ['name'])
                break;
            }
            case '4': {
                this.set('sortProps', ['name:desc'])
                break;
            }
            default:
                this.set('sortProps', ['popularity'])
        }
        console.log(this.get('sortProps'))
    },
        display(item) {
            var item_id = item._id;
            // this.get('router').transitionTo('/item', { queryParams: { id: item_id } });
            this.get('router').transitionTo('/item?id=' + item_id);
        },

    }
});

