  const T_LISTEN = {
      en: { listenHeading: "Listen", listenIntro: "Audio recordings and edited services", noEpisodes: "No episodes available right now." },
      fr: { listenHeading: "Écouter", listenIntro: "Enregistrements audio et services édités", noEpisodes: "Aucun épisode disponible pour le moment." }
    };

    function getSavedLang(){ return localStorage.getItem('cmr_lang') || 'en'; }
    function setSavedLang(lang){ localStorage.setItem('cmr_lang', lang); applyListenTranslations(); }

    function buildLangSwitcher(containerId='langSwitcherListen'){
      const container = document.getElementById(containerId);
      if(!container) return;
      container.innerHTML = '';
      const enBtn = document.createElement('button'); enBtn.className='lang-btn'; enBtn.textContent='EN'; enBtn.onclick = ()=>{ setSavedLang('en'); };
      const frBtn = document.createElement('button'); frBtn.className='lang-btn'; frBtn.textContent='FR'; frBtn.onclick = ()=>{ setSavedLang('fr'); };
      container.appendChild(enBtn); container.appendChild(frBtn);
    }

    function applyListenTranslations(){
      const lang = getSavedLang();
      const t = T_LISTEN[lang] || T_LISTEN.en;
      document.getElementById('listenHeading').textContent = t.listenHeading;
      document.getElementById('listenIntro').textContent = t.listenIntro;
      document.getElementById('noEpisodes').textContent = t.noEpisodes;
    }

    document.addEventListener('DOMContentLoaded', () => { buildLangSwitcher(); applyListenTranslations(); });
