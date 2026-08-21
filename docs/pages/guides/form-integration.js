export default {
  id: 'form-integration',
  title: 'Form Integration',
  category: 'Guides',
  summary: 'Native HTML Form participation, constraint validation, and FormData integration with Form-Associated Custom Elements (FACE).',
  contentHtml: `
      <h2>Form-Associated Custom Elements (FACE)</h2>
      <p>Controls such as <code>&lt;md-text-field&gt;</code>, <code>&lt;md-checkbox&gt;</code>, <code>&lt;md-switch&gt;</code>, and <code>&lt;md-radio&gt;</code> are built using browser-native <strong>ElementInternals</strong>.</p>
      <p>This means they seamlessly participate in:</p>
      <ul>
        <li>Standard HTML <code>&lt;form&gt;</code> submissions and resets</li>
        <li>Automatic population in <code>new FormData(form)</code></li>
        <li>Native constraint validation (<code>required</code>, <code>checkValidity()</code>, <code>reportValidity()</code>)</li>
        <li>Accessible validation states and focus rings</li>
      </ul>

      <h2>Example Form</h2>
      <pre><code class="language-html">&lt;form id="signup-form"&gt;
  &lt;md-text-field
    name="fullname"
    label="Full Name"
    required
    supporting-text="Enter your first and last name"
  &gt;&lt;/md-text-field&gt;

  &lt;md-text-field
    name="email"
    label="Email Address"
    type="email"
    required
  &gt;&lt;/md-text-field&gt;

  &lt;md-checkbox name="newsletter" checked&gt;
    Receive monthly newsletter
  &lt;/md-checkbox&gt;

  &lt;md-switch name="telemetry" selected icons&gt;
    Anonymous analytics
  &lt;/md-switch&gt;

  &lt;div style="margin-top: 16px; display: flex; gap: 12px;"&gt;
    &lt;md-button type="reset" variant="outlined"&gt;Reset&lt;/md-button&gt;
    &lt;md-button type="submit" variant="filled"&gt;Submit Form&lt;/md-button&gt;
  &lt;/div&gt;
&lt;/form&gt;</code></pre>

      <h2>JavaScript Handling</h2>
      <pre><code class="language-javascript">const form = document.getElementById('signup-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  console.log('Submitted Payload:', data);
});</code></pre>
    `
};

