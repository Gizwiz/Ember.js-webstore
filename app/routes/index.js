import Route from '@ember/routing/route';
import $ from 'jquery';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
export default Route.extend(ApplicationRouteMixin, {
    model() {
        var item;
        return $.ajax({
            url: '/api/showcase/',
            method: 'POST',
            success: function (res) {
                item = res;
            }
        }).then(function () {
            return item;
        });
    }
});
