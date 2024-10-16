/*carouser designer narrative*/
document.addEventListener('DOMContentLoaded', function () {
  let currentItem = 0; 
  const items = document.querySelectorAll('.carousel .designers .item');
  const designers = document.querySelector('.carousel .designers');
  const totalItems = items.length;

// Set initial item visibility
updateCarousel();

document.getElementById('prev').addEventListener('click', function () {
    moveSlide(-1);
});

document.getElementById('next').addEventListener('click', function () {
    moveSlide(1);
});

function moveSlide(direction) {
    currentItem = (currentItem + direction + totalItems) % totalItems; // Move to the next/prev item
    updateCarousel();
}

function updateCarousel() {
    const percentage = -(currentItem * 100); // Move the designers container based on the current item
    designers.style.transform = `translateX(${percentage}%)`;
    
    // Update z-index and opacity for each item
    items.forEach((item, index) => {
        const intro = item.querySelector('.intro');
        if (index === currentItem) {
            item.style.zIndex = 10;
            intro.style.opacity = '1';
            intro.style.pointerEvents = 'auto';
        } else {
            item.style.zIndex = 5;
            intro.style.opacity = '0';
            intro.style.pointerEvents = 'none';
        }
    });
}
});



/*to make the content appear in a cool way*/
const hiddenElements = document.querySelectorAll(".content_that_appears");
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  });
  
  hiddenElements.forEach((el) => observer.observe(el));
  


//horizontal scrolling
window.onload = function() {
    const scrollee = document.querySelector(".scrollee");

    function getScrollAmount() {
        let scrolleeWidth = scrollee.scrollWidth;
        return -(scrolleeWidth - window.innerWidth);
    }

    const tween = gsap.to(scrollee, {
        x: getScrollAmount,
        duration: 3,
        ease: "none",
    });

    ScrollTrigger.create({
        trigger: ".scroller",
        start: "top top",
        end: () => `+=${scrollee.scrollWidth - window.innerWidth}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true,
        markers: false,
    });
};

const resizeObserver = new ResizeObserver(() => {
    ScrollTrigger.refresh();
});

resizeObserver.observe(document.body);


/*bootstrap carousel*/
$('.carousel').carousel({
    interval: 2000}
);



//doc
// Function to show or hide content
document.addEventListener('DOMContentLoaded', function() {
    function showOrHide(room) {
        document.querySelectorAll('.content').forEach((content) => {
            content.classList.remove('visible');
            content.classList.add('hidden');
        });

        const selectedRoom = document.getElementById(`${room}_text`);
        if (selectedRoom) {
            selectedRoom.classList.remove('hidden');
            selectedRoom.classList.add('visible');
        }
    }

    function hideIntroductionAndShowContent(room) {
        const introSection = document.getElementById('introduction');
        if (introSection) {
            introSection.style.display = 'none'; 
        }

        const nav = document.querySelector('.nav-pills');
        if (nav) {
            nav.style.display = 'block'; 
        }
        showOrHide(room);
    }

    document.getElementById('show-analysis').addEventListener('click', () => hideIntroductionAndShowContent('analysis'));
    document.getElementById('show-target-users').addEventListener('click', () => hideIntroductionAndShowContent('target-users'));
    document.getElementById('show-benchmarking').addEventListener('click', () => hideIntroductionAndShowContent('benchmarking'));
    document.getElementById('show-design').addEventListener('click', () => hideIntroductionAndShowContent('design'));

    document.getElementById('analysis-tab').addEventListener('click', () => showOrHide('analysis'));
    document.getElementById('target-users-tab').addEventListener('click', () => showOrHide('target-users'));
    document.getElementById('benchmarking-tab').addEventListener('click', () => showOrHide('benchmarking'));
    document.getElementById('design-tab').addEventListener('click', () => showOrHide('design'));
});

