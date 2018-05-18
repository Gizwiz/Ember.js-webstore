import {inject as service} from '@ember/service';
import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
    session: service('session'),
    authorize(xhr) {
        let { dokken } = this.get('session.data.authenticated');
        xhr.setRequestHeader('Authorization', `Bearer ${dokken}`);
    }
});