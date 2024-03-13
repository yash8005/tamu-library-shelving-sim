describe('script.js', function () {
    before(function () {
      // Load the index.html file before running the tests
      const testContainer = document.getElementById('test-container');
      testContainer.innerHTML = document.getElementById('content').outerHTML;
    });
  
    it('should contain drag and drop event handlers', function () {
      const scriptContent = window.__scriptContent; // Assuming you've exposed the script content to the global scope
  
      expect(scriptContent).to.contain('handleDragStart');
      expect(scriptContent).to.contain('handleDragOver');
      expect(scriptContent).to.contain('handleDragEnter');
      expect(scriptContent).to.contain('handleDragLeave');
      expect(scriptContent).to.contain('handleDrop');
      expect(scriptContent).to.contain('handleDragEnd');
    });
  
    it('should contain functions for loading and resetting images', function () {
      const scriptContent = window.__scriptContent;
  
      expect(scriptContent).to.contain('resetAndLoadImages');
    });
  
    it('should contain code for checking the answer', function () {
      const scriptContent = window.__scriptContent;
  
      expect(scriptContent).to.contain('$(".buttonSubmit").click(function () {');
    });
  
    it('should disable and enable buttons correctly', function () {
      const submitButton = document.querySelector('.buttonSubmit');
      const resetButton = document.querySelector('.buttonReset');
  
      // Initially, the "Next Puzzle" button should be disabled
      expect(resetButton.disabled).to.be.true;
  
      // Simulate drag and drop operations
      const bookElements = document.querySelectorAll('.box');
      const initialOrder = Array.from(bookElements).map(el => el.querySelector('img').src);
      const sortedOrder = [...initialOrder].sort();
  
      initialOrder.forEach((src, i) => {
        const dest = document.querySelector(`img[src="${sortedOrder[i]}"]`);
        const img = document.querySelector(`img[src="${src}"]`);
        simulateDragDrop(img, dest);
      });
  
      // After correct sorting, the "Next Puzzle" button should be enabled
      expect(resetButton.disabled).to.be.false;
  
      // After clicking the "Next Puzzle" button, the "Check Answer" button should be enabled
      resetButton.click();
      expect(submitButton.disabled).to.be.false;
    });
  
    it('should reset the puzzle and load new images', function () {
      const resetButton = document.querySelector('.buttonReset');
  
      // Get the initial book elements
      const initialBookElements = document.querySelectorAll('.box');
      const initialSources = Array.from(initialBookElements).map(el => el.querySelector('img').src);
  
      // Click the "Next Puzzle" button
      resetButton.click();
  
      // Get the new book elements
      const newBookElements = document.querySelectorAll('.box');
      const newSources = Array.from(newBookElements).map(el => el.querySelector('img').src);
  
      // Check if the new sources are different from the initial sources
      expect(newSources).to.not.deep.equal(initialSources);
    });
  
    it('should display the correct result message', function () {
      const resultElement = document.querySelector('#result');
  
      // Simulate incorrect sorting
      const bookElements = document.querySelectorAll('.box');
      const initialOrder = Array.from(bookElements).map(el => el.querySelector('img').src);
      const reversedOrder = [...initialOrder].reverse();
  
      initialOrder.forEach((src, i) => {
        const dest = document.querySelector(`img[src="${reversedOrder[i]}"]`);
        const img = document.querySelector(`img[src="${src}"]`);
        simulateDragDrop(img, dest);
      });
  
      // Click the "Check Answer" button
      document.querySelector('.buttonSubmit').click();
  
      // Check the result message for incorrect answer
      expect(resultElement.textContent).to.equal('Incorrect Answer');
  
      // Simulate correct sorting
      initialOrder.forEach((src, i) => {
        const dest = document.querySelector(`img[src="${initialOrder[i]}"]`);
        const img = document.querySelector(`img[src="${src}"]`);
        simulateDragDrop(img, dest);
      });
  
      // Click the "Check Answer" button
      document.querySelector('.buttonSubmit').click();
  
      // Check the result message for correct answer
      expect(resultElement.textContent).to.equal('Correct Answer');
    });
  
    // Helper function to simulate drag and drop
    function simulateDragDrop(source, target) {
      const dragStartEvent = new DragEvent('dragstart', { bubbles: true, cancelable: true });
      const dragOverEvent = new DragEvent('dragover', { bubbles: true, cancelable: true });
      const dropEvent = new DragEvent('drop', { bubbles: true, cancelable: true });
  
      source.dispatchEvent(dragStartEvent);
      target.dispatchEvent(dragOverEvent);
      target.dispatchEvent(dropEvent);
    }
  
    // Add more tests for specific functions or functionality as needed
  });