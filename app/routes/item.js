import Route from '@ember/routing/route';
import $ from 'jquery';
import ENV from '../config/environment';
export default Route.extend({
    queryParams: {
        id: {
            refreshModel: true
        }
    },
    model(queryParams){
        var item;
        return $.ajax({
            url: ENV.APP.storeApiUrl+'/api/item/',
            method: 'POST',
            data: {id:queryParams.id},
            success: function(res){
                item = res;
           }
        }).then(function(){
            console.log(item);
            return item;
        });
    }
});
