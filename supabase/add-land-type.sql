-- ============================================================
-- Allow "Land" as a property type
-- ============================================================

alter table listings drop constraint if exists listings_property_type_check;

alter table listings add constraint listings_property_type_check
  check (property_type in ('Villa', 'Apartment', 'Penthouse', 'Branded Residence', 'Land'));
