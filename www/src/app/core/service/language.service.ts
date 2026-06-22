import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    private languageSubject: BehaviorSubject<string> = new BehaviorSubject<string>('en');
    public language$: Observable<string> = this.languageSubject.asObservable();

    constructor() {
        const saved = localStorage.getItem('app_language');
        if (saved && ['fr', 'en'].includes(saved)) {
            this.languageSubject.next(saved);
        } else {
            const browserLang = navigator.language?.split('-')[0];
            this.languageSubject.next(browserLang === 'fr' ? 'fr' : 'en');
        }
    }

    /**
     * Obtenir la langue actuelle
     */
    getCurrentLanguage(): string {
        return this.languageSubject.value;
    }

    /**
     * Définir une nouvelle langue
     * @param language Code de la langue (ex: 'en', 'fr', etc.)
     */
    setLanguage(language: string): void {
        this.languageSubject.next(language);
        // Sauvegarder dans le localStorage pour la persistance
        localStorage.setItem('app_language', language);
    }

    /**
     * Observable pour s'abonner aux changements de langue
     */
    getLanguage$(): Observable<string> {
        return this.language$;
    }
}
