import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../../core/service/language.service';
import { ListingService } from '../../../core/service/ws/listing/listing.service';
import { CountryService } from '../../../core/service/ws/country/country.service';
import { CountryDto, ListingDto, NeedEnumDto } from '../../../api/webapiservice';

interface Step {
  title: string;
  description: string;
  icon: string;
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
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  NeedEnumDto = NeedEnumDto;
  mobileMenuOpen = false;
  languageDropdownOpen = false;
  currentLanguage: string = 'fr';

  recentListings: ListingDto[] = [];
  listingsLoading = true;
  countries: CountryDto[] = [];

  searchDepartureCountryId = '';
  searchDepartureCity = '';
  searchArrivalCountryId = '';
  searchArrivalCity = '';
  searchType: NeedEnumDto | '' = '';

  languages: Language[] = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' }
  ];

  steps: Step[] = [
    {
      title: 'Publiez une annonce',
      description: 'Créez une annonce en 2 minutes : voyageur avec de la place, ou expéditeur en recherche.',
      icon: 'fas fa-plus-circle',
    },
    {
      title: 'Entrez en contact',
      description: 'Parcourez les annonces et contactez directement la personne qui correspond à vos besoins.',
      icon: 'fas fa-handshake',
    },
    {
      title: 'Gérez facilement',
      description: 'Validez les demandes reçues via votre lien personnel. Aucun compte requis.',
      icon: 'fas fa-check-circle',
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
      name: 'Sophie Martin',
      location: 'Paris → Montréal',
      avatar: 'https://i.pravatar.cc/150?img=1',
      text: 'J\'envoie régulièrement des colis à ma famille au Canada. GlobRel est rapide, les frais sont transparents et le service vraiment fiable. Je recommande !',
      type: 'Envoi de colis'
    },
    {
      name: 'Omar Al-Rashid',
      location: 'Dubaï → Paris',
      avatar: 'https://i.pravatar.cc/150?img=12',
      text: 'J\'ai trouvé un voyageur en moins d\'une heure pour transporter un cadeau à ma sœur. Tout s\'est parfaitement déroulé, je suis bluffé par la simplicité.',
      type: 'Voyageur'
    },
    {
      name: 'Luisa Ferreira',
      location: 'Lisbonne → São Paulo',
      avatar: 'https://i.pravatar.cc/150?img=5',
      text: 'Interface simple et intuitive. En quelques clics j\'ai trouvé quelqu\'un de confiance pour envoyer un colis à ma famille au Brésil. Service excellent.',
      type: 'Expéditeur'
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
      answer: 'Oui, absolument. Nous utilisons un cryptage SSL 256-bit pour protéger toutes vos données.',
      open: false
    },
    {
      question: 'Faut-il créer un compte ?',
      answer: 'Non ! Vous pouvez publier une annonce sans compte. Vous recevrez un lien unique par email pour gérer votre annonce et valider les candidatures.',
      open: false
    },
    {
      question: 'Comment fonctionne la mise en relation ?',
      answer: 'Voyageurs et expéditeurs publient des annonces. Chacun peut envoyer une demande. Le créateur valide les demandes via son lien de gestion personnel.',
      open: false
    },
    {
      question: 'Quels sont les frais ?',
      answer: 'La plateforme est gratuite pour publier et consulter les annonces. Les conditions de prix sont fixées directement entre les utilisateurs.',
      open: false
    },
    {
      question: 'Que se passe-t-il en cas de problème ?',
      answer: 'Notre service client est disponible pour vous aider. Tous les envois de colis sont assurés.',
      open: false
    }
  ];

  constructor(
    private languageService: LanguageService,
    private listingService: ListingService,
    private countryService: CountryService,
    private router: Router
  ) {
    this.currentLanguage = this.languageService.getCurrentLanguage();
  }

  ngOnInit(): void {
    this.loadRecentListings();
    this.loadCountries();
    this.setupScrollAnimations();
  }

  loadCountries(): void {
    this.countryService.getActiveCountries().subscribe({
      next: (res) => { this.countries = res.countries ?? []; },
    });
  }

  loadRecentListings(): void {
    this.listingsLoading = true;
    this.listingService.getListings().subscribe({
      next: (res) => {
        const all = (res.listings ?? []).filter(l => l.isActive !== false);
        this.recentListings = all.slice(0, 6);
        this.listingsLoading = false;
      },
      error: () => { this.listingsLoading = false; }
    });
  }

  quickSearch(): void {
    const params: Record<string, string> = {};
    if (this.searchDepartureCountryId) params['departureCountryId'] = this.searchDepartureCountryId;
    if (this.searchDepartureCity) params['departureCity'] = this.searchDepartureCity;
    if (this.searchArrivalCountryId) params['arrivalCountryId'] = this.searchArrivalCountryId;
    if (this.searchArrivalCity) params['arrivalCity'] = this.searchArrivalCity;
    if (this.searchType) params['need'] = this.searchType;
    this.router.navigate(['/forms/list'], { queryParams: params });
  }

  pricePerKg(listing: ListingDto): number {
    return listing.pricePerKg ?? 0;
  }

  weightKg(grams: number | null | undefined): number {
    return (grams ?? 0) / 1000;
  }

  toggleMobileMenu(): void { this.mobileMenuOpen = !this.mobileMenuOpen; }
  closeMobileMenu(): void { this.mobileMenuOpen = false; }
  toggleLanguageDropdown(): void { this.languageDropdownOpen = !this.languageDropdownOpen; }
  closeLanguageDropdown(): void { this.languageDropdownOpen = false; }

  changeLanguage(languageCode: string): void {
    this.currentLanguage = languageCode;
    this.languageService.setLanguage(languageCode);
    this.closeLanguageDropdown();
  }

  getCurrentLanguageName(): string {
    return this.languages.find(l => l.code === this.currentLanguage)?.name ?? 'Français';
  }

  getCurrentLanguageFlag(): string {
    return this.languages.find(l => l.code === this.currentLanguage)?.flag ?? '🇫🇷';
  }

  toggleFaq(index: number): void {
    this.faqs[index].open = !this.faqs[index].open;
  }

  private setupScrollAnimations(): void {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('animate-in'); }),
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
      );
      setTimeout(() => {
        document.querySelectorAll('.step-card, .value-card, .testimonial-card, .listing-card')
          .forEach(el => observer.observe(el));
      }, 100);
    }
  }
}
