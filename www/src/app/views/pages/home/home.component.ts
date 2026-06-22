import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../../core/service/language.service';
import { FrontI18nPipe } from '../../../shared/pipes/front-i18n.pipe';
import { ListingService } from '../../../core/service/ws/listing/listing.service';
import { CountryService } from '../../../core/service/ws/country/country.service';
import { CountryDto, ListingDto, NeedEnumDto } from '../../../api/webapiservice';

interface Step { titleKey: string; descKey: string; icon: string; }
interface Value { titleKey: string; descKey: string; iconPath: string; statKey: string; }
interface Testimonial { name: string; location: string; avatar: string; text: string; type: string; }
interface FAQ { questionKey: string; answerKey: string; open: boolean; }
interface Stats { users: string; transferred: string; parcels: string; satisfaction: string; }
interface Language { code: string; name: string; }

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, FrontI18nPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  NeedEnumDto = NeedEnumDto;

  recentListings: ListingDto[] = [];
  listingsLoading = true;
  countries: CountryDto[] = [];

  searchDepartureCountryId = '';
  searchDepartureCity = '';
  searchArrivalCountryId = '';
  searchArrivalCity = '';
  searchType: NeedEnumDto | '' = '';

  steps: Step[] = [
    { titleKey: 'home.step1.title', descKey: 'home.step1.desc', icon: 'fas fa-plus-circle' },
    { titleKey: 'home.step2.title', descKey: 'home.step2.desc', icon: 'fas fa-handshake' },
    { titleKey: 'home.step3.title', descKey: 'home.step3.desc', icon: 'fas fa-check-circle' },
  ];

  values: Value[] = [
    {
      titleKey: 'home.val1.title', descKey: 'home.val1.desc', statKey: 'home.val1.stat',
      iconPath: 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
    },
    {
      titleKey: 'home.val2.title', descKey: 'home.val2.desc', statKey: 'home.val2.stat',
      iconPath: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
    },
    {
      titleKey: 'home.val3.title', descKey: 'home.val3.desc', statKey: 'home.val3.stat',
      iconPath: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
    },
    {
      titleKey: 'home.val4.title', descKey: 'home.val4.desc', statKey: 'home.val4.stat',
      iconPath: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
    },
  ];

  testimonials: Testimonial[] = [
    {
      name: 'Sophie Martin', location: 'Paris → Montréal',
      avatar: 'https://i.pravatar.cc/150?img=1',
      text: "J'envoie régulièrement des colis à ma famille au Canada. GlobRel est rapide, les frais sont transparents et le service vraiment fiable. Je recommande !",
      type: 'Envoi de colis',
    },
    {
      name: 'Omar Al-Rashid', location: 'Dubaï → Paris',
      avatar: 'https://i.pravatar.cc/150?img=12',
      text: "J'ai trouvé un voyageur en moins d'une heure pour transporter un cadeau à ma sœur. Tout s'est parfaitement déroulé, je suis bluffé par la simplicité.",
      type: 'Voyageur',
    },
    {
      name: 'Luisa Ferreira', location: 'Lisbonne → São Paulo',
      avatar: 'https://i.pravatar.cc/150?img=5',
      text: "Interface simple et intuitive. En quelques clics j'ai trouvé quelqu'un de confiance pour envoyer un colis à ma famille au Brésil. Service excellent.",
      type: 'Expéditeur',
    },
  ];

  stats: Stats = {
    users: '10 000+', transferred: '€2M+', parcels: '15 000+', satisfaction: '98%',
  };

  faqs: FAQ[] = [
    { questionKey: 'home.faq1.q', answerKey: 'home.faq1.a', open: false },
    { questionKey: 'home.faq2.q', answerKey: 'home.faq2.a', open: false },
    { questionKey: 'home.faq3.q', answerKey: 'home.faq3.a', open: false },
    { questionKey: 'home.faq4.q', answerKey: 'home.faq4.a', open: false },
    { questionKey: 'home.faq5.q', answerKey: 'home.faq5.a', open: false },
  ];

  constructor(
    private languageService: LanguageService,
    private listingService: ListingService,
    private countryService: CountryService,
    private router: Router
  ) {}

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
      error: () => { this.listingsLoading = false; },
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

  pricePerKg(listing: ListingDto): number { return listing.pricePerKg ?? 0; }

  weightKg(grams: number | null | undefined): number { return (grams ?? 0) / 1000; }

  toggleFaq(index: number): void { this.faqs[index].open = !this.faqs[index].open; }

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
