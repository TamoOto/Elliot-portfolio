document.querySelectorAll('[data-scroll-target]').forEach((button) => {
  button.addEventListener('click', () => {
    const target = document.getElementById(button.dataset.scrollTarget);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const stage = document.getElementById('avatarStage');
if (stage && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  stage.addEventListener('mousemove', (event) => {
    const rect = stage.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    stage.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
  });
  stage.addEventListener('mouseleave', () => {
    stage.style.transform = 'rotateY(0deg) rotateX(0deg)';
  });
}

const timelineItems = [...document.querySelectorAll('.timeline-item')];
if ('IntersectionObserver' in window && timelineItems.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      timelineItems.forEach((item) => item.classList.remove('active'));
      entry.target.classList.add('active');
    });
  }, { rootMargin: '-35% 0px -45% 0px', threshold: 0 });
  timelineItems.forEach((item) => observer.observe(item));
}
