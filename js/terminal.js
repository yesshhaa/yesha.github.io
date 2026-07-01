/**
 * terminal.js — Interactive Terminal Emulator
 * Yesha Patel Portfolio
 */

(function () {
  'use strict';

  const terminalOutput = document.getElementById('terminal-output');
  const terminalInput = document.getElementById('terminal-input');
  const terminalBody = document.getElementById('terminal-body');

  if (!terminalOutput || !terminalInput) return;

  const COMMANDS = {
    help: () => `
<span class="cmd">Available Commands:</span>
  <span class="accent">whoami</span>       - Display personal information
  <span class="accent">skills</span>       - List technical core competencies
  <span class="accent">projects</span>     - View active security projects
  <span class="accent">website open</span> - Display system initialization status
  <span class="accent">banner</span>       - Display system banner
  <span class="accent">clear</span>        - Clear the terminal screen
  <span class="accent">help</span>         - Show this help menu
`,
    whoami: () => `
<span class="cmd">Name:</span> Yesha Patel
<span class="cmd">Role:</span> Cybersecurity Student & Security Analyst
<span class="cmd">Location:</span> Earth / Deep Space
<span class="cmd">Focus:</span> Threat Intelligence, SIEM Optimization, and Network Defense. 
Currently hunting for patterns in the noise.
`,
    skills: () => `
<span class="cmd">Security Disciplines:</span>
  • Monitoring & SIEM (Splunk, ELK)
  • Network Analysis (Wireshark, TCPdump)
  • Vulnerability Assessment (Nmap, Metasploit)
  • Incident Response (Forensics, Containment)
  • Threat Intelligence (OSINT, MISP)
`,
    projects: () => `
<span class="cmd">Active Repositories:</span>
  01. <span class="accent">StudyNest</span> - Personal productivity dashboard (Next.js 14, Firebase)
  02. <span class="accent">Improv</span> - AI-powered prompt refinement tool (Next.js 15, Groq API)
  03. <span class="accent">Log Parser</span> - AI log analyzer (Python, Regex, Llama 3.3)
  04. <span class="accent">Port Scanner</span> - Async TCP scanner & threat contexts (Python, asyncio)
`,
    'website open': () => `
<span class="cmd">SYSTEM INITIALIZATION SUCCESSFUL</span>
  • Host: <span class="accent">yesha-portfolio-v2</span>
  • Protocol: <span class="accent">HTTPS</span>
  • Port: <span class="accent">443 (Secure)</span>
  • Status: <span class="accent">Active / Fully Rendered</span>

Portfolio modules loaded. Use the terminal below to query parameters.
Type '<span class="accent">help</span>' for a list of available commands.
`,
    banner: () => `
<pre class="terminal-banner">
 __   _______     ____  _____ ____ 
 \\ \\ / /  _ \\   / ___|| ____/ ___|
  \\ V /| |_) |  \\___ \\|  _| | |    
   | | |  __/    ___) | |___| |___ 
   |_| |_|      |____/|_____|\\____|
                                   
  SYSTEM STATUS: <span class="accent">STABLE</span>
  ENCRYPTION: <span class="accent">AES-256</span>
  IDENTITY: <span class="accent">YESHA PATEL</span>
</pre>
Welcome to the YP-SEC Terminal. Type '<span class="accent">help</span>' to begin.
`,
    clear: () => {
      terminalOutput.innerHTML = '';
      return '';
    }
  };

  function printOutput(text) {
    if (text === '') return;
    const div = document.createElement('div');
    div.className = 'output-line';
    div.innerHTML = text;
    terminalOutput.appendChild(div);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function handleCommand(input) {
    const trimmedInput = input.trim().toLowerCase();
    printOutput(`<span class="terminal-prompt">yesha@yp-sec:~$</span> ${input}`);

    if (trimmedInput === '') return;

    if (COMMANDS[trimmedInput]) {
      const result = COMMANDS[trimmedInput]();
      printOutput(result);
    } else {
      printOutput(`Command not found: <span class="accent">${trimmedInput}</span>. Type '<span class="accent">help</span>' for available commands.`);
    }
  }

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const cmd = terminalInput.value;
      handleCommand(cmd);
      terminalInput.value = '';
    }
  });

  function typeCommand(text, callback) {
    let index = 0;
    terminalInput.value = '';
    terminalInput.disabled = true;

    function nextChar() {
      if (index < text.length) {
        terminalInput.value += text[index];
        index++;
        setTimeout(nextChar, 100);
      } else {
        setTimeout(() => {
          terminalInput.disabled = false;
          const cmd = terminalInput.value;
          terminalInput.value = '';
          handleCommand(cmd);
          if (callback) callback();
        }, 200);
      }
    }
    setTimeout(nextChar, 800);
  }

  // Initial Banner
  window.addEventListener('DOMContentLoaded', () => {
    printOutput(COMMANDS.banner());
    
    // Auto-run 'website open' when terminal is in viewport
    const terminalSec = document.getElementById('terminal-section');
    if (terminalSec) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            typeCommand('website open', () => {
              terminalInput.focus({ preventScroll: true });
            });
            observer.disconnect(); // Trigger only once
          }
        });
      }, { threshold: 0.15 });
      observer.observe(terminalSec);
    }
  });

  // Keep input focused when clicking terminal
  terminalBody.addEventListener('click', () => {
    terminalInput.focus();
  });

})();
