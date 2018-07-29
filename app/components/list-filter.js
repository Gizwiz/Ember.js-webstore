import Component from '@ember/component';
export default Component.extend({
    
    init(){
        this._super(...arguments);
        var options = JSON.parse(this.options)
        this.set('options',options.options )
    },

});
