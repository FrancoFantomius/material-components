export default {
  id: 'text-field',
  title: 'Text Field',
  icon: 'text_fields',
  tag: 'md-text-field',
  category: 'Inputs & Controls',
  description: 'Text fields allow users to enter and edit text, supporting filled and outlined variants, floating labels, validation states, and prefix/suffix text.',
  subpath: '@francofantomius/material-components/text-field',
  interactiveType: 'text-field',
  properties: [
    { name: 'variant', type: "'filled' | 'outlined'", default: "'filled'", description: 'Container visual style' },
    { name: 'label', type: 'string', default: "''", description: 'Floating label text' },
    { name: 'value', type: 'string', default: "''", description: 'Current input value' },
    { name: 'type', type: 'string', default: "'text'", description: 'Input type (text, email, password, number, etc.)' },
    { name: 'placeholder', type: 'string', default: "''", description: 'Placeholder displayed when focused' },
    { name: 'prefix-text', type: 'string', default: "''", description: 'Affix text before the value' },
    { name: 'suffix-text', type: 'string', default: "''", description: 'Affix text after the value' },
    { name: 'supporting-text', type: 'string', default: "''", description: 'Helper text below the field' },
    { name: 'error', type: 'boolean', default: 'false', description: 'Forces input into error visual state' },
    { name: 'error-text', type: 'string', default: "''", description: 'Error message shown when error is true' },
    { name: 'leading-icon', type: 'string', default: "''", description: 'Material Symbols leading icon' },
    { name: 'trailing-icon', type: 'string', default: "''", description: 'Material Symbols trailing icon' },
    { name: 'maxlength', type: 'number', default: '-1', description: 'Maximum character length with visual counter' },
    { name: 'required', type: 'boolean', default: 'false', description: 'Form validation required constraint' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables user input' },
    { name: 'readonly', type: 'boolean', default: 'false', description: 'Prevents text editing' }
  ],
  examples: [
    {
      title: 'Filled and Outlined Variants',
      description: 'Text field styling options with floating labels.',
      html: `<md-text-field label="Full Name" supporting-text="Your legal name"></md-text-field>
<md-text-field variant="outlined" label="Email Address" type="email" leading-icon="mail"></md-text-field>`
    },
    {
      title: 'Prefix, Suffix, and Character Counter',
      description: 'Input affixes and maxlength character counter.',
      html: `<md-text-field variant="outlined" label="Price" prefix-text="$" suffix-text=".00" value="99"></md-text-field>
<md-text-field variant="outlined" label="Bio" maxlength="50" supporting-text="Max 50 characters"></md-text-field>`
    },
    {
      title: 'Validation Error State',
      description: 'Visual feedback for invalid form entries.',
      html: `<md-text-field variant="outlined" label="Password" type="password" error error-text="Password must be at least 8 characters" value="pass"></md-text-field>`
    }
  ]
};

