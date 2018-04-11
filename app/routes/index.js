import Route from '@ember/routing/route';
import $ from 'jquery';
export default Route.extend({
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
