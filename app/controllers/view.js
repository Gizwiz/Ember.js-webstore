import Controller from '@ember/controller';
import EmberObject, { computed } from '@ember/object';
import { filter } from 'rsvp';

export default Controller.extend({
    init() {
        this._super(...arguments);
        this.sortProps = ['popularity'];
    },
    queryParams: ["category"],

    filteredBikes: computed.filterBy('model', 'category'),
    /*filteredBikes: computed('category', 'model', function(){
        let category = this.get('category');
        let bikes = this.get('model');
        console.log("lol")
        return bikes.filterBy('category', category)
    }),*/

    sortedBikes: computed.sort('model', 'sortProps'),

    actions: {
        sort(order) {
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

        }
    }
});
