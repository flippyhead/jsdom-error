export default class Person {
  constructor(doc) {
    Object.assign(this, doc);
  }

  /**
   * Construct a full name from first and last names.
   *
   * @return {String} Their full name!
   */
  fullName() {
    return `${this.firstName || ''} ${this.lastName || ''}`.trim();
  }

  /**
   * Computes this persons roles from other data.
   *
   * @param  {String} communityId To scope to one of the users memberships to
   *   a specific community.
   * @return {[String]}           An array of roles.
   */
  roles(communityId) {
    const membership = this.membershipFor(communityId);
    const roles = [];

    if (membership) {
      roles.push('attendee');
      if (membership.isAdmin) roles.push('admin');
    } else {
      roles.push('anonymous');
    }

    return roles;
  }

  /**
   * Find the membership object to a specific community.
   *
   * @param  {String} communityId The id of a community.
   * @return {Object}             A membership object.
   */
  membershipFor(communityId) {
    if (!this.memberships) return null;
    return this.memberships.find(membership => membership.communityId === communityId);
  }
}
