import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | Electric', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:electric');
    assert.ok(route);
  });
});
