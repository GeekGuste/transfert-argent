import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class GlobalErrorService {
  error(message: string, title = 'Erreur'): void {
    Swal.fire({ icon: 'error', title, text: message, confirmButtonColor: '#482890' });
  }

  success(message: string, title = 'Succès'): void {
    Swal.fire({ icon: 'success', title, text: message, confirmButtonColor: '#482890' });
  }

  warn(message: string, title = 'Attention'): void {
    Swal.fire({ icon: 'warning', title, text: message, confirmButtonColor: '#482890' });
  }

  handleHttpError(err: unknown): void {
    const status = (err as any)?.status;
    const detail = (err as any)?.response;
    let message = 'Une erreur inattendue est survenue.';
    try {
      const parsed = typeof detail === 'string' ? JSON.parse(detail) : detail;
      if (parsed?.detail) message = parsed.detail;
      else if (parsed?.title) message = parsed.title;
    } catch {}
    if (status === 400) this.warn(message || 'Données invalides.');
    else if (status === 401) this.error('Session expirée, veuillez vous reconnecter.', 'Non autorisé');
    else if (status === 403) this.error('Accès refusé.', 'Interdit');
    else if (status === 404) this.error('Ressource introuvable.', 'Non trouvé');
    else if (status === 409) this.warn(message || 'Conflit de données.', 'Conflit');
    else if (status >= 500) this.error('Erreur serveur, veuillez réessayer plus tard.', 'Erreur serveur');
    else this.error(message);
  }
}
