/**
 * Application Module - Handles membership applications
 */

const ApplicationManager = {
  // Apply for membership
  apply(clubId, studentId, motivation) {
    // Validation
    if (!clubId || !studentId) {
      return { success: false, message: 'Invalid club or student information' };
    }
    if (!motivation || motivation.trim().length < 10) {
      return { success: false, message: 'Motivation statement must be at least 10 characters' };
    }

    // Check if already applied
    const existingApp = StorageManager.getApplications().find(app =>
      app.clubId == clubId && app.studentId == studentId
    );
    if (existingApp) {
      return { success: false, message: 'You have already applied for this club' };
    }

    const application = {
      clubId,
      studentId,
      motivation,
      status: 'pending'
    };

    StorageManager.addApplication(application);
    return { success: true, message: 'Application submitted successfully!' };
  },

  // Get student applications
  getStudentApplications(studentId) {
    const applications = StorageManager.getStudentApplications(studentId);
    return applications.map(app => {
      const club = StorageManager.getClubById(app.clubId);
      return {
        ...app,
        clubName: club ? club.name : 'Unknown Club',
        clubLogo: club ? club.logo : '🏢'
      };
    });
  },

  // Get application count by status
  getApplicationCountByStatus(studentId, status) {
    const applications = StorageManager.getStudentApplications(studentId);
    return applications.filter(app => app.status === status).length;
  },

  // Get applications grouped by status
  getApplicationsByStatus(studentId) {
    const applications = this.getStudentApplications(studentId);
    return {
      pending: applications.filter(app => app.status === 'pending'),
      approved: applications.filter(app => app.status === 'approved'),
      rejected: applications.filter(app => app.status === 'rejected')
    };
  },

  // Approve application (admin function)
  approveApplication(applicationId) {
    StorageManager.updateApplicationStatus(applicationId, 'approved');
    return { success: true, message: 'Application approved' };
  },

  // Reject application (admin function)
  rejectApplication(applicationId) {
    StorageManager.updateApplicationStatus(applicationId, 'rejected');
    return { success: true, message: 'Application rejected' };
  },

  // Get all applications (admin view)
  getAllApplications() {
    const applications = StorageManager.getApplications();
    return applications.map(app => {
      const student = StorageManager.getStudents().find(s => s.id == app.studentId);
      const club = StorageManager.getClubById(app.clubId);
      return {
        ...app,
        studentName: student ? student.fullName : 'Unknown Student',
        studentEmail: student ? student.email : 'N/A',
        clubName: club ? club.name : 'Unknown Club'
      };
    });
  }
};
