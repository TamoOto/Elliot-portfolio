const projects = {
  pex: {
    kicker: 'PROJET PERSONNEL',
    title: 'PEX — Le vivier d’idées vivantes',
    lead: 'Un projet de plateforme collaborative pensé pour relier les idées aux personnes capables de les faire avancer.',
    problem: 'Beaucoup d’idées restent bloquées faute de compétences, de réseau ou de personnes prêtes à contribuer. Le point de départ de PEX est simple : une idée peut progresser si les bonnes briques humaines se rencontrent.',
    build: 'Vision, positionnement, architecture du produit, parcours utilisateur, règles de contribution, réflexion juridique, design du MVP et construction progressive de la plateforme.',
    skills: ['Gestion de projet','Vision produit','UX','Juridique','MVP','Communauté']
  },
  ia: {
    kicker: 'IA RESPONSABLE & RH',
    title: 'Déployer l’IA sans perdre le jugement humain',
    lead: 'Ma vision : utiliser l’IA pour gagner du temps, mieux structurer le travail et augmenter les capacités des équipes — jamais pour faire à leur place sans recul.',
    problem: 'Déployer des outils IA sans cadre peut créer de mauvais réflexes, de la dépendance, des erreurs ou des usages peu responsables. L’enjeu n’est donc pas seulement technique : il est aussi éthique, pédagogique et organisationnel.',
    build: 'Déploiement d’usages IA et d’automatisations RH, création d’une charte IA, sensibilisation aux bonnes pratiques, accompagnement des collaborateurs et mise en avant d’un principe simple : l’IA assiste, propose et accélère ; l’humain garde le contrôle, vérifie et décide.',
    skills: ['IA responsable','Charte IA','Éthique','Sensibilisation','Automatisation','Accompagnement du changement']
  },
  formation: {
    kicker: 'LEARNING',
    title: 'Transformer un savoir métier en expérience d’apprentissage',
    lead: 'La valeur d’un expert n’est pas seulement dans ce qu’il sait, mais dans la manière dont on rend son savoir transmissible.',
    problem: 'Des connaissances importantes peuvent rester concentrées chez quelques personnes et être difficiles à transmettre à grande échelle.',
    build: 'Coordination d’experts métier, scénarisation des contenus, capsules courtes, quiz, parcours 360Learning et temps d’échange pour ancrer les apprentissages.',
    skills: ['Learning','360Learning','Pédagogie','Coordination','Adoption']
  },
  recrutement: {
    kicker: 'RECRUTEMENT',
    title: 'Recruter quand les méthodes classiques ne suffisent plus',
    lead: 'Sur des métiers en tension, publier une annonce et attendre n’est pas une stratégie suffisante.',
    problem: 'Certains profils sont rares, peu présents sur les jobboards et difficiles à atteindre avec des campagnes standards.',
    build: 'Personas, veille proactive, partenariats, actions terrain, communication ciblée et expérimentation de nouveaux points de contact avec les candidats.',
    skills: ['Sourcing','Proactivité','Marque employeur','Terrain','Expérimentation']
  },
  collectif: {
    kicker: 'INTELLIGENCE COLLECTIVE',
    title: 'Faire produire le groupe plutôt que parler à sa place',
    lead: 'Quand les personnes concernées construisent une solution, son adoption commence déjà pendant l’atelier.',
    problem: 'Les réunions classiques donnent souvent beaucoup de place aux mêmes voix et peu de temps à la production collective.',
    build: 'World Café, 1-2-4-All et formats participatifs pour faire émerger des idées, les confronter, les prioriser et déboucher sur des actions concrètes.',
    skills: ['Facilitation','Animation','Co-construction','Priorisation','Change']
  },
  catalyseur: {
    kicker: 'EXPÉRIMENTATION',
    title: 'Catalyseur Social',
    lead: 'Une simulation pour observer comment différents modèles d’organisation influencent un collectif.',
    problem: 'Les débats sur les modèles collaboratifs, hiérarchiques ou compétitifs restent souvent théoriques et difficiles à comparer.',
    build: 'Un moteur de simulation Python + Streamlit avec agents, équipes, scénarios et indicateurs de performance, cohésion et stress.',
    skills: ['Python','Streamlit','Simulation','Organisation','Analyse']
  }
};

const progressBar = document.getElementById('progressBar');
window.addEventListener('scroll', () => {
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const progress = height > 0 ? (window.scrollY / height) * 100 : 0;
  if (progressBar) progressBar.style.width = progress + '%';
});

const modal = document.getElementById('projectModal');
const modalKicker = document.getElementById('modalKicker');
const modalTitle = document.getElementById('modalTitle');
const modalLead = document.getElementById('modalLead');
const modalProblem = document.getElementById('modalProblem');
const modalBuild = document.getElementById('modalBuild');
const modalSkills = document.getElementById('modalSkills');

function openProject(key) {
  const project = projects[key];
  if (!project || !modal) return;

  modalKicker.textContent = project.kicker;
  modalTitle.textContent = project.title;
  modalLead.textContent = project.lead;
  modalProblem.textContent = project.problem;
  modalBuild.textContent = project.build;
  modalSkills.innerHTML = project.skills.map(skill => '<span>' + skill + '</span>').join('');

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}

function closeProject() {
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

document.querySelectorAll('[data-project]').forEach(card => {
  card.addEventListener('click', event => {
    if (event.target.closest('a')) return;
    openProject(card.dataset.project);
  });

  card.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openProject(card.dataset.project);
    }
  });
});

document.querySelectorAll('[data-close-modal]').forEach(el => {
  el.addEventListener('click', closeProject);
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeProject();
});

const timelineItems = [...document.querySelectorAll('.timeline-item')];
if ('IntersectionObserver' in window && timelineItems.length) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      timelineItems.forEach(item => item.classList.remove('active'));
      entry.target.classList.add('active');
    });
  }, {rootMargin:'-35% 0px -45% 0px'});
  timelineItems.forEach(item => observer.observe(item));
}
