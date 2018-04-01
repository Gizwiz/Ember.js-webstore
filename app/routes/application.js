import Route from '@ember/routing/route';

export default Route.extend({
    model() {
        return [
            {
                name: 'MTB',
            },
            {
                name: 'Road',
            },
            {
                name: 'Cyclocross',
            },
            {
                name: 'Triathlon',
            },
            {
                name: 'Trekking',
            },
            {
                name: 'Urban',
            },
            {
                name: 'Electric'
            },
        ]
    }
});
