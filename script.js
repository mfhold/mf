
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // Année automatique dans le pied de page
  const yearElement = document.getElementById("currentYear");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Menu mobile
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.querySelector(".main-nav");

  function closeMenu() {
    if (!menuToggle || !mainNav) return;
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Ouvrir le menu");
  }

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Fermer le menu" : "Ouvrir le menu"
      );
    });

    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", (event) => {
      if (
        mainNav.classList.contains("open") &&
        !mainNav.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }
    });
  }

  // Animations d'apparition au défilement
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px"
      }
    );

    revealElements.forEach((element) => revealObserver.observe(element));
  } else {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
  }

  // Retour en haut
  const backToTop = document.getElementById("backToTop");

  if (backToTop) {
    const updateBackToTop = () => {
      backToTop.classList.toggle("visible", window.scrollY > 500);
    };

    window.addEventListener("scroll", updateBackToTop, { passive: true });
    updateBackToTop();

    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Panneaux des offres
  const coursesPanel = document.getElementById("coursesPanel");
  const referralsPanel = document.getElementById("referralsPanel");
  const detailsSection = document.getElementById("details");

  function closePanels() {
    if (coursesPanel) coursesPanel.hidden = true;
    if (referralsPanel) referralsPanel.hidden = true;
  }

  function openPanel(panel) {
    if (!panel) return;

    const wasHidden = panel.hidden;
    closePanels();

    if (wasHidden) {
      panel.hidden = false;

      window.setTimeout(() => {
        if (detailsSection) {
          detailsSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }
      }, 50);
    }
  }

  document.querySelectorAll("[data-open]").forEach((button) => {
    button.addEventListener("click", () => {
      const destination = button.dataset.open;

      if (destination === "courses") {
        openPanel(coursesPanel);
      } else if (destination === "referrals") {
        openPanel(referralsPanel);
      }
    });
  });

  document.querySelectorAll("[data-close]").forEach((button) => {
    button.addEventListener("click", closePanels);
  });

  // Dossiers de formation.
  // Les liens sont des recherches YouTube : remplace-les par les URL
  // de tes vidéos précises lorsque tu les auras choisies.
  const courseFolders = [
    {
      id: "tiktok",
      name: "Automatisation TikTok",
      icon: "📱",
      description: "Découvre les bases de l'automatisation.",
      videos: [
        {
          title: "Comprendre l'automatisation TikTok",
          query: "automatisation TikTok tutoriel français débutant"
        },
        {
          title: "Créer du contenu et organiser ses publications",
          query: "créer contenu TikTok stratégie débutant français"
        },
        {
          title: "Analyser ses résultats et progresser",
          query: "analyse statistiques TikTok tutoriel français"
        }
      ]
    },
    {
      id: "ecommerce",
      name: "E-Commerce",
      icon: "🛍️",
      description: "Les fondamentaux d'une boutique en ligne.",
      videos: [
        {
          title: "Les bases du e-commerce",
          query: "formation e-commerce débutant français"
        },
        {
          title: "Créer sa première boutique en ligne",
          query: "créer boutique en ligne tutoriel français"
        },
        {
          title: "Comprendre le marketing et les ventes",
          query: "marketing e-commerce conversion français"
        }
      ]
    },
    {
      id: "marketing",
      name: "Marketing digital",
      icon: "📈",
      description: "Apprends à attirer une audience.",
      videos: [
        {
          title: "Les fondamentaux du marketing digital",
          query: "formation marketing digital débutant français"
        },
        {
          title: "Comprendre les réseaux sociaux",
          query: "stratégie réseaux sociaux tutoriel français"
        },
        {
          title: "Créer une stratégie de contenu",
          query: "stratégie contenu digital tutoriel français"
        }
      ]
    },
    {
      id: "ia",
      name: "Intelligence artificielle",
      icon: "🤖",
      description: "Explore les outils d'IA et leurs usages.",
      videos: [
        {
          title: "Découvrir les outils d'intelligence artificielle",
          query: "outils intelligence artificielle débutant français"
        },
        {
          title: "Utiliser l'IA pour gagner du temps",
          query: "utiliser IA automatiser tâches tutoriel français"
        },
        {
          title: "Créer du contenu avec l'IA",
          query: "créer contenu avec intelligence artificielle français"
        }
      ]
    },
    {
      id: "freelance",
      name: "Freelance",
      icon: "💻",
      description: "Découvre les bases du travail indépendant.",
      videos: [
        {
          title: "Bien démarrer en freelance",
          query: "devenir freelance débutant guide français"
        },
        {
          title: "Trouver ses premiers clients",
          query: "trouver premiers clients freelance français"
        },
        {
          title: "Présenter et valoriser ses services",
          query: "vendre ses services freelance tutoriel français"
        }
      ]
    },
    {
      id: "productivite",
      name: "Productivité",
      icon: "⚡",
      description: "Organise ton travail et tes objectifs.",
      videos: [
        {
          title: "Organiser son temps efficacement",
          query: "gestion du temps productivité français"
        },
        {
          title: "Créer un système d'organisation",
          query: "organisation personnelle système productivité français"
        },
        {
          title: "Définir des objectifs et suivre ses progrès",
          query: "définir objectifs méthode productivité français"
        }
      ]
    }
  ];

  const folderGrid = document.getElementById("folderGrid");
  const videoArea = document.getElementById("videoArea");
  const videoTitle = document.getElementById("videoTitle");
  const videoGrid = document.getElementById("videoGrid");
  const backToFolders = document.getElementById("backToFolders");

  function createElement(tag, className, text) {
    const element = document.createElement(tag);

    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;

    return element;
  }

  function renderFolders() {
    if (!folderGrid) return;

    folderGrid.replaceChildren();

    courseFolders.forEach((folder) => {
      const button = createElement("button", "folder-button");
      button.type = "button";
      button.setAttribute("aria-label", `Ouvrir le dossier ${folder.name}`);

      const icon = createElement("span", "folder-emoji", folder.icon);
      icon.setAttribute("aria-hidden", "true");

      const textWrapper = createElement("span");
      const title = createElement("strong", "", folder.name);
      const description = createElement("small", "", "3 vidéos à découvrir");

      textWrapper.append(title, description);
      button.append(icon, textWrapper);

      button.addEventListener("click", () => {
        renderVideos(folder);
      });

      folderGrid.appendChild(button);
    });
  }

  function renderVideos(folder) {
    if (!videoArea || !videoGrid || !videoTitle) return;

    videoTitle.textContent = folder.name;
    videoGrid.replaceChildren();

    folder.videos.forEach((video, index) => {
      const card = createElement("a", "video-card");
      card.href =
        "https://www.youtube.com/results?search_query=" +
        encodeURIComponent(video.query);
      card.target = "_blank";
      card.rel = "noopener noreferrer";
      card.setAttribute(
        "aria-label",
        `Rechercher sur YouTube : ${video.title}`
      );

      const play = createElement("span", "video-play", "▶");
      play.setAttribute("aria-hidden", "true");

      const title = createElement("h4", "", video.title);
      const footer = createElement(
        "span",
        "",
        `VIDÉO ${String(index + 1).padStart(2, "0")} · OUVRIR SUR YOUTUBE ↗`
      );

      card.append(play, title, footer);
      videoGrid.appendChild(card);
    });

    folderGrid.hidden = true;
    videoArea.hidden = false;

    videoArea.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  }

  if (folderGrid) {
    renderFolders();
  }

  if (backToFolders) {
    backToFolders.addEventListener("click", () => {
      if (folderGrid) folderGrid.hidden = false;
      if (videoArea) videoArea.hidden = true;

      if (folderGrid) {
        folderGrid.scrollIntoView({
          behavior: "smooth",
          block: "nearest"
        });
      }
    });
  }

  // Fenêtres des mentions légales, cookies et confidentialité
  const modalButtons = document.querySelectorAll("[data-modal]");
  const modalCloseButtons = document.querySelectorAll("[data-modal-close]");
  const modalBackdrops = document.querySelectorAll(".modal-backdrop");

  let previouslyFocusedElement = null;

  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    previouslyFocusedElement = document.activeElement;

    modalBackdrops.forEach((backdrop) => {
      backdrop.hidden = true;
    });

    modal.hidden = false;
    document.body.classList.add("modal-open");

    const closeButton = modal.querySelector("[data-modal-close]");
    if (closeButton) closeButton.focus();
  }

  function closeModals() {
    modalBackdrops.forEach((backdrop) => {
      backdrop.hidden = true;
    });

    document.body.classList.remove("modal-open");

    if (
      previouslyFocusedElement &&
      typeof previouslyFocusedElement.focus === "function"
    ) {
      previouslyFocusedElement.focus();
    }
  }

  modalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      openModal(button.dataset.modal);
    });
  });

  modalCloseButtons.forEach((button) => {
    button.addEventListener("click", closeModals);
  });

  modalBackdrops.forEach((backdrop) => {
    backdrop.addEventListener("click", (event) => {
      if (event.target === backdrop) {
        closeModals();
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      const hasOpenModal = Array.from(modalBackdrops).some(
        (backdrop) => !backdrop.hidden
      );

      if (hasOpenModal) {
        closeModals();
      }
    }
  });
});
