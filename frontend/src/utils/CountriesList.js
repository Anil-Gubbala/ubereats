import Form from 'react-bootstrap/Form';
import countriesJSON from './countriesJSON';

function CountriesList({ value, onChange, name }) {
  return (
    <Form.Select
      aria-label='Countires List'
      value={value}
      onChange={onChange}
      name={name}
    >
      {countriesJSON.map((each) => (
        <option key={each.Code} value={each.Code}>
          {each.Name}
        </option>
      ))}
    </Form.Select>
  );
}

export default CountriesList;
