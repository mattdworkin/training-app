/**
 * Data service for handling training API
 */
export const DataService = {
  // API base URL - adjust for production as needed
  API_BASE_URL: process.env.REACT_APP_API_URL || 'http://127.0.0.1:5002/api',
  
  /**
   * Load training schedules from API
   */
  loadTrainingSchedules: async () => {
    try {
      const response = await fetch(`${DataService.API_BASE_URL}/training-schedules`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        const error = new Error(data.message || 'Failed to load training schedules');
        error.statusCode = response.status;
        error.response = data;
        throw error;
      }
      
      return data;
    } catch (error) {
      console.error('Error loading training schedules:', error);
      throw error;
    }
  },
  
  /**
   * Generate a training plan via API
   * @param {Object} userData - User data for plan generation
   * @param {number|string} userData.age - User's age (13-100)
   * @param {number|string} userData.weight - User's weight (kg or lbs based on weightUnit)
   * @param {string} [userData.weightUnit] - Weight unit ('kg' or 'lbs')
   * @param {string} userData.gender - User's gender (male/female/other)
   * @param {number|string} userData.weeklyMileage - Current weekly running mileage (0-50)
   */
  generateTrainingPlan: async (userData) => {
    try {
      // Validate data before sending to API
      if (!userData) {
        throw new Error('Invalid user data provided');
      }
      
      const weightUnit = userData.weightUnit === 'lbs' ? 'lbs' : 'kg';
      const weightValue = Number(userData.weight);
      const weightInKg = weightUnit === 'lbs' ? weightValue * 0.45359237 : weightValue;

      // Convert values to API format (kg)
      const processedData = {
        age: Number(userData.age),
        weight: Number(weightInKg.toFixed(2)),
        gender: userData.gender,
        weeklyMileage: Number(userData.weeklyMileage)
      };
      
      // Validate converted values
      if (isNaN(processedData.age) || 
          isNaN(processedData.weight) || 
          !processedData.gender || 
          isNaN(processedData.weeklyMileage)) {
        throw new Error('Invalid user data provided');
      }
      
      const response = await fetch(`${DataService.API_BASE_URL}/generate-plan`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        body: JSON.stringify(processedData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        const error = new Error(data.message || 'Failed to generate training plan');
        error.statusCode = response.status;
        error.response = data;
        throw error;
      }
      
      return data;
    } catch (error) {
      console.error('Error generating training plan:', error);
      throw error;
    }
  }
};

export default DataService; 
