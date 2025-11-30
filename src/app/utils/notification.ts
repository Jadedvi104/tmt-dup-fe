/**
 * Displays a simple notification toast without blocking the UI
 * @param message The message to display
 */
export const showNotification = (message: string): void => {
  const notification = document.createElement('div');
  notification.className = 'fixed top-4 right-4 bg-teal-600 text-white px-4 py-3 rounded-lg shadow-xl z-50 transition-transform duration-300 transform translate-y-0 opacity-100';
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add('translate-y-4', 'opacity-0');
    notification.addEventListener('transitionend', () => notification.remove());
  }, 3000);
};
