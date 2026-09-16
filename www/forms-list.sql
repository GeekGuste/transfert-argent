-- ============================================
-- Clés de traduction pour les formulaires et listes (Portail & Annonces)
-- Basé sur les clés de front-i18n.service.ts
-- Utilise INSERT ... ON DUPLICATE KEY UPDATE pour éviter les doublons
-- ============================================

-- ============================================
-- NAVBAR
-- ============================================
INSERT INTO `keys` (`key`, `software_id`, `created_at`, `updated_at`) VALUES
('NAV.HOME', 4, NOW(), NOW()),
('NAV.LISTINGS', 4, NOW(), NOW()),
('NAV.PUBLISH', 4, NOW(), NOW()),
('NAV.PUBLISH.FULL', 4, NOW(), NOW()),
('NAV.LOGIN', 4, NOW(), NOW()),
('NAV.REGISTER', 4, NOW(), NOW())
ON DUPLICATE KEY UPDATE `updated_at` = NOW();

-- ============================================
-- HOME & HERO
-- ============================================
INSERT INTO `keys` (`key`, `software_id`, `created_at`, `updated_at`) VALUES
('HOME.BADGE', 4, NOW(), NOW()),
('HOME.HERO.TITLE', 4, NOW(), NOW()),
('HOME.HERO.ACCENT', 4, NOW(), NOW()),
('HOME.HERO.SUB', 4, NOW(), NOW()),
('HOME.HERO.TRAVELER.Q', 4, NOW(), NOW()),
('HOME.HERO.TRAVELER.SUB', 4, NOW(), NOW()),
('HOME.HERO.TRAVELER.CTA', 4, NOW(), NOW()),
('HOME.HERO.SENDER.Q', 4, NOW(), NOW()),
('HOME.HERO.SENDER.SUB', 4, NOW(), NOW()),
('HOME.HERO.SENDER.CTA', 4, NOW(), NOW()),
('HOME.HERO.BROWSE', 4, NOW(), NOW())
ON DUPLICATE KEY UPDATE `updated_at` = NOW();

-- ============================================
-- SEARCH & ENUMS (Generic)
-- ============================================
INSERT INTO `keys` (`key`, `software_id`, `created_at`, `updated_at`) VALUES
('SEARCH.DEPARTURE', 4, NOW(), NOW()),
('SEARCH.ARRIVAL', 4, NOW(), NOW()),
('SEARCH.COUNTRY', 4, NOW(), NOW()),
('SEARCH.CITY', 4, NOW(), NOW()),
('SEARCH.TYPE', 4, NOW(), NOW()),
('SEARCH.ALL', 4, NOW(), NOW()),
('SEARCH.BTN', 4, NOW(), NOW()),
('NEED.TRAVELER', 4, NOW(), NOW()),
('NEED.SENDER', 4, NOW(), NOW())
ON DUPLICATE KEY UPDATE `updated_at` = NOW();

-- ============================================
-- STATS & RECENT LISTINGS
-- ============================================
INSERT INTO `keys` (`key`, `software_id`, `created_at`, `updated_at`) VALUES
('STAT.MEMBERS', 4, NOW(), NOW()),
('STAT.PARCELS', 4, NOW(), NOW()),
('STAT.SATISFACTION', 4, NOW(), NOW()),
('HOME.RECENT.TITLE', 4, NOW(), NOW()),
('HOME.RECENT.SUB', 4, NOW(), NOW()),
('HOME.RECENT.EMPTY', 4, NOW(), NOW()),
('HOME.RECENT.FIRST', 4, NOW(), NOW()),
('HOME.RECENT.SEEALL', 4, NOW(), NOW()),
('LISTING.KG.AVAIL', 4, NOW(), NOW()),
('LISTING.KG.WANTED', 4, NOW(), NOW())
ON DUPLICATE KEY UPDATE `updated_at` = NOW();

-- ============================================
-- HOW IT WORKS
-- ============================================
INSERT INTO `keys` (`key`, `software_id`, `created_at`, `updated_at`) VALUES
('HOME.HOW.TITLE', 4, NOW(), NOW()),
('HOME.HOW.SUB', 4, NOW(), NOW()),
('HOME.STEP1.TITLE', 4, NOW(), NOW()),
('HOME.STEP1.DESC', 4, NOW(), NOW()),
('HOME.STEP2.TITLE', 4, NOW(), NOW()),
('HOME.STEP2.DESC', 4, NOW(), NOW()),
('HOME.STEP3.TITLE', 4, NOW(), NOW()),
('HOME.STEP3.DESC', 4, NOW(), NOW())
ON DUPLICATE KEY UPDATE `updated_at` = NOW();

-- ============================================
-- SERVICES
-- ============================================
INSERT INTO `keys` (`key`, `software_id`, `created_at`, `updated_at`) VALUES
('HOME.SERVICES.TITLE', 4, NOW(), NOW()),
('HOME.SERVICES.SUB', 4, NOW(), NOW()),
('HOME.SERVICES.TRANSFER.TITLE', 4, NOW(), NOW()),
('HOME.SERVICES.TRANSFER.DESC', 4, NOW(), NOW()),
('HOME.SERVICES.TRANSFER.F1', 4, NOW(), NOW()),
('HOME.SERVICES.TRANSFER.F2', 4, NOW(), NOW()),
('HOME.SERVICES.TRANSFER.F3', 4, NOW(), NOW()),
('HOME.SERVICES.TRANSFER.F4', 4, NOW(), NOW()),
('HOME.SERVICES.TRANSFER.CTA', 4, NOW(), NOW()),
('HOME.SERVICES.PARCEL.TITLE', 4, NOW(), NOW()),
('HOME.SERVICES.PARCEL.DESC', 4, NOW(), NOW()),
('HOME.SERVICES.PARCEL.F1', 4, NOW(), NOW()),
('HOME.SERVICES.PARCEL.F2', 4, NOW(), NOW()),
('HOME.SERVICES.PARCEL.F3', 4, NOW(), NOW()),
('HOME.SERVICES.PARCEL.F4', 4, NOW(), NOW()),
('HOME.SERVICES.PARCEL.CTA', 4, NOW(), NOW())
ON DUPLICATE KEY UPDATE `updated_at` = NOW();

-- ============================================
-- VALUES
-- ============================================
INSERT INTO `keys` (`key`, `software_id`, `created_at`, `updated_at`) VALUES
('HOME.VALUES.TITLE', 4, NOW(), NOW()),
('HOME.VALUES.SUB', 4, NOW(), NOW()),
('HOME.VAL1.TITLE', 4, NOW(), NOW()),
('HOME.VAL1.DESC', 4, NOW(), NOW()),
('HOME.VAL1.STAT', 4, NOW(), NOW()),
('HOME.VAL2.TITLE', 4, NOW(), NOW()),
('HOME.VAL2.DESC', 4, NOW(), NOW()),
('HOME.VAL2.STAT', 4, NOW(), NOW()),
('HOME.VAL3.TITLE', 4, NOW(), NOW()),
('HOME.VAL3.DESC', 4, NOW(), NOW()),
('HOME.VAL3.STAT', 4, NOW(), NOW()),
('HOME.VAL4.TITLE', 4, NOW(), NOW()),
('HOME.VAL4.DESC', 4, NOW(), NOW()),
('HOME.VAL4.STAT', 4, NOW(), NOW())
ON DUPLICATE KEY UPDATE `updated_at` = NOW();

-- ============================================
-- TRUST & TESTIMONIALS
-- ============================================
INSERT INTO `keys` (`key`, `software_id`, `created_at`, `updated_at`) VALUES
('HOME.TRUST.TITLE', 4, NOW(), NOW()),
('HOME.TRUST.SUB', 4, NOW(), NOW()),
('HOME.STATS.USERS', 4, NOW(), NOW()),
('HOME.STATS.TRANSFERRED', 4, NOW(), NOW()),
('HOME.STATS.PARCELS', 4, NOW(), NOW()),
('HOME.STATS.SATISFACTION', 4, NOW(), NOW())
ON DUPLICATE KEY UPDATE `updated_at` = NOW();

-- ============================================
-- FAQ
-- ============================================
INSERT INTO `keys` (`key`, `software_id`, `created_at`, `updated_at`) VALUES
('HOME.FAQ.TITLE', 4, NOW(), NOW()),
('HOME.FAQ.SUB', 4, NOW(), NOW()),
('HOME.FAQ1.Q', 4, NOW(), NOW()),
('HOME.FAQ1.A', 4, NOW(), NOW()),
('HOME.FAQ2.Q', 4, NOW(), NOW()),
('HOME.FAQ2.A', 4, NOW(), NOW()),
('HOME.FAQ3.Q', 4, NOW(), NOW()),
('HOME.FAQ3.A', 4, NOW(), NOW()),
('HOME.FAQ4.Q', 4, NOW(), NOW()),
('HOME.FAQ4.A', 4, NOW(), NOW()),
('HOME.FAQ5.Q', 4, NOW(), NOW()),
('HOME.FAQ5.A', 4, NOW(), NOW())
ON DUPLICATE KEY UPDATE `updated_at` = NOW();

-- ============================================
-- MODULE: LIST-LISTING (List Listing Component)
-- ============================================
INSERT INTO `keys` (`key`, `software_id`, `created_at`, `updated_at`) VALUES
('LIST-LISTING.TITLE', 4, NOW(), NOW()),
('LIST-LISTING.PUBLISH', 4, NOW(), NOW()),
('LIST-LISTING.FILTERS.TITLE', 4, NOW(), NOW()),
('LIST-LISTING.FILTERS.CLEAR', 4, NOW(), NOW()),
('LIST-LISTING.FILTERS.TYPE', 4, NOW(), NOW()),
('LIST-LISTING.FILTERS.ALL', 4, NOW(), NOW()),
('LIST-LISTING.NEED_TRAVELER', 4, NOW(), NOW()),
('LIST-LISTING.NEED_SENDER', 4, NOW(), NOW()),
('LIST-LISTING.FILTERS.DEPARTURE', 4, NOW(), NOW()),
('LIST-LISTING.FILTERS.COUNTRIES', 4, NOW(), NOW()),
('LIST-LISTING.FILTERS.CITY', 4, NOW(), NOW()),
('LIST-LISTING.FILTERS.ARRIVAL', 4, NOW(), NOW()),
('LIST-LISTING.FILTERS.FROM', 4, NOW(), NOW()),
('LIST-LISTING.FILTERS.TO', 4, NOW(), NOW()),
('LIST-LISTING.FILTERS.SEARCH', 4, NOW(), NOW())
ON DUPLICATE KEY UPDATE `updated_at` = NOW();

-- ============================================
-- MODULE: ADD-LISTING (Add Listing / Publication)
-- ============================================
INSERT INTO `keys` (`key`, `software_id`, `created_at`, `updated_at`) VALUES
('ADD-LISTING.BACK', 4, NOW(), NOW()),
('ADD-LISTING.TITLE', 4, NOW(), NOW()),
('ADD-LISTING.STEP.PROFILE', 4, NOW(), NOW()),
('ADD-LISTING.STEP.TRAVEL', 4, NOW(), NOW()),
('ADD-LISTING.STEP.PARCEL', 4, NOW(), NOW()),
('ADD-LISTING.STEP.ROUTE', 4, NOW(), NOW()),
('ADD-LISTING.STEP.CONDITIONS', 4, NOW(), NOW()),
('ADD-LISTING.STEP.CONFIRM', 4, NOW(), NOW()),
('ADD-LISTING.PROFILE.TITLE', 4, NOW(), NOW()),
('ADD-LISTING.TYPE.LABEL', 4, NOW(), NOW()),
('ADD-LISTING.TRAVELER.TITLE', 4, NOW(), NOW()),
('ADD-LISTING.TRAVELER.SUB', 4, NOW(), NOW()),
('ADD-LISTING.SENDER.TITLE', 4, NOW(), NOW()),
('ADD-LISTING.SENDER.SUB', 4, NOW(), NOW()),
('ADD-LISTING.FIELD.LASTNAME', 4, NOW(), NOW()),
('ADD-LISTING.FIELD.FIRSTNAME', 4, NOW(), NOW()),
('ADD-LISTING.FIELD.PHONE', 4, NOW(), NOW()),
('ADD-LISTING.FIELD.EMAIL', 4, NOW(), NOW()),
('ADD-LISTING.FIELD.ADULT', 4, NOW(), NOW()),
('ADD-LISTING.TRAVEL.TITLE', 4, NOW(), NOW()),
('ADD-LISTING.PARCEL.TITLE', 4, NOW(), NOW()),
('ADD-LISTING.FIELD.DEPARTURE_DATE', 4, NOW(), NOW()),
('ADD-LISTING.FIELD.ARRIVAL_DATE', 4, NOW(), NOW()),
('ADD-LISTING.FIELD.MAX_DATE', 4, NOW(), NOW()),
('ADD-LISTING.FIELD.WEIGHT_AVAIL', 4, NOW(), NOW()),
('ADD-LISTING.FIELD.WEIGHT_DESIRED', 4, NOW(), NOW()),
('ADD-LISTING.ROUTE.TITLE', 4, NOW(), NOW()),
('ADD-LISTING.FIELD.COUNTRY_FROM', 4, NOW(), NOW()),
('ADD-LISTING.FIELD.COUNTRY_TO', 4, NOW(), NOW()),
('ADD-LISTING.FIELD.COUNTRY_SELECT', 4, NOW(), NOW()),
('ADD-LISTING.FIELD.PRICE', 4, NOW(), NOW()),
('ADD-LISTING.FIELD.CURRENCY', 4, NOW(), NOW()),
('ADD-LISTING.LEGAL.TITLE', 4, NOW(), NOW()),
('ADD-LISTING.FIELD.PAYMENT', 4, NOW(), NOW()),
('ADD-LISTING.FIELD.TERMS', 4, NOW(), NOW()),
('ADD-LISTING.FIELD.TERMS.LINK', 4, NOW(), NOW()),
('ADD-LISTING.FIELD.TERMS.AND', 4, NOW(), NOW()),
('ADD-LISTING.FIELD.TERMS.PRIVACY', 4, NOW(), NOW()),
('ADD-LISTING.BTN.PREV', 4, NOW(), NOW()),
('ADD-LISTING.BTN.NEXT', 4, NOW(), NOW()),
('ADD-LISTING.BTN.SUBMIT', 4, NOW(), NOW()),
('ADD-LISTING.RECAP.TITLE', 4, NOW(), NOW()),
('ADD-LISTING.RECAP.TYPE', 4, NOW(), NOW()),
('ADD-LISTING.RECAP.NAME', 4, NOW(), NOW()),
('ADD-LISTING.RECAP.DATES', 4, NOW(), NOW()),
('ADD-LISTING.RECAP.MAXDATE', 4, NOW(), NOW()),
('ADD-LISTING.RECAP.WEIGHT', 4, NOW(), NOW()),
('ADD-LISTING.RECAP.ROUTE', 4, NOW(), NOW()),
('ADD-LISTING.RECAP.PRICE', 4, NOW(), NOW()),
('ADD-LISTING.STEP.LABEL', 4, NOW(), NOW()),
('ADD-LISTING.SUCCESS.TITLE', 4, NOW(), NOW()),
('ADD-LISTING.SUCCESS.SUB', 4, NOW(), NOW()),
('ADD-LISTING.SUCCESS.MANAGE_LABEL', 4, NOW(), NOW()),
('ADD-LISTING.SUCCESS.COPY', 4, NOW(), NOW()),
('ADD-LISTING.SUCCESS.VIEW', 4, NOW(), NOW()),
('ADD-LISTING.SUCCESS.NEW', 4, NOW(), NOW())
ON DUPLICATE KEY UPDATE `updated_at` = NOW();

-- ============================================
-- MODULE: DETAILS (Listing Details)
-- ============================================
INSERT INTO `keys` (`key`, `software_id`, `created_at`, `updated_at`) VALUES
('DETAILS.BACK', 4, NOW(), NOW()),
('DETAILS.DEPARTURE', 4, NOW(), NOW()),
('DETAILS.ARRIVAL', 4, NOW(), NOW()),
('DETAILS.PRICE', 4, NOW(), NOW()),
('DETAILS.AVAILABLE', 4, NOW(), NOW()),
('DETAILS.WANTED', 4, NOW(), NOW()),
('DETAILS.APPLICATIONS', 4, NOW(), NOW()),
('DETAILS.CONTACT.LABEL', 4, NOW(), NOW()),
('DETAILS.DATES', 4, NOW(), NOW()),
('DETAILS.PAYMENT', 4, NOW(), NOW()),
('DETAILS.ADVERTISER', 4, NOW(), NOW()),
('DETAILS.APPLY.TITLE', 4, NOW(), NOW()),
('DETAILS.APPLY.SUCCESS', 4, NOW(), NOW()),
('DETAILS.APPLY.SUCCESS.SUB', 4, NOW(), NOW()),
('DETAILS.APPLY.CLOSE', 4, NOW(), NOW()),
('DETAILS.APPLY.CANCEL', 4, NOW(), NOW()),
('DETAILS.APPLY.SEND', 4, NOW(), NOW()),
('DETAILS.APPLY.MESSAGE', 4, NOW(), NOW()),
('DETAILS.APPLY.ADULT', 4, NOW(), NOW())
ON DUPLICATE KEY UPDATE `updated_at` = NOW();

-- ============================================
-- MODULE: MANAGE (Manage Listing)
-- ============================================
INSERT INTO `keys` (`key`, `software_id`, `created_at`, `updated_at`) VALUES
('MANAGE.BACK', 4, NOW(), NOW()),
('MANAGE.TITLE', 4, NOW(), NOW()),
('MANAGE.STATUS.ACTIVE', 4, NOW(), NOW()),
('MANAGE.STATUS.INACTIVE', 4, NOW(), NOW()),
('MANAGE.CONFIRM_ACTIVE', 4, NOW(), NOW()),
('MANAGE.DEACTIVATE', 4, NOW(), NOW()),
('MANAGE.APPLICATIONS', 4, NOW(), NOW()),
('MANAGE.VALIDATE', 4, NOW(), NOW()),
('MANAGE.EMPTY', 4, NOW(), NOW()),
('MANAGE.EMPTY.SUB', 4, NOW(), NOW()),
('MANAGE.INFO_NOTE', 4, NOW(), NOW()),
('MANAGE.ERROR.INVALID', 4, NOW(), NOW()),
('MANAGE.SEE_LISTINGS', 4, NOW(), NOW())
ON DUPLICATE KEY UPDATE `updated_at` = NOW();
