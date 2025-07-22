// Billing Software JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('open');
        });
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                sidebar.classList.remove('open');
            }
        }
    });

    // Navigation link highlighting
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all nav items
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Add active class to clicked nav item
            this.closest('.nav-item').classList.add('active');
            
            // Update header title
            const title = this.querySelector('span').textContent;
            document.querySelector('.header h1').textContent = title;
            
            // Close mobile menu
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('open');
            }
        });
    });

    // Chart bar hover effects
    const chartBars = document.querySelectorAll('.bar');
    chartBars.forEach(bar => {
        bar.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        bar.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Action buttons
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.textContent.trim();
            
            // Simple notification system
            showNotification(`${action} clicked!`, 'info');
        });
    });

    // Notification system
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-info-circle"></i>
                <span>${message}</span>
                <button class="notification-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        // Add notification styles if not already added
        if (!document.getElementById('notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: white;
                    border-radius: 0.5rem;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    z-index: 9999;
                    animation: slideIn 0.3s ease;
                    min-width: 300px;
                    border-left: 4px solid #3b82f6;
                }
                
                .notification.success {
                    border-left-color: #10b981;
                }
                
                .notification.error {
                    border-left-color: #ef4444;
                }
                
                .notification.warning {
                    border-left-color: #f59e0b;
                }
                
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    padding: 1rem;
                }
                
                .notification-content i:first-child {
                    color: #3b82f6;
                    font-size: 1.125rem;
                }
                
                .notification.success .notification-content i:first-child {
                    color: #10b981;
                }
                
                .notification.error .notification-content i:first-child {
                    color: #ef4444;
                }
                
                .notification.warning .notification-content i:first-child {
                    color: #f59e0b;
                }
                
                .notification-content span {
                    flex: 1;
                    color: #374151;
                    font-weight: 500;
                }
                
                .notification-close {
                    background: none;
                    border: none;
                    color: #9ca3af;
                    cursor: pointer;
                    padding: 0.25rem;
                    border-radius: 0.25rem;
                    transition: all 0.2s ease;
                }
                
                .notification-close:hover {
                    background: #f3f4f6;
                    color: #6b7280;
                }
                
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @keyframes slideOut {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        // Add to page
        document.body.appendChild(notification);

        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', function() {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        });

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }
        }, 5000);
    }

    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            
            if (searchTerm.length > 2) {
                // Simulate search functionality
                console.log('Searching for:', searchTerm);
                
                // Here you would typically make an API call to search
                // For demo purposes, we'll just log it
                if (searchTerm === 'invoice') {
                    showNotification('Found 15 invoices matching your search', 'success');
                }
            }
        });
    }

    // Notification bell click
    const notificationBtn = document.querySelector('.notification-btn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function() {
            showNotification('You have 3 new notifications', 'info');
        });
    }

    // User profile dropdown simulation
    const userProfile = document.querySelector('.user-profile');
    if (userProfile) {
        userProfile.addEventListener('click', function() {
            showNotification('User menu opened', 'info');
        });
    }

    // Table row click handlers
    const tableRows = document.querySelectorAll('.invoices-table tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('click', function() {
            // Remove previous selection
            tableRows.forEach(r => r.classList.remove('selected'));
            
            // Add selection to clicked row
            this.classList.add('selected');
            
            const invoiceNumber = this.querySelector('td:first-child').textContent;
            showNotification(`Selected invoice ${invoiceNumber}`, 'info');
        });
    });

    // Add table row selection styles
    const tableStyle = document.createElement('style');
    tableStyle.textContent = `
        .invoices-table tbody tr {
            cursor: pointer;
            transition: background-color 0.2s ease;
        }
        
        .invoices-table tbody tr:hover {
            background-color: #f8fafc;
        }
        
        .invoices-table tbody tr.selected {
            background-color: #eff6ff;
            border-left: 3px solid #3b82f6;
        }
    `;
    document.head.appendChild(tableStyle);

    // Initialize tooltips for chart bars
    chartBars.forEach(bar => {
        bar.setAttribute('title', bar.getAttribute('data-value'));
    });

    // Simulate real-time updates
    function updateStats() {
        const statValues = document.querySelectorAll('.stat-value');
        statValues.forEach(stat => {
            const currentValue = stat.textContent;
            if (currentValue.includes('$')) {
                // Simulate small random changes in revenue
                const numericValue = parseFloat(currentValue.replace(/[$,]/g, ''));
                const change = (Math.random() - 0.5) * 100;
                const newValue = Math.max(0, numericValue + change);
                stat.textContent = `$${newValue.toLocaleString()}`;
            }
        });
    }

    // Update stats every 30 seconds (for demo purposes)
    setInterval(updateStats, 30000);

    // Add smooth scrolling to navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Initialize the application
    console.log('InvoicePro Billing Software initialized successfully!');
    
    // Show welcome notification
    setTimeout(() => {
        showNotification('Welcome to InvoicePro! 🎉', 'success');
    }, 1000);
});

// Additional utility functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }).format(new Date(date));
}

// Export functions for potential use by other scripts
window.BillingApp = {
    formatCurrency,
    formatDate,
    showNotification: function(message, type) {
        // This would be available globally
        document.dispatchEvent(new CustomEvent('showNotification', {
            detail: { message, type }
        }));
    }
};
