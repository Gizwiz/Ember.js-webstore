import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | Urban', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:urban');
    assert.ok(route);
  });
});
