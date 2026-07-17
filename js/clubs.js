/**
 * Clubs Module - Handles club-related operations
 */

const ClubsManager = {

  clubs: [],

  // Load clubs from Django backend
  async loadClubs() {

    try {

      const response = await fetch("http://127.0.0.1:8000/api/clubs/");

      const data = await response.json();

      this.clubs = data;

      return data;

    } catch(error) {

      console.error("Error loading clubs:", error);

      return [];

    }

  },


  // Get all clubs
  getClubs() {
    return this.clubs;
  },


  // Get club by ID
  getClubById(id) {

    return this.clubs.find(
      club => club.id == id
    );

  },


  // Search clubs
  searchClubs(query) {

    const searchTerm = query.toLowerCase();

    return this.clubs.filter(club =>
      club.name.toLowerCase().includes(searchTerm) ||
      club.description.toLowerCase().includes(searchTerm) ||
      club.category.toLowerCase().includes(searchTerm)
    );

  },


  // Filter clubs
  filterByCategory(category) {

    if(category === "All"){
      return this.clubs;
    }

    return this.clubs.filter(
      club => club.category === category
    );

  },


  // Categories
  getCategories(){

    return [
      "All",
      ...new Set(
        this.clubs.map(club => club.category)
      )
    ];

  },


  // Member count
  getMembersCount(clubId){

    const club = this.getClubById(clubId);

    return club ? club.memberCount || 0 : 0;

  },


  // Events (bado localStorage)
  getClubEvents(clubId){

    return StorageManager.getEventsByClub(clubId);

  },


  // Announcements
  getClubAnnouncements(clubId){

    return StorageManager.getAnnouncementsByClub(clubId);

  },


  // Applications
  isStudentMember(studentId, clubId){

    const applications = StorageManager.getApplications();

    return applications.some(app =>
      app.studentId == studentId &&
      app.clubId == clubId &&
      app.status === "approved"
    );

  },


  hasPendingApplication(studentId, clubId){

    const applications = StorageManager.getApplications();

    return applications.some(app =>
      app.studentId == studentId &&
      app.clubId == clubId &&
      app.status === "pending"
    );

  },


  getApplicationStatus(studentId, clubId){

    const applications = StorageManager.getApplications();

    const app = applications.find(a =>
      a.studentId == studentId &&
      a.clubId == clubId
    );

    return app ? app.status : null;

  }

};