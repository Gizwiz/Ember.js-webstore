import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Component.extend({
    router: service(),
    init(){
        this._super(...arguments);
        this.filterCategory = this.get('category')
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
                console.log(category)
                return bikes;
            } else {
                return bikes.filterBy('category', category)
            }

        }else {
            return bikes
        }
        
    }),

    actions: {
        display(item) {
            var item_id = item._id;
            // this.get('router').transitionTo('/item', { queryParams: { id: item_id } });
            this.get('router').transitionTo('/item?id=' + item_id);
        }
    }
});

