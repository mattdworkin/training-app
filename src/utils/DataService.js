/**
 * Data service for handling training and integration APIs
 */
export const DataService = {
  API_BASE_URL: process.env.REACT_APP_API_URL || 'http://127.0.0.1:5002/api',

  async request(path, options = {}) {
    const response = await fetch(`${DataService.API_BASE_URL}${path}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      credentials: 'same-origin',
      ...options,
    });

    const data = await response.json();
    if (!response.ok) {
      const error = new Error(data.message || 'Request failed');
      error.statusCode = response.status;
      error.response = data;
      throw error;
    }

    return data;
  },

  async loadTrainingSchedules() {
    return DataService.request('/training-schedules', { method: 'GET' });
  },

  /**
   * Generate a training plan via API
   * @param {Object} userData
   * @param {number|string} userData.age
   * @param {number|string} userData.weight
   * @param {string} [userData.weightUnit] - kg | lbs
   * @param {string} userData.gender
   * @param {number|string} userData.weeklyMileage
   */
  async generateTrainingPlan(userData) {
    if (!userData) {
      throw new Error('Invalid user data provided');
    }

    const weightUnit = userData.weightUnit === 'lbs' ? 'lbs' : 'kg';
    const weightValue = Number(userData.weight);
    const weightInKg = weightUnit === 'lbs' ? weightValue * 0.45359237 : weightValue;

    const processedData = {
      age: Number(userData.age),
      weight: Number(weightInKg.toFixed(2)),
      gender: userData.gender,
      weeklyMileage: Number(userData.weeklyMileage),
    };

    if (
      Number.isNaN(processedData.age) ||
      Number.isNaN(processedData.weight) ||
      !processedData.gender ||
      Number.isNaN(processedData.weeklyMileage)
    ) {
      throw new Error('Invalid user data provided');
    }

    return DataService.request('/generate-plan', {
      method: 'POST',
      body: JSON.stringify(processedData),
    });
  },

  // -------- Strava integration --------
  async getStravaConfig() {
    return DataService.request('/integrations/strava/config', { method: 'GET' });
  },

  async getStravaAuthUrl(redirectUri) {
    const query = redirectUri ? `?redirectUri=${encodeURIComponent(redirectUri)}` : '';
    return DataService.request(`/integrations/strava/auth-url${query}`, { method: 'GET' });
  },

  async exchangeStravaCode({ code, state }) {
    return DataService.request('/integrations/strava/exchange-code', {
      method: 'POST',
      body: JSON.stringify({ code, state }),
    });
  },

  async getStravaStatus(connectionId) {
    return DataService.request(`/integrations/strava/status/${encodeURIComponent(connectionId)}`, {
      method: 'GET',
    });
  },

  async syncStrava(connectionId, limit = 25) {
    return DataService.request('/integrations/strava/sync', {
      method: 'POST',
      body: JSON.stringify({ connectionId, limit }),
    });
  },

  async disconnectStrava(connectionId) {
    return DataService.request('/integrations/strava/disconnect', {
      method: 'POST',
      body: JSON.stringify({ connectionId }),
    });
  },

  // -------- Apple Health integration --------
  async importAppleHealth(workouts, connectionId = null) {
    return DataService.request('/integrations/apple-health/import', {
      method: 'POST',
      body: JSON.stringify({ workouts, connectionId }),
    });
  },

  async getAppleHealthStatus(connectionId) {
    return DataService.request(`/integrations/apple-health/status/${encodeURIComponent(connectionId)}`, {
      method: 'GET',
    });
  },

  async disconnectAppleHealth(connectionId) {
    return DataService.request('/integrations/apple-health/disconnect', {
      method: 'POST',
      body: JSON.stringify({ connectionId }),
    });
  },
};

export default DataService;
