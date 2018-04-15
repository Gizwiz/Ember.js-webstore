import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
    router: service(),
    queryParams: {
        category: {
            refreshModel: true
        }
    },
    actions: {
        display(item) {
            var item_id = item._id;
            // this.get('router').transitionTo('/item', { queryParams: { id: item_id } });
            this.get('router').transitionTo('/item?id=' + item_id);
        }
    }
});
