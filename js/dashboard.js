/**
 * Dashboard Module - Handles dashboard operations
 */

const DashboardManager = {
  // Get dashboard statistics
  getStatistics(studentId) {
    const totalClubs = StorageManager.getClubs().length;
    const applications = StorageManager.getStudentApplications(studentId);
    const approvedCount = applications.filter(app => app.status === 'approved').length;
    const pendingCount = applications.filter(app => app.status === 'pending').length;
    const rejectedCount = applications.filter(app => app.status === 'rejected').length;

    return {
      totalClubs,
      appliedClubs: applications.length,
      approvedClubs: approvedCount,
      pendingClubs: pendingCount,
      rejectedClubs: rejectedCount,
      upcomingEvents: StorageManager.getUpcomingEvents().length
    };
  },

  // Get recent announcements
  getRecentAnnouncements(limit = 5) {
    const announcements = StorageManager.getAnnouncements();
    return announcements
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limit)
      .map(ann => {
        const club = StorageManager.getClubById(ann.clubId);
        return {
          ...ann,
          clubName: club ? club.name : 'Unknown Club',
          clubLogo: club ? club.logo : '🏢'
        };
      });
  },

  // Get upcoming events for applied clubs
  getUpcomingEventsForStudentClubs(studentId, limit = 5) {
    const applications = StorageManager.getStudentApplications(studentId);
    const approvedClubIds = applications
      .filter(app => app.status === 'approved')
      .map(app => app.clubId);

    const allEvents = StorageManager.getUpcomingEvents();
    const relevantEvents = allEvents.filter(event => approvedClubIds.includes(event.clubId));

    return relevantEvents
      .slice(0, limit)
      .map(event => {
        const club = StorageManager.getClubById(event.clubId);
        return {
          ...event,
          clubName: club ? club.name : 'Unknown Club',
          clubLogo: club ? club.logo : '🏢'
        };
      });
  },

  // Get member details
  getMemberDetails(studentId) {
    const student = StorageManager.getStudents().find(s => s.id == studentId);
    if (!student) return null;

    const joinedClubs = StorageManager.getStudentApplications(studentId)
      .filter(app => app.status === 'approved')
      .map(app => {
        const club = StorageManager.getClubById(app.clubId);
        return {
          clubId: app.clubId,
          clubName: club ? club.name : 'Unknown',
          clubLogo: club ? club.logo : '🏢',
          joinedDate: app.appliedAt
        };
      });

    return {
      ...student,
      joinedClubs,
      totalClubsJoined: joinedClubs.length
    };
  },

  // Format date for display
  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  },

  // Format time for display
  formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  },

  // Get relative time (e.g., "2 days ago")
  getRelativeTime(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return this.formatDate(dateString);
  }
};

document.addEventListener("DOMContentLoaded", () => {

    const student = JSON.parse(localStorage.getItem("student"));

    if (!student) {
        window.location.href = "login.html";
        return;
    }

    // Student Information
    document.getElementById("studentName").textContent = student.full_name;
    document.getElementById("studentEmail").textContent = student.email;
    document.getElementById("studentYear").textContent = student.year_of_study;

});
