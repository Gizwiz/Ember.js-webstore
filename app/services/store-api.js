import Service from '@ember/service';
import $ from 'jquery'
export default Service.extend({
    items: null,
    
    init() {
        this._super(...arguments);
        console.log("stapi init")
        var item;
        $.ajax({
            url: 'http://localhost:30002/api/showcase/',
            method: 'POST',
            success: function (res) {
                item = res;
                console.log(item)
            }
        }).then(function () {
            return item;
        });
        this.set('items', item);
        
    },

    get(){
        console.log("stapi init")
        var item;
        $.ajax({
            url: 'http://localhost:30002/api/showcase/',
            method: 'POST',
            success: function (res) {
                item = res;
                console.log(item)
            }
        }).then(function () {
            return item;
        });
        this.set('items', item);
    }


});
