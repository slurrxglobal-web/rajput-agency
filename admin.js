/**
 * RAJPUT AGENCY - ADMIN CONTROL CENTER JAVASCRIPT
 */

const DEFAULT_AVATAR = "assets/admin_logo.jpg";

const DEFAULT_CONFIG = {
  waPhone: "6285183837854",
  waMessage: "Hi Rajput Agency, I want to scale my business with high-ROAS paid ads and WhatsApp API!",
  tgLink: "https://t.me/RajputAdsAgency",
  tgHandle: "@RajputAgency",
  agencyName: "RAJPUT AGENCY",
  officialEmail: "bussiness@rajputagency.online",
  callingPhone: "+62 851-8383-7854",
  officeAddress: "All India",
  adminName: "Rajput",
  adminUsername: "admin",
  adminPassword: "rajput123",
  adminPhoto: DEFAULT_AVATAR
};

document.addEventListener('DOMContentLoaded', () => {
  // 1. Authentication
  const loginModal = document.getElementById('loginModal');
  const adminDashboard = document.getElementById('adminDashboard');
  const loginForm = document.getElementById('adminLoginForm');
  const loginUsernameInput = document.getElementById('loginUsername');
  const loginPasswordInput = document.getElementById('loginPassword');
  const loginError = document.getElementById('loginError');
  const btnLogout = document.getElementById('btnLogout');

  function getConfig() {
    const saved = localStorage.getItem('rajput_config') || localStorage.getItem('vortex_config');
    let config = DEFAULT_CONFIG;
    if (saved) {
      try {
        config = { ...DEFAULT_CONFIG, ...JSON.parse(saved) };
      } catch {
        config = DEFAULT_CONFIG;
      }
    }
    // Auto-migrate legacy defaults
    if (!config.officialEmail || config.officialEmail.includes('contact@rajput')) {
      config.officialEmail = 'bussiness@rajputagency.online';
    }
    if (!config.officeAddress || config.officeAddress.includes('Global')) {
      config.officeAddress = 'All India';
    }
    if (!config.callingPhone || config.callingPhone.includes('7668638453')) {
      config.callingPhone = '+62 851-8383-7854';
      config.waPhone = '6285183837854';
    }
    return config;
  }

  // Update all avatar instances across admin UI
  function updateAdminAvatars(photoSrc) {
    const src = photoSrc || DEFAULT_AVATAR;
    const loginAvatar = document.getElementById('loginAvatarImg');
    if (loginAvatar) loginAvatar.src = src;
    const headerAvatar = document.getElementById('headerAvatarImg');
    if (headerAvatar) headerAvatar.src = src;
    const showcaseAvatar = document.getElementById('showcaseAvatarImg');
    if (showcaseAvatar) showcaseAvatar.src = src;

    const btnReset1 = document.getElementById('btnResetPhoto');
    const btnReset2 = document.getElementById('btnResetPhotoAlt');
    const isCustom = photoSrc && photoSrc !== DEFAULT_AVATAR;
    if (btnReset1) btnReset1.style.display = isCustom ? 'inline-flex' : 'none';
    if (btnReset2) btnReset2.style.display = isCustom ? 'inline-flex' : 'none';
  }

  // Compress image to ensure efficient localStorage storage
  function compressAndSavePhoto(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
      const img = new Image();
      img.onload = function() {
        const canvas = document.createElement('canvas');
        const maxSize = 400; // Optimal 400x400 avatar
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxSize) {
            height = Math.round((height * maxSize) / width);
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width = Math.round((width * maxSize) / height);
            height = maxSize;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.88);

        // Save photo in config & dedicated key
        const currentConfig = getConfig();
        currentConfig.adminPhoto = dataUrl;
        localStorage.setItem('rajput_config', JSON.stringify(currentConfig));
        localStorage.setItem('vortex_config', JSON.stringify(currentConfig));
        localStorage.setItem('rajput_admin_photo', dataUrl);

        updateAdminAvatars(dataUrl);
        const cfgPhotoUrl = document.getElementById('cfgAdminPhotoUrl');
        if (cfgPhotoUrl) cfgPhotoUrl.value = '';

        showToast('Profile photo updated on Website & Admin Panel!');
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  // Initialize initial avatar in login screen
  const initialConfig = getConfig();
  const savedPhoto = initialConfig.adminPhoto || localStorage.getItem('rajput_admin_photo') || DEFAULT_AVATAR;
  updateAdminAvatars(savedPhoto);

  function checkSession() {
    if (sessionStorage.getItem('rajput_admin_logged') === 'true') {
      loginModal.style.display = 'none';
      adminDashboard.style.display = 'block';
      loadSettingsIntoUI();
      renderLeads();
    }
  }

  checkSession();

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const config = getConfig();
      const u = loginUsernameInput.value.trim();
      const p = loginPasswordInput.value.trim();

      const expectedUser = config.adminUsername || "admin";
      const expectedPass = config.adminPassword || "rajput123";

      if (u === expectedUser && p === expectedPass) {
        sessionStorage.setItem('rajput_admin_logged', 'true');
        loginError.style.display = 'none';
        loginModal.style.display = 'none';
        adminDashboard.style.display = 'block';
        loadSettingsIntoUI();
        renderLeads();
      } else {
        loginError.style.display = 'block';
        loginPasswordInput.value = '';
        loginPasswordInput.focus();
      }
    });
  }

  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      sessionStorage.removeItem('rajput_admin_logged');
      window.location.reload();
    });
  }

  // 2. Load Settings into UI
  function loadSettingsIntoUI() {
    const config = getConfig();

    // Profile & Photo
    const adminName = config.adminName || "Rajput";
    document.getElementById('topAdminName').textContent = adminName;
    document.getElementById('showcaseAdminName').textContent = adminName;
    document.getElementById('cfgAdminName').value = adminName;
    document.getElementById('cfgAdminUsername').value = config.adminUsername || "admin";
    document.getElementById('cfgAdminPassword').value = config.adminPassword || "rajput123";

    const currentPhoto = config.adminPhoto || localStorage.getItem('rajput_admin_photo') || DEFAULT_AVATAR;
    updateAdminAvatars(currentPhoto);
    const cfgPhotoUrl = document.getElementById('cfgAdminPhotoUrl');
    if (cfgPhotoUrl) {
      cfgPhotoUrl.value = currentPhoto.startsWith('http') ? currentPhoto : '';
    }

    // WhatsApp & Telegram
    document.getElementById('cfgWaPhone').value = config.waPhone || "6285183837854";
    document.getElementById('cfgWaMessage').value = config.waMessage || "";
    document.getElementById('cfgTgLink').value = config.tgLink || "https://t.me/RajputAdsAgency";
    document.getElementById('cfgTgHandle').value = config.tgHandle || "@RajputAgency";

    // Agency Info
    document.getElementById('cfgAgencyName').value = config.agencyName || "RAJPUT AGENCY";
    document.getElementById('cfgOfficialEmail').value = config.officialEmail || "bussiness@rajputagency.online";
    document.getElementById('cfgCallingPhone').value = config.callingPhone || "+62 851-8383-7854";
    document.getElementById('cfgOfficeAddress').value = config.officeAddress || "All India";
  }

  // File upload input handlers
  const adminPhotoInput = document.getElementById('adminPhotoInput');
  const btnUploadPhoto = document.getElementById('btnUploadPhoto');
  const btnUploadPhotoAlt = document.getElementById('btnUploadPhotoAlt');
  const btnResetPhoto = document.getElementById('btnResetPhoto');
  const btnResetPhotoAlt = document.getElementById('btnResetPhotoAlt');

  if (btnUploadPhoto && adminPhotoInput) {
    btnUploadPhoto.addEventListener('click', () => adminPhotoInput.click());
  }
  if (btnUploadPhotoAlt && adminPhotoInput) {
    btnUploadPhotoAlt.addEventListener('click', () => adminPhotoInput.click());
  }
  if (adminPhotoInput) {
    adminPhotoInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        compressAndSavePhoto(e.target.files[0]);
      }
    });
  }

  function resetToDefaultPhoto() {
    const currentConfig = getConfig();
    currentConfig.adminPhoto = DEFAULT_AVATAR;
    localStorage.setItem('rajput_config', JSON.stringify(currentConfig));
    localStorage.setItem('vortex_config', JSON.stringify(currentConfig));
    localStorage.removeItem('rajput_admin_photo');
    updateAdminAvatars(DEFAULT_AVATAR);
    const cfgPhotoUrl = document.getElementById('cfgAdminPhotoUrl');
    if (cfgPhotoUrl) cfgPhotoUrl.value = '';
    showToast('Reset photo to default!');
  }

  if (btnResetPhoto) btnResetPhoto.addEventListener('click', resetToDefaultPhoto);
  if (btnResetPhotoAlt) btnResetPhotoAlt.addEventListener('click', resetToDefaultPhoto);

  // 3. Save Settings Handler
  function saveAllSettings() {
    const currentConfig = getConfig();

    let photoVal = currentConfig.adminPhoto || DEFAULT_AVATAR;
    const inputUrl = document.getElementById('cfgAdminPhotoUrl')?.value?.trim();
    if (inputUrl && inputUrl.startsWith('http')) {
      photoVal = inputUrl;
      localStorage.setItem('rajput_admin_photo', inputUrl);
      updateAdminAvatars(inputUrl);
    }

    const updatedConfig = {
      ...currentConfig,
      adminPhoto: photoVal,
      waPhone: document.getElementById('cfgWaPhone').value.trim().replace(/[^0-9]/g, ''),
      waMessage: document.getElementById('cfgWaMessage').value.trim(),
      tgLink: document.getElementById('cfgTgLink').value.trim(),
      tgHandle: document.getElementById('cfgTgHandle').value.trim(),
      agencyName: document.getElementById('cfgAgencyName').value.trim() || "RAJPUT AGENCY",
      officialEmail: document.getElementById('cfgOfficialEmail').value.trim(),
      callingPhone: document.getElementById('cfgCallingPhone').value.trim(),
      officeAddress: document.getElementById('cfgOfficeAddress').value.trim()
    };

    // Save to both keys for 100% compatibility
    localStorage.setItem('rajput_config', JSON.stringify(updatedConfig));
    localStorage.setItem('vortex_config', JSON.stringify(updatedConfig));

    showToast('Changes successfully saved and live on website!');
  }

  document.getElementById('btnSaveAllTop')?.addEventListener('click', saveAllSettings);
  document.getElementById('btnSaveAllBottom')?.addEventListener('click', saveAllSettings);

  // 4. Update Admin Credentials Handler
  const btnUpdateCredentials = document.getElementById('btnUpdateCredentials');
  const credUpdateMsg = document.getElementById('credUpdateMsg');

  if (btnUpdateCredentials) {
    btnUpdateCredentials.addEventListener('click', () => {
      const newName = document.getElementById('cfgAdminName').value.trim();
      const newUser = document.getElementById('cfgAdminUsername').value.trim();
      const newPass = document.getElementById('cfgAdminPassword').value.trim();
      const photoUrlInput = document.getElementById('cfgAdminPhotoUrl')?.value?.trim();

      if (!newUser || !newPass) {
        credUpdateMsg.style.color = '#ff4757';
        credUpdateMsg.textContent = 'Username and Password cannot be empty!';
        return;
      }

      const currentConfig = getConfig();
      currentConfig.adminName = newName || "Rajput";
      currentConfig.adminUsername = newUser;
      currentConfig.adminPassword = newPass;

      if (photoUrlInput && photoUrlInput.startsWith('http')) {
        currentConfig.adminPhoto = photoUrlInput;
        localStorage.setItem('rajput_admin_photo', photoUrlInput);
        updateAdminAvatars(photoUrlInput);
      }

      localStorage.setItem('rajput_config', JSON.stringify(currentConfig));
      localStorage.setItem('vortex_config', JSON.stringify(currentConfig));

      document.getElementById('topAdminName').textContent = currentConfig.adminName;
      document.getElementById('showcaseAdminName').textContent = currentConfig.adminName;

      credUpdateMsg.style.color = '#25D366';
      credUpdateMsg.textContent = 'Admin Profile, Photo & Credentials updated successfully!';
      setTimeout(() => { credUpdateMsg.textContent = ''; }, 3500);
      showToast('Admin Profile & Credentials updated!');
    });
  }

  function showToast(msg) {
    const toast = document.getElementById('saveToast');
    if (!toast) return;
    toast.querySelector('span').textContent = msg;
    toast.style.display = 'flex';
    setTimeout(() => {
      toast.style.display = 'none';
    }, 3500);
  }

  // 5. Leads Table CRM
  function getLeads() {
    const saved = localStorage.getItem('rajput_leads') || localStorage.getItem('vortex_leads');
    if (!saved) return [];
    try {
      return JSON.parse(saved);
    } catch {
      return [];
    }
  }

  function renderLeads() {
    const leads = getLeads();
    const tableBody = document.getElementById('leadsTableBody');
    const emptyState = document.getElementById('emptyLeadsState');
    if (!tableBody) return;

    tableBody.innerHTML = '';

    if (leads.length === 0) {
      emptyState.style.display = 'block';
      return;
    }

    emptyState.style.display = 'none';

    leads.forEach((lead) => {
      const tr = document.createElement('tr');
      tr.className = 'lead-row-card';
      const cleanPhone = (lead.phone || '').replace(/[^0-9]/g, '');
      const waLink = `https://wa.me/${cleanPhone}?text=Hi%20${encodeURIComponent(lead.name || 'there')},%20this%20is%20from%20Rajput%20Ads%20Agency%20regarding%20your%20growth%20audit!`;

      tr.innerHTML = `
        <td class="col-date" data-label="Date">
          <span class="mobile-label"><i class="far fa-calendar-alt"></i> Date</span>
          <span class="cell-val date-val">${escapeHTML(lead.date || 'Recent')}</span>
        </td>
        <td class="col-name" data-label="Client">
          <span class="mobile-label"><i class="fas fa-user"></i> Client</span>
          <span class="cell-val"><strong class="lead-name-text">${escapeHTML(lead.name || 'Unknown')}</strong></span>
        </td>
        <td class="col-email" data-label="Email">
          <span class="mobile-label"><i class="fas fa-envelope"></i> Email</span>
          <span class="cell-val">${lead.email ? `<a href="mailto:${escapeHTML(lead.email)}" class="lead-email-link">${escapeHTML(lead.email)}</a>` : '<span class="text-dim">-</span>'}</span>
        </td>
        <td class="col-phone" data-label="Phone">
          <span class="mobile-label"><i class="fas fa-phone-alt"></i> WhatsApp</span>
          <span class="cell-val"><span class="lead-phone-text">${escapeHTML(lead.phone || '-')}</span></span>
        </td>
        <td class="col-service" data-label="Services">
          <span class="mobile-label"><i class="fas fa-bullhorn"></i> Services</span>
          <span class="cell-val"><span class="service-pill">${escapeHTML(lead.services || 'Ads')}</span></span>
        </td>
        <td class="col-budget" data-label="Budget">
          <span class="mobile-label"><i class="fas fa-wallet"></i> Budget</span>
          <span class="cell-val"><strong class="budget-pill">${escapeHTML(lead.budget || '-')}</strong></span>
        </td>
        <td class="col-action" data-label="Action">
          <span class="mobile-label"><i class="fab fa-whatsapp"></i> Action</span>
          <span class="cell-val action-cell-val">
            ${cleanPhone ? `<a href="${waLink}" target="_blank" class="lead-wa-btn"><i class="fab fa-whatsapp"></i> Chat on WhatsApp</a>` : '<span class="text-dim">No WhatsApp</span>'}
          </span>
        </td>
      `;
      tableBody.appendChild(tr);
    });
  }

  // Clear leads
  document.getElementById('btnClearLeads')?.addEventListener('click', () => {
    if (confirm('Kya aap sach me saare leads clear karna chahte hain?')) {
      localStorage.removeItem('rajput_leads');
      localStorage.removeItem('vortex_leads');
      renderLeads();
      showToast('All leads cleared!');
    }
  });

  // Export CSV
  document.getElementById('btnExportCsv')?.addEventListener('click', () => {
    const leads = getLeads();
    if (leads.length === 0) {
      alert('No leads to export.');
      return;
    }

    let csv = 'Date,Name,Email,Phone,Services,MonthlyBudget\n';
    leads.forEach(l => {
      csv += `"${l.date || ''}","${(l.name || '').replace(/"/g, '""')}","${(l.email || '').replace(/"/g, '""')}","${(l.phone || '').replace(/"/g, '""')}","${(l.services || '').replace(/"/g, '""')}","${(l.budget || '').replace(/"/g, '""')}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rajput_leads_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }
});
