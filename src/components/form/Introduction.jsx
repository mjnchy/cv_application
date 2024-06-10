import Field from "./Field";

function Introduction({ name, address, contact }) {
  return (
    <div className="form-page">
      <div className="form-welcome">
        <h2 className="form-welcome-header">Introduce yourself briefly below.</h2>
        <p className="form-welcome-extension">
          This section helps employers know about you and provides them with a way to contact you.
        </p>
      </div>

      <div className="introduction form-container">
        <div className="name form-section">
          <Field id="first-name" labelText="First Name *" name="first" value={name.first} />
          <Field id="last-name" labelText="Last Name *" name="last"  value={name.last} />
        </div>

        <div className="location form-section">
          <Field id="city" labelText="City" name="city" value={address.city} />
          <div className="form-sub-section">
            <Field id="region" labelText="State/Province" name="region" value={address.region} />
            <Field id="zip" labelText="Zip Code" name="zip" value={address.zip} />
          </div>
        </div>

        <div className="contact form-section">
          <Field id="email" labelText="Email *" name="email" value={contact.email} />
          <Field id="phone" labelText="Phone" name="phone" value={contact.phone} />
        </div>
      </div>
    </div>
  );
};

export default Introduction;
