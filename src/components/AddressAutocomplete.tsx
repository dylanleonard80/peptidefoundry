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

export default function AddressAutocomplete({
  value,
  onChange,
  onPlaceSelected,
  id = 'street',
  placeholder = 'Street address',
}: AddressAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const skipNextChange = useRef(false);
  const isLoaded = useGooglePlacesScript();

  // Sync controlled value to the uncontrolled input when parent state changes,
  // but skip if the change came from autocomplete (we handle that ourselves)
  useEffect(() => {
    if (inputRef.current && !skipNextChange.current) {
      inputRef.current.value = value;
    }
    skipNextChange.current = false;
  }, [value]);

  const handlePlaceChanged = useCallback(() => {
    const ac = autocompleteRef.current;
    if (!ac) return;
    const place = ac.getPlace();
    if (!place?.address_components) return;
    const parsed = parseAddressComponents(place.address_components);
    // Tell parent to skip the next value sync — we set the input ourselves
    skipNextChange.current = true;
    if (inputRef.current) {
      inputRef.current.value = parsed.street;
    }
    onPlaceSelected(parsed);
  }, [onPlaceSelected]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // Only forward manual typing, not Google's DOM manipulation
      if (!skipNextChange.current) {
        onChange(e);
      }
    },
    [onChange]
  );

  useEffect(() => {
    if (!isLoaded || !inputRef.current || autocompleteRef.current) return;

    const ac = new google.maps.places.Autocomplete(inputRef.current, {
      componentRestrictions: { country: 'us' },
      fields: ['address_components'],
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
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
}
