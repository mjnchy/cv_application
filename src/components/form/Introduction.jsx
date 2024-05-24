import Field from "./Field";

function Introduction() {
  return (
    <div className="introduction form-page">
      <div className="name form-section">
        <Field id="firstName" labelText="First Name" />
        <Field id="lastName" labelText="Last Name" />
      </div>

      <div className="location form-section">
        <Field id="email" labelText="City" />
        <div className="form-sub-section">
          <Field id="phone" labelText="State/Province" />
          <Field id="email" labelText="Zip Code" />
        </div>
      </div>

      <div className="contact form-section">
        <Field id="email" labelText="Email" />
        <Field id="phone" labelText="Phone" />
      </div>
    </div>
  );
};

export default Introduction;
