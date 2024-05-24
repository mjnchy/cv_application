import Field from "./Field";

function Introduction() {
  return (
    <div className="introduction">
      <Field id="firstName" labelText="First Name" />
      <Field id="lastName" labelText="Last Name" />
      <Field id="email" labelText="Email" />
      <Field id="phone" labelText="phone" />
    </div>
  );
};

export default Introduction;
