const userOwned = (Model) => {

  return {
    buildWhereFilter: buildWhereFilter
  };

  Model.observe('access', (ctx, next) => {

    if(ctx.options.accessToken) {
      ctx.query.where = buildWhereFilter(ctx.options.accessToken.userId, ctx.query.where);
    }

    next();
  });

  function buildWhereFilter(userId, where) {

    if (where) {
      where = { and : [{ userId : userId }, where]};
    } else {
      where = { userId: userId };
    }

    return where;
  }

  Model.observe('before save', (ctx, next) => {

    const instance = ctx.instance || ctx.currentInstance;

    if (ctx.options.accessToken)
      instance.userId = ctx.options.accessToken.userId;

    next();
  });
};

module.exports = userOwned;
