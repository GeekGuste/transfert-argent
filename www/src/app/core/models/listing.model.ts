import { NeedEnumDto } from '@/app/api/webapiservice';

export interface Listing {
  id?: string;
  need?: { key?: NeedEnumDto; label?: string } | null;
  lastName?: string | null;
  firstName?: string | null;
  phone?: string | null;
  email?: string | null;
  isAdult?: boolean | null;

  departureDate?: Date | null;
  arrivalDate?: Date | null;
  availableWeightInGrams?: number | null;

  maxTravelDate?: Date | null;
  desiredWeightInGrams?: number | null;

  departureLocation?: string | null;
  arrivalLocation?: string | null;
  pricePerGram?: number | null;
  currencyId?: string | null;
  serviceId?: string | null;
  paymentMethod?: string | null;

  isActive?: boolean;
  accessToken?: string | null;
  dateCreation?: Date;
  applicationsNumber?: number;
}
