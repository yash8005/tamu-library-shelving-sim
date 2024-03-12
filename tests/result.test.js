
import { expect } from 'chai';

describe('result.js', () => {
    beforeEach(() => {
      // Clear localStorage before each test
      localStorage.clear();
    });
  
    it('should calculate accuracy correctly', () => {
      localStorage.setItem('correctPuzzlesCount', '5');
      localStorage.setItem('multipleAttemptsCount', '3');
  
      const accuracyElement = document.getElementById('accuracy');
      expect(accuracyElement.textContent).to.equal('62.50%');
    });
  
    it('should display multiple attempts count correctly', () => {
      localStorage.setItem('multipleAttemptsCount', '2');
  
      const multipleAttemptsCountElement = document.getElementById('multiple-attempts');
      expect(multipleAttemptsCountElement.textContent).to.equal('2');
    });
  
    it('should display longest streak correctly', () => {
      localStorage.setItem('longestStreak', '4');
  
      const longestStreakElement = document.getElementById('longest-streak');
      expect(longestStreakElement.textContent).to.equal('4');
    });
  
    it('should display max attempts correctly', () => {
      localStorage.setItem('maxAttempts', '3');
  
      const maxAttemptsElement = document.getElementById('max-attempts');
      expect(maxAttemptsElement.textContent).to.equal('3');
    });
  
    it('should calculate score correctly', () => {
      localStorage.setItem('correctPuzzlesCount', '8');
      localStorage.setItem('multipleAttemptsCount', '2');
      localStorage.setItem('longestStreak', '6');
      localStorage.setItem('totalIncorrectAttempts', '10');
  
      const scoreElement = document.getElementById('score-number');
      expect(scoreElement.textContent).to.equal('80');
    });
  
    it('should redirect to index.html when "Play Again" button is clicked', () => {
      const playAgainButton = document.querySelector('.PlayAgain');
      const originalLocation = window.location.href;
  
      playAgainButton.click();
  
      expect(window.location.href).to.not.equal(originalLocation);
      expect(window.location.href).to.include('index.html');
    });
  
    // Add more tests for other scenarios as needed
  });