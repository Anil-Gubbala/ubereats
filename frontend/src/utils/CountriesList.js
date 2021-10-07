import Form from 'react-bootstrap/Form';
import countriesJSON from './countriesJSON';

function CountriesList() {
  return (
    <Form.Select aria-label='Countires List'>
      {/* <option>Select Country</option> */}
      {countriesJSON.map((each) => (
        <option key={each.Code} value={each.Code}>
          {each.Name}
        </option>
      ))}
    </Form.Select>
  );
}

export default CountriesList;
