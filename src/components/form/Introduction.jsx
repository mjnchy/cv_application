import Field from "./Field";

function Introduction() {
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
          <Field id="first-name" labelText="First Name *" name="first" />
          <Field id="last-name" labelText="Last Name *" name="last" />
        </div>

        <div className="location form-section">
          <Field id="city" labelText="City" name="city" />
          <div className="form-sub-section">
            <Field id="region" labelText="State/Province" name="region" />
            <Field id="zip" labelText="Zip Code" name="zip" />
          </div>
        </div>

        <div className="contact form-section">
          <Field id="email" labelText="Email *" name="email" />
          <Field id="phone" labelText="Phone" name="phone" />
        </div>
      </div>
    </div>
  );
};

export default Introduction;
