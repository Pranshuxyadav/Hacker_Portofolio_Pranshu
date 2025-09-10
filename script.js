document.addEventListener("DOMContentLoaded", function() {
    // Existing overlay code...
  
    // Terminal open/close logic
    const terminal = document.querySelector('.portfolio-terminal');
    const closeBtn = document.getElementById('terminal-close-btn');
    const openBtn = document.getElementById('terminal-open-btn');
  
    // Hide terminal, show open icon
    function closeTerminal() {
      terminal.style.display = "none";
      openBtn.style.display = "block";
    }
    // Show terminal, hide open icon
    function openTerminal() {
      terminal.style.display = "block";
      openBtn.style.display = "none";
    }
    closeBtn.addEventListener("click", closeTerminal);
    openBtn.addEventListener("click", openTerminal);
  
    // Default: terminal visible on page load
    openTerminal();
  });
  
// Overlay logic (add this at TOP of script.js)

document.addEventListener("DOMContentLoaded", function() {
    const overlay = document.getElementById('overlay');
    const form = document.getElementById('username-form');
    const glitchBox = document.getElementById('glitch-text');
    let username = '';
  
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      username = document.getElementById('username-input').value.trim().substring(0,20);
      if(username.length > 0) {
        glitchBox.setAttribute('data-text', `Hi! ${username}`);
        glitchBox.textContent = `Hi! ${username}`;
        form.style.display = 'none';
        glitchBox.style.display = 'block';
        // After 1.6s, fade out overlay & show main site
        setTimeout(() => {
          overlay.style.opacity = '0';
          setTimeout(() => {
            overlay.style.display = 'none';
            document.body.classList.add('reveal-content');
          }, 900);
        }, 1600);
      }
    });
  
    // Hide all content until overlay is done
    document.body.classList.remove('reveal-content');
  });
  
// Sample data for dynamic sections
const sections = {
    about: `
      <h1>About Me</h1>
      <div class="avatar">PY</div>
      <p>
        Hi! I'm <b>Pranshu Yadav</b>, a passionate full-stack developer with expertise in modern web technologies.
        I love creating innovative solutions and building user-friendly applications that make a difference.
      </p>
      <div class="stats-container">
        <div class="stat-block">
          <div class="stat-title">Experience</div>
          <div class="stat-value">3+ Years</div>
        </div>
        <div class="stat-block">
          <div class="stat-title">Projects</div>
          <div class="stat-value">25+ Completed</div>
        </div>
        <div class="stat-block">
          <div class="stat-title">Technologies</div>
          <div class="stat-value">15+ Mastered</div>
        </div>
      </div>
    `,
    projects: `
      <h1>Projects</h1>
      <ul style="list-style:none; padding:0; text-align:left;">
        <li><b>Farmina Wheel Game</b> – Interactive web game for customer engagement.</li>
        <li><b>Pet Hero Game</b> – Fun, educational game about pet care.</li>
        <li><b>Amazon Data Cleaner</b> – Internal tool for e-commerce data hygiene (Node.js, Excel).</li>
        <li><b>Creative Portfolio</b> – Modern hacker-themed site (this one!)</li>
      </ul>
    `,
    education: `
      <h1>Education</h1>
      <ul style="list-style:none; padding:0; text-align:left;">
        <li><b>B.Tech, Computer Science</b><br/>XYZ University, 2022–2026</li>
        <li><b>Internship</b> <br/>Farmina, BeeGreen – E-commerce data and web app projects</li>
      </ul>
    `,
    skills: `
      <h1>Skills</h1>
      <ul style="list-style:none; padding:0; text-align:left; columns:2;">
        <li>JavaScript (ES6+)</li>
        <li>Node.js</li>
        <li>HTML &amp; CSS</li>
        <li>Excel Automation</li>
        <li>Git &amp; GitHub Actions</li>
        <li>YAML</li>
        <li>Creative Design</li>
        <li>Mailchimp Campaigns</li>
        <li>Game Development Basics</li>
      </ul>
    `,
    contact: `
      <h1>Contact</h1>
      <ul style="list-style:none; padding:0; text-align:left;">
        <li>Email: <a href="mailto:pranshu@email.com">pranshu@email.com</a></li>
        <li>GitHub: <a href="https://github.com/pranshu" target="_blank">pranshu</a></li>
        <li>LinkedIn: <a href="https://linkedin.com/in/pranshuyadav" target="_blank">pranshuyadav</a></li>
      </ul>
    `
  };
  
  const helpText = `Available commands: about, projects, education, skills, contact, clear, neofetch, ls`;
  
  const welcomeText = [
    "Welcome to Pranshu Yadav's Portfolio Terminal!",
    'Type "help" to see available commands.',
  ];
  
  let activeSection = "about";
  
  // ----- UI Update & Section switching -----
  function renderSection(section) {
    const content = sections[section] || sections['about'];
    document.getElementById('content').innerHTML = content;
    // Highlight tab
    document.querySelectorAll('.tab-menu button').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.section === section);
    });
    activeSection = section;
  }
  
  // ----- Terminal Logic -----
  function appendTerminal(text, isCmd = false) {
    const outputDiv = document.getElementById('terminal-output');
    let html = text;
    if (isCmd) html = `<span style="color:#11ffe1;">$ ${text}</span>`;
    outputDiv.innerHTML += html + "<br/>";
    outputDiv.parentElement.scrollTop = outputDiv.parentElement.scrollHeight;
  }
  
  function processCommand(cmd) {
    switch (cmd.trim().toLowerCase()) {
      case "help":
        appendTerminal(helpText);
        break;
      case "about":
        renderSection('about');
        appendTerminal('Switched to About section');
        break;
      case "projects":
        renderSection('projects');
        appendTerminal('Switched to Projects section');
        break;
      case "education":
        renderSection('education');
        appendTerminal('Switched to Education section');
        break;
      case "skills":
        renderSection('skills');
        appendTerminal('Switched to Skills section');
        break;
      case "contact":
        renderSection('contact');
        appendTerminal('Switched to Contact section');
        break;
      case "ls":
        appendTerminal('about  projects  education  skills  contact');
        break;
      case "neofetch":
        appendTerminal(`
          <span style="color:#7dfcee">
            pranshu@portfolio<br>
            OS: GitHub Pages<br>
            Skills: JS, Node.js, HTML, CSS, Excel<br>
            Theme: Hacker Terminal
          </span>
        `);
        break;
      case "clear":
        document.getElementById('terminal-output').innerHTML = "";
        break;
      case "":
        // Ignore empty
        break;
      default:
        appendTerminal(`Command not found: <b>${cmd}</b>`);
        break;
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    // Initial content and terminal preload
    renderSection('about');
    welcomeText.forEach(t => appendTerminal(t));
    appendTerminal("$ help", true);
    appendTerminal(helpText);
  
    // Menu buttons
    document.querySelectorAll('.tab-menu button').forEach(btn => {
      btn.addEventListener('click', () => {
        const section = btn.getAttribute("data-section");
        renderSection(section);
        appendTerminal(`Switched to ${section.charAt(0).toUpperCase()+section.slice(1)} section`);
      });
    });

    // "Don't Click" alarm effect
const dontClickBtn = document.getElementById('dont-click-btn');
const alarmAudio = document.getElementById('alarm-audio');

dontClickBtn.addEventListener("click", function() {
  // Play sound from start
  alarmAudio.currentTime = 0;
  alarmAudio.play();
  // Add shake effect to entire body
  document.body.classList.add('shake');
  setTimeout(() => {
    document.body.classList.remove('shake');
  }, 450);
});

  
    // Terminal form
    const form = document.getElementById('terminal-form');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const input = document.getElementById('terminal-input');
      const cmd = input.value;
      appendTerminal(cmd, true);
      processCommand(cmd);
      input.value = "";
    });
  });
  