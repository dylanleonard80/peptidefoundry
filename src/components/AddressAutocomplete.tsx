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
  const isLoaded = useGooglePlacesScript();

  const handlePlaceChanged = useCallback(() => {
    const ac = autocompleteRef.current;
    if (!ac) return;
    const place = ac.getPlace();
    if (!place?.address_components) return;
    const parsed = parseAddressComponents(place.address_components);
    // Override the input value to show only the street, not the full formatted address
    if (inputRef.current) {
      inputRef.current.value = parsed.street;
    }
    onPlaceSelected(parsed);
  }, [onPlaceSelected]);

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
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}
