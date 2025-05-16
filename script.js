function toggleMenu() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('open');
  sidebar.classList.add('interactive');
  document.body.classList.toggle('sidebar-open');
  localStorage.setItem('sidebarOpen', sidebar.classList.contains('open'));
}

function calculateSavings() {
  const monthlyBill = parseFloat(document.getElementById('monthlyBill').value) || 0;
  const systemSize = parseFloat(document.getElementById('systemSize').value) || 0;
  const lifespan = parseInt(document.getElementById('lifespan').value) || 0;

  const electricityRate = 0.14; // $ per kWh, Wisconsin 2025 estimate
  const solarProduction = 1200; // kWh per kW per year, Wisconsin average

  const annualProduction = systemSize * solarProduction;
  const annualSavings = annualProduction * electricityRate;
  const totalSavings = annualSavings * lifespan;

  document.getElementById('annualProduction').textContent = annualProduction.toFixed(0);
  document.getElementById('annualSavings').textContent = annualSavings.toFixed(2);
  document.getElementById('totalSavings').textContent = totalSavings.toFixed(2);
  document.getElementById('resultLifespan').textContent = lifespan;
}

document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('sidebar');
  const isSidebarOpen = localStorage.getItem('sidebarOpen') === 'true';
  if (isSidebarOpen) {
    sidebar.classList.add('open');
    document.body.classList.add('sidebar-open');
  }

  const fadeElements = document.querySelectorAll('.fade-in');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  fadeElements.forEach(el => fadeObserver.observe(el));

  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const answer = question.nextElementSibling;
      const isActive = answer.classList.contains('active');

      document.querySelectorAll('.faq-answer').forEach(ans => ans.classList.remove('active'));
      document.querySelectorAll('.faq-question').forEach(q => q.classList.remove('active'));

      if (!isActive) {
        answer.classList.add('active');
        question.classList.add('active');
      }
    });
  });

  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const reveal = card.querySelector('.card-reveal');
      if (reveal) {
        const isActive = reveal.classList.contains('active');
        card.querySelectorAll('.card-reveal').forEach(r => r.classList.remove('active'));
        if (!isActive) {
          reveal.classList.add('active');
        }
      }
    });
  });

  const charts = {
    solarGrowthChart: {
      type: 'bar',
      data: {
        labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
        datasets: [{
          label: 'Solar Capacity (MW)',
          data: [350, 600, 900, 1200, 1600, 1900],
          backgroundColor: '#22c55e',
          borderColor: '#15803d',
          borderWidth: 1,
          hoverBackgroundColor: '#16a34a'
        }]
      },
      options: {
        animation: { duration: 1000, easing: 'easeOutQuart' },
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: 'Megawatts (MW)', font: { size: 14 } },
            grid: { color: 'rgba(255, 255, 255, 0.1)' }
          },
          x: { grid: { display: false } }
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#15803d',
            titleFont: { size: 14 },
            bodyFont: { size: 12 }
          }
        }
      }
    },
    emissionsChart: {
      type: 'bar',
      data: {
        labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
        datasets: [{
          label: 'CO2 Reduction (Million Metric Tons)',
          data: [0.4, 0.7, 1.1, 1.5, 2.0, 2.6],
          backgroundColor: '#22c55e',
          borderColor: '#15803d',
          borderWidth: 1,
          hoverBackgroundColor: '#16a34a'
        }]
      },
      options: {
        animation: { duration: 1200, easing: 'easeInOutQuad' },
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: 'Million Metric Tons', font: { size: 14 } },
            grid: { color: 'rgba(255, 255, 255, 0.1)' }
          },
          x: { grid: { display: false } }
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#15803d',
            titleFont: { size: 14 },
            bodyFont: { size: 12 }
          }
        }
      }
    },
    efficiencyChart: {
      type: 'bar',
      data: {
        labels: ['Sunny Days', 'Cloudy Days', 'Winter Months'],
        datasets: [{
          label: 'Efficiency (%)',
          data: [100, 65, 45],
          backgroundColor: '#22c55e',
          borderColor: '#15803d',
          borderWidth: 1,
          hoverBackgroundColor: '#16a34a'
        }]
      },
      options: {
        animation: { duration: 1000, easing: 'easeOutQuart' },
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: 'Efficiency (%)', font: { size: 14 } },
            grid: { color: 'rgba(255, 255, 255, 0.1)' }
          },
          x: { grid: { display: false } }
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#15803d',
            titleFont: { size: 14 },
            bodyFont: { size: 12 }
          }
        }
      }
    }
  };

  Object.keys(charts).forEach(chartId => {
    const canvas = document.getElementById(chartId);
    if (canvas) {
      new Chart(canvas, charts[chartId]);
    }
  });
});