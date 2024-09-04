import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';

export default {
  files: ['**/*.{js,mjs,cjs,jsx}'],
  languageOptions: { globals: globals.browser },
  plugins: [pluginJs, pluginReact],
  extends: [
    pluginJs.configs.recommended,
    pluginReact.configs.recommended,
  ],
};
