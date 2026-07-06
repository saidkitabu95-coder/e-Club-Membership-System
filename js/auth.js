/**
 * Authentication Module - Handles user login and registration
 */

const AuthManager = {
  // Register new student
  register(formData) {
    // Validation
    if (!formData.fullName || formData.fullName.trim().length < 2) {
      return { success: false, message: 'Full name is required and must be at least 2 characters' };
    }
    if (!formData.regNumber || formData.regNumber.trim().length < 3) {
      return { success: false, message: 'Registration number is required' };
    }
    if (!this.isValidEmail(formData.email)) {
      return { success: false, message: 'Invalid email address' };
    }
    if (!formData.password || formData.password.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters' };
    }
    if (formData.password !== formData.confirmPassword) {
      return { success: false, message: 'Passwords do not match' };
    }

    // Check if email already exists
    if (StorageManager.getStudent(formData.email)) {
      return { success: false, message: 'Email already registered' };
    }

    // Create new student
    const student = {
      fullName: formData.fullName,
      regNumber: formData.regNumber,
      email: formData.email,
      password: this.hashPassword(formData.password),
      department: formData.department || 'Not specified',
      year: formData.year || 'Not specified'
    };

    StorageManager.addStudent(student);
    return { success: true, message: 'Registration successful! You can now login.' };
  },

  // Login user
  login(email, password) {
    if (!this.isValidEmail(email)) {
      return { success: false, message: 'Invalid email address' };
    }
    if (!password) {
      return { success: false, message: 'Password is required' };
    }

    const student = StorageManager.getStudent(email);
    if (!student) {
      return { success: false, message: 'Email not found' };
    }

    if (!this.verifyPassword(password, student.password)) {
      return { success: false, message: 'Invalid password' };
    }

    StorageManager.setCurrentUser(email);
    return { success: true, message: 'Login successful!', student };
  },

  // Logout user
  logout() {
    StorageManager.logout();
    return { success: true, message: 'Logged out successfully' };
  },

  // Email validation
  isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  },

  // Simple password hashing (in production, use bcrypt or similar)
  hashPassword(password) {
    return btoa(password); // Base64 encoding for demo
  },

  // Verify password
  verifyPassword(password, hash) {
    return btoa(password) === hash;
  },

  // Check if user is authenticated
  isAuthenticated() {
    return StorageManager.isLoggedIn();
  },

  // Get current user
  getCurrentUser() {
    return StorageManager.getCurrentUser();
  },

  // Remember me functionality
  rememberUser(email) {
    localStorage.setItem('rememberedEmail', email);
  },

  getRememberedEmail() {
    return localStorage.getItem('rememberedEmail') || '';
  },

  clearRememberedEmail() {
    localStorage.removeItem('rememberedEmail');
  }
};
