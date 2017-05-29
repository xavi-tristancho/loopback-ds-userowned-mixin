module.exports = function mixin (app) {
  app.loopback.modelBuilder.mixins.define('UserOwned', require('./userOwned'));
};
