import Controller from '@ember/controller';

export default Controller.extend({
    submitAction : function(){
        // here you could perform your actions like persisting to the server or so
        alert("now we can submit the model:" + this.get("model"));
    }
});
