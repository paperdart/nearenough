/**
 * UI helper functions for the Local Instructor Training application
 */

/**
 * Creates and manages the loading indicator
 */
export function createLoadingIndicator() {
  const loadingContainer = document.createElement('div');
  loadingContainer.className = 'loading-container';
  
  const loadingText = document.createElement('div');
  loadingText.className = 'loading-text';
  loadingText.textContent = 'Loading location data...';
  
  loadingContainer.appendChild(loadingText);
  
  return {
    element: loadingContainer,
    
    show() {
      loadingContainer.style.display = 'block';
    },
    
    hide() {
      loadingContainer.style.display = 'none';
    },
    
    updateText(text) {
      loadingText.textContent = text;
    }
  };
}

/**
 * Renders the location data in the UI
 * @param {Object} locationData - The location data to display
 * @param {HTMLElement} container - The container to render into
 */
export function renderLocationData(locationData, container) {
  // Clear container
  container.innerHTML = '';

  const banner = document.createElement('div');
  banner.className = 'location-banner';

  // Create location text
  let locationText = '';
  let coordinatesText = '';
  
  if (locationData.city && locationData.country) {
    locationText = `${locationData.city}, ${locationData.country}`;
  } else {
    locationText = 'Location unknown';
  }

  if (locationData.latitude && locationData.longitude) {
    coordinatesText = `${locationData.latitude.toFixed(4)}, ${locationData.longitude.toFixed(4)}`;
  }

  // Create warning message for disabled location services
  let warningMessage = '';
  if (locationData.locationservices === 'disabled') {
    warningMessage = `
      <div class="location-warning">
        This is an approximate location. Enable location services for better accuracy.
      </div>
    `;
  }

  banner.innerHTML = `
    <div class="location-content">
      <div class="location-text">
        <img src="/E0A9.svg" alt="Location" class="location-icon" />
        <span class="location-label">Your location:</span>
        <span class="location-value">${locationText}</span>
        ${coordinatesText ? `<span class="location-coordinates">(${coordinatesText})</span>` : ''}
      </div>
      ${warningMessage}
    </div>
  `;

  container.appendChild(banner);
}

/**
 * Renders nearby events in the UI
 * @param {Array} events - Array of events with distances
 * @param {HTMLElement} container - The container to render into
 */
export function renderNearbyEvents(events, container) {
  if (!events.length) return;

  const eventsSection = document.createElement('div');
  eventsSection.className = 'nearby-events';
  
  eventsSection.innerHTML = `
    <h3>Nearby Events</h3>
    <div class="events-grid">
      ${events.map(event => `
        <div class="event-card">
          <h4>${event.name}</h4>
          <p class="event-type">${event.type}</p>
          <p class="event-address">
            ${event.address}
            <span class="event-distance">(${Math.round(event.distance)} ${event.unit})</span>
          </p>
          <p class="event-start">Starts: ${event.start}</p>
        </div>
      `).join('')}
    </div>
  `;

  container.appendChild(eventsSection);
}