import { useEffect, useRef, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { useGooglePlacesScript } from '@/hooks/useGooglePlacesScript';

interface ParsedAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
}

interface AddressAutocompleteProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPlaceSelected: (address: ParsedAddress) => void;
  id?: string;
  placeholder?: string;
}

function parseAddressComponents(
  components: google.maps.GeocoderAddressComponent[]
): ParsedAddress {
  let streetNumber = '';
  let route = '';
  let city = '';
  let state = '';
  let zip = '';

  for (const c of components) {
    const type = c.types[0];
    if (type === 'street_number') streetNumber = c.long_name;
    else if (type === 'route') route = c.short_name;
    else if (type === 'locality') city = c.long_name;
    else if (type === 'sublocality_level_1' && !city) city = c.long_name;
    else if (type === 'administrative_area_level_1') state = c.short_name;
    else if (type === 'postal_code') zip = c.long_name;
  }

  return {
    street: [streetNumber, route].filter(Boolean).join(' '),
    city,
    state,
    zip,
  };
}

/**
 * Fallback parser for formatted_address when address_components is incomplete.
 * Google US format: "123 Main St, Austin, TX 78701, USA"
 */
function parseFormattedAddress(formatted: string): ParsedAddress {
  const parts = formatted.split(',').map(s => s.trim());
  // Remove "USA" / "US" if present at end
  if (parts.length > 0 && /^(USA?|United States)$/i.test(parts[parts.length - 1])) {
    parts.pop();
  }

  let street = '';
  let city = '';
  let state = '';
  let zip = '';

  if (parts.length >= 3) {
    // "123 Main St", "Austin", "TX 78701"
    street = parts.slice(0, parts.length - 2).join(', ');
    city = parts[parts.length - 2];
    const stateZip = parts[parts.length - 1].split(/\s+/);
    state = stateZip[0] || '';
    zip = stateZip.slice(1).join(' ') || '';
  } else if (parts.length === 2) {
    street = parts[0];
    const stateZip = parts[1].split(/\s+/);
    state = stateZip[0] || '';
    zip = stateZip.slice(1).join(' ') || '';
  } else {
    street = formatted;
  }

  return { street, city, state, zip };
}

function parsePlace(place: google.maps.places.PlaceResult): ParsedAddress {
  let parsed: ParsedAddress = { street: '', city: '', state: '', zip: '' };

  if (place.address_components?.length) {
    parsed = parseAddressComponents(place.address_components);
  }

  // Fallback: if address_components was incomplete, try formatted_address
  if (place.formatted_address && (!parsed.street || !parsed.city || !parsed.state || !parsed.zip)) {
    const fallback = parseFormattedAddress(place.formatted_address);
    if (!parsed.street) parsed.street = fallback.street;
    if (!parsed.city) parsed.city = fallback.city;
    if (!parsed.state) parsed.state = fallback.state;
    if (!parsed.zip) parsed.zip = fallback.zip;
  }

  return parsed;
}

export default function AddressAutocomplete({
  value,
  onChange,
  onPlaceSelected,
  id = 'street',
  placeholder = 'Street address',
}: AddressAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const onPlaceSelectedRef = useRef(onPlaceSelected);
  const skipNextChange = useRef(false);
  const isLoaded = useGooglePlacesScript();

  // Keep callback ref in sync without re-triggering effects
  useEffect(() => {
    onPlaceSelectedRef.current = onPlaceSelected;
  }, [onPlaceSelected]);

  // Sync controlled value to the uncontrolled input when parent state changes,
  // but skip if the change came from autocomplete (we handle that ourselves)
  useEffect(() => {
    if (inputRef.current && !skipNextChange.current) {
      inputRef.current.value = value;
    }
    skipNextChange.current = false;
  }, [value]);

  // Stable callback that never changes — uses ref for onPlaceSelected
  const handlePlaceChanged = useCallback(() => {
    const ac = autocompleteRef.current;
    if (!ac) return;
    const place = ac.getPlace();
    if (!place) return;
    const parsed = parsePlace(place);
    if (!parsed.street && !parsed.city) return;
    skipNextChange.current = true;
    if (inputRef.current) {
      inputRef.current.value = parsed.street;
    }
    onPlaceSelectedRef.current(parsed);
  }, []);

  // Initialize autocomplete once — no deps that change
  useEffect(() => {
    if (!isLoaded || !inputRef.current || autocompleteRef.current) return;

    const ac = new google.maps.places.Autocomplete(inputRef.current, {
      componentRestrictions: { country: 'us' },
      fields: ['address_components', 'formatted_address'],
      types: ['address'],
    });

    ac.addListener('place_changed', handlePlaceChanged);
    autocompleteRef.current = ac;

    return () => {
      google.maps.event.clearInstanceListeners(ac);
      autocompleteRef.current = null;
    };
  }, [isLoaded, handlePlaceChanged]);

  return (
    <Input
      ref={inputRef}
      id={id}
      defaultValue={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}
