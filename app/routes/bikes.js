import Route from '@ember/routing/route';
import $ from 'jquery';
import ENV from '../config/environment';
export default Route.extend({
    queryParams: {
        category: {
            refreshModel: true
        }
    },
    model(queryParams) {
        var cat = queryParams.category
        console.log("API CALL")
        var bikes = [];
        var searchData = {category:cat}
        return $.ajax({
            url: ENV.APP.storeApiUrl+'/api/bikes',
            method: 'POST',
            data: searchData,
            success: function (res) {
                bikes = res;
            }
        }).then(function (){
            return bikes;
        });
    },

});
