describe('index.html', function () {
    before(function () {
      // Load the index.html file before running the tests
      const testContainer = document.getElementById('test-container');
      testContainer.innerHTML = document.getElementById('content').outerHTML;
    });
  
    it('should have a valid HTML structure', function () {
      const html = document.documentElement.outerHTML;
      expect(html).to.contain('<html');
      expect(html).to.contain('<head');
      expect(html).to.contain('<body');
      expect(html).to.contain('<footer');
    });
  
    it('should have a title', function () {
      const title = document.title;
      expect(title).to.equal('Texas A&M University Libraries - Sorting Library Call Numbers Training Simulation');
    });
  
    it('should include external stylesheets and scripts', function () {
      const links = document.querySelectorAll('link');
      const scripts = document.querySelectorAll('script');
  
      const styleSheetLink = Array.from(links).find(link => link.href.endsWith('/style.css'));
      expect(styleSheetLink).to.not.be.null;
  
      const jQueryScript = Array.from(scripts).find(script => script.src.includes('jquery-3.6.0.min.js'));
      expect(jQueryScript).to.not.be.null;
  
      const appScript = Array.from(scripts).find(script => script.src.endsWith('/script.js'));
      expect(appScript).to.not.be.null;
    });
  
    it('should have a container for draggable book elements', function () {
      const container = document.querySelector('.container');
      expect(container).to.not.be.null;
    });
  
    it('should have draggable book elements', function () {
      const bookElements = document.querySelectorAll('.container .box');
      expect(bookElements.length).to.equal(3);
    });
  
    it('should have buttons for checking answer and resetting', function () {
      const submitButton = document.querySelector('.buttonSubmit');
      const resetButton = document.querySelector('.buttonReset');
  
      expect(submitButton).to.not.be.null;
      expect(resetButton).to.not.be.null;
    });
  
    // Add more tests for specific elements or content as needed
  });