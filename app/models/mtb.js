import DS from 'ember-data';

export default DS.Model.extend({
    category: DS.attr(),
    subCategory: DS.attr(),
    name: DS.attr(),
    description: DS.attr(),
    image: DS.attr(),
    price: DS.attr()
});
