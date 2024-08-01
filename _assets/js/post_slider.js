document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.post-slide');
    const prevBtn = document.getElementById('prev-slide');
    const nextBtn = document.getElementById('next-slide');
    let currentIndex = 0;
  
    function extractImageURL(content) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, 'text/html');
      const images = doc.querySelectorAll('img');
      let imageUrl = '';
  
      images.forEach(img => {
        const altText = img.getAttribute('alt') || '';
        if (altText.toLowerCase().includes('1st')) {
          imageUrl = img.getAttribute('src');
        }
      });
  
      return imageUrl;
    }
  
    function updateSliderPosition() {
      slides.forEach((slide, index) => {
        const content = slide.getAttribute('data-content');
        const imageUrl = extractImageURL(content);
        if (imageUrl) {
          slide.style.backgroundImage = `url(${imageUrl})`;
        } else {
          slide.style.backgroundImage = 'none';
        }
      });
      document.querySelector('.post-slider-inner').style.transform = 'translateX(' + (-currentIndex * 100) + '%)';
    }
  
    function logContent() {
      slides.forEach((slide, index) => {
        console.log(`Post ${index + 1} content: `, slide.getAttribute('data-content'));
      });
    }
  
    prevBtn.addEventListener('click', function() {
      currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
      updateSliderPosition();
    });
  
    nextBtn.addEventListener('click', function() {
      currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
      updateSliderPosition();
    });
  
    logContent();
    updateSliderPosition();
  });
  