const expect = require('chai').expect;
const UserOwned = require('../userOwned');

describe('the userOwned mixin', () => {

  const mockedModel = {
    observe: () => {}
  };
  let userOwned = UserOwned(mockedModel);

  describe('the build where filter function', () => {
    it('should add the userId param if the where object it\'s undefined', () => {
      const where = userOwned.buildWhereFilter(1);
      expect(where).to.deep.equal({ userId: 1});
    });

    describe('when filtering by a simple object', () => {
      it('should add the userId param ', () => {
        const where = userOwned.buildWhereFilter(1, { name : 'Aitkens'});
        expect(where).to.deep.equal({ and : [{ userId: 1}, { name: 'Aitkens'}]});
      });
    });

    describe('when having an or clause', () => {
      it('should create an and clause with the original or clause and the userId', () => {
        let where = userOwned.buildWhereFilter(1, { or: [{ name : { like :'%ho%'}},{ firstName :{ like : '%ho%'}}]});
        expect(where).to.deep.equal({ and : [{ userId : 1}, { or: [{ name :{ like :'%ho%'}},{ firstName :{ like : '%ho%'}}]}]});

        where = userOwned.buildWhereFilter(1, { or: [{ firstName :{ like : '%ho%'}}]});
        expect(where).to.deep.equal({ and : [{ userId : 1}, { or: [{ firstName :{ like : '%ho%'}}]}]});
      });
    });
  });
});
