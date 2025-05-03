import './style.css'
import LocalTraining from './js/localevents.js'
import { createLoadingIndicator, renderLocationData, renderNearbyEvents } from './js/ui.js'

// Initialize the application
document.addEventListener('DOMContentLoaded', async () => {
  // Create loading indicator
  const loadingIndicator = createLoadingIndicator();
  const loadingContainer = document.getElementById('loadingContainer');
  loadingContainer.appendChild(loadingIndicator.element);
  
  // Get location container
  const locationContainer = document.getElementById('locationContainer');
  
  // Show loading indicator
  loadingIndicator.show();
  
  try {
    // Initialize LocalTraining library
    const localTraining = new LocalTraining();
    
    // Get location data
    const locationData = await localTraining.location();
    
    // Hide loading indicator
    loadingIndicator.hide();
    
    // Render location data
    renderLocationData(locationData, locationContainer);

    // Get and render nearby events
    const nearbyEvents = await localTraining.getClosestEvents(3);
    renderNearbyEvents(nearbyEvents, locationContainer);
    
  } catch (error) {
    console.error('Error loading application:', error);
    loadingIndicator.updateText('Error loading location data. Please try again.');
    
    // Create an error message
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.innerHTML = `
      <h3>Error Loading Location</h3>
      <p>There was a problem determining your location. Please try refreshing the page.</p>
      <p class="error-details">${error.message}</p>
    `;
    
    loadingIndicator.hide();
    locationContainer.appendChild(errorElement);
  }
});
