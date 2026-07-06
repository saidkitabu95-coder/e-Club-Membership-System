/**
 * Main App Module - Global app functionality and initialization
 */

const App = {
  // Initialize app
  init() {
    this.checkAuthStatus();
    this.setupThemeToggle();
    this.setupNotifications();
    this.setupNavigation();
  },

  // Check if user is logged in and redirect if needed
  checkAuthStatus() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const protectedPages = ['dashboard.html', 'apply.html', 'status.html'];
    const isProtected = protectedPages.some(page => currentPage.includes(page));

    if (isProtected && !AuthManager.isAuthenticated()) {
      // Redirect to login if trying to access protected page
      // Only redirect if not already on login/register
      if (!currentPage.includes('login.html') && !currentPage.includes('register.html')) {
        this.showNotification('Please login first', 'warning');
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 1500);
      }
    }

    // Update navigation based on auth status
    this.updateNavigation();
  },

  // Update navigation menu based on auth status
  updateNavigation() {
    const isLoggedIn = AuthManager.isAuthenticated();
    const authLinks = document.getElementById('authLinks');
    const loggedInLinks = document.getElementById('loggedInLinks');

    if (authLinks && loggedInLinks) {
      if (isLoggedIn) {
        authLinks.style.display = 'none';
        loggedInLinks.style.display = 'flex';

        const user = AuthManager.getCurrentUser();
        const userNameElement = document.getElementById('userName');
        if (userNameElement && user) {
          userNameElement.textContent = user.fullName.split(' ')[0];
        }
      } else {
        authLinks.style.display = 'flex';
        loggedInLinks.style.display = 'none';
      }
    }
  },

  // Setup theme toggle
  setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    const currentTheme = StorageManager.getTheme();

    // Set initial theme
    htmlElement.setAttribute('data-theme', currentTheme);

    if (themeToggle) {
      // Update icon based on current theme
      this.updateThemeIcon(themeToggle, currentTheme);

      themeToggle.addEventListener('click', () => {
        const theme = StorageManager.getTheme();
        const newTheme = theme === 'light' ? 'dark' : 'light';

        StorageManager.setTheme(newTheme);
        htmlElement.setAttribute('data-theme', newTheme);
        this.updateThemeIcon(themeToggle, newTheme);
        this.showNotification(`Switched to ${newTheme} mode`, 'info');
      });
    }
  },

  // Update theme toggle icon
  updateThemeIcon(toggle, theme) {
    if (theme === 'dark') {
      toggle.innerHTML = '☀️';
      toggle.title = 'Switch to Light Mode';
    } else {
      toggle.innerHTML = '🌙';
      toggle.title = 'Switch to Dark Mode';
    }
  },

  // Setup notification system
  setupNotifications() {
    // Notifications are shown via showNotification method
  },

  // Show notification popup
  showNotification(message, type = 'info', duration = 3000) {
    const notificationContainer = document.getElementById('notificationContainer');
    if (!notificationContainer) return;

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <span>${message}</span>
      <button class="notification-close">&times;</button>
    `;

    notificationContainer.appendChild(notification);

    // Remove notification on close click
    notification.querySelector('.notification-close').addEventListener('click', () => {
      notification.remove();
    });

    // Auto remove after duration
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, duration);
  },

  // Setup navigation
  setupNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar-menu');

    if (menuToggle && navbar) {
      menuToggle.addEventListener('click', () => {
        navbar.classList.toggle('active');
      });

      // Close menu when link is clicked
      document.querySelectorAll('.navbar-menu a').forEach(link => {
        link.addEventListener('click', () => {
          navbar.classList.remove('active');
        });
      });
    }
  },

  // Logout user
  logout() {
    AuthManager.logout();
    this.showNotification('Logged out successfully', 'success');
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1500);
  },

  // Format date helper
  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  },

  // Format datetime helper
  formatDateTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  },

  // Validate email format
  validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  },

  // Validate form field (empty check)
  validateRequired(value) {
    return value && value.trim().length > 0;
  },

  // Show/hide loading spinner
  showLoading(show = true) {
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) {
      spinner.style.display = show ? 'flex' : 'none';
    }
  }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
