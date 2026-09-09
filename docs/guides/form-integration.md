---
title: Form Integration
category: Guides
order: 3
icon: dynamic_form
description: Native HTML Form participation, constraint validation, and FormData integration with Form-Associated Custom Elements (FACE).
---

## Form-Associated Custom Elements (FACE)

Form controls such as `<md-text-field>`, `<md-checkbox>`, `<md-switch>`, `<md-radio>`, `<md-slider>`, `<md-date-picker>`, and `<md-time-picker>` are built using browser-native **ElementInternals**.

This means they seamlessly participate in:
- Standard HTML `<form>` submissions and resets
- Automatic value population in `new FormData(form)`
- Native constraint validation (`required`, `checkValidity()`, `reportValidity()`)
- Accessible validation states, error messages, and focus rings

## Example Form

```html
<form id="signup-form">
  <md-text-field
    name="fullname"
    label="Full Name"
    required
    supporting-text="Enter your first and last name"
  ></md-text-field>

  <md-text-field
    name="email"
    label="Email Address"
    type="email"
    required
  ></md-text-field>

  <md-slider
    name="budget"
    min="0"
    max="1000"
    step="50"
    value="250"
    labeled
  ></md-slider>

  <md-checkbox name="newsletter" checked>
    Receive monthly newsletter
  </md-checkbox>

  <md-switch name="telemetry" selected icons>
    Anonymous analytics
  </md-switch>

  <div style="margin-top: 16px; display: flex; gap: 12px;">
    <md-button type="reset" variant="outlined">Reset</md-button>
    <md-button type="submit" variant="filled">Submit Form</md-button>
  </div>
</form>
```

## JavaScript Handling

```javascript
const form = document.getElementById('signup-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  console.log('Submitted Payload:', data);
});
```

