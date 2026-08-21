import { css } from 'lit';

export const accountMenuStyles = css`
  :host {
    display: inline-block;
    position: relative;
    font-family: var(--md-sys-typescale-font-family, inherit);
  }

  :host([hidden]) {
    display: none;
  }

  .trigger-container {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .avatar-btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--md-account-trigger-size, 40px);
    height: var(--md-account-trigger-size, 40px);
    border-radius: var(--md-sys-shape-corner-full, 9999px);
    background-color: var(--md-sys-color-primary-container, #EADDFF);
    color: var(--md-sys-color-on-primary-container, #21005D);
    border: 2px solid transparent;
    padding: 0;
    cursor: pointer;
    outline: none;
    font-family: inherit;
    font-size: 16px;
    font-weight: 600;
    user-select: none;
    transition: box-shadow 150ms ease, transform 150ms ease, border-color 150ms ease;
    -webkit-tap-highlight-color: transparent;
    overflow: visible;
  }

  .avatar-btn:hover {
    box-shadow: 0 1px 3px 1px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.3);
    border-color: var(--md-sys-color-outline-variant, #CAC4D0);
  }

  .avatar-btn:focus-visible {
    border-color: var(--md-sys-color-primary, #6750A4);
  }

  .avatar-img {
    width: 100%;
    height: 100%;
    border-radius: var(--md-sys-shape-corner-full, 9999px);
    object-fit: cover;
  }

  .avatar-initials {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .backdrop {
    display: none;
    position: fixed;
    inset: 0;
    z-index: 990;
    background-color: transparent;
  }

  :host([modal]) .backdrop {
    background-color: rgba(0, 0, 0, 0.32);
    backdrop-filter: blur(1px);
  }

  :host([open][modal]) .backdrop {
    display: block;
  }

  .popover {
    display: none;
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    z-index: 1000;
    width: var(--md-account-menu-width, 380px);
    max-width: calc(100vw - 24px);
    height: fit-content;
    max-height: var(--md-account-menu-max-height, none);
    box-sizing: border-box;
    padding: 0;
    border-radius: var(--md-sys-shape-corner-extra-large, 28px);
    background-color: var(--md-sys-color-surface-container-high, #ECE6F0);
    color: var(--md-sys-color-on-surface, #1D1B20);
    box-shadow: var(--md-sys-elevation-level3, 0px 4px 8px 3px rgba(0, 0, 0, 0.15), 0px 1px 3px rgba(0, 0, 0, 0.3));
    overflow-y: auto;
    overflow-x: hidden;
    overscroll-behavior: contain;
    scrollbar-width: thin;
    scrollbar-color: var(--md-sys-color-outline-variant, #CAC4D0) transparent;
  }

  :host([alignment='start']) .popover,
  :host([pivot='left']) .popover {
    right: auto;
    left: 0;
  }

  :host([open]) .popover {
    display: flex;
    flex-direction: column;
    animation: md-account-menu-in 150ms cubic-bezier(0.2, 0, 0, 1) forwards;
  }

  @keyframes md-account-menu-in {
    from {
      opacity: 0;
      transform: scale(0.92) translateY(-8px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  /* Header Section */
  .popover-header {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 12px 16px 4px;
    box-sizing: border-box;
  }

  .header-leading {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
  }

  .back-btn,
  slot[name="back-button"] {
    display: none;
    --md-icon-size: 24px;
    font-size: 24px;
    flex-shrink: 0;
  }

  .popover-header .headline {
    display: none;
    margin: 0;
    font-size: var(--md-sys-typescale-title-large-size, 20px);
    font-weight: 500;
    line-height: 28px;
    color: var(--md-sys-color-on-surface, #1D1B20);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .close-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: transparent;
    border: none;
    color: var(--md-sys-color-on-surface-variant, #49454F);
    cursor: pointer;
    padding: 0;
    transition: background-color 150ms ease;
  }

  .close-btn:hover {
    background-color: var(--md-sys-color-surface-container-highest, rgba(0, 0, 0, 0.08));
    color: var(--md-sys-color-on-surface, #1D1B20);
  }

  /* Profile Card (Account Centerpiece) */
  .profile-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 8px 24px 20px;
    background-color: var(--md-sys-color-surface-container-lowest, #FFFFFF);
    margin: 8px 16px 12px;
    border-radius: var(--md-sys-shape-corner-large, 24px);
    border: 1px solid var(--md-sys-color-outline-variant, #CAC4D0);
    box-sizing: border-box;
  }

  .profile-avatar-wrapper {
    position: relative;
    margin: 12px 0 14px;
  }

  .profile-avatar {
    width: 76px;
    height: 76px;
    border-radius: 50%;
    background-color: var(--md-sys-color-primary, #6750A4);
    color: var(--md-sys-color-on-primary, #FFFFFF);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    font-weight: 600;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
    overflow: hidden;
  }

  .profile-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .avatar-edit-badge {
    position: absolute;
    bottom: -2px;
    right: -2px;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background-color: var(--md-sys-color-surface-container-highest, #E6E0E9);
    border: 2px solid var(--md-sys-color-surface-container-lowest, #FFFFFF);
    color: var(--md-sys-color-on-surface, #1D1B20);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 0;
    transition: background-color 150ms ease;
  }

  .avatar-edit-badge:hover {
    background-color: var(--md-sys-color-primary-container, #EADDFF);
    color: var(--md-sys-color-on-primary-container, #21005D);
  }

  .avatar-edit-badge md-icon {
    --md-icon-size: 16px;
    font-size: 16px;
  }

  .profile-name {
    font-size: 18px;
    font-weight: 600;
    line-height: 24px;
    color: var(--md-sys-color-on-surface, #1D1B20);
    margin: 0 0 4px;
  }

  .profile-email {
    font-size: 13px;
    color: var(--md-sys-color-on-surface-variant, #49454F);
    margin: 0 0 16px;
  }

  .manage-btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 8px 18px;
    border-radius: var(--md-sys-shape-corner-full, 9999px);
    border: 1px solid var(--md-sys-color-outline, #79747E);
    background: transparent;
    color: var(--md-sys-color-primary, #6750A4);
    font-family: inherit;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    text-decoration: none;
    transition: background-color 150ms ease, border-color 150ms ease, box-shadow 150ms ease;
    overflow: hidden;
    -webkit-tap-highlight-color: transparent;
  }

  .manage-btn:hover {
    background-color: var(--md-sys-color-primary-container, rgba(103, 80, 164, 0.08));
    border-color: var(--md-sys-color-primary, #6750A4);
  }

  /* Internal Tabs for Account Info */
  .account-tabs {
    display: flex;
    border-bottom: 1px solid var(--md-sys-color-outline-variant, #CAC4D0);
    padding: 0 16px;
    margin-bottom: 8px;
    gap: 4px;
  }

  .tab-btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 10px 8px;
    background: transparent;
    border: none;
    border-bottom: 2px solid transparent;
    color: var(--md-sys-color-on-surface-variant, #49454F);
    font-family: inherit;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    transition: color 150ms ease, border-color 150ms ease;
    outline: none;
  }

  .tab-btn:hover {
    color: var(--md-sys-color-on-surface, #1D1B20);
  }

  .tab-btn.active {
    color: var(--md-sys-color-primary, #6750A4);
    border-bottom-color: var(--md-sys-color-primary, #6750A4);
    font-weight: 600;
  }

  .tab-btn md-icon {
    --md-icon-size: 16px;
    font-size: 16px;
  }

  .tab-panel {
    display: none;
    padding: 8px 16px 14px;
    box-sizing: border-box;
  }

  .tab-panel.active {
    display: block;
    animation: tabFadeIn 150ms ease forwards;
  }

  @keyframes tabFadeIn {
    from { opacity: 0; transform: translateY(4px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* Info & Detail Rows */
  .info-card {
    background-color: var(--md-sys-color-surface-container-lowest, #FFFFFF);
    border: 1px solid var(--md-sys-color-outline-variant, #CAC4D0);
    border-radius: var(--md-sys-shape-corner-medium, 16px);
    padding: 12px 16px;
    margin-bottom: 8px;
    box-sizing: border-box;
  }

  .info-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid var(--md-sys-color-surface-container-high, #ECE6F0);
    font-size: 13px;
  }

  .info-row:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  .info-row:first-child {
    padding-top: 0;
  }

  .info-label {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--md-sys-color-on-surface-variant, #49454F);
  }

  .info-label md-icon {
    --md-icon-size: 18px;
    font-size: 18px;
    color: var(--md-sys-color-primary, #6750A4);
  }

  .info-value {
    font-weight: 500;
    color: var(--md-sys-color-on-surface, #1D1B20);
    text-align: right;
  }

  .badge-chip {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 2px 8px;
    border-radius: 100px;
    font-size: 11px;
    font-weight: 600;
    background-color: var(--md-sys-color-secondary-container, #E8DEF8);
    color: var(--md-sys-color-on-secondary-container, #1D192B);
  }

  .badge-chip.success {
    background-color: #E8F5E9;
    color: #2E7D32;
  }

  /* Storage Section */
  .storage-box {
    background-color: var(--md-sys-color-surface-container-lowest, #FFFFFF);
    border: 1px solid var(--md-sys-color-outline-variant, #CAC4D0);
    border-radius: var(--md-sys-shape-corner-medium, 16px);
    padding: 16px;
    box-sizing: border-box;
  }

  .storage-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .storage-title {
    font-size: 14px;
    font-weight: 600;
    color: var(--md-sys-color-on-surface, #1D1B20);
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .storage-title md-icon {
    --md-icon-size: 20px;
    font-size: 20px;
    color: var(--md-sys-color-primary, #6750A4);
  }

  .storage-meta {
    font-size: 13px;
    font-weight: 500;
    color: var(--md-sys-color-on-surface-variant, #49454F);
  }

  .storage-bar-track {
    width: 100%;
    height: 8px;
    border-radius: 4px;
    background-color: var(--md-sys-color-surface-container-highest, #E6E0E9);
    overflow: hidden;
    margin-bottom: 12px;
  }

  .storage-bar-fill {
    height: 100%;
    border-radius: 4px;
    background: linear-gradient(90deg, var(--md-sys-color-primary, #6750A4), var(--md-sys-color-tertiary, #7D5260));
    transition: width 300ms ease;
  }

  .storage-breakdown {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    font-size: 12px;
    color: var(--md-sys-color-on-surface-variant, #49454F);
  }

  .storage-item {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .storage-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }

  /* Multi-account switcher list */
  .accounts-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
    box-sizing: border-box;
  }

  /* Footer */
  .popover-footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding: 12px 16px 16px;
    border-top: 1px solid var(--md-sys-color-outline-variant, #CAC4D0);
    box-sizing: border-box;
  }

  .signout-btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    padding: 10px 16px;
    border-radius: var(--md-sys-shape-corner-full, 9999px);
    background-color: var(--md-sys-color-surface-container-highest, #E6E0E9);
    border: 1px solid var(--md-sys-color-outline-variant, #CAC4D0);
    color: var(--md-sys-color-on-surface, #1D1B20);
    font-family: inherit;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 150ms ease, color 150ms ease;
    overflow: hidden;
    -webkit-tap-highlight-color: transparent;
  }

  .signout-btn:hover {
    background-color: var(--md-sys-color-error-container, #F9DEDC);
    color: var(--md-sys-color-on-error-container, #410E0B);
    border-color: var(--md-sys-color-error, #B3261E);
  }

  .signout-btn md-icon {
    --md-icon-size: 18px;
    font-size: 18px;
  }

  .footer-links {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    font-size: 11px;
    color: var(--md-sys-color-on-surface-variant, #49454F);
  }

  .footer-links a {
    color: inherit;
    text-decoration: none;
  }

  .footer-links a:hover {
    text-decoration: underline;
    color: var(--md-sys-color-primary, #6750A4);
  }

  .footer-dot {
    opacity: 0.5;
  }

  /* Responsive Fullscreen / Mobile Mode */
  @media (max-width: 768px) {
    .back-btn,
    slot[name="back-button"] {
      display: inline-flex;
    }

    .popover-header .headline {
      display: block;
    }

    .popover-header {
      justify-content: space-between;
      min-height: 48px;
      padding: 12px 16px 8px;
    }

    :host([open]) .popover {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100vw;
      max-width: 100vw;
      height: 100vh;
      height: 100dvh;
      max-height: 100vh;
      max-height: 100dvh;
      border-radius: 0;
      box-shadow: none;
      z-index: 10000;
      padding: 0 0 env(safe-area-inset-bottom, 16px) 0;
      margin: 0;
      animation: md-account-menu-mobile-in 200ms cubic-bezier(0.2, 0, 0, 1) forwards;
    }

    .profile-card {
      margin: 4px 16px 12px;
    }
  }

  @keyframes md-account-menu-mobile-in {
    from {
      opacity: 0;
      transform: translateY(12px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Explicit Fullscreen Mode */
  :host([fullscreen]) .back-btn,
  :host([fullscreen]) slot[name="back-button"] {
    display: inline-flex;
  }

  :host([fullscreen]) .popover-header .headline {
    display: block;
  }

  :host([fullscreen]) .popover-header {
    justify-content: space-between;
    min-height: 48px;
    padding: 12px 16px 8px;
  }

  :host([fullscreen][open]) .popover {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    max-width: 100vw;
    height: 100vh;
    height: 100dvh;
    max-height: 100vh;
    max-height: 100dvh;
    border-radius: 0;
    box-shadow: none;
    z-index: 10000;
    padding: 0 0 env(safe-area-inset-bottom, 16px) 0;
    margin: 0;
  }

  :host([fullscreen]) .profile-card {
    margin: 4px 16px 12px;
  }
`;

export const accountItemStyles = css`
  :host {
    display: block;
    box-sizing: border-box;
    font-family: var(--md-sys-typescale-font-family, inherit);
  }

  :host([hidden]) {
    display: none;
  }

  .item {
    position: relative;
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    padding: 10px 12px;
    border-radius: var(--md-sys-shape-corner-medium, 14px);
    background: transparent;
    border: none;
    color: var(--md-sys-color-on-surface, #1D1B20);
    text-align: left;
    cursor: pointer;
    font-family: inherit;
    text-decoration: none;
    transition: background-color 150ms ease;
    box-sizing: border-box;
    outline: none;
    -webkit-tap-highlight-color: transparent;
  }

  .item:hover {
    background-color: var(--md-sys-color-surface-container-highest, rgba(0, 0, 0, 0.06));
  }

  :host([active]) .item {
    background-color: var(--md-sys-color-secondary-container, #E8DEF8);
    color: var(--md-sys-color-on-secondary-container, #1D192B);
  }

  :host([disabled]) .item {
    opacity: 0.38;
    cursor: not-allowed;
    pointer-events: none;
  }

  .item-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: var(--md-sys-color-primary-container, #EADDFF);
    color: var(--md-sys-color-on-primary-container, #21005D);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 600;
    flex-shrink: 0;
    overflow: hidden;
  }

  .item-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .item-content {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
  }

  .item-name {
    font-size: 13.5px;
    font-weight: 500;
    color: var(--md-sys-color-on-surface, #1D1B20);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .item-email {
    font-size: 12px;
    color: var(--md-sys-color-on-surface-variant, #49454F);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .item-trailing {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
  }

  .check-icon {
    color: var(--md-sys-color-primary, #6750A4);
    font-size: 20px;
  }

  .action-icon {
    color: var(--md-sys-color-on-surface-variant, #49454F);
    font-size: 20px;
  }
`;

