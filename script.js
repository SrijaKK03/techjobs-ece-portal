// Job data
const jobsData = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechCorp Solutions",
    location: "Bangalore, India",
    experience: "0-1 years",
    salary: "₹4-6 LPA",
    postedDate: "6/8/2024",
    description:
      "Looking for fresh ECE graduates with passion for frontend development. Training will be provided.",
    skills: ["React", "JavaScript", "CSS", "HTML"],
    tags: ["Full-time", "ECE Relevant"],
    companyLogo: "T",
  },
  {
    id: 2,
    title: "Software Trainee",
    company: "Infosys",
    location: "Hyderabad, India",
    experience: "0 years",
    salary: "₹3.5-4.5 LPA",
    postedDate: "6/7/2024",
    description:
      "Graduate trainee program for ECE students. Comprehensive training in software development.",
    skills: ["Java", "Python", "SQL", "Problem Solving"],
    tags: ["Full-time", "ECE Relevant"],
    companyLogo: "I",
  },
  {
    id: 3,
    title: "Junior Data Analyst",
    company: "Analytics Pro",
    location: "Pune, India",
    experience: "0-1 years",
    salary: "₹4-5 LPA",
    postedDate: "6/6/2024",
    description:
      "Entry-level position perfect for ECE graduates interested in data analytics.",
    skills: ["Python", "Excel", "SQL", "Data Visualization"],
    tags: ["Full-time", "ECE Relevant"],
    companyLogo: "A",
  },
  {
    id: 4,
    title: "DevOps Engineer",
    company: "CloudTech",
    location: "Mumbai, India",
    experience: "0-2 years",
    salary: "₹5-7 LPA",
    postedDate: "6/5/2024",
    description:
      "Looking for fresh graduates with strong technical background. ECE students preferred.",
    skills: ["AWS", "Docker", "Linux", "CI/CD"],
    tags: ["Full-time", "ECE Relevant"],
    companyLogo: "C",
  },
];

// State
let savedJobs = [];
let filteredJobs = [...jobsData];

// DOM Elements
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const jobsList = document.getElementById("jobsList");
const searchBtn = document.getElementById("searchBtn");
const jobSearchInput = document.getElementById("jobSearch");
const locationSearchInput = document.getElementById("locationSearch");

// Mobile menu toggle
mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
  const icon = mobileMenuBtn.querySelector("i");
  if (mobileMenu.classList.contains("active")) {
    icon.className = "fas fa-times";
  } else {
    icon.className = "fas fa-bars";
  }
});

// Close mobile menu when clicking on links
document.querySelectorAll(".mobile-nav .nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
    mobileMenuBtn.querySelector("i").className = "fas fa-bars";
  });
});

// Popular search tags
document.querySelectorAll(".tag-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    jobSearchInput.value = btn.textContent;
    performSearch();
  });
});

// Search functionality
searchBtn.addEventListener("click", performSearch);

jobSearchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    performSearch();
  }
});

locationSearchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    performSearch();
  }
});

function performSearch() {
  const jobQuery = jobSearchInput.value.toLowerCase();
  const locationQuery = locationSearchInput.value.toLowerCase();

  filteredJobs = jobsData.filter((job) => {
    const matchesJob =
      !jobQuery ||
      job.title.toLowerCase().includes(jobQuery) ||
      job.company.toLowerCase().includes(jobQuery) ||
      job.skills.some((skill) => skill.toLowerCase().includes(jobQuery));

    const matchesLocation =
      !locationQuery || job.location.toLowerCase().includes(locationQuery);

    return matchesJob && matchesLocation;
  });

  renderJobs();

  // Scroll to jobs section
  document.getElementById("jobs").scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

// Create job card HTML
function createJobCard(job) {
  const isSaved = savedJobs.includes(job.id);

  return `
      <div class="job-card">
          <div class="job-content">
              <div class="job-info">
                  <div class="job-header">
                      <div class="company-logo">${job.companyLogo}</div>
                      <div class="job-details">
                          <h3 class="job-title">${job.title}</h3>
                          <p class="company-name">${job.company}</p>
                          <div class="job-meta">
                              <span><i class="fas fa-map-marker-alt"></i> ${
                                job.location
                              }</span>
                              <span><i class="fas fa-clock"></i> ${
                                job.experience
                              }</span>
                              <span><i class="fas fa-dollar-sign"></i> ${
                                job.salary
                              }</span>
                              <span><i class="fas fa-calendar"></i> ${
                                job.postedDate
                              }</span>
                          </div>
                          <p class="job-description">${job.description}</p>
                          <div class="job-skills">
                              ${job.skills
                                .map(
                                  (skill) =>
                                    `<span class="skill-tag">${skill}</span>`
                                )
                                .join("")}
                          </div>
                          <div class="job-tags">
                              ${job.tags
                                .map(
                                  (tag) =>
                                    `<span class="job-tag ${
                                      tag === "ECE Relevant"
                                        ? "ece-relevant"
                                        : "full-time"
                                    }">${tag}</span>`
                                )
                                .join("")}
                          </div>
                      </div>
                  </div>
              </div>
              <div class="job-actions">
                  <button class="btn btn-primary">Apply Now</button>
                  <button class="save-btn ${
                    isSaved ? "saved" : ""
                  }" onclick="toggleSaveJob(${job.id})">
                      <i class="fas fa-bookmark"></i>
                      ${isSaved ? "Saved" : "Save Job"}
                  </button>
              </div>
          </div>
      </div>
  `;
}

// Render jobs
function renderJobs() {
  if (filteredJobs.length === 0) {
    jobsList.innerHTML = `
          <div class="job-card">
              <div class="job-content">
                  <div class="job-info">
                      <h3 class="job-title">No jobs found</h3>
                      <p class="job-description">Try adjusting your search criteria or filters.</p>
                  </div>
              </div>
          </div>
      `;
  } else {
    jobsList.innerHTML = filteredJobs.map((job) => createJobCard(job)).join("");
  }

  // Update jobs count
  document.querySelector(
    ".jobs-title"
  ).textContent = `${filteredJobs.length} Jobs Found`;
}

// Toggle save job
function toggleSaveJob(jobId) {
  if (savedJobs.includes(jobId)) {
    savedJobs = savedJobs.filter((id) => id !== jobId);
  } else {
    savedJobs.push(jobId);
  }
  renderJobs();
}

// Filter functionality
function setupFilters() {
  const filterInputs = document.querySelectorAll(".filter-input");
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const clearFiltersBtn = document.querySelector(".clear-filters");

  // Add event listeners to all filter inputs
  filterInputs.forEach((input) => {
    input.addEventListener("input", applyFilters);
  });

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", applyFilters);
  });

  clearFiltersBtn.addEventListener("click", clearAllFilters);
}

function applyFilters() {
  const locationFilter = document
    .querySelector(".filter-input")
    .value.toLowerCase();
  const checkedExperience = Array.from(
    document.querySelectorAll(
      'input[value^="0"], input[value="fresher"], input[value="1-2"], input[value="2-3"]:checked'
    )
  ).map((cb) => cb.value);
  const checkedJobTypes = Array.from(
    document.querySelectorAll(
      'input[value="full-time"]:checked, input[value="part-time"]:checked, input[value="internship"]:checked, input[value="contract"]:checked, input[value="remote"]:checked'
    )
  ).map((cb) => cb.value);
  const eceRelevant = document.querySelector(
    'input[value="ece-relevant"]'
  ).checked;
  const trainingProvided = document.querySelector(
    'input[value="training-provided"]'
  ).checked;

  filteredJobs = jobsData.filter((job) => {
    // Location filter
    const matchesLocation =
      !locationFilter || job.location.toLowerCase().includes(locationFilter);

    // Experience filter
    const matchesExperience =
      checkedExperience.length === 0 ||
      checkedExperience.some((exp) => {
        if (exp === "fresher") return job.experience.includes("0");
        return job.experience.includes(exp);
      });

    // Job type filter (simplified - assuming all current jobs are full-time)
    const matchesJobType =
      checkedJobTypes.length === 0 || checkedJobTypes.includes("full-time");

    // ECE relevant filter
    const matchesECE = !eceRelevant || job.tags.includes("ECE Relevant");

    // Training provided filter (simplified)
    const matchesTraining =
      !trainingProvided || job.description.toLowerCase().includes("training");

    return (
      matchesLocation &&
      matchesExperience &&
      matchesJobType &&
      matchesECE &&
      matchesTraining
    );
  });

  renderJobs();
}

function clearAllFilters() {
  // Clear all inputs
  document.querySelectorAll(".filter-input").forEach((input) => {
    input.value = "";
  });

  // Uncheck all checkboxes
  document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.checked = false;
  });

  // Reset filtered jobs
  filteredJobs = [...jobsData];
  renderJobs();
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  renderJobs();
  setupFilters();
});

// Add some animations on scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  if (window.scrollY > 100) {
    header.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)";
  } else {
    header.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
  }
});
