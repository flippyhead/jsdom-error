Package.describe({
  name: 'jsdom-error',
  version: '0.0.1'
});

Package.onUse(function(api) {
  api.versionsFrom('1.3.1');
  api.use('ecmascript');
  api.use('aldeed:collection2@2.9.1');
});

Package.onTest(function(api) {
  api.versionsFrom('1.3.1');
  api.use('ecmascript');
  api.use('aldeed:collection2@2.9.1');
  api.use('practicalmeteor:mocha');
  api.mainModule('collections.tests.js');
});
