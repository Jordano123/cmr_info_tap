   // Persisted language key
    const LANG_KEY = 'cmr_lang';

    // Translations (English + French)
    const T = {
      en: {
        connectIntro: "Tell us a little about you",
        connectHeading: "CONNECT",
        sectionPersonalTitle: "Tell us a little about you",
        labelFirst: "First Name",
        labelLast: "Last Name",
        labelPhone: "Phone Number",
        labelEmail: "Email (optional)",
        labelAddress: "Address",
        addressPlaceholder: "Start typing address...",
        addressHelp: "Select an address to auto-fill city, state and ZIP.",
        sectionAddressTitle: "Where do you live? (optional)",
        labelStatus: "Where are you at with CMR?",
        statusHelp: "Choose the option that best describes you.",
        sectionInterestTitle: "I’m interested in… (optional)",
        interest: {
          becoming_member: "Becoming a member",
          baptism: "Baptism",
          serving: "Serving",
          small_group: "Joining a small group / crew",
          prayer: "Prayer",
          learning: "Learning more about Jesus",
          volunteering: "Volunteering"
        },
        teamsTitle: "Which team interests you?",
        kidsHint: "You can add up to 5 children.",
        kidNamePlaceholder: "Child's full name",
        kidAgePlaceholder: "Date of birth",
        prayerSubtle: "Prayer Request",
        prayerPlaceholder: "Share your request here",
        submitBtn: "Connect with CMR",
        resetBtn: "Clear",
        thankYou: "Thank you — we received your submission and will get back to you soon.",
        validation: {
          required: "This field is required.",
          phoneInvalid: "Enter a valid phone number.",
          emailInvalid: "Enter a valid email address.",
          addressCityLabel: "City", addressStateLabel: "State", addressZipLabel: "ZIP",
        }
      },
      fr: {
        connectIntro: "Parlez-nous un peu de vous",
        connectHeading: "CONNECT",
        sectionPersonalTitle: "Parlez-nous un peu de vous",
        labelFirst: "Prénom",
        labelLast: "Nom",
        labelPhone: "Téléphone",
        labelEmail: "E-mail (optionnel)",
        labelAddress: "Adresse",
        addressPlaceholder: "Commencez à taper l'adresse...",
        addressHelp: "Sélectionnez une adresse pour remplir automatiquement la ville, l'état et le code postal.",
        sectionAddressTitle: "Où habitez-vous ? (optionnel)",
        labelStatus: "Où en êtes-vous avec CMR ?",
        statusHelp: "Choisissez l'option qui vous décrit le mieux.",
        sectionInterestTitle: "Je suis intéressé par… (optionnel)",
        interest: {
          becoming_member: "Devenir membre",
          baptism: "Baptême",
          serving: "Servir",
          small_group: "Rejoindre un petit groupe / équipe",
          prayer: "Prière",
          learning: "En savoir plus sur Jésus",
          volunteering: "Bénévolat"
        },
        teamsTitle: "Quelle équipe vous intéresse ?",
        kidsHint: "Vous pouvez ajouter jusqu'à 5 enfants.",
        kidNamePlaceholder: "Nom complet de l'enfant",
        kidAgePlaceholder: "Date de naissance",
        prayerSubtle: "Demande de prière",
        prayerPlaceholder: "Partagez votre demande ici",
        submitBtn: "Se connecter avec CMR",
        resetBtn: "Effacer",
        thankYou: "Merci — nous avons bien reçu votre message et nous vous contacterons bientôt.",
        validation: {
          required: "Ce champ est requis.",
          phoneInvalid: "Entrez un numéro de téléphone valide.",
          emailInvalid: "Entrez une adresse e-mail valide.",
          addressCityLabel: "Ville", addressStateLabel: "État", addressZipLabel: "Code postal",
        }
      }
    };

    // Language helpers
    function getSavedLang(){ return localStorage.getItem(LANG_KEY) || 'en'; }
    function setSavedLang(lang){
      localStorage.setItem(LANG_KEY, lang);
      applyTranslations();
      updateLangButtons();
    }

    // Build language switcher UI
    function buildLangSwitcher(){
      const container = document.getElementById('langSwitcherConnect');
      if(!container) return;
      container.innerHTML = '';

      const enBtn = document.createElement('button');
      enBtn.className = 'lang-btn';
      enBtn.id = 'lang-en';
      enBtn.type = 'button';
      enBtn.textContent = 'EN';
      enBtn.setAttribute('aria-pressed', 'false');
      enBtn.addEventListener('click', () => setSavedLang('en'));

      const frBtn = document.createElement('button');
      frBtn.className = 'lang-btn';
      frBtn.id = 'lang-fr';
      frBtn.type = 'button';
      frBtn.textContent = 'FR';
      frBtn.setAttribute('aria-pressed', 'false');
      frBtn.addEventListener('click', () => setSavedLang('fr'));

      container.appendChild(enBtn);
      container.appendChild(frBtn);

      updateLangButtons();
    }

    function updateLangButtons(){
      const lang = getSavedLang();
      const enBtn = document.getElementById('lang-en');
      const frBtn = document.getElementById('lang-fr');
      if(enBtn) enBtn.setAttribute('aria-pressed', lang === 'en' ? 'true' : 'false');
      if(frBtn) frBtn.setAttribute('aria-pressed', lang === 'fr' ? 'true' : 'false');
    }

    // Apply translations to all elements (force translate everything)
    function applyTranslations(){
      const lang = getSavedLang();
      const t = T[lang] || T.en;

      // header
      const intro = document.getElementById('connectIntro');
      if(intro) intro.textContent = t.connectIntro;
      const heading = document.getElementById('connectHeading');
      if(heading) heading.textContent = t.connectHeading;

      // section titles
      const secPersonal = document.getElementById('sectionPersonalTitle');
      if(secPersonal) secPersonal.textContent = t.sectionPersonalTitle;
      const secAddress = document.getElementById('sectionAddressTitle');
      if(secAddress) secAddress.textContent = t.sectionAddressTitle;
      const secInterest = document.getElementById('sectionInterestTitle');
      if(secInterest) secInterest.textContent = t.sectionInterestTitle;

      // labels and placeholders
      const setText = (id, text) => { const el = document.getElementById(id); if(el) el.textContent = text; };
      setText('labelFirst', t.labelFirst);
      setText('labelLast', t.labelLast);
      setText('labelPhone', t.labelPhone);
      setText('labelEmail', t.labelEmail);
      setText('labelAddress', t.labelAddress);
      const addr = document.getElementById('address');
      if(addr) addr.placeholder = t.addressPlaceholder;
      setText('labelPrayerSubtle', t.prayerSubtle);
      const prayer = document.getElementById('prayer');
      if(prayer) prayer.placeholder = t.prayerPlaceholder;
      const submit = document.getElementById('submitBtn');
      if(submit) submit.textContent = t.submitBtn;
      const reset = document.getElementById('resetBtn');
      if(reset) reset.textContent = t.resetBtn;
      const kidsHint = document.getElementById('kidsHint');
      if(kidsHint) kidsHint.textContent = t.kidsHint;

      // Interests: update visible labels (simple approach: replace text nodes)
      const interestMap = t.interest || {};
      document.querySelectorAll('input[name="interest"]').forEach((el) => {
        const parent = el.parentElement;
        if(!parent) return;
        const val = el.value;
        if(interestMap[val]) parent.childNodes.forEach(n => { if(n.nodeType === Node.TEXT_NODE) n.textContent = ' ' + interestMap[val]; });
      });

      // Teams title
      const teamsTitle = document.querySelector('#teamsBlock > div');
      if(teamsTitle) teamsTitle.textContent = t.teamsTitle || teamsTitle.textContent;

      // Kids placeholders
      document.querySelectorAll('#kidsList .kid-row').forEach((r, idx) => {
        const name = r.querySelector('input[type="text"]');
        const dob = r.querySelector('input[type="date"]');
        if(name) name.placeholder = t.kidNamePlaceholder || name.placeholder;
        if(dob) dob.placeholder = t.kidAgePlaceholder || dob.placeholder;
      });

      // Validation messages will use T[...] when needed
    }

    // Set current year
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Validation helpers
    function showError(el, message){
      const id = (typeof el === 'string') ? el : (el && el.id ? el.id : '');
      const err = document.getElementById(id + '-error');
      if(err){ err.textContent = message; err.style.display = 'block'; err.setAttribute('aria-hidden','false'); }
      if(typeof el !== 'string' && el && el.classList) el.classList.add('input-invalid');
    }
    function clearError(el){
      const id = (typeof el === 'string') ? el : (el && el.id ? el.id : '');
      const err = document.getElementById(id + '-error');
      if(err){ err.textContent = ''; err.style.display = 'none'; err.setAttribute('aria-hidden','true'); }
      if(typeof el !== 'string' && el && el.classList) el.classList.remove('input-invalid');
    }

    function validateField(input){
      const lang = getSavedLang();
      const v = (T[lang] && T[lang].validation) ? T[lang].validation : T.en.validation;
      if(!input) return true;
      const val = (input.value || '').trim();
      if(input.required && val === ''){
        showError(input, v.required);
        return false;
      }
      if(input.type === 'tel' && val !== ''){
        const phonePattern = /^[0-9+\-\s().]{7,20}$/;
        if(!phonePattern.test(val)){ showError(input, v.phoneInvalid); return false; }
      }
      if(input.type === 'email' && val !== ''){
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailPattern.test(val)){ showError(input, v.emailInvalid); return false; }
      }
      clearError(input);
      return true;
    }

    

    // Address autocomplete using Nominatim (restricted to US)
    let addressTimer = null;
    async function fetchAddressSuggestions(q){
      if(!q) return [];
      const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(q)}&addressdetails=1&limit=6&countrycodes=us`;
      try {
        const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
        if(!res.ok) return [];
        const data = await res.json();
        return data;
      } catch (err) {
        console.warn('Address lookup failed', err);
        return [];
      }
    }

    function renderSuggestions(items){
      const box = document.getElementById('addressSuggestions');
      box.innerHTML = '';
      if(!items || items.length === 0){ box.style.display = 'none'; return; }
      items.forEach(it => {
        const div = document.createElement('div');
        div.className = 'suggestion-item';
        div.textContent = it.display_name;
        div.dataset.raw = JSON.stringify(it);
        div.addEventListener('click', () => selectAddressItem(it));
        box.appendChild(div);
      });
      box.style.display = 'block';
    }

    function selectAddressItem(item){
      const addrInput = document.getElementById('address');
      addrInput.value = item.display_name || '';
      const ad = item.address || {};
      const city = ad.city || ad.town || ad.village || ad.hamlet || ad.county || '';
      const state = ad.state || ad.region || ad.state_district || '';
      const postcode = ad.postcode || '';
      const extras = document.getElementById('addressExtras');
      if(extras) extras.style.display = 'flex';
      const cityEl = document.getElementById('city');
      const stateEl = document.getElementById('state');
      const zipEl = document.getElementById('zip');
      if(cityEl) cityEl.value = city;
      if(stateEl) stateEl.value = state;
      if(zipEl) zipEl.value = postcode;
      const box = document.getElementById('addressSuggestions');
      if(box) box.style.display = 'none';
    }

    function setOrCreateField(id, value){
      let el = document.getElementById(id);
      if(!el){
        el = document.createElement('input');
        el.type = 'hidden';
        el.id = id;
        el.name = id;
        document.getElementById('connectForm').appendChild(el);
      }
      el.value = value || '';
    }

    // Kids UI helpers (max 5)
    function createKidRow(index){
      const row = document.createElement('div');
      row.className = 'kid-row';
      row.dataset.index = index;

      const nameInput = document.createElement('input');
      nameInput.type = 'text';
      nameInput.name = `kid_name_${index}`;
      nameInput.placeholder = T[getSavedLang()].kidNamePlaceholder || "Child's full name";
      nameInput.required = true;
      nameInput.style.flex = '1';

      const dobInput = document.createElement('input');
      dobInput.type = 'date';
      dobInput.name = `kid_dob_${index}`;
      dobInput.required = true;
      dobInput.style.width = '160px';

      const allergyInput = document.createElement('input');
      allergyInput.type = 'text';
      allergyInput.name = `kid_allergies_${index}`;
      allergyInput.placeholder = 'Allergies / special needs (optional)';
      allergyInput.style.flex = '1';

      row.appendChild(nameInput);
      row.appendChild(dobInput);
      row.appendChild(allergyInput);
      return row;
    }

    function updateKidsPlaceholders(){
      const lang = getSavedLang();
      document.querySelectorAll('#kidsList .kid-row').forEach((r, idx) => {
        const name = r.querySelector('input[type="text"]');
        const dob = r.querySelector('input[type="date"]');
        if(name) name.placeholder = T[lang].kidNamePlaceholder || "Child's full name";
        if(dob) dob.placeholder = T[lang].kidAgePlaceholder || 'Date of birth';
      });
    }

    // DOM wiring
    document.addEventListener('DOMContentLoaded', function(){
      // Build language switcher and force translation
      buildLangSwitcher();
      applyTranslations();

      // basic elements
      const form = document.getElementById('connectForm');
      const first = document.getElementById('first');
      const last = document.getElementById('last');
      const phone = document.getElementById('phone');
      const email = document.getElementById('email');
      const addressInput = document.getElementById('address');
      const suggestionsBox = document.getElementById('addressSuggestions');

      [first,last,phone,email].forEach(f => { if(!f) return; f.addEventListener('input', ()=> validateField(f)); f.addEventListener('blur', ()=> validateField(f)); });

      // Address autocomplete wiring
      if(addressInput){
        addressInput.addEventListener('input', () => {
          const q = addressInput.value.trim();
          if(addressTimer) clearTimeout(addressTimer);
          if(!q){ suggestionsBox.style.display = 'none'; return; }
          addressTimer = setTimeout(async () => {
            const items = await fetchAddressSuggestions(q);
            renderSuggestions(items);
          }, 300);
        });
      }

      // close suggestions when clicking outside
      document.addEventListener('click', (e) => {
        if(!document.querySelector('.address-row')?.contains(e.target)) {
          if(suggestionsBox) suggestionsBox.style.display = 'none';
        }
      });

      // Teams conditional (when Serving selected)
      const teamsBlock = document.getElementById('teamsBlock');
      function updateTeamsVisibility(){
        const servingChecked = document.querySelector('input[name="interest"][value="serving"]')?.checked;
        if(servingChecked){ teamsBlock.style.display = 'block'; teamsBlock.setAttribute('aria-hidden','false'); }
        else { teamsBlock.style.display = 'none'; teamsBlock.setAttribute('aria-hidden','true'); }
      }
      document.querySelectorAll('input[name="interest"]').forEach(i => i.addEventListener('change', updateTeamsVisibility));
      updateTeamsVisibility();

      // Kids handling (max 5)
      const kidsRadios = Array.from(document.querySelectorAll('input[name="hasKids"]'));
      const kidsContainer = document.getElementById('kidsContainer');
      const kidsList = document.getElementById('kidsList');
      const addKidBtn = document.getElementById('addKidBtn');
      const removeKidBtn = document.getElementById('removeKidBtn');

      function setKidsVisibility(){
        const val = document.querySelector('input[name="hasKids"]:checked')?.value;
        if(val === 'yes'){ kidsContainer.style.display = 'block'; } else { kidsContainer.style.display = 'none'; }
      }
      kidsRadios.forEach(r => r.addEventListener('change', setKidsVisibility));
      setKidsVisibility();

      function kidCount(){ return kidsList.querySelectorAll('.kid-row').length; }

      addKidBtn.addEventListener('click', () => {
        if(kidCount() >= 5) return;
        const idx = kidCount() + 1;
        kidsList.appendChild(createKidRow(idx));
        if(kidCount() >= 1) removeKidBtn.style.display = 'inline-flex';
        if(kidCount() >= 5) addKidBtn.style.display = 'none';
        updateKidsPlaceholders();
      });

      removeKidBtn.addEventListener('click', () => {
        const rows = kidsList.querySelectorAll('.kid-row');
        if(rows.length === 0) return;
        rows[rows.length - 1].remove();
        if(kidCount() < 5) addKidBtn.style.display = 'inline-flex';
        if(kidCount() === 0) removeKidBtn.style.display = 'none';
      });

      // Submit handler
      form.addEventListener('submit', async function(e){
        e.preventDefault();

        // validate required fields
        let ok = true;
        [first,last,phone].forEach(f => { if(f) ok = validateField(f) && ok; });

        // status required (radio)
        const status = form.querySelector('input[name="status"]:checked');
        if(!status){ showError('status', T[getSavedLang()].validation.required); ok = false; } else { clearError('status'); }

        // consent required
        const consent = document.getElementById('consentContact');
        if(!consent || !consent.checked){
          showError('consentContact', T[getSavedLang()].validation.required);
          ok = false;
        } else {
          clearError('consentContact');
        }

        // kids required fields if present
        if(document.querySelector('input[name="hasKids"]:checked')?.value === 'yes'){
          const rows = kidsList.querySelectorAll('.kid-row');
          for(const r of rows){
            const name = r.querySelector('input[type="text"]');
            const dob = r.querySelector('input[type="date"]');
            if(name && (!name.value || name.value.trim() === '')){ showError(name, T[getSavedLang()].validation.required); ok = false; }
            if(dob && (!dob.value || dob.value.trim() === '')){ showError(dob, T[getSavedLang()].validation.required); ok = false; }
          }
        }

        if(!ok){
          const firstInvalid = form.querySelector('.input-invalid');
          if(firstInvalid) firstInvalid.focus();
          return;
        }

        // collect form data
        const fd = new FormData(form);

        // interests (multiple)
        const interests = Array.from(form.querySelectorAll('input[name="interest"]:checked')).map(i => i.value);
        fd.delete('interest');
        interests.forEach(i => fd.append('interest', i));

        // teams (if any)
        const teams = Array.from(form.querySelectorAll('input[name="team"]:checked')).map(i => i.value);
        teams.forEach(t => fd.append('team', t));

        // kids
        if(document.querySelector('input[name="hasKids"]:checked')?.value === 'yes'){
          const kids = Array.from(kidsList.querySelectorAll('.kid-row')).map((r, idx) => {
            const name = r.querySelector('input[type="text"]')?.value || '';
            const dob = r.querySelector('input[type="date"]')?.value || '';
            const allergies = r.querySelector('input[type="text"]')?.value || '';
            return { name, dob, allergies };
          });
          kids.forEach((k, i) => {
            fd.append(`kid_name_${i+1}`, k.name);
            fd.append(`kid_dob_${i+1}`, k.dob);
            fd.append(`kid_allergies_${i+1}`, k.allergies);
          });
        }

        // show thank you
        const thank = document.getElementById('thankyou');
        thank.style.display = 'block';
        thank.setAttribute('aria-hidden','false');

        // attempt to POST to Netlify (best-effort)
        try {
          await fetch('/', { method: 'POST', body: fd, headers: { 'Accept': 'application/json' } });
        } catch (err) {
          console.warn('Netlify submit failed (non-blocking):', err);
        }

        // reset UI
        form.reset();
        kidsList.innerHTML = '';
        removeKidBtn.style.display = 'none';
        addKidBtn.style.display = 'inline-flex';
        setKidsVisibility();
        updateTeamsVisibility();
        [first,last,phone,email].forEach(f => { if(f) clearError(f); });
        document.querySelectorAll('#city,#state,#zip').forEach(el => { if(el) el.value = ''; });
        const extras = document.getElementById('addressExtras');
        if(extras) extras.style.display = 'none';

        setTimeout(()=>{ thank.style.display = 'none'; thank.setAttribute('aria-hidden','true'); }, 8000);
      });

      // Reset handler
      const resetBtn = document.getElementById('resetBtn');
      resetBtn.addEventListener('click', () => {
        document.getElementById('kidsList').innerHTML = '';
        document.querySelectorAll('#city,#state,#zip').forEach(el => { if(el) el.value = ''; });
        [first,last,phone,email].forEach(f => { if(f) clearError(f); });
        setTimeout(() => applyTranslations(), 40);
        const extras = document.getElementById('addressExtras');
        if(extras) extras.style.display = 'none';
        updateTeamsVisibility();
      });

      // Ensure placeholders and dynamic labels reflect language
      updateKidsPlaceholders();
      updateLangButtons();
    });

    // Listen for storage changes (sync across tabs)
    window.addEventListener('storage', (e) => {
      if(e.key === LANG_KEY) {
        applyTranslations();
        updateLangButtons();
      }
    });

    // ===============================
// EVENTS SYSTEM (FULL BILINGUAL)
// ===============================

// Path to your events.json
const EVENTS_JSON_PATH = "/events.json";

// Load events.json and render the first upcoming event
async function loadAndRenderEvents() {
  try {
    const res = await fetch(EVENTS_JSON_PATH + "?t=" + Date.now(), { cache: "no-store" });
    if (!res.ok) throw new Error("HTTP " + res.status);

    const data = await res.json();
    console.info("Loaded events.json", data);

    renderEventsFromData(data);
  } catch (err) {
    console.error("Failed to load events.json", err);
    renderNoEvents();
  }
}

// Render events from JSON
function renderEventsFromData(rawData) {
  const lang = getSavedLang();
  const container = document.getElementById("upcomingEventCard");
  if (!container) return;

  container.innerHTML = "";

  let items = [];
  if (rawData && Array.isArray(rawData.items)) {
    items = rawData.items.filter(ev => ev.public !== false);
  }

  if (items.length === 0) {
    renderNoEvents();
    return;
  }

  // Sort by date ascending
  items.sort((a, b) => new Date(a.date) - new Date(b.date));

  // Render the first upcoming event
  const eventEl = renderSingleEvent(items[0], lang);
  container.appendChild(eventEl);
}

// Render a single event card (FULL BILINGUAL SUPPORT)
function renderSingleEvent(event, lang) {
  // Choose French or English versions
  const title = (lang === 'fr' && event.title_fr) ? event.title_fr : event.title;
  const description = (lang === 'fr' && event.description_fr) ? event.description_fr : event.description;
  const location = (lang === 'fr' && event.location_fr) ? event.location_fr : event.location;
  const startTime = (lang === 'fr' && event.startTime_fr) ? event.startTime_fr : event.startTime;
  const endTime = (lang === 'fr' && event.endTime_fr) ? event.endTime_fr : event.endTime;
  const tags = (lang === 'fr' && event.tags_fr) ? event.tags_fr : event.tags;

  // NEW: French date support
  const rawDate = (lang === 'fr' && event.date_fr) ? event.date_fr : event.date;

  // Auto-format French date if date_fr is missing
  let formattedDate = rawDate;
  if (lang === 'fr' && !event.date_fr) {
    try {
      const d = new Date(event.date);
      formattedDate = d.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (e) {
      formattedDate = rawDate;
    }
  }

  // Build HTML container
  const wrapper = document.createElement('div');
  wrapper.className = 'event-card';
  wrapper.style.padding = "14px";
  wrapper.style.borderRadius = "10px";
  wrapper.style.background = "#ffffff";
  wrapper.style.border = "1px solid #e5e7eb";
  wrapper.style.boxShadow = "0 6px 18px rgba(15,23,42,0.06)";
  wrapper.style.display = "flex";
  wrapper.style.flexDirection = "column";
  wrapper.style.gap = "10px";

  // Thumbnail
  if (event.thumbnail) {
    const img = document.createElement('img');
    img.className = 'event-thumb';
    img.src = event.thumbnail;
    img.alt = title;
    img.style.width = "100%";
    img.style.height = "160px";
    img.style.objectFit = "cover";
    img.style.borderRadius = "8px";
    wrapper.appendChild(img);
  }

  // Title
  const h3 = document.createElement('h3');
  h3.className = 'event-title';
  h3.textContent = title;
  h3.style.fontFamily = "Playfair Display, serif";
  h3.style.fontSize = "20px";
  h3.style.fontWeight = "700";
  h3.style.margin = "0";
  wrapper.appendChild(h3);

  // Date
  const dateEl = document.createElement('div');
  dateEl.className = 'event-date small-muted';
  dateEl.textContent = formattedDate;
  dateEl.style.color = "#6b7280";
  dateEl.style.fontSize = "14px";
  wrapper.appendChild(dateEl);

  // Time
  if (startTime || endTime) {
    const timeEl = document.createElement('div');
    timeEl.className = 'event-time small-muted';
    timeEl.textContent = endTime ? `${startTime} – ${endTime}` : startTime;
    timeEl.style.color = "#6b7280";
    timeEl.style.fontSize = "14px";
    wrapper.appendChild(timeEl);
  }

  // Location
  if (location) {
    const locEl = document.createElement('div');
    locEl.className = 'event-location small-muted';
    locEl.textContent = location;
    locEl.style.color = "#6b7280";
    locEl.style.fontSize = "14px";
    wrapper.appendChild(locEl);
  }

  // Description
  if (description) {
    const descEl = document.createElement('div');
    descEl.className = 'event-description';
    descEl.textContent = description;
    descEl.style.fontSize = "14px";
    descEl.style.color = "#111827";
    descEl.style.lineHeight = "1.45";
    wrapper.appendChild(descEl);
  }

  // Tags
  if (tags && Array.isArray(tags)) {
    const tagWrap = document.createElement('div');
    tagWrap.className = 'event-tags';
    tagWrap.style.display = "flex";
    tagWrap.style.gap = "6px";
    tagWrap.style.flexWrap = "wrap";

    tags.forEach(t => {
      const tag = document.createElement('span');
      tag.className = 'event-tag';
      tag.textContent = t;
      tag.style.background = "#f3f4f6";
      tag.style.padding = "4px 8px";
      tag.style.borderRadius = "6px";
      tag.style.fontSize = "12px";
      tag.style.color = "#374151";
      tagWrap.appendChild(tag);
    });

    wrapper.appendChild(tagWrap);
  }

  return wrapper;
}

// Render fallback if no events
function renderNoEvents() {
  const container = document.getElementById("upcomingEventCard");
  if (!container) return;
  container.innerHTML = "<div class='small-muted'>No upcoming events</div>";
}

// Auto-load events on page load
document.addEventListener("DOMContentLoaded", loadAndRenderEvents);
