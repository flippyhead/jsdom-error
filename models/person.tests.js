import Person from './person.js';
import { expect } from 'meteor/practicalmeteor:chai';
import { Random } from 'meteor/random';

describe('Person class', () => {
  const communityId = Random.id();

  describe('a valid person', () => {
    describe('full name', () => {
      it('should include firstName and lastName', () => {
        const person = new Person({
          firstName: 'John',
          lastName: 'Doe',
        });
        expect(person.fullName()).to.equal('John Doe');
      });

      it('should handle blank first name', () => {
        const person = new Person({
          firstName: 'John',
        });
        expect(person.fullName()).to.equal('John');
      });

      it('should handle blank last name', () => {
        const person = new Person({
          firstName: 'Doe',
        });
        expect(person.fullName()).to.equal('Doe');
      });
    });
  });

  describe('roles', () => {
    describe('without membership', () => {
      it('should be anonymous with no membership', () => {
        const person = new Person({});
        expect(person.roles()).to.be.eql(['anonymous']);
      });
    });

    describe('with membership', () => {
      it('should not be admin but be attendee', () => {
        const person = new Person({ memberships: [{ communityId }] });
        expect(person.roles(communityId)).to.include('attendee').and.not.include('admin');
      });

      it('should not be admin but be attendee', () => {
        const person = new Person({ memberships: [{ communityId, isAdmin: true }] });
        expect(person.roles(communityId)).
          to.include('attendee').
          and.include('admin').
          and.not.include('pathable-admin');
      });
    });
  });
});
