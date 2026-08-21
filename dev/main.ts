import '../src/index.js';

// Simple theme toggle helper
const toggleBtn = document.getElementById('theme-toggle');
if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  });
}

// Dialog opener helper
const openDialogBtn = document.getElementById('open-dialog-btn');
const dialog = document.getElementById('demo-dialog') as any;
if (openDialogBtn && dialog) {
  openDialogBtn.addEventListener('click', () => {
    dialog.show();
  });
}

const closeDialogBtn = document.getElementById('close-dialog-btn');
if (closeDialogBtn && dialog) {
  closeDialogBtn.addEventListener('click', () => {
    dialog.close();
  });
}

// Snackbar opener helper
const openSnackbarBtn = document.getElementById('open-snackbar-btn');
const snackbar = document.getElementById('demo-snackbar') as any;
if (openSnackbarBtn && snackbar) {
  openSnackbarBtn.addEventListener('click', () => {
    snackbar.show();
  });
}

