/**
 * Training calculator utility functions
 */
export const TrainingCalculator = {
  /**
   * Calculate target weekly mileage based on user parameters
   */
  calculateTargetWeeklyMileage: (age, weight, gender, currentWeeklyMileage) => {
    // Base calculation on current mileage
    let targetMileage = currentWeeklyMileage;
    
    // Age factor (gradually reduce as age increases)
    const ageFactor = age > 40 ? 0.95 - ((age - 40) * 0.01) : 1.0;
    
    // Weight factor (in kg)
    const weightFactor = weight > 80 ? 0.95 - ((weight - 80) * 0.005) : 1.0;
    
    // Gender adjustment (small biological differences in average capacity)
    const genderFactor = gender.toLowerCase() === 'female' ? 0.9 : 1.0;
    
    // Calculate target with all factors
    targetMileage = currentWeeklyMileage * ageFactor * weightFactor * genderFactor;
    
    // Safe progression (no more than 10% increase)
    const maxIncrease = currentWeeklyMileage * 1.1;
    targetMileage = Math.min(targetMileage, maxIncrease);
    
    // Round to nearest whole number
    return Math.round(targetMileage);
  },
  
  /**
   * Determine fitness level based on weekly mileage
   */
  determineLevelOfFitness: (targetWeeklyMileage) => {
    if (targetWeeklyMileage <= 10) {
      return 'Beginner';
    } else if (targetWeeklyMileage <= 25) {
      return 'Intermediate';
    } else {
      return 'Advanced';
    }
  },

  /**
   * Format pace (minutes:seconds per mile/km)
   */
  formatPace: (pace) => {
    if (!pace || pace === '0:00') return 'N/A';
    return pace;
  },
  
  /**
   * Get a cute emoji for workout type
   */
  getWorkoutEmoji: (workoutType) => {
    const emojis = {
      'Easy Run': '🐰',
      'Long Run': '🐢',
      'Tempo Run': '🐆',
      'Speed Work': '⚡',
      'Recovery Run': '🍃',
      'Walk/Run': '🚶‍♂️',
      'Rest': '💤'
    };
    
    return emojis[workoutType] || '👟';
  },
  
  /**
   * Get color theme for fitness level
   */
  getFitnessLevelTheme: (level) => {
    const themes = {
      'Beginner': {
        primary: '#FFC6D9', // Soft pink
        secondary: '#FFB8E6', // Bubblegum
        accent: '#FF93C9', // Cotton candy
        text: '#6D214F' // Deep purple
      },
      'Intermediate': {
        primary: '#A2D2FF', // Baby blue
        secondary: '#BDE0FE', // Soft blue
        accent: '#81B1FE', // Sky blue
        text: '#05386B' // Navy blue
      },
      'Advanced': {
        primary: '#C8FFB0', // Mint
        secondary: '#AEFFA5', // Light green
        accent: '#93FF96', // Pastel green
        text: '#1B512D' // Forest green
      }
    };
    
    return themes[level] || themes['Beginner'];
  }
};

export default TrainingCalculator; 