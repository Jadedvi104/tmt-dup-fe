/**
 * Toast Notification Utility
 * Provides feedback to users with success, error, and info messages
 */

type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface ToastOptions {
  duration?: number;
  position?: 'top' | 'bottom';
}

/**
 * Display a toast notification to the user
 * @param message - The message to display
 * @param type - The type of notification (success, error, info, warning)
 * @param options - Optional configuration for the toast
 */
export const showNotification = (
  message: string,
  type: NotificationType = 'info',
  options: ToastOptions = {}
): void => {
  const { duration = 3000, position = 'top' } = options;

  // Create toast element
  const toast = document.createElement('div');
  const toastId = `toast-${Date.now()}`;
  toast.id = toastId;

  // Base styles
  const baseStyles = `
    position: fixed;
    ${position}-10px;
    right: 20px;
    padding: 16px 24px;
    border-radius: 8px;
    font-weight: 500;
    color: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 9999;
    max-width: 400px;
    word-wrap: break-word;
    animation: slideIn 0.3s ease-in-out;
    font-size: 14px;
  `;

  // Type-specific styles
  const typeStyles: Record<NotificationType, string> = {
    success: 'background-color: #10b981; border-left: 4px solid #059669;',
    error: 'background-color: #ef4444; border-left: 4px solid #dc2626;',
    info: 'background-color: #3b82f6; border-left: 4px solid #1d4ed8;',
    warning: 'background-color: #f59e0b; border-left: 4px solid #d97706;',
  };

  toast.setAttribute('style', `${baseStyles} ${typeStyles[type]}`);
  toast.textContent = message;
  toast.setAttribute('role', 'alert');

  // Add animation styles to head if not already present
  if (!document.getElementById('toast-styles')) {
    const style = document.createElement('style');
    style.id = 'toast-styles';
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(400px);
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
          transform: translateX(400px);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Append toast to body
  document.body.appendChild(toast);

  // Remove toast after duration
  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease-in-out';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, duration);
};

/**
 * Show a success notification
 */
export const showSuccess = (message: string, options?: ToastOptions): void => {
  showNotification(message, 'success', options);
};

/**
 * Show an error notification
 */
export const showError = (message: string, options?: ToastOptions): void => {
  showNotification(message, 'error', options);
};

/**
 * Show an info notification
 */
export const showInfo = (message: string, options?: ToastOptions): void => {
  showNotification(message, 'info', options);
};

/**
 * Show a warning notification
 */
export const showWarning = (message: string, options?: ToastOptions): void => {
  showNotification(message, 'warning', options);
};
