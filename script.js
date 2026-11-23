/**
 * RAJPUT AGENCY - Interactive Performance Agency Experience
 */

document.addEventListener('DOMContentLoaded', () => {
  // 0. Dynamic Configuration Loading from Admin Settings
  function loadDynamicConfig() {
    const savedConfig = localStorage.getItem('rajput_config') || localStorage.getItem('vishesh_config') || localStorage.getItem('vortex_config');
    if (!savedConfig) return;
    try {
      const config = JSON.parse(savedConfig);

      // WhatsApp links
      const waNumber = (config.waPhone || '6285183837854').replace(/[^0-9]/g, '');
      const defaultMsg = encodeURIComponent(config.waMessage || config.waDefaultMsg || 'Hi Rajput Agency! I want to scale my business with paid ads and WhatsApp API.');
      const waUrl = `https://wa.me/${waNumber}?text=${defaultMsg}`;

      // Nav Chat button
      const navChatBtn = document.getElementById('navChatBtn');
      if (navChatBtn) navChatBtn.href = waUrl;

      // Quick WhatsApp in contact section
      const quickWa = document.getElementById('quickWhatsappLink');
      if (quickWa) quickWa.href = waUrl;
      const quickWaSubtext = document.getElementById('quickWaSubtext');
      if (quickWaSubtext) {
        const displayPhone = config.callingPhone || `+${waNumber}`;
        quickWaSubtext.textContent = `${displayPhone} • Replies in ~2 mins`;
      }

      // Footer WhatsApp
      const footerWa = document.getElementById('footerWaSocial');
      if (footerWa) footerWa.href = waUrl;

      // Telegram links
      const rawTg = config.tgLink || config.tgUsername || 'https://t.me/RajputAdsAgency';
      const tgUrl = rawTg.startsWith('http') ? rawTg : `https://t.me/${rawTg.replace('@', '')}`;
      const tgHandle = config.tgHandle || config.tgChannelName || '@RajputAgency';

      const quickTg = document.getElementById('quickTelegramLink');
      if (quickTg) quickTg.href = tgUrl;
      const quickTgSubtext = document.getElementById('quickTgSubtext');
      if (quickTgSubtext) quickTgSubtext.textContent = `${tgHandle} • Join Community`;
      const infoTgLink = document.getElementById('infoTgLink');
      if (infoTgLink) {
        infoTgLink.href = tgUrl;
        infoTgLink.innerHTML = `<i class="fab fa-telegram"></i> ${tgHandle}`;
      }
      const footerTg = document.getElementById('footerTgSocial');
      if (footerTg) footerTg.href = tgUrl;

      // Contact details
      const officialEmail = (!config.officialEmail || config.officialEmail.includes('contact@rajput')) ? 'bussiness@rajputagency.online' : config.officialEmail;
      const officeAddress = (!config.officeAddress || config.officeAddress.includes('Global')) ? 'All India' : config.officeAddress;
      const displayPhone = config.callingPhone || `+${waNumber}`;

      const footerEmail = document.getElementById('footerEmail');
      if (footerEmail) footerEmail.textContent = officialEmail;
      const footerEmailLink = document.getElementById('footerEmailLink');
      if (footerEmailLink) footerEmailLink.href = `mailto:${officialEmail}`;

      const quickEmailSubtext = document.getElementById('quickEmailSubtext');
      if (quickEmailSubtext) quickEmailSubtext.textContent = officialEmail;
      const quickEmailLink = document.getElementById('quickEmailLink');
      if (quickEmailLink) quickEmailLink.href = `mailto:${officialEmail}`;

      const footerPhone = document.getElementById('footerPhone');
      if (footerPhone) footerPhone.textContent = displayPhone;
      const footerPhoneLink = document.getElementById('footerPhoneLink');
      if (footerPhoneLink) footerPhoneLink.href = waUrl;

      const footerAddress = document.getElementById('footerAddress');
      if (footerAddress) footerAddress.textContent = officeAddress;

      // Leadership Section Details
      const infoOwnerWa = document.getElementById('infoOwnerWa');
      if (infoOwnerWa) {
        infoOwnerWa.href = waUrl;
        infoOwnerWa.innerHTML = `<i class="fab fa-whatsapp"></i> ${displayPhone}`;
      }
      const infoOwnerEmail = document.getElementById('infoOwnerEmail');
      if (infoOwnerEmail) {
        infoOwnerEmail.href = `mailto:${officialEmail}`;
        infoOwnerEmail.textContent = officialEmail;
      }
      const infoOwnerLocation = document.getElementById('infoOwnerLocation');
      if (infoOwnerLocation) {
        infoOwnerLocation.textContent = officeAddress;
      }

      // Owner & Admin Info
      if (config.adminName) {
        const displayOwnerName = document.getElementById('displayOwnerName');
        if (displayOwnerName) displayOwnerName.innerHTML = `${config.adminName} <i class="fas fa-check-circle" style="color:#25D366;" title="Verified Owner"></i>`;
        const infoOwnerName = document.getElementById('infoOwnerName');
        if (infoOwnerName) infoOwnerName.textContent = config.adminName;
      }
      if (config.agencyName) {
        const infoAgencyName = document.getElementById('infoAgencyName');
        if (infoAgencyName) infoAgencyName.textContent = config.agencyName;
      }

      // Dynamic Admin Photo Sync across Website
      const photoSrc = config.adminPhoto || config.adminPhotoUrl || localStorage.getItem('rajput_admin_photo');
      if (photoSrc) {
        const founderAvatar = document.getElementById('founderAvatarImg');
        if (founderAvatar) founderAvatar.src = photoSrc;
        const chatbotAvatar = document.getElementById('chatbotAvatarImg');
        if (chatbotAvatar) chatbotAvatar.src = photoSrc;
      }

      // Metrics in Ribbon
      if (config.metricSpend || config.metricRoas) {
        document.querySelectorAll('.stat-item').forEach(item => {
          const label = item.querySelector('.stat-label')?.textContent?.toLowerCase() || '';
          const num = item.querySelector('.stat-num');
          if (!num) return;
          if (label.includes('spend') && config.metricSpend) num.textContent = config.metricSpend;
          if (label.includes('roas') && config.metricRoas) num.textContent = config.metricRoas;
          if (label.includes('landing') && config.metricPages) num.textContent = config.metricPages;
          if (label.includes('retention') && config.metricRetention) num.textContent = config.metricRetention;
          if (label.includes('leads') && config.metricLeads) num.textContent = config.metricLeads;
        });
      }
    } catch (e) {
      console.error('Error applying config:', e);
    }
  }

  loadDynamicConfig();

  // 1. Navbar Scroll Effect
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuToggle.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });
    // Close on click link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // 2. Hero Interactive Slider (01 ─── 03 from reference layout)
  const slides = [
    {
      num: '01',
      tag: 'PERFORMANCE ACQUISITION',
      title: 'SCALE',
      desc: 'We engineer high-converting paid acquisition funnels across Google, Meta, Telegram, and WhatsApp. Driven by data, optimized for maximum ROAS.',
      cta: 'Start Scaling',
      progress: '33.3%'
    },
    {
      num: '02',
      tag: 'NICHE DOMINANCE',
      title: 'ENGAGE',
      desc: 'Unlock untapped, high-intent traffic with direct Telegram channel sponsorships and automated WhatsApp Click-to-Chat lead capture systems.',
      cta: 'Explore Channels',
      progress: '66.6%'
    },
    {
      num: '03',
      tag: 'CONVERSION OPTIMIZATION',
      title: 'CONVERT',
      desc: 'High-speed, neuromarketing landing pages engineered to double your conversion rate and maximize your buyer retention lifetime value.',
      cta: 'Build Landing Page',
      progress: '100%'
    }
  ];

  let currentSlideIndex = 0;
  const currentSlideNumEl = document.getElementById('currentSlideNum');
  const heroSubtitleTagEl = document.getElementById('heroSubtitleTag');
  const heroTitleEl = document.getElementById('heroTitle');
  const heroDescEl = document.getElementById('heroDesc');
  const heroCtaBtnEl = document.getElementById('heroCtaBtn');
  const sliderFillBarEl = document.getElementById('sliderFillBar');
  const prevSlideBtn = document.getElementById('prevSlide');
  const nextSlideBtn = document.getElementById('nextSlide');

  function renderSlide(index) {
    const slide = slides[index];
    if (!slide) return;

    // Smooth fade effect
    heroTitleEl.style.opacity = '0';
    heroTitleEl.style.transform = 'translateY(10px)';
    heroDescEl.style.opacity = '0';

    setTimeout(() => {
      currentSlideNumEl.textContent = slide.num;
      heroSubtitleTagEl.textContent = slide.tag;
      heroTitleEl.textContent = slide.title;
      heroDescEl.textContent = slide.desc;
      
      const ctaText = heroCtaBtnEl.querySelector('.circle-cta-text');
      if (ctaText) ctaText.textContent = slide.cta;

      sliderFillBarEl.style.width = slide.progress;

      heroTitleEl.style.opacity = '1';
      heroTitleEl.style.transform = 'translateY(0)';
      heroDescEl.style.opacity = '1';
    }, 200);
  }

  if (nextSlideBtn && prevSlideBtn) {
    nextSlideBtn.addEventListener('click', () => {
      currentSlideIndex = (currentSlideIndex + 1) % slides.length;
      renderSlide(currentSlideIndex);
    });

    prevSlideBtn.addEventListener('click', () => {
      currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
      renderSlide(currentSlideIndex);
    });

    // Auto rotate every 8 seconds
    setInterval(() => {
      currentSlideIndex = (currentSlideIndex + 1) % slides.length;
      renderSlide(currentSlideIndex);
    }, 8000);
  }

  // 3. Interactive ROI & Budget Calculator
  const budgetRange = document.getElementById('budgetRange');
  const budgetDisplay = document.getElementById('budgetDisplay');
  const estRevenue = document.getElementById('estRevenue');
  const estRoas = document.getElementById('estRoas');
  const estClicks = document.getElementById('estClicks');
  const estLeads = document.getElementById('estLeads');
  const estCostPerLead = document.getElementById('estCostPerLead');
  const estConvRate = document.getElementById('estConvRate');

  const channelCheckboxes = document.querySelectorAll('.channel-toggle input');

  // Toggle button styling when checkbox state changes
  channelCheckboxes.forEach(chk => {
    chk.addEventListener('change', (e) => {
      const parentLabel = e.target.closest('.channel-toggle');
      if (e.target.checked) {
        parentLabel.classList.add('active');
      } else {
        parentLabel.classList.remove('active');
      }
      calculateROI();
    });
  });

  function calculateROI() {
    if (!budgetRange) return;

    const budget = parseFloat(budgetRange.value);
    budgetDisplay.textContent = `₹${budget.toLocaleString('en-IN')}`;

    // Count active channels for multiplier boost
    const activeChannels = Array.from(channelCheckboxes).filter(c => c.checked).length;
    const channelFactor = Math.max(1, activeChannels);

    // Multipliers
    let baseRoas = 3.8 + (channelFactor * 0.25); // Range approx 4.0x - 4.8x
    if (budget > 100000) baseRoas += 0.4;

    const projectedRevenue = Math.round(budget * baseRoas);
    const avgCpc = 4.20 - (activeChannels * 0.35); // in INR (approx ₹2.80 - ₹4.20)
    const clicks = Math.round(budget / Math.max(2.2, avgCpc));
    const convRate = 5.2 + (channelFactor * 0.45); // Approx 5.6% - 7.0%
    const leads = Math.round((clicks * convRate) / 100);
    const costPerLead = (budget / Math.max(1, leads)).toFixed(2);

    // Update UI with formatted numbers
    estRevenue.textContent = `₹${projectedRevenue.toLocaleString('en-IN')}`;
    estRoas.textContent = `${baseRoas.toFixed(1)}x Expected ROAS`;
    estClicks.textContent = clicks.toLocaleString('en-IN');
    estLeads.textContent = `${leads.toLocaleString('en-IN')}+`;
    estCostPerLead.textContent = `₹${costPerLead}`;
    estConvRate.textContent = `${convRate.toFixed(1)}%`;
  }

  if (budgetRange) {
    budgetRange.addEventListener('input', calculateROI);
    calculateROI(); // Initial run
  }

  // 4. FAQ Accordion Interaction
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      // Close other items
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // 5. Audit Lead Form Submission & WhatsApp Direct Routing
  const auditForm = document.getElementById('growthAuditForm');
  const formSuccessMessage = document.getElementById('formSuccessMessage');

  if (auditForm) {
    auditForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('fullName').value.trim();
      const email = document.getElementById('userEmail').value.trim();
      const phone = document.getElementById('userPhone').value.trim();
      const budget = document.getElementById('monthlySpend').value;

      const checkedServices = Array.from(
        document.querySelectorAll('input[name="services"]:checked')
      ).map(cb => cb.value);

      const servicesList = checkedServices.length > 0 ? checkedServices.join(', ') : 'All Channels';

      // 1. Save Lead into LocalStorage for Admin CRM
      try {
        const existingLeads = JSON.parse(localStorage.getItem('rajput_leads') || localStorage.getItem('vishesh_leads') || localStorage.getItem('vortex_leads') || '[]');
        const now = new Date();
        const dateStr = now.toLocaleDateString() + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        existingLeads.unshift({
          date: dateStr,
          name: name,
          email: email,
          phone: phone,
          services: servicesList,
          budget: budget
        });
        localStorage.setItem('rajput_leads', JSON.stringify(existingLeads));
        localStorage.setItem('vishesh_leads', JSON.stringify(existingLeads));
        localStorage.setItem('vortex_leads', JSON.stringify(existingLeads));
      } catch (err) {
        console.error('Error saving lead to CRM:', err);
      }

      // 2. Read admin configured WhatsApp number
      let waPhone = '6285183837854';
      try {
        const cfg = JSON.parse(localStorage.getItem('rajput_config') || localStorage.getItem('vishesh_config') || localStorage.getItem('vortex_config') || '{}');
        if (cfg.waPhone) {
          waPhone = cfg.waPhone.replace(/[^0-9]/g, '');
        }
      } catch {}

      // 3. Build WhatsApp message URL
      const whatsappMsg = `Hi Rajput Agency!%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Email:* ${encodeURIComponent(email)}%0A*Phone:* ${encodeURIComponent(phone)}%0A*Budget:* ${encodeURIComponent(budget)}%0A*Services Needed:* ${encodeURIComponent(servicesList)}%0A%0AI would like to schedule my free strategy audit.`;
      const waDest = `https://wa.me/${waPhone}?text=${whatsappMsg}`;

      // Show instant feedback
      formSuccessMessage.style.display = 'block';

      setTimeout(() => {
        // Open WhatsApp with prefilled message
        window.open(waDest, '_blank');
        auditForm.reset();
        setTimeout(() => {
          formSuccessMessage.style.display = 'none';
        }, 5000);
      }, 1000);
    });
  }

  // 6. Subtle 3D mouse parallax on hero sculpture (for desktop devices)
  const heroWrapper = document.querySelector('.hero-visual-wrapper');
  const heroSculpture = document.getElementById('heroSculpture');
  const heroRedDisc = document.querySelector('.hero-red-disc');

  if (heroWrapper && heroSculpture && window.innerWidth > 992) {
    heroWrapper.addEventListener('mousemove', (e) => {
      const rect = heroWrapper.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      heroSculpture.style.transform = `translate(${x * 15}px, ${y * 15 + 10}px) scale(1.02)`;
      heroRedDisc.style.transform = `translate(${x * -20}px, ${y * -20}px)`;
    });

    heroWrapper.addEventListener('mouseleave', () => {
      heroSculpture.style.transform = 'translate(0px, 10px) scale(1)';
      heroRedDisc.style.transform = 'translate(0px, 0px)';
    });
  }

  // 7. Interactive WhatsApp AI Chatbot Widget Controller
  const floatingWhatsapp = document.getElementById('floatingWhatsapp');
  const waChatbotDrawer = document.getElementById('waChatbotDrawer');
  const closeWaChatbot = document.getElementById('closeWaChatbot');
  const waChatbotBody = document.getElementById('waChatbotBody');
  const waChatbotForm = document.getElementById('waChatbotForm');
  const waChatbotInput = document.getElementById('waChatbotInput');

  function getActiveWaNumber() {
    try {
      const cfg = JSON.parse(localStorage.getItem('rajput_config') || localStorage.getItem('vishesh_config') || localStorage.getItem('vortex_config') || '{}');
      if (cfg.waPhone) return cfg.waPhone.replace(/[^0-9]/g, '');
    } catch {}
    return '6285183837854';
  }

  if (floatingWhatsapp && waChatbotDrawer) {
    floatingWhatsapp.addEventListener('click', (e) => {
      e.preventDefault();
      waChatbotDrawer.classList.toggle('active');
      if (waChatbotDrawer.classList.contains('active')) {
        setTimeout(() => waChatbotInput && waChatbotInput.focus(), 250);
      }
    });
  }

  if (closeWaChatbot && waChatbotDrawer) {
    closeWaChatbot.addEventListener('click', () => {
      waChatbotDrawer.classList.remove('active');
    });
  }

  // Handle quick chip clicks
  if (waChatbotBody) {
    waChatbotBody.addEventListener('click', (e) => {
      const chipBtn = e.target.closest('.wa-chat-chip-btn');
      if (!chipBtn) return;
      const query = chipBtn.getAttribute('data-query');
      if (!query) return;

      appendChatMessage(query, 'user');

      // Bot response simulation with 1-click WhatsApp launcher
      setTimeout(() => {
        const waNum = getActiveWaNumber();
        const prefill = encodeURIComponent(`Hi Rajput, I am inquiring about ${query}. Please share details and pricing.`);
        const directUrl = `https://wa.me/${waNum}?text=${prefill}`;

        const botReplyHtml = `
          <strong>Regarding "${escapeChatText(query)}":</strong><br>
          We provide immediate onboarding, Meta compliance setup, and priority technical assistance.<br>
          <a href="${directUrl}" target="_blank" class="wa-msg-action-btn">
            <i class="fab fa-whatsapp"></i> Chat on WhatsApp (+62 851-8383-7854)
          </a>
        `;
        appendChatMessage(botReplyHtml, 'bot', true);
      }, 350);
    });
  }

  // Handle typing input and form submit
  if (waChatbotForm && waChatbotInput) {
    waChatbotForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = waChatbotInput.value.trim();
      if (!text) return;

      appendChatMessage(text, 'user');
      waChatbotInput.value = '';

      const waNum = getActiveWaNumber();
      const prefill = encodeURIComponent(`Hi Rajput, ${text}`);
      const directUrl = `https://wa.me/${waNum}?text=${prefill}`;

      setTimeout(() => {
        const botReplyHtml = `
          Opening direct WhatsApp chat with Rajput...<br>
          <a href="${directUrl}" target="_blank" class="wa-msg-action-btn">
            <i class="fab fa-whatsapp"></i> Click to Open WhatsApp
          </a>
        `;
        appendChatMessage(botReplyHtml, 'bot', true);
        window.open(directUrl, '_blank');
      }, 500);
    });
  }

  function appendChatMessage(content, sender, isHtml = false) {
    if (!waChatbotBody) return;
    const bubble = document.createElement('div');
    bubble.className = `wa-msg-bubble ${sender === 'user' ? 'wa-msg-user' : 'wa-msg-bot'}`;
    if (isHtml) {
      bubble.innerHTML = content;
    } else {
      bubble.textContent = content;
    }
    waChatbotBody.appendChild(bubble);
    waChatbotBody.scrollTop = waChatbotBody.scrollHeight;
  }

  function escapeChatText(str) {
    return str.replace(/[&<>'"]/g, tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag));
  }
});
