// mobile nav toggle — fully JS controlled
document.addEventListener('DOMContentLoaded', function(){
  const burgerBtn = document.getElementById('burgerBtn');
  const navLinksEl = document.getElementById('navLinks');
  const navOverlay = document.getElementById('navOverlay');

  function openMenu(){
    navLinksEl.classList.add('show');
    navOverlay.classList.add('show');
    burgerBtn.classList.add('active');
    burgerBtn.setAttribute('aria-expanded','true');
    document.body.classList.add('no-scroll');
  }
  function closeMenu(){
    navLinksEl.classList.remove('show');
    navOverlay.classList.remove('show');
    burgerBtn.classList.remove('active');
    burgerBtn.setAttribute('aria-expanded','false');
    document.body.classList.remove('no-scroll');
  }
  function toggleMenu(){
    navLinksEl.classList.contains('show') ? closeMenu() : openMenu();
  }

  burgerBtn.addEventListener('click', toggleMenu);
  navOverlay.addEventListener('click', closeMenu);

  // close menu when a nav link is tapped
  navLinksEl.querySelectorAll('a').forEach(a=>{
    a.addEventListener('click', closeMenu);
  });

  // close menu if window is resized back to desktop
  window.addEventListener('resize', function(){
    if(window.innerWidth > 820) closeMenu();
  });

  // close on Escape key
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape') closeMenu();
  });

  // dark / light mode toggle
  const themeSwitch = document.querySelector('.switch');
  const htmlEl = document.documentElement;

  function setTheme(mode){
    if(mode === 'dark'){
      htmlEl.setAttribute('data-theme','dark');
      themeSwitch.classList.add('active');
    } else {
      htmlEl.removeAttribute('data-theme');
      themeSwitch.classList.remove('active');
    }
    localStorage.setItem('gm-theme', mode);
  }

  // apply saved preference, fallback to system preference
  const savedTheme = localStorage.getItem('gm-theme');
  if(savedTheme){
    setTheme(savedTheme);
  } else if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
    setTheme('dark');
  }

  themeSwitch.addEventListener('click', function(){
    const isDark = htmlEl.getAttribute('data-theme') === 'dark';
    setTheme(isDark ? 'light' : 'dark');
  });

  // ---------- SCROLL TO SINGLE FORM (prefill Apply As, then scroll) ----------
  const applyAsSelect = document.getElementById('applyAsSelect');
  document.querySelectorAll('.scroll-form-btn').forEach(function(btn){
    btn.addEventListener('click', function(){
      const applyAs = btn.getAttribute('data-apply-as');
      if(applyAs && applyAsSelect){
        applyAsSelect.value = applyAs;
      }
      // native anchor href="#contact" handles the scroll
    });
  });

  // FAQ data + accordion
  const faqs = [
    ["Which classes and subjects do you teach?","We provide home tuition for Classes KG to 12 across CBSE, ICSE and State Boards, covering Maths, Science, English and all core subjects."],
    ["What are the eligibility and qualifications of the tutors?","All our tutors are verified graduates or postgraduates from recognized institutions, screened through background checks and a teaching assessment."],
    ["Do you offer home tuition or online tuition?","We offer both — one-on-one home tuition at your doorstep as well as flexible online sessions, based on your preference."],
    ["Is there a free demo class available?","Yes, we offer a 2-day free demo so you can evaluate the tutor before committing to regular classes."],
    ["What is the batch size for classes?","All sessions are strictly one-on-one to ensure personalized attention for every student."],
    ["How much are the tuition fees?","Fees vary by class, subject and tutor experience. Share your requirement in the form and we'll share a customized quote."],
    ["Can I select my preferred class timings?","Absolutely, you can choose days and time slots that fit your child's routine."],
    ["How is my payment secured on TutorPro?","All payments are processed through secure, encrypted channels with full transparency on fees."],
    ["Can I replace or change my tutor later?","Yes, if you're not fully satisfied we'll match you with another verified tutor at no extra cost."],
    ["How do I connect with TutorPro?","You can call, WhatsApp, email us, or simply fill out the query form on this page and our team will reach out within 24 hours."]
  ];
  const wrap = document.getElementById('faqWrap');
  faqs.forEach((f,i)=>{
    const item = document.createElement('div');
    item.className='faq-item';
    item.innerHTML = `
      <div class="faq-q">
        <span class="num">${i+1}</span>
        <span>${f[0]}</span>
        <span class="chev">▾</span>
      </div>
      <div class="faq-a"><div class="faq-a-in">${f[1]}</div></div>
    `;
    item.querySelector('.faq-q').addEventListener('click',()=>{
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(el=>el.classList.remove('open'));
      if(!wasOpen) item.classList.add('open');
    });
    wrap.appendChild(item);
  });

  // active nav link on scroll
  const sections = document.querySelectorAll('section[id], .hero[id]');
  const navA = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll',()=>{
    let cur='';
    sections.forEach(s=>{
      if(window.scrollY >= s.offsetTop - 100) cur = s.getAttribute('id');
    });
    navA.forEach(a=>{
      a.classList.toggle('active', a.getAttribute('href') === '#'+cur);
    });
  });



});