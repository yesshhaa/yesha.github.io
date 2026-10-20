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
  <span class="accent">whoami</span>         - Display personal information & credentials
  <span class="accent">resume</span>         - View resume summary (experience, education, GRC)
  <span class="accent">certs</span>          - View industry certifications & badges
  <span class="accent">skills</span>         - List technical core competencies & security tools
  <span class="accent">projects</span>       - View active security tools & repositories
  <span class="accent">website open</span>   - Display system initialization status
  <span class="accent">banner</span>         - Display system banner
  <span class="accent">clear</span>          - Clear the terminal screen
  <span class="accent">help</span>           - Show this help menu
`,
    whoami: () => `
<span class="cmd">Name:</span> Yesha Patel
<span class="cmd">Certification:</span> <span class="accent">CompTIA Security+ (SY0-701)</span>
<span class="cmd">Role:</span> Cybersecurity Professional & Security Analyst
<span class="cmd">Location:</span> Jersey City, NJ
<span class="cmd">Focus:</span> Threat Intelligence, Detection Engineering, SIEM Optimization, and Network Defense. 
Currently hunting for patterns in the noise and engineering proactive defenses.
`,
    resume: () => `
<span class="cmd">=== YESHA PATEL — RESUME SUMMARY ===</span>
<span class="accent">Location:</span> Jersey City, NJ | (551) 358-9212 | yesha.patel0710@gmail.com
<span class="accent">Certification:</span> CompTIA Security+ (SY0-701)

<span class="cmd">[WORK EXPERIENCE]</span>
  • <span class="accent">Security Engineer</span> — IFUTURE (Jun 2023 – Aug 2024, Anand, Gujarat)
    - Administered user accounts and access permissions under enterprise authentication controls.
    - Monitored system logs and network activity across 20+ endpoints for anomaly detection.
    - Enforced endpoint security standards, antivirus hardening, and recurring patch management.

<span class="cmd">[EDUCATION]</span>
  • <span class="accent">Master of Science in Cybersecurity</span> (GPA: 3.7) — Saint Peter's University (Jersey City, NJ, Feb 2026)
    - Coursework: Risk Assessment & Compliance, Digital Forensics, Penetration Testing, Cryptography, Malware Analysis.
  • <span class="accent">Bachelor of Science in Information Technology</span> (GPA: 3.8) — Sardar Patel University (Apr 2023)
    - Coursework: Database Management, Operating Systems, Computer Networking, OOP.

<span class="cmd">[GOVERNANCE, RISK & FRAMEWORKS]</span>
  • OWASP Top 10, MITRE ATT&CK, NIST, ISO 27001, GRC, Compliance Monitoring, Alert Triage.
`,
    experience: () => COMMANDS.resume(),
    education: () => COMMANDS.resume(),
    certs: () => `
<span class="cmd">Professional Certifications & Credentials:</span>
  • <span class="accent">[VERIFIED]</span> CompTIA Security+ (SY0-701)
    - Domain Focus: Threat Vectors, Cryptography, Security Architecture, Incident Response, Identity & Access Management
  • <span class="accent">[IN PROGRESS]</span> ISC2 Candidate - Certified in Cybersecurity (CC)
    - Comprehensive study notes, test simulations, and practice questions repository
`,
    certifications: () => COMMANDS.certs(),
    cert: () => COMMANDS.certs(),
    skills: () => `
<span class="cmd">Security Disciplines & Tools:</span>
  • GRC: Risk Assessment, Vulnerability Assessment, Security Policy, Compliance, Alert Triage
  • Security Tools: Splunk (SIEM), Wireshark, Nmap, Burp Suite, Metasploit, OpenVAS, Nessus, Shodan, Autopsy, Volatility, Hashcat, ExifTool
  • Platforms: Windows, Linux, Active Directory / Enterprise Authentication, Endpoint Security
  • Languages: Python, SQL, MySQL, Bash Scripting, JavaScript, Microsoft 365, CSS, React
  • Frameworks: OWASP Top 10, MITRE ATT&CK, ISO 27001, NIST
`,
    projects: () => `
<span class="cmd">Active Repositories & Tools:</span>
  01. <span class="accent">StudyNest</span> - Personal productivity dashboard (Next.js 14, Firebase)
  02. <span class="accent">Improve 2.0</span> - Web Vulnerability Scanner across OWASP Top 10 (FastAPI, React, Groq API)
  03. <span class="accent">SOC-Style Log Parser</span> - Log analysis & brute-force detector (Python, Regex, Llama 3.3)
  04. <span class="accent">Port Scanner</span> - Async TCP scanner mapped to MITRE ATT&CK T1046 (Python, asyncio)
  05. <span class="accent">Caesar Cipher</span> - Classical frequency analysis cracker (Python)
  06. <span class="accent">Study Tracker</span> - Terminal-style tracker with 17 subjects & 159 topics
  07. <span class="accent">CTF Writeups</span> - PicoCTF & OverTheWire Bandit exploit & defense walkthroughs
  08. <span class="accent">Windows Login</span> - Active Directory & Windows authentication security analysis
  09. <span class="accent">Dir Brute-Forcer</span> - Async web directory scanner with soft-404 detection (Python)
  10. <span class="accent">HashCrack</span> - Passphrase auditing and hash identifier tool (Python)
  11. <span class="accent">Stego-Tool</span> - Lossless pixel-LSB image steganography utility (Python)
`,
    'website open': () => `
<span class="cmd">SYSTEM INITIALIZATION SUCCESSFUL</span>
  • Host: <span class="accent">yesha-portfolio-v2</span>
  • Protocol: <span class="accent">HTTPS</span>
  • Port: <span class="accent">443 (Secure)</span>
  • Credentials: <span class="accent">CompTIA Security+ Certified</span>
  • Status: <span class="accent">Active / Fully Rendered</span>

Portfolio modules loaded. Use the terminal below to query parameters.
Type '<span class="accent">help</span>' or '<span class="accent">resume</span>' for a list of available commands.
`,
    banner: () => `
<pre class="terminal-banner">
 __   _______     ____  _____ ____ 
 \\ \\ / /  _ \\   / ___|| ____/ ___|
  \\ V /| |_) |  \\___ \\|  _| | |    
   | | |  __/    ___) | |___| |___ 
   |_| |_|      |____/|_____|\\____|
                                   
  SYSTEM STATUS: <span class="accent">STABLE</span>
  CREDENTIAL: <span class="accent">COMPTIA SECURITY+ CERTIFIED</span>
  IDENTITY: <span class="accent">YESHA PATEL · JERSEY CITY, NJ</span>
</pre>
Welcome to the YP-SEC Terminal. Type '<span class="accent">help</span>' or '<span class="accent">resume</span>' to begin.
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
