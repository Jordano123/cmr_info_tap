// cmrfamily.js
// Renders cmrfamily.json, handles Join button behavior, modal application form,
// Netlify Forms submission (AJAX), and language switcher (#langSwitcher).
// Default language is English; toggle to French translates everything.

document.addEventListener('DOMContentLoaded', () => {
  const sectionsContainer = document.getElementById('sectionsContainer');
  const joinTop = document.getElementById('joinTop');
  const joinBottom = document.getElementById('joinBottom');
  const currentYearEl = document.getElementById('currentYear');

  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');
  const modalCancel = document.getElementById('modalCancel');
  const applyForm = document.getElementById('applyForm');
  const appTeam = document.getElementById('appTeam');
  const formMessage = document.getElementById('formMessage');

  const langSwitcher = document.getElementById('langSwitcher');
  const TRANSLATE_KEY = 'cmr_lang_pref';

  currentYearEl.textContent = new Date().getFullYear();

  if (modalOverlay) modalOverlay.hidden = true;

  // Translation map (EN / FR)
  const TRANSLATIONS = {
    en: {
      'family.meetTitle': 'Meet Family',
      'family.lead': 'Our Team is made up of everyday people who love following Jesus and helping others follow him. Interested in joining us? Meet with us or submit an application below.',
      'family.rightParagraph': "The CMR team is led by a family of people with different backgrounds, experience, and passion. We are honored to be in the role we are in, and we have a lot of fun, but our primary focus is to equip you with a life of purpose in God's family on God's mission.",
      'family.getToKnow': 'Get to know us as you scroll down. Interested in joining us? Meet with us or submit an application below.',
      'family.joinTop': 'Join the Family',
      'family.joinBottom': 'Join the Family',
      'modal.title': 'Get Involved',
      'modal.intro': "Interested in joining this team? Fill the short form below and we'll be in touch.",
      'form.name': 'Full name',
      'form.email': 'Email',
      'form.phone': 'Phone (optional)',
      'form.team': 'Which team are you interested in?',
      'form.note': 'Short note',
      'form.notePlaceholder': 'Tell us a little about yourself',
      'form.submit': 'Submit Application',
      'form.cancel': 'Cancel',
      'footer.copyright': '© {year} Centre Missionnaire La Restauration. All rights reserved.',
      'footer.design': 'Designed for the CMR community.',
      'family.section.leaders.title': 'Leaders',
      'family.section.leaders.desc': "The preaching family preach the Lord's words, shepherd the congregation, and provide spiritual oversight.",
      'family.section.media.title': 'Media / Production',
      'family.section.media.desc': 'The media family capture and stream our gatherings, ensuring quality audio and video for the church and online audience.',
      'family.section.worship.title': 'Worship / Band',
      'family.section.worship.desc': 'The worship family lead the congregation in song, creating space for encounter and response.',
      'family.section.kids.title': 'Little Lights / Kids Ministry',
      'family.section.kids.desc': 'The Little Lights family teach the next generation about God, Jesus, and how to live in faith.',
      'family.section.outreach.title': 'Outreach',
      'family.section.outreach.desc': 'The outreach family serves our city and neighbors through practical help, events, and community partnerships.',
      'family.section.admin.title': 'Administration',
      'family.section.admin.desc': 'The administration family keep the church running — finance, operations, and communications.'
    },
    fr: {
      'family.meetTitle': 'Rencontrez la famille',
      'family.lead': "Notre équipe est composée de personnes ordinaires qui aiment suivre Jésus et aider les autres à le suivre. Intéressé à nous rejoindre ? Rencontrez‑nous ou soumettez une candidature ci‑dessous.",
      'family.rightParagraph': "L'équipe CMR est dirigée par une famille de personnes aux parcours, expériences et passions variés. Nous sommes honorés d'être dans le rôle que nous occupons, et nous nous amusons beaucoup, mais notre objectif principal est de vous équiper pour une vie de sens dans la famille de Dieu et la mission de Dieu.",
      'family.getToKnow': "Faites connaissance en faisant défiler la page. Intéressé à nous rejoindre ? Rencontrez‑nous ou soumettez une candidature ci‑dessous.",
      'family.joinTop': "Rejoindre la famille",
      'family.joinBottom': "Rejoindre la famille",
      'modal.title': "S'impliquer",
      'modal.intro': "Intéressé à rejoindre cette équipe ? Remplissez le court formulaire ci‑dessous et nous vous contacterons.",
      'form.name': 'Nom complet',
      'form.email': 'Courriel',
      'form.phone': 'Téléphone (optionnel)',
      'form.team': "Quelle équipe vous intéresse ?",
      'form.note': 'Courte note',
      'form.notePlaceholder': "Parlez-nous un peu de vous",
      'form.submit': 'Soumettre la candidature',
      'form.cancel': 'Annuler',
      'footer.copyright': '© {year} Centre Missionnaire La Restauration. Tous droits réservés.',
      'footer.design': 'Conçu pour la communauté CMR.',
      'family.section.leaders.title': 'Responsables',
      'family.section.leaders.desc': "La famille de prédication proclame la parole du Seigneur, veille sur la congrégation et assure la supervision spirituelle.",
      'family.section.media.title': 'Médias / Production',
      'family.section.media.desc': "La famille médias capture et diffuse nos rassemblements, assurant une qualité audio et vidéo pour l'église et le public en ligne.",
      'family.section.worship.title': 'Louange / Groupe',
      'family.section.worship.desc': "La famille louange conduit la congrégation en chant, créant un espace de rencontre et de réponse.",
      'family.section.kids.title': "Little Lights / Ministère des enfants",
      'family.section.kids.desc': "La famille Little Lights enseigne à la prochaine génération qui est Dieu, Jésus, et comment vivre par la foi.",
      'family.section.outreach.title': 'Action sociale',
      'family.section.outreach.desc': "La famille action sociale sert notre ville et nos voisins par une aide pratique, des événements et des partenariats communautaires.",
      'family.section.admin.title': 'Administration',
      'family.section.admin.desc': "La famille administration fait fonctionner l'église — finances, opérations et communications."
    }
  };

  // default language: saved or English
  const savedLang = localStorage.getItem(TRANSLATE_KEY) || 'en';
  let currentLang = savedLang;

  function t(key) {
    return (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key]) ? TRANSLATIONS[currentLang][key] : (TRANSLATIONS['en'][key] || '');
  }

  function setLangUI(lang) {
    if (!langSwitcher) return;
    const buttons = langSwitcher.querySelectorAll('.lang-btn');
    buttons.forEach(btn => {
      const bLang = btn.dataset.lang;
      const pressed = (bLang === lang);
      btn.setAttribute('aria-pressed', pressed ? 'true' : 'false');
      if (pressed) btn.classList.add('active'); else btn.classList.remove('active');
    });
  }

  function applyTranslationToStatic() {
    document.querySelectorAll('[data-i18n]').forEach(node => {
      const key = node.getAttribute('data-i18n');
      const translated = t(key);
      if (translated) {
        if (key === 'footer.copyright') node.innerHTML = translated.replace('{year}', new Date().getFullYear());
        else node.textContent = translated;
      }
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(n => {
      const key = n.getAttribute('data-i18n-placeholder');
      const translated = t(key);
      if (translated) n.setAttribute('placeholder', translated);
    });
  }

  // init language switcher
  (function initLangSwitcher(){
    setLangUI(currentLang);
    applyTranslationToStatic();
    try { localStorage.setItem(TRANSLATE_KEY, currentLang); } catch(e) {}
    if (!langSwitcher) return;
    langSwitcher.addEventListener('click', (ev) => {
      const btn = ev.target.closest('.lang-btn');
      if (!btn) return;
      const lang = btn.dataset.lang;
      if (!lang) return;
      currentLang = lang;
      setLangUI(lang);
      applyTranslationToStatic();
      if (window.__cmrFamilyData) renderSections(window.__cmrFamilyData);
      try { localStorage.setItem(TRANSLATE_KEY, lang); } catch(e) {}
    });
  })();

  // top join scrolls to bottom join
  if (joinTop && joinBottom) {
    joinTop.addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById('joinAnchor').scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => joinBottom.focus(), 600);
    });
  }
  if (joinBottom) joinBottom.addEventListener('click', openModal);

  // load JSON and render
  fetch('cmrfamily.json')
    .then(r => r.json())
    .then(data => {
      window.__cmrFamilyData = data.sections || [];
      renderSections(window.__cmrFamilyData);
      populateTeamOptions(window.__cmrFamilyData);
      applyTranslationToStatic();
    })
    .catch(err => {
      console.error('Could not load family JSON', err);
      sectionsContainer.innerHTML = '<p style="color:#c00">Family data not available.</p>';
    });

  // render sections and members
  function renderSections(sections) {
    sectionsContainer.innerHTML = '';
    sections.forEach(section => {
      const card = document.createElement('section');
      card.className = 'section-card';
      card.id = `section-${section.id}`;

      const header = document.createElement('div');
      header.className = 'section-header';

      const titleWrap = document.createElement('div');
      const h = document.createElement('h3');
      h.className = 'section-title';
      const titleKey = `family.section.${section.id}.title`;
      h.textContent = t(titleKey) || section.title;
      h.setAttribute('data-i18n', titleKey);

      const desc = document.createElement('div');
      desc.className = 'section-desc';
      const descKey = `family.section.${section.id}.desc`;
      desc.textContent = t(descKey) || section.description || '';
      desc.setAttribute('data-i18n', descKey);

      titleWrap.appendChild(h);
      titleWrap.appendChild(desc);

      header.appendChild(titleWrap);
      card.appendChild(header);

      const grid = document.createElement('div');
      grid.className = 'members-grid';

      (section.members || []).forEach(member => {
        const m = document.createElement('div');
        m.className = 'member';

        const imgWrap = document.createElement('div');
        imgWrap.className = 'img-wrap';

        const img = document.createElement('img');
        img.src = member.photo || '/images/people/placeholder.jpg';
        img.alt = `${member.name} photo`;
        img.loading = 'lazy';
        img.onerror = () => { img.src = '/images/people/placeholder.jpg'; };

        imgWrap.appendChild(img);

        const name = document.createElement('div');
        name.className = 'name';
        name.textContent = member.name;

        const role = document.createElement('div');
        role.className = 'role';
        // translate role if mapping exists in TRANSLATIONS
        const roleKey = `role.${member.role}`;
        const mappedRole = (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][roleKey]) ? TRANSLATIONS[currentLang][roleKey] : member.role;
        role.textContent = mappedRole;

        m.appendChild(imgWrap);
        m.appendChild(name);
        m.appendChild(role);

        grid.appendChild(m);
      });

      card.appendChild(grid);
      sectionsContainer.appendChild(card);
    });

    // ensure grid centering after DOM changes (works with auto-fit)
    requestAnimationFrame(() => {
      document.querySelectorAll('.members-grid').forEach(g => {
        g.style.justifyContent = 'center';
      });
    });
  }

  function populateTeamOptions(sections) {
    if (!appTeam) return;
    appTeam.innerHTML = '';
    sections.forEach(s => {
      const opt = document.createElement('option');
      opt.value = s.id;
      const titleKey = `family.section.${s.id}.title`;
      opt.textContent = t(titleKey) || s.title;
      appTeam.appendChild(opt);
    });
  }

  // modal open/close
  function openModal() {
    if (!modalOverlay) return;
    modalOverlay.hidden = false;
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      const nameInput = document.getElementById('appName');
      if (nameInput) nameInput.focus();
    }, 120);
  }
  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.hidden = true;
    document.body.style.overflow = '';
    formMessage.textContent = '';
    if (applyForm) applyForm.reset();
  }
  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalCancel) modalCancel.addEventListener('click', closeModal);
  if (modalOverlay) modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modalOverlay && !modalOverlay.hidden) closeModal(); });

  // Netlify form submit (AJAX)
  if (applyForm) {
    applyForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('appName').value.trim();
      const email = document.getElementById('appEmail').value.trim();
      const phone = document.getElementById('appPhone').value.trim();
      const team = appTeam ? appTeam.value : '';
      const note = document.getElementById('appNote').value.trim();

      if (!name || !email || !team) {
        formMessage.textContent = (currentLang === 'fr') ? 'Veuillez remplir les champs requis.' : 'Please complete the required fields.';
        return;
      }

      const formData = new FormData();
      formData.append('form-name', 'cmr-family-application');
      formData.append('name', name);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('team', team);
      formData.append('note', note);
      formData.append('bot-field', '');

      try {
        const res = await fetch('/', { method: 'POST', body: formData, headers: { 'Accept': 'application/json' } });
        if (res.ok) {
          formMessage.textContent = (currentLang === 'fr') ? "Merci ! Votre candidature a été envoyée. Nous vous contacterons bientôt." : "Thanks! Your application has been submitted. We'll be in touch soon.";
          setTimeout(() => { applyForm.reset(); closeModal(); }, 1200);
        } else {
          const text = await res.text();
          console.error('Netlify form submit error', res.status, text);
          formMessage.textContent = (currentLang === 'fr') ? "Une erreur est survenue lors de l'envoi. Veuillez réessayer." : "An error occurred while submitting. Please try again.";
        }
      } catch (err) {
        console.error('Form submit failed', err);
        formMessage.textContent = (currentLang === 'fr') ? "Impossible d'envoyer le formulaire. Veuillez vérifier votre connexion et réessayer." : "Unable to send the form. Please check your connection and try again.";
      }
    });
  }

  // fallback for older browsers: ensure images visually fill the box
  (function ensureImageCoverFallback(){
    const supportsObjectFit = 'objectFit' in document.documentElement.style;
    if (supportsObjectFit) return;
    document.querySelectorAll('.member .img-wrap img').forEach(img => {
      const wrap = img.closest('.img-wrap');
      if (!wrap) return;
      const src = img.src;
      wrap.style.backgroundImage = `url("${src}")`;
      wrap.style.backgroundSize = 'cover';
      wrap.style.backgroundPosition = 'center center';
      img.style.display = 'none';
    });
  })();

  // initial UI
  setLangUI(currentLang);
  applyTranslationToStatic();
});
