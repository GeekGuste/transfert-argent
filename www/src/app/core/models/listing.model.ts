import { Need } from '@/app/common/need.enum';

export interface Listing {
    readonly id?: number
    need?: Need | null;
    lastName?: string | null;
    firstName?: string | null;
    phone?: string | null;
    email?: string | null;
    isAdult?: boolean | null;

    departureDate?: string | Date | null;
    arrivalDate?: string | Date | null;
    availableWeight?: number | null;

    maxTravelDate?: string | Date | null;
    desiredWeight?: number | null;

    departureLocation?: string | null;
    arrivalLocation?: string | null;
    pricePerKg?: number | null;
    paymentMethod?: string | null;

    acceptTerms?: boolean | null;
    currencyId?: number | null;
}
