import Route from '@ember/routing/route';
import $ from 'jquery';
export default Route.extend({
    model(queryParams){
        var item;
        return $.ajax({
            url: '/api/item/',
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
