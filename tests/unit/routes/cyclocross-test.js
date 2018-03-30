import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | Cyclocross', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:cyclocross');
    assert.ok(route);
  });
});
