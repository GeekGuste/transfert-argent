export interface Listing {
    readonly id?: number
    need?: string | null;
    lastName?: string | null;
    firstName?: string | null;
    phone?: string | null;
    email?: string | null;
    isAdult?: boolean | null;

    departureDate?: string | null;
    arrivalDate?: string | null;
    availableWeight?: number | null;

    maxTravelDate?: string | null;
    desiredWeight?: number | null;

    departurePlace?: string | null;
    arrivalPlace?: string | null;
    pricePerKg?: number | null;
    paymentMethod?: string | null;

    acceptTerms?: boolean | null;
}
