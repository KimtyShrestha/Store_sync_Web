"use client";

import { useState } from "react";
import axios from "axios";

export default function RegisterPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    setIsLoading(true);
    setMessage("");
    try {
      const res = await axios.post(
        "http://localhost:5050/api/auth/register",
        {
          ...form,
          role: "owner",
        }
      );

      setIsSuccess(true);
      setMessage("Registration successful. Awaiting approval.");
      console.log(res.data);
    } catch (error: any) {
      console.log(error.response?.data);
      setIsSuccess(false);
      setMessage(error.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        *, *::before, *::after {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .rg-root {
          font-family: 'Plus Jakarta Sans', sans-serif;
          min-height: 100vh;
          display: flex;
          background: #f0f2f5;
        }

        /* ── LEFT PANEL ── */
        .rg-left {
          width: 420px;
          min-height: 100vh;
          background: #0f1c2e;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 48px 40px;
          position: relative;
          overflow: hidden;
          flex-shrink: 0;
        }

        .rg-left::before {
          content: '';
          position: absolute;
          top: -120px;
          left: -80px;
          width: 320px;
          height: 320px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(220,38,38,0.15) 0%, transparent 70%);
          pointer-events: none;
        }

        .rg-left::after {
          content: '';
          position: absolute;
          bottom: -80px;
          right: -60px;
          width: 260px;
          height: 260px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(220,38,38,0.10) 0%, transparent 70%);
          pointer-events: none;
        }

        .rg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }

        .rg-left-content {
          position: relative;
          z-index: 1;
          text-align: center;
          width: 100%;
        }

        /* Logo */
        .rg-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 52px;
          justify-content: center;
        }

        .rg-logo-name {
          font-size: 22px;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.3px;
        }

        /* Steps list */
        .rg-steps {
          text-align: left;
          margin-bottom: 48px;
        }

        .rg-steps-title {
          font-size: 13px;
          font-weight: 600;
          color: rgba(255,255,255,0.35);
          letter-spacing: 1.2px;
          text-transform: uppercase;
          margin-bottom: 20px;
        }

        .rg-step {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          margin-bottom: 20px;
        }

        .rg-step-num {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: rgba(220,38,38,0.15);
          border: 1px solid rgba(220,38,38,0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 700;
          color: #dc2626;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .rg-step-num.done {
          background: #dc2626;
          border-color: #dc2626;
          color: white;
        }

        .rg-step-body {}

        .rg-step-label {
          font-size: 13.5px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 2px;
        }

        .rg-step-sub {
          font-size: 12px;
          color: rgba(255,255,255,0.35);
        }

        /* Tagline */
        .rg-tagline {
          font-size: 24px;
          font-weight: 800;
          color: #ffffff;
          line-height: 1.3;
          margin-bottom: 10px;
        }

        .rg-tagline span {
          color: #dc2626;
        }

        .rg-sub {
          font-size: 13.5px;
          color: rgba(255,255,255,0.4);
          line-height: 1.6;
        }

        /* ── RIGHT PANEL ── */
        .rg-right {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 24px;
        }

        .rg-card {
          background: #ffffff;
          border-radius: 20px;
          padding: 44px 40px;
          width: 100%;
          max-width: 460px;
          box-shadow: 0 4px 40px rgba(0,0,0,0.08);
        }

        .rg-card-header {
          margin-bottom: 30px;
        }

        .rg-card-title {
          font-size: 26px;
          font-weight: 800;
          color: #0f1c2e;
          margin-bottom: 6px;
          letter-spacing: -0.5px;
        }

        .rg-card-sub {
          font-size: 14px;
          color: #8b95a1;
          font-weight: 400;
        }

        /* Name row */
        .rg-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-bottom: 14px;
        }

        .rg-field {
          margin-bottom: 14px;
        }

        .rg-field:last-of-type {
          margin-bottom: 0;
        }

        .rg-label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: #374151;
          margin-bottom: 7px;
        }

        .rg-input-wrap {
          position: relative;
        }

        .rg-input-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
          pointer-events: none;
          display: flex;
        }

        .rg-input {
          width: 100%;
          padding: 11px 14px 11px 42px;
          border: 1.5px solid #e5e7eb;
          border-radius: 10px;
          font-size: 14px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          color: #111827;
          background: #f9fafb;
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
        }

        .rg-input:focus {
          border-color: #dc2626;
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(220,38,38,0.08);
        }

        .rg-input::placeholder {
          color: #c4c9d4;
        }

        /* Message */
        .rg-message {
          display: flex;
          align-items: center;
          gap: 8px;
          border-radius: 9px;
          padding: 11px 14px;
          margin-top: 18px;
          font-size: 13px;
          font-weight: 500;
        }

        .rg-message.error {
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #dc2626;
        }

        .rg-message.success {
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          color: #15803d;
        }

        /* Button */
        .rg-btn {
          width: 100%;
          padding: 13px;
          background: #dc2626;
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 700;
          font-family: 'Plus Jakarta Sans', sans-serif;
          cursor: pointer;
          letter-spacing: 0.2px;
          margin-top: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background 0.2s, transform 0.1s, box-shadow 0.2s;
          box-shadow: 0 4px 14px rgba(220,38,38,0.30);
        }

        .rg-btn:hover:not(:disabled) {
          background: #b91c1c;
          box-shadow: 0 6px 20px rgba(220,38,38,0.38);
          transform: translateY(-1px);
        }

        .rg-btn:active:not(:disabled) {
          transform: translateY(0);
        }

        .rg-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .rg-spinner {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2.5px solid rgba(255,255,255,0.4);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          flex-shrink: 0;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .rg-login-link {
          margin-top: 20px;
          text-align: center;
          font-size: 13px;
          color: #8b95a1;
        }

        .rg-login-link a {
          color: #dc2626;
          font-weight: 600;
          text-decoration: none;
        }

        .rg-login-link a:hover {
          text-decoration: underline;
        }

        .rg-footer {
          margin-top: 16px;
          text-align: center;
          font-size: 12px;
          color: #9ca3af;
        }

        @media (max-width: 700px) {
          .rg-left { display: none; }
          .rg-root { background: #f0f2f5; }
          .rg-row { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="rg-root">

        {/* ── LEFT ── */}
        <div className="rg-left">
          <div className="rg-grid" />
          <div className="rg-left-content">

            {/* Logo */}
            <div className="rg-logo">
              <svg
                viewBox="0 0 40 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: 36, height: 36, filter: 'drop-shadow(0 2px 8px rgba(220,38,38,0.55))' }}
              >
                <polygon points="20,2 38,34 2,34" fill="#dc2626" />
              </svg>
              <span className="rg-logo-name">Store Sync</span>
            </div>

            {/* How it works */}
            <div className="rg-steps">
              <div className="rg-steps-title">How it works</div>

              <div className="rg-step">
                <div className="rg-step-num done">✓</div>
                <div className="rg-step-body">
                  <div className="rg-step-label">Create your account</div>
                  <div className="rg-step-sub">Fill in your details below</div>
                </div>
              </div>

              <div className="rg-step">
                <div className="rg-step-num">2</div>
                <div className="rg-step-body">
                  <div className="rg-step-label">Await admin approval</div>
                  <div className="rg-step-sub">We review all new store owners</div>
                </div>
              </div>

              <div className="rg-step">
                <div className="rg-step-num">3</div>
                <div className="rg-step-body">
                  <div className="rg-step-label">Access your dashboard</div>
                  <div className="rg-step-sub">Manage sales, stock &amp; reports</div>
                </div>
              </div>
            </div>

            <div className="rg-tagline">
              Start syncing your<br />store <span>today.</span>
            </div>
            <div className="rg-sub">
              Real-time sales, inventory &amp; reports<br />all in one place.
            </div>

          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="rg-right">
          <div className="rg-card">

            <div className="rg-card-header">
              <div className="rg-card-title">Create an account</div>
              <div className="rg-card-sub">Register as a store owner — approval required.</div>
            </div>

            {/* First + Last name */}
            <div className="rg-row">
              <div>
                <label className="rg-label">First name</label>
                <div className="rg-input-wrap">
                  <span className="rg-input-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  </span>
                  <input
                    className="rg-input"
                    placeholder="Kimti"
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="rg-label">Last name</label>
                <div className="rg-input-wrap">
                  <span className="rg-input-icon">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  </span>
                  <input
                    className="rg-input"
                    placeholder="Shrestha"
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="rg-field">
              <label className="rg-label">Email address</label>
              <div className="rg-input-wrap">
                <span className="rg-input-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </span>
                <input
                  className="rg-input"
                  type="email"
                  placeholder="you@example.com"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>

            {/* Password */}
            <div className="rg-field">
              <label className="rg-label">Password</label>
              <div className="rg-input-wrap">
                <span className="rg-input-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </span>
                <input
                  className="rg-input"
                  type="password"
                  placeholder="••••••••"
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </div>
            </div>

            {/* Message */}
            {message && (
              <div className={`rg-message ${isSuccess ? "success" : "error"}`}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  {isSuccess ? (
                    <><polyline points="20 6 9 17 4 12"/></>
                  ) : (
                    <><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>
                  )}
                </svg>
                {message}
              </div>
            )}

            {/* Submit */}
            <button className="rg-btn" onClick={handleRegister} disabled={isLoading}>
              {isLoading ? (
                <><span className="rg-spinner" />Creating account...</>
              ) : (
                "Create Account"
              )}
            </button>

            <div className="rg-login-link">
              Already have an account? <a href="/login">Sign in</a>
            </div>

            <div className="rg-footer">
              © {new Date().getFullYear()} Store Sync · All rights reserved
            </div>

          </div>
        </div>

      </div>
    </>
  );
}