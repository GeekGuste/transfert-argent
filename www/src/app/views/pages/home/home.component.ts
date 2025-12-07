import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LanguageService } from '../../../core/service/language.service';

interface Step {
  title: string;
  description: string;
  iconPath: string;
}

interface Value {
  title: string;
  description: string;
  iconPath: string;
  stat?: string;
}

interface Testimonial {
  name: string;
  location: string;
  avatar: string;
  text: string;
  type: string;
}

interface FAQ {
  question: string;
  answer: string;
  open: boolean;
}

interface Stats {
  users: string;
  transferred: string;
  parcels: string;
  satisfaction: string;
}

interface Language {
  code: string;
  name: string;
  flag: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  mobileMenuOpen = false;
  languageDropdownOpen = false;
  currentLanguage: string = 'fr';

  // Langues disponibles pour un projet international
  languages: Language[] = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' }
  ];

  constructor(private languageService: LanguageService) {
    // Récupérer la langue actuelle
    this.currentLanguage = this.languageService.getCurrentLanguage();
  }

  steps: Step[] = [
    {
      title: 'Inscription rapide',
      description: 'Créez votre compte en quelques minutes avec une vérification d\'identité sécurisée.',
      iconPath: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z'
    },
    {
      title: 'Publication d\'une demande',
      description: 'Publiez votre demande de transfert d\'argent ou d\'envoi de colis avec tous les détails.',
      iconPath: 'M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z'
    },
    {
      title: 'Mise en relation',
      description: 'Notre algorithme vous met en relation avec des utilisateurs vérifiés et de confiance.',
      iconPath: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75M9 7a4 4 0 1 0 0 8 4 4 0 0 0 0-8z'
    },
    {
      title: 'Paiement & livraison',
      description: 'Effectuez le paiement sécurisé et suivez votre transfert ou colis en temps réel.',
      iconPath: 'M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4L12 14.01l-3-3'
    }
  ];

  values: Value[] = [
    {
      title: 'Transparence',
      description: 'Frais clairs et affichés dès le départ. Aucun frais caché, jamais.',
      iconPath: 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
      stat: '0% frais cachés'
    },
    {
      title: 'Authenticité',
      description: 'Vérification d\'identité obligatoire pour tous les utilisateurs de la plateforme.',
      iconPath: 'M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4L12 14.01l-3-3',
      stat: '100% vérifiés'
    },
    {
      title: 'Sécurité',
      description: 'Paiements protégés, données cryptées et assurance sur tous les envois.',
      iconPath: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
      stat: 'SSL 256-bit'
    },
    {
      title: 'Communauté',
      description: 'Un réseau de confiance basé sur les avis et évaluations des utilisateurs.',
      iconPath: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
      stat: '10K+ membres'
    },
    {
      title: 'Traçabilité',
      description: 'Suivi en temps réel de vos transferts et colis à chaque étape du processus.',
      iconPath: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
      stat: 'Temps réel'
    }
  ];

  testimonials: Testimonial[] = [
    {
      name: 'Aminata Diallo',
      location: 'Paris → Dakar',
      avatar: 'https://i.pravatar.cc/150?img=1',
      text: 'J\'envoie de l\'argent à ma famille au Sénégal chaque mois. GlobRel est rapide, sûr et les frais sont vraiment compétitifs. Je recommande !',
      type: 'Transfert d\'argent'
    },
    {
      name: 'Jean-Marc Kouassi',
      location: 'Abidjan → Lyon',
      avatar: 'https://i.pravatar.cc/150?img=12',
      text: 'J\'ai envoyé un colis important avec GlobRel. Le suivi en temps réel m\'a rassuré et tout s\'est parfaitement déroulé. Service excellent !',
      type: 'Envoi de colis'
    },
    {
      name: 'Fatou Ndiaye',
      location: 'Bruxelles → Bamako',
      avatar: 'https://i.pravatar.cc/150?img=5',
      text: 'Interface simple et intuitive. J\'ai pu envoyer de l\'argent à ma mère en quelques clics. Le service client est très réactif.',
      type: 'Transfert d\'argent'
    }
  ];

  stats: Stats = {
    users: '10 000+',
    transferred: '€2M+',
    parcels: '15 000+',
    satisfaction: '98%'
  };

  faqs: FAQ[] = [
    {
      question: 'Est-ce sécurisé ?',
      answer: 'Oui, absolument. Nous utilisons un cryptage SSL 256-bit pour protéger toutes vos données. Tous les paiements sont sécurisés via des partenaires bancaires certifiés. De plus, tous les utilisateurs doivent vérifier leur identité avant d\'utiliser la plateforme.',
      open: false
    },
    {
      question: 'Comment sont protégés les paiements ?',
      answer: 'Les paiements sont protégés par un système d\'entiercement (escrow). L\'argent est bloqué jusqu\'à ce que le destinataire confirme la réception. En cas de litige, notre équipe intervient pour résoudre le problème et protéger les deux parties.',
      open: false
    },
    {
      question: 'Que se passe-t-il en cas de problème ?',
      answer: 'Notre service client est disponible 24/7 pour vous aider. En cas de problème avec un transfert ou un colis, nous avons une procédure de résolution de litiges. Tous les envois de colis sont assurés et les transferts d\'argent sont garantis.',
      open: false
    },
    {
      question: 'Qui peut utiliser la plateforme ?',
      answer: 'Toute personne majeure (18 ans et plus) peut s\'inscrire sur GlobRel. Vous devez fournir une pièce d\'identité valide pour la vérification. La plateforme est disponible dans tous les pays où nous opérons.',
      open: false
    },
    {
      question: 'Quels sont les frais ?',
      answer: 'Nos frais sont transparents et affichés avant chaque transaction. Pour les transferts d\'argent, les frais varient entre 2% et 5% selon le montant et la destination. Pour les colis, les prix sont négociables directement avec le transporteur.',
      open: false
    },
    {
      question: 'Combien de temps prend un transfert ?',
      answer: 'Les transferts d\'argent sont généralement instantanés ou prennent jusqu\'à 24h selon la méthode de paiement choisie. Pour les colis, le délai dépend de la disponibilité des transporteurs et de la destination, généralement entre 3 et 10 jours.',
      open: false
    }
  ];

  ngOnInit(): void {
    // Animation au scroll (optionnel)
    this.setupScrollAnimations();
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }

  toggleLanguageDropdown(): void {
    this.languageDropdownOpen = !this.languageDropdownOpen;
  }

  closeLanguageDropdown(): void {
    this.languageDropdownOpen = false;
  }

  changeLanguage(languageCode: string): void {
    this.currentLanguage = languageCode;
    this.languageService.setLanguage(languageCode);
    this.closeLanguageDropdown();
  }

  getCurrentLanguageName(): string {
    const lang = this.languages.find(l => l.code === this.currentLanguage);
    return lang ? lang.name : 'Français';
  }

  getCurrentLanguageFlag(): string {
    const lang = this.languages.find(l => l.code === this.currentLanguage);
    return lang ? lang.flag : '🇫🇷';
  }

  toggleFaq(index: number): void {
    this.faqs[index].open = !this.faqs[index].open;
  }

  private setupScrollAnimations(): void {
    // Utilisation de IntersectionObserver pour les animations au scroll
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-in');
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        }
      );

      // Observer les sections après un court délai pour s'assurer que le DOM est chargé
      setTimeout(() => {
        const sections = document.querySelectorAll('.step-card, .service-card, .value-card, .testimonial-card');
        sections.forEach((section) => observer.observe(section));
      }, 100);
    }
  }
}
