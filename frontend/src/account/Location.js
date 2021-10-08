import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';

function Location({ value, change, select, country }) {
  const searchOptions = {
    componentRestrictions: { country: [country] },
  };
  const obj = {};
  return (
    <PlacesAutocomplete
      value={value}
      onChange={change}
      onSelect={select}
      searchOptions={country ? searchOptions : obj}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div style={{ margin: '16px' }}>
          <input
            {...getInputProps({
              placeholder: 'Location',
              className: 'location-search-input locationBox',
            })}
          />
          <div className='autocomplete-dropdown-container'>
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion) => {
              const className = suggestion.active
                ? 'suggestion-item--active'
                : 'suggestion-item';
              // inline style for demonstration purpose
              const style = suggestion.active
                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                : { backgroundColor: '#ffffff', cursor: 'pointer' };
              return (
                <div
                  key={suggestion.placeId}
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                >
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
}

export default Location;
