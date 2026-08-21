# Form Integration

`@francofantomius/material-components` controls (`md-text-field`, `md-checkbox`, `md-switch`, `md-radio`) are **Form-Associated Custom Elements (FACE)**.

They participate directly in native HTML `<form>` submission, constraint validation, and `FormData`.

## Example

```html
<form id="signup-form">
  <md-text-field
    name="username"
    label="Username"
    required
    supporting-text="Choose a unique name"
  ></md-text-field>

  <md-text-field
    name="email"
    label="Email"
    type="email"
    required
  ></md-text-field>

  <md-checkbox name="agree" required>
    I agree to the terms
  </md-checkbox>

  <md-button type="submit" variant="filled">
    Register
  </md-button>
</form>
```

```typescript
const form = document.getElementById('signup-form') as HTMLFormElement;

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  console.log('Form data:', Object.fromEntries(formData.entries()));
});
```

## Validation APIs

Each input exposes standard HTML validity methods:
- `element.checkValidity()`
- `element.reportValidity()`
- `element.validity` (`ValidityState`)
- `element.validationMessage`

