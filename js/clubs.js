/**
 * Clubs Module - Handles club-related operations
 */

const ClubsManager = {
  // Get all clubs
  getClubs() {
    return StorageManager.getClubs();
  },

  // Get club by ID
  getClubById(id) {
    return StorageManager.getClubById(id);
  },

  // Search clubs by name or description
  searchClubs(query) {
    const clubs = this.getClubs();
    const searchTerm = query.toLowerCase();
    return clubs.filter(club =>
      club.name.toLowerCase().includes(searchTerm) ||
      club.description.toLowerCase().includes(searchTerm) ||
      club.category.toLowerCase().includes(searchTerm)
    );
  },

  // Filter clubs by category
  filterByCategory(category) {
    if (category === 'All') {
      return this.getClubs();
    }
    return this.getClubs().filter(club => club.category === category);
  },

  // Get unique categories
  getCategories() {
    const clubs = this.getClubs();
    const categories = ['All', ...new Set(clubs.map(club => club.category))];
    return categories;
  },

  // Get club members count
  getMembersCount(clubId) {
    const club = this.getClubById(clubId);
    return club ? club.memberCount : 0;
  },

  // Get club events
  getClubEvents(clubId) {
    return StorageManager.getEventsByClub(clubId);
  },

  // Get club announcements
  getClubAnnouncements(clubId) {
    return StorageManager.getAnnouncementsByClub(clubId);
  },

  // Check if student is already a member (has approved application)
  isStudentMember(studentId, clubId) {
    const applications = StorageManager.getApplications();
    return applications.some(app =>
      app.studentId == studentId &&
      app.clubId == clubId &&
      app.status === 'approved'
    );
  },

  // Check if student has pending application
  hasPendingApplication(studentId, clubId) {
    const applications = StorageManager.getApplications();
    return applications.some(app =>
      app.studentId == studentId &&
      app.clubId == clubId &&
      app.status === 'pending'
    );
  },

  // Get application status for a club
  getApplicationStatus(studentId, clubId) {
    const applications = StorageManager.getApplications();
    const app = applications.find(a =>
      a.studentId == studentId &&
      a.clubId == clubId
    );
    return app ? app.status : null;
  }
};
