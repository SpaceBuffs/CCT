describe('UsersService', function () {
  'use strict';

  beforeEach(function () {
    MeteorStubs.install();
    mock(global, 'users');
  });

  afterEach(function () {
    MeteorStubs.uninstall();
  });

  describe('getUsersList', function () {
    it('should ask for the users in primarily in descending score order, then in alphabetical order and return them', function () {
      var result = {};
      spyOn(users, 'find').and.returnValue(result);

      expect(UsersService.getUsersList()).toBe(result);
      expect(users.find.calls.argsFor(0)).toEqual([{}, {sort: {score: -1, name: 1}}]);
    });
  });
/*
  describe('getPlayer', function () {
    it('should ask for the player with the given id and return it', function () {
      var playerId = 1;
      var result = {_id: playerId};
      spyOn(Players, 'findOne').and.returnValue(result);

      expect(PlayersService.getPlayer(playerId)).toBe(result);
      expect(Players.findOne.calls.argsFor(0)).toEqual([playerId]);
    });
  });

  describe('rewardPlayer', function () {
    it('should add 5 points to the player score with the given id', function () {
      var playerId = 1;
      spyOn(Players, 'update');

      PlayersService.rewardPlayer(playerId);
      expect(Players.update.calls.argsFor(0)).toEqual([playerId, {$inc: {score: 5}}]);
    });
  });

  describe('playersExist', function () {
    it('should return true when players exist', function () {
      var cursor = {
        count: function () {
          return 1;
        }
      };
      spyOn(Players, 'find').and.returnValue(cursor);
      expect(PlayersService.playersExist()).toBe(true);
    });

    it('should return false when no players exist', function () {
      var cursor = {
        count: function () {
          return 0;
        }
      };
      spyOn(Players, 'find').and.returnValue(cursor);
      expect(PlayersService.playersExist()).toBe(false);
    });
  }); */

});