import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
    router: service(),
    actions: {
        redirect(category){
            var r = category.name.toLowerCase();
            this.get('router').transitionTo(r);
            
        },
        toHome(){
            this.get('router').transitionTo('/');
        }
    }
});
