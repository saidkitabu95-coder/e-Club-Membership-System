/**
 * Storage Module - Manages all localStorage operations
 * Handles user data, clubs, applications, events, and announcements
 */

const StorageManager = {
  // Initialize storage with default data
  init() {
    if (!localStorage.getItem('clubs')) {
      this.setClubs(this.getDefaultClubs());
    }
    if (!localStorage.getItem('students')) {
      this.setStudents([]);
    }
    if (!localStorage.getItem('applications')) {
      this.setApplications([]);
    }
    if (!localStorage.getItem('events')) {
      this.setEvents(this.getDefaultEvents());
    }
    if (!localStorage.getItem('announcements')) {
      this.setAnnouncements(this.getDefaultAnnouncements());
    }
    if (!localStorage.getItem('theme')) {
      localStorage.setItem('theme', 'light');
    }
  },

  // User/Auth Methods
  getStudents() {
    return JSON.parse(localStorage.getItem('students') || '[]');
  },

  setStudents(students) {
    localStorage.setItem('students', JSON.stringify(students));
  },

  addStudent(student) {
    const students = this.getStudents();
    student.id = Date.now();
    student.registeredAt = new Date().toISOString();
    students.push(student);
    this.setStudents(students);
    return student;
  },

  getStudent(email) {
    return this.getStudents().find(s => s.email === email);
  },

  getCurrentUser() {
    const userId = localStorage.getItem('currentUser');
    if (!userId) return null;
    return this.getStudents().find(s => s.id == userId);
  },

  setCurrentUser(email) {
    const student = this.getStudent(email);
    if (student) {
      localStorage.setItem('currentUser', student.id);
      return true;
    }
    return false;
  },

  logout() {
    localStorage.removeItem('currentUser');
  },

  isLoggedIn() {
    return !!localStorage.getItem('currentUser');
  },

  // Clubs Methods
  getClubs() {
    return JSON.parse(localStorage.getItem('clubs') || '[]');
  },

  setClubs(clubs) {
    localStorage.setItem('clubs', JSON.stringify(clubs));
  },

  getClubById(id) {
    return this.getClubs().find(c => c.id == id);
  },

  // Applications Methods
  getApplications() {
    return JSON.parse(localStorage.getItem('applications') || '[]');
  },

  setApplications(applications) {
    localStorage.setItem('applications', JSON.stringify(applications));
  },

  addApplication(application) {
    const applications = this.getApplications();
    application.id = Date.now();
    application.appliedAt = new Date().toISOString();
    application.status = 'pending';
    applications.push(application);
    this.setApplications(applications);
    return application;
  },

  getStudentApplications(studentId) {
    return this.getApplications().filter(app => app.studentId == studentId);
  },

  updateApplicationStatus(applicationId, status) {
    const applications = this.getApplications();
    const app = applications.find(a => a.id == applicationId);
    if (app) {
      app.status = status;
      app.updatedAt = new Date().toISOString();
      this.setApplications(applications);
      return app;
    }
    return null;
  },

  // Events Methods
  getEvents() {
    return JSON.parse(localStorage.getItem('events') || '[]');
  },

  setEvents(events) {
    localStorage.setItem('events', JSON.stringify(events));
  },

  getEventsByClub(clubId) {
    return this.getEvents().filter(e => e.clubId == clubId);
  },

  getUpcomingEvents() {
    const now = new Date();
    return this.getEvents().filter(e => new Date(e.date) > now).sort((a, b) => new Date(a.date) - new Date(b.date));
  },

  // Announcements Methods
  getAnnouncements() {
    return JSON.parse(localStorage.getItem('announcements') || '[]');
  },

  setAnnouncements(announcements) {
    localStorage.setItem('announcements', JSON.stringify(announcements));
  },

  getAnnouncementsByClub(clubId) {
    return this.getAnnouncements().filter(a => a.clubId == clubId).sort((a, b) => new Date(b.date) - new Date(a.date));
  },

  // Theme Methods
  getTheme() {
    return localStorage.getItem('theme') || 'light';
  },

  setTheme(theme) {
    localStorage.setItem('theme', theme);
  },

  // Default Data Methods
  getDefaultClubs() {
    return [
      {
        id: 1,
        name: 'PyCon Club',
        description: 'A community for Python enthusiasts and programmers',
        fullDescription: 'Join our vibrant community of Python developers! We organize workshops, coding competitions, and collaborative projects to enhance your programming skills.',
        logo: '🐍',
        category: 'Technology',
        objectives: [
          'Promote Python programming knowledge',
          'Organize coding workshops and seminars',
          'Host programming competitions',
          'Build collaborative projects',
          'Network with fellow developers'
        ],
        requirements: 'Any student interested in Python programming',
        fee: 'Free',
        memberCount: 245,
        founded: '2021',
        president: 'Ahmed Hassan'
      },
      {
        id: 2,
        name: 'Cybersecurity Club',
        description: 'Dedicated to protecting digital assets and learning cybersecurity',
        fullDescription: 'Explore the world of cybersecurity! Learn ethical hacking, network security, and protective measures to defend against cyber threats.',
        logo: '🔒',
        category: 'Technology',
        objectives: [
          'Educate on cybersecurity best practices',
          'Conduct security awareness sessions',
          'Organize CTF competitions',
          'Share latest security trends',
          'Build secure applications'
        ],
        requirements: 'Basic understanding of IT concepts preferred',
        fee: 'Free',
        memberCount: 189,
        founded: '2022',
        president: 'Sarah Johnson'
      },
      {
        id: 3,
        name: 'GIS Club',
        description: 'Geographic Information Systems for mapping and spatial analysis',
        fullDescription: 'Discover the power of geographic data! Master GIS tools and techniques for environmental analysis, urban planning, and location-based services.',
        logo: '🗺️',
        category: 'Geography',
        objectives: [
          'Learn GIS software and tools',
          'Conduct spatial analysis projects',
          'Explore environmental mapping',
          'Participate in GIS competitions',
          'Collaborate with research teams'
        ],
        requirements: 'Interest in geography and mapping',
        fee: 'Free',
        memberCount: 124,
        founded: '2020',
        president: 'Emma Davis'
      },
      {
        id: 4,
        name: 'Multimedia Club',
        description: 'Creative hub for video, design, photography, and digital media',
        fullDescription: 'Express your creativity! Learn video production, graphic design, photography, and digital storytelling with industry-standard tools.',
        logo: '🎨',
        category: 'Arts & Media',
        objectives: [
          'Develop multimedia skills',
          'Create short films and documentaries',
          'Design engaging graphics',
          'Master photo editing techniques',
          'Produce creative content'
        ],
        requirements: 'Passion for creative arts and media',
        fee: 'Free',
        memberCount: 178,
        founded: '2019',
        president: 'Michael Chen'
      }
    ];
  },

  getDefaultEvents() {
    return [
      {
        id: 1,
        clubId: 1,
        title: 'Python Workshop: Web Development with Django',
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        venue: 'Tech Lab, Building A',
        time: '14:00',
        description: 'Learn Django framework for building robust web applications',
        speaker: 'Dr. Ravi Kumar'
      },
      {
        id: 2,
        clubId: 1,
        title: 'Coding Competition: Python Challenge 2024',
        date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        venue: 'Main Auditorium',
        time: '10:00',
        description: 'Compete with peers in solving challenging Python problems',
        speaker: 'Club Management'
      },
      {
        id: 3,
        clubId: 2,
        title: 'Cybersecurity Seminar: Social Engineering Awareness',
        date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        venue: 'Conference Room 3',
        time: '15:30',
        description: 'Understand social engineering tactics and defense strategies',
        speaker: 'Dr. Lisa Anderson'
      },
      {
        id: 4,
        clubId: 3,
        title: 'GIS Practical Session: Remote Sensing Analysis',
        date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
        venue: 'GIS Lab',
        time: '13:00',
        description: 'Practical training on satellite imagery analysis using QGIS',
        speaker: 'Prof. Michael White'
      },
      {
        id: 5,
        clubId: 4,
        title: 'Video Production Workshop: Filmmaking Basics',
        date: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(),
        venue: 'Media Studio',
        time: '16:00',
        description: 'Learn cinematography, editing, and video production fundamentals',
        speaker: 'James Wilson'
      }
    ];
  },

  getDefaultAnnouncements() {
    return [
      {
        id: 1,
        clubId: 1,
        title: 'New Python 3.12 Features Discussion',
        content: 'Join us for an in-depth discussion on the latest features in Python 3.12 including PEP 701 and performance improvements.',
        date: new Date().toISOString(),
        priority: 'high'
      },
      {
        id: 2,
        clubId: 2,
        title: 'Cybersecurity Certification Path',
        content: 'We are organizing a certification training program. Interested members can register at the club office.',
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        priority: 'medium'
      },
      {
        id: 3,
        clubId: 3,
        title: 'GIS Project Competition 2024',
        content: 'Announce the GIS Project Competition with exciting prizes. Submissions deadline is 30 days from now.',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        priority: 'high'
      },
      {
        id: 4,
        clubId: 4,
        title: 'Adobe Creative Cloud Workshop',
        content: 'Free workshop on Adobe Photoshop, Premiere Pro, and After Effects for all members.',
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        priority: 'medium'
      }
    ];
  }
};

// Initialize storage when module loads
StorageManager.init();
