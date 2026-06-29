import { Video, BarChart2, Shield } from 'lucide-react';

export const AUTH_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

  /* Main Wrapper */
  .auth-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Plus Jakarta Sans', 'Outfit', system-ui, sans-serif;
    color: #f3f4f6;
    padding: 24px;
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    background: transparent;
  }

  .auth-glow-accent {
    position: fixed;
    width: 70vw;
    height: 70vh;
    top: -20%;
    left: 15%;
    background: radial-gradient(circle, rgba(212,181,113,0.06) 0%, rgba(9,11,11,0) 70%);
    pointer-events: none;
    z-index: 0;
  }

  .auth-split-wrapper {
    display: flex;
    width: 100%;
    max-width: 440px;
    background: rgba(10, 11, 12, 0.88);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 20px;
    box-shadow: 
      0 30px 70px rgba(0, 0, 0, 0.7), 
      inset 0 1px 0 rgba(255, 255, 255, 0.04);
    backdrop-filter: blur(28px);
    -webkit-backdrop-filter: blur(28px);
    overflow: hidden;
    z-index: 2;
    position: relative;
    transition: border-color 0.5s ease, box-shadow 0.5s ease;
  }

  /* Dynamic hover spotlight overlay */
  .auth-split-wrapper::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(212, 181, 113, 0.06), transparent 50%);
    z-index: 1;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  .auth-split-wrapper:hover::before {
    opacity: 1;
  }

  /* Accent top line */
  .auth-top-accent {
    position: absolute;
    top: 0;
    left: 12%;
    right: 12%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(212,181,113,0.25), rgba(255,255,255,0.08), rgba(212,181,113,0.25), transparent);
    z-index: 3;
  }

  /* Left Pane (Feature / Brand) - Muted/Hidden as card is single-pane */
  .auth-left-pane {
    display: none;
  }

  /* Right Pane (Form side) */
  .auth-right-pane {
    flex: 1;
    padding: 40px 32px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    z-index: 2;
  }

  .auth-logo-mobile {
    display: block;
    height: 48px;
    width: auto;
    margin: 0 auto 16px;
    filter: drop-shadow(0 4px 8px rgba(0,0,0,0.4));
  }

  .auth-form-title {
    font-family: 'Outfit', sans-serif;
    font-size: 26px;
    font-weight: 700;
    color: #FFF;
    letter-spacing: -0.02em;
    margin: 0 0 6px;
    text-align: center;
  }

  .auth-form-sub {
    font-size: 12.5px;
    color: #7b8089;
    margin: 0 0 20px;
    text-align: center;
  }

  /* Social Buttons */
  .auth-social-group {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 20px;
  }

  .auth-social-btn {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 8px;
    color: #d1d5db;
    padding: 10px 14px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 12.5px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .auth-social-btn:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.12);
    color: #FFF;
    transform: translateY(-1px);
  }

  .auth-social-btn:active {
    transform: translateY(0);
  }

  .auth-divider {
    display: flex;
    align-items: center;
    text-align: center;
    color: rgba(255, 255, 255, 0.12);
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    margin-bottom: 20px;
    font-weight: 600;
  }

  .auth-divider::before, .auth-divider::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }

  .auth-divider:not(:empty)::before {
    margin-right: 1em;
  }

  .auth-divider:not(:empty)::after {
    margin-left: 1em;
  }

  /* Inputs & Form */
  .auth-form {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .auth-input-wrap {
    position: relative;
    width: 100%;
  }

  .auth-input {
    width: 100%;
    box-sizing: border-box;
    background: rgba(0, 0, 0, 0.25) !important;
    border: 1px solid rgba(255, 255, 255, 0.07) !important;
    border-radius: 8px !important;
    padding: 12px 16px 12px 42px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 13px;
    color: #FFF !important;
    outline: none;
    transition: all 0.25s ease;
  }

  /* Rock-solid Autofill Override */
  input:-webkit-autofill,
  input:-webkit-autofill:hover, 
  input:-webkit-autofill:focus, 
  input:-webkit-autofill:active,
  input:-internal-autofill-selected,
  input:-internal-autofill-previewed {
    -webkit-box-shadow: 0 0 0 1000px #121415 inset !important;
    -webkit-text-fill-color: #FFF !important;
    box-shadow: 0 0 0 1000px #121415 inset !important;
    text-fill-color: #FFF !important;
    caret-color: #FFF !important;
    border: 1px solid rgba(255, 255, 255, 0.08) !important;
    border-radius: 8px !important;
    font-family: 'Plus Jakarta Sans', sans-serif !important;
    font-size: 13px !important;
    color: #FFF !important;
    transition: background-color 5000s ease-in-out 0s;
  }

  .auth-input::placeholder {
    color: #4b5563;
  }

  .auth-input:focus {
    background: rgba(0, 0, 0, 0.4) !important;
    border-color: #D4B571 !important;
    box-shadow: 0 0 0 1px #D4B571, 0 0 14px rgba(212, 181, 113, 0.08) !important;
  }

  .auth-input-wrap svg.icon-left {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: #4b5563;
    transition: all 0.25s ease;
  }

  .auth-input-wrap:focus-within svg.icon-left {
    color: #D4B571;
    filter: drop-shadow(0 0 4px rgba(212, 181, 113, 0.3));
  }

  .auth-eye-btn {
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    color: #4b5563;
    transition: color 0.2s ease;
  }

  .auth-eye-btn:hover {
    color: #D4B571;
  }

  /* Checkbox and Forgot Row */
  .auth-checkbox-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 2px;
    margin-bottom: 2px;
  }

  .auth-checkbox-label {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: #8c9096;
    cursor: pointer;
    user-select: none;
  }

  .auth-checkbox {
    appearance: none;
    -webkit-appearance: none;
    width: 15px;
    height: 15px;
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 4px;
    outline: none;
    background: rgba(0, 0, 0, 0.3);
    cursor: pointer;
    position: relative;
    transition: all 0.2s ease;
  }

  .auth-checkbox:checked {
    background: #D4B571;
    border-color: #D4B571;
  }

  .auth-checkbox:checked::after {
    content: '✓';
    font-size: 10px;
    color: #090B0B;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: 800;
  }

  .auth-forgot-link {
    background: none;
    border: none;
    font-family: inherit;
    font-size: 12px;
    font-weight: 500;
    color: #D4B571;
    cursor: pointer;
    padding: 0;
    transition: all 0.2s ease;
  }

  .auth-forgot-link:hover {
    color: #E5CFA3;
    text-decoration: underline;
  }

  /* Error and Success box */
  .auth-error-box {
    background: rgba(239, 68, 68, 0.06);
    border: 1px solid rgba(239, 68, 68, 0.15);
    color: #f87171;
    padding: 10px 12px;
    border-radius: 8px;
    font-size: 12px;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
    line-height: 1.4;
  }

  .auth-success-box {
    background: rgba(16, 185, 129, 0.06);
    border: 1px solid rgba(16, 185, 129, 0.15);
    color: #34d399;
    padding: 10px 12px;
    border-radius: 8px;
    font-size: 12px;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
    line-height: 1.4;
  }

  /* Submit CTA button */
  .auth-cta-btn {
    background: #D4B571;
    border: none;
    border-radius: 8px;
    color: #090B0B;
    padding: 12px 16px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 13.5px;
    font-weight: 700;
    letter-spacing: 0.02em;
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    margin-top: 8px;
    box-shadow: 0 4px 12px rgba(212, 181, 113, 0.12);
  }

  .auth-cta-btn:hover:not(:disabled) {
    background: #E5CFA3;
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(212, 181, 113, 0.18);
  }

  .auth-cta-btn:active:not(:disabled) {
    transform: translateY(0);
  }

  .auth-cta-btn:disabled {
    opacity: 0.55;
    cursor: not-allowed;
    box-shadow: none;
  }

  /* Floating Close Button at Top Right */
  .auth-floating-close {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.06);
    color: #8c9096;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    z-index: 10;
  }

  .auth-floating-close:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(255, 255, 255, 0.15);
    color: #FFF;
    transform: rotate(90deg);
  }

  .auth-back-btn {
    background: none;
    border: none;
    color: #8c9096;
    font-family: inherit;
    font-size: 13px;
    cursor: pointer;
    margin-top: 16px;
    align-self: center;
    transition: color 0.2s ease;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .auth-back-btn:hover {
    color: #FFF;
  }

  /* Close & Footer */
  .auth-close-btn {
    background: none;
    border: none;
    color: #6b7280;
    font-size: 12px;
    cursor: pointer;
    margin-top: 16px;
    align-self: center;
    transition: color 0.2s ease;
  }

  .auth-close-btn:hover {
    color: #FFF;
  }

  .auth-footer {
    font-size: 13px;
    color: #4b5563;
    margin-top: 24px;
    text-align: center;
  }

  .auth-footer-link {
    color: #D4B571;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.2s ease;
  }

  .auth-footer-link:hover {
    color: #E5CFA3;
    text-decoration: underline;
  }

  /* Responsive Media Queries */
  @media (max-width: 840px) {
    .auth-split-wrapper {
      flex-direction: column;
      max-width: 440px;
      min-height: auto;
      margin: 20px auto;
    }
    
    .auth-left-pane {
      display: none;
    }
    
    .auth-right-pane {
      padding: 36px 24px;
    }
    
    .auth-logo-mobile {
      display: block;
    }
  }
`;

export function AppleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.19 2.31-.88 3.5-.8 1.56.06 2.89.62 3.77 1.81-3.21 1.95-2.69 6.27.68 7.62-.7 1.68-1.57 3.32-3.03 3.54zm-4.32-15.1c-.2-1.6 1.15-3.13 2.68-3.35.43 1.76-1.16 3.26-2.68 3.35z" />
    </svg>
  );
}

export function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

export function MailIcon() {
  return (
    <svg className="icon-left" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

export function LockIcon() {
  return (
    <svg className="icon-left" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

export function PersonIcon() {
  return (
    <svg className="icon-left" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export function EyeIcon({ open }) {
  return open ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function AuthLeftPane({ isLogin = true, logoSrc }) {
  return (
    <div className="auth-left-pane">
      <div>
        {logoSrc && <img src={logoSrc} alt="EtherXMeet" className="auth-left-logo" />}
        <div className="auth-badge-pill" style={{ marginTop: '4px', marginBottom: '24px' }}>
          <div className="auth-badge-dot" />
          SECURED SESSION
        </div>
        <div className="auth-left-header">
          <h2 className="auth-feature-title">
            {isLogin ? 'Welcome back.' : 'Create your account.'}
          </h2>
          <p className="auth-feature-desc">
            {isLogin ? 'Sign in to access your meetings and dashboard.' : 'Start collaborating in high-definition video rooms.'}
          </p>
        </div>
      </div>

      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', marginTop: 'auto' }}>
        EtherXMeet © 2026
      </div>
    </div>
  );
}
