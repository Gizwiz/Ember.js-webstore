import DS from 'ember-data';

export default DS.Model.extend({
    category: DS.attr(),
    name: DS.attr(),
    description: DS.attr(),
    price: DS.attr('number'),
    unit: DS.attr(),
    img: DS.attr(),
    salesPoints: DS.attr(),
});
