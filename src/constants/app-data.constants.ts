// ─────────────────────────────────────────────────────────────
// Supported locales — ISO 639-1 + region when relevant
// ─────────────────────────────────────────────────────────────
export type AppLocale = "fr" | "en" | "pt-PT";

export const SUPPORTED_LOCALES: readonly AppLocale[] = [
  "fr",
  "en",
  "pt-PT",
] as const;

export const LOCALE_LABELS: Record<AppLocale, string> = {
  fr: "Français",
  en: "English",
  "pt-PT": "Português (Portugal)",
} as const;

// ─────────────────────────────────────────────────────────────
// Typed translation shape — guarantees parity across locales.
// If a key is missing in one locale, TypeScript will error.
// ─────────────────────────────────────────────────────────────
export interface AppTranslations {
  common: {
    appName: string;
    add: string;
    cancel: string;
    save: string;
    delete: string;
    edit: string;
    search: string;
    seeAll: string;
    email: string;
    emails: string;
    platform: string;
    platforms: string;
    tags: string;
    notes: string;
    label: string;
    url: string;
    name: string;
  };
  tabs: {
    home: string;
    search: string;
    settings: string;
  };
  home: {
    headerSubtitle: string;
    stats: {
      totalPlatforms: string;
      uniqueTags: string;
    };
    sections: {
      yourEmails: {
        title: string;
        subtitle: string;
      };
      recentPlatforms: {
        title: string;
        subtitle: string;
      };
    };
    empty: {
      noEmail: string;
      noPlatform: string;
    };
  };
  emptyState: {
    title: string;
    subtitle: string;
    cta: string;
  };
  homeHeader: {
    emails: string;
    platforms: string;
  };
  searchScreen: {
    placeholder: string;
    noResults: string;
  };
  settingsScreen: {
    title: string;
    language: string;
    theme: string;
    themeLight: string;
    themeDark: string;
    themeSystem: string;
    about: string;
    privacy: string;
    dataManagement: string;
    exportData: string;
    importData: string;
    clearAll: string;
  };
  error: {
    dbInitTitle: string;
    dbInitSubtitle: string;
    retry: string;
  };
  params: {
    maxRecentPlatformsPreview: number;
  };
}

// ─────────────────────────────────────────────────────────────
// Static UI texts + fixed non-content params (never change)
// ─────────────────────────────────────────────────────────────
export const APP_DATA: Record<AppLocale, AppTranslations> = {
  fr: {
    common: {
      appName: "Mailseed",
      add: "Ajouter",
      cancel: "Annuler",
      save: "Enregistrer",
      delete: "Supprimer",
      edit: "Modifier",
      search: "Rechercher",
      seeAll: "Voir tout",
      email: "Email",
      emails: "Emails",
      platform: "Plateforme",
      platforms: "Plateformes",
      tags: "Tags",
      notes: "Notes",
      label: "Étiquette",
      url: "URL",
      name: "Nom",
    },
    tabs: {
      home: "Accueil",
      search: "Recherche",
      settings: "Paramètres",
    },
    home: {
      headerSubtitle: "Votre empreinte digitale numérique 💚",
      stats: {
        totalPlatforms: "Total plateformes",
        uniqueTags: "Tags uniques",
      },
      sections: {
        yourEmails: {
          title: "Vos emails",
          subtitle: "Sélectionnez une adresse pour voir ses plateformes",
        },
        recentPlatforms: {
          title: "Plateformes récentes",
          subtitle: "Dernières plateformes enregistrées",
        },
      },
      empty: {
        noEmail: "Aucun email enregistré",
        noPlatform: "Aucune plateforme enregistrée",
      },
    },
    emptyState: {
      title: "Bienvenue sur Mailseed",
      subtitle:
        "Suivez toutes les plateformes où vous utilisez vos adresses emails, en local.",
      cta: "Ajouter une première donnée",
    },
    homeHeader: {
      emails: "Emails",
      platforms: "Plateformes",
    },
    searchScreen: {
      placeholder: "Rechercher un email, une plateforme, un tag…",
      noResults: "Aucun résultat",
    },
    settingsScreen: {
      title: "Paramètres",
      language: "Langue",
      theme: "Thème",
      themeLight: "Clair",
      themeDark: "Sombre",
      themeSystem: "Système",
      about: "À propos",
      privacy: "Confidentialité",
      dataManagement: "Gestion des données",
      exportData: "Exporter les données",
      importData: "Importer des données",
      clearAll: "Tout effacer",
    },
    error: {
      dbInitTitle: "Erreur d'initialisation",
      dbInitSubtitle:
        "Impossible d'initialiser la base de données locale. Veuillez relancer l'application.",
      retry: "Réessayer",
    },
    params: {
      maxRecentPlatformsPreview: 3,
    },
  },

  en: {
    common: {
      appName: "Mailseed",
      add: "Add",
      cancel: "Cancel",
      save: "Save",
      delete: "Delete",
      edit: "Edit",
      search: "Search",
      seeAll: "See all",
      email: "Email",
      emails: "Emails",
      platform: "Platform",
      platforms: "Platforms",
      tags: "Tags",
      notes: "Notes",
      label: "Label",
      url: "URL",
      name: "Name",
    },
    tabs: {
      home: "Home",
      search: "Search",
      settings: "Settings",
    },
    home: {
      headerSubtitle: "Your digital footprint 💚",
      stats: {
        totalPlatforms: "Total platforms",
        uniqueTags: "Unique tags",
      },
      sections: {
        yourEmails: {
          title: "Your Emails",
          subtitle: "Select an address to view its platforms",
        },
        recentPlatforms: {
          title: "Recent platforms",
          subtitle: "Latest registered platforms",
        },
      },
      empty: {
        noEmail: "No email registered",
        noPlatform: "No platform registered",
      },
    },
    emptyState: {
      title: "Welcome to Mailseed",
      subtitle:
        "Track all platforms where you use your email addresses, locally.",
      cta: "Add your first data",
    },
    homeHeader: {
      emails: "Emails",
      platforms: "Platforms",
    },
    searchScreen: {
      placeholder: "Search an email, a platform, a tag…",
      noResults: "No results",
    },
    settingsScreen: {
      title: "Settings",
      language: "Language",
      theme: "Theme",
      themeLight: "Light",
      themeDark: "Dark",
      themeSystem: "System",
      about: "About",
      privacy: "Privacy",
      dataManagement: "Data management",
      exportData: "Export data",
      importData: "Import data",
      clearAll: "Clear all",
    },
    error: {
      dbInitTitle: "Initialization error",
      dbInitSubtitle:
        "Unable to initialize local database. Please restart the application.",
      retry: "Retry",
    },
    params: {
      maxRecentPlatformsPreview: 3,
    },
  },

  "pt-PT": {
    common: {
      appName: "Mailseed",
      add: "Adicionar",
      cancel: "Cancelar",
      save: "Guardar",
      delete: "Eliminar",
      edit: "Editar",
      search: "Pesquisar",
      seeAll: "Ver tudo",
      email: "E-mail",
      emails: "E-mails",
      platform: "Plataforma",
      platforms: "Plataformas",
      tags: "Etiquetas",
      notes: "Notas",
      label: "Rótulo",
      url: "URL",
      name: "Nome",
    },
    tabs: {
      home: "Início",
      search: "Pesquisa",
      settings: "Definições",
    },
    home: {
      headerSubtitle: "A sua pegada digital 💚",
      stats: {
        totalPlatforms: "Total de plataformas",
        uniqueTags: "Etiquetas únicas",
      },
      sections: {
        yourEmails: {
          title: "Os seus e-mails",
          subtitle: "Selecione um endereço para ver as suas plataformas",
        },
        recentPlatforms: {
          title: "Plataformas recentes",
          subtitle: "Últimas plataformas registadas",
        },
      },
      empty: {
        noEmail: "Nenhum e-mail registado",
        noPlatform: "Nenhuma plataforma registada",
      },
    },
    emptyState: {
      title: "Bem-vindo ao Mailseed",
      subtitle:
        "Siga todas as plataformas onde utiliza os seus endereços de e-mail, localmente.",
      cta: "Adicionar o primeiro dado",
    },
    homeHeader: {
      emails: "E-mails",
      platforms: "Plataformas",
    },
    searchScreen: {
      placeholder: "Pesquisar um e-mail, uma plataforma, uma etiqueta…",
      noResults: "Sem resultados",
    },
    settingsScreen: {
      title: "Definições",
      language: "Idioma",
      theme: "Tema",
      themeLight: "Claro",
      themeDark: "Escuro",
      themeSystem: "Sistema",
      about: "Acerca de",
      privacy: "Privacidade",
      dataManagement: "Gestão de dados",
      exportData: "Exportar dados",
      importData: "Importar dados",
      clearAll: "Limpar tudo",
    },
    error: {
      dbInitTitle: "Erro de inicialização",
      dbInitSubtitle:
        "Não foi possível inicializar a base de dados local. Por favor, reinicie a aplicação.",
      retry: "Tentar novamente",
    },
    params: {
      maxRecentPlatformsPreview: 3,
    },
  },
};
