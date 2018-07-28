import Route from '@ember/routing/route';
import $ from 'jquery';
import { inject as service } from '@ember/service';
import ENV from '../config/environment';
export default Route.extend( {
    stapi: service('store-api'),
    model() {
        var item;

        return $.ajax({
            url: ENV.APP.storeApiUrl+'/api/showcase/',
            method: 'POST',
            success: function (res) {
                item = res;
            }
        }).then(function () {
            return item;
        });
    }
});
