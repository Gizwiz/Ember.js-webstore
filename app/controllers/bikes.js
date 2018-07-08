import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
    init() {
        this._super(...arguments);
        this.sortProps = ['popularity'];
    },

    filteredBikes: computed.sort('model', 'sortProps'),

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
