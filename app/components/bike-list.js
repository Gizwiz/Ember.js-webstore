import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
    router: service(),
    actions: {
        display(item) {
            var item_category = item.category;
            var item_id = item._id;
            this.get('router').transitionTo('item', { queryParams: { id: item_id } });
        }
    }
});

