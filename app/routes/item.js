import Route from '@ember/routing/route';

export default Route.extend({
    model(queryParams){
        console.log(queryParams.id);
        return $.ajax({
            url: '/api/item/',
            method: 'POST',
            data: {id:queryParams.id},
            success: function(res){
                item = res;
           }
        }).then(function(){
            return item;
        });
    }
});
