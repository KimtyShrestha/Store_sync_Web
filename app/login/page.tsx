// "use client";

// import { useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";

// export default function LoginPage() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMsg, setErrorMsg] = useState("");

//   const handleLogin = async () => {
//     try {
//       await axios.post(
//     "http://localhost:5050/api/auth/login",
//      { email, password },
//     { withCredentials: true }  // VERY IMPORTANT
//     );

//       router.push("/owner/dashboard");
//     } catch (error: any) {
//       if (error.response?.status === 403) {
//         setErrorMsg("Your account is pending approval.");
//       } else if (error.response?.status === 401) {
//         setErrorMsg("Invalid email or password.");
//       } else {
//         setErrorMsg("Login failed.");
//       }
//     }
//   };

//   return (
//     <div style={{ padding: 100, color: "white" }}>
//       <h2>Login</h2>

//       <input
//         placeholder="Email"
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         onChange={(e) => setPassword(e.target.value)}
//       />

//       <button onClick={handleLogin}>Login</button>

//       {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    setErrorMsg("");
    try {
      await axios.post(
        "http://localhost:5050/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      router.push("/owner/dashboard");
    } catch (error: any) {
      if (error.response?.status === 403) {
        setErrorMsg("Your account is pending approval.");
      } else if (error.response?.status === 401) {
        setErrorMsg("Invalid email or password.");
      } else {
        setErrorMsg("Login failed.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .login-root {
          font-family: 'Plus Jakarta Sans', sans-serif;
          min-height: 100vh;
          display: flex;
          background: #f0f2f5;
        }

        /* Left panel */
        .login-left {
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

        .login-left::before {
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

        .login-left::after {
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

        /* Decorative grid lines */
        .grid-lines {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }

        .left-content {
          position: relative;
          z-index: 1;
          text-align: center;
        }

        /* Logo */
        .logo-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 48px;
          justify-content: center;
        }

        .logo-icon {
          width: 40px;
          height: 40px;
        }

        .logo-name {
          font-size: 22px;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.3px;
        }

        /* Illustration area */
        .illustration {
          width: 240px;
          height: 200px;
          margin: 0 auto 40px;
          position: relative;
        }

        .ill-card {
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 14px;
          padding: 16px 20px;
          color: white;
          text-align: left;
          backdrop-filter: blur(4px);
        }

        .ill-card-main {
          position: absolute;
          top: 20px;
          left: 10px;
          right: 10px;
        }

        .ill-card-label {
          font-size: 10px;
          color: rgba(255,255,255,0.5);
          font-weight: 500;
          margin-bottom: 4px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .ill-card-value {
          font-size: 20px;
          font-weight: 700;
          color: #ffffff;
        }

        .ill-card-badge {
          display: inline-flex;
          align-items: center;
          gap: 3px;
          font-size: 10px;
          font-weight: 600;
          color: #22c55e;
          margin-top: 4px;
        }

        .ill-card-badge.red {
          color: #ef4444;
        }

        .ill-bars {
          display: flex;
          align-items: flex-end;
          gap: 5px;
          margin-top: 12px;
          height: 36px;
        }

        .ill-bar {
          flex: 1;
          background: rgba(220,38,38,0.5);
          border-radius: 3px;
        }

        .ill-card-mini {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 120px;
        }

        .ill-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #dc2626;
          display: inline-block;
          margin-right: 6px;
        }

        /* Tagline */
        .left-tagline {
          font-size: 26px;
          font-weight: 800;
          color: #ffffff;
          line-height: 1.3;
          margin-bottom: 12px;
        }

        .left-tagline span {
          color: #dc2626;
        }

        .left-sub {
          font-size: 14px;
          color: rgba(255,255,255,0.45);
          line-height: 1.6;
        }

        /* Right panel */
        .login-right {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 24px;
        }

        .login-card {
          background: #ffffff;
          border-radius: 20px;
          padding: 44px 40px;
          width: 100%;
          max-width: 420px;
          box-shadow: 0 4px 40px rgba(0,0,0,0.08);
        }

        .card-header {
          margin-bottom: 32px;
        }

        .card-title {
          font-size: 26px;
          font-weight: 800;
          color: #0f1c2e;
          margin-bottom: 6px;
          letter-spacing: -0.5px;
        }

        .card-subtitle {
          font-size: 14px;
          color: #8b95a1;
          font-weight: 400;
        }

        /* Form fields */
        .field-group {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 24px;
        }

        .field-label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: #374151;
          margin-bottom: 7px;
        }

        .field-input-wrap {
          position: relative;
        }

        .field-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
          pointer-events: none;
        }

        .field-input {
          width: 100%;
          padding: 12px 14px 12px 42px;
          border: 1.5px solid #e5e7eb;
          border-radius: 10px;
          font-size: 14px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          color: #111827;
          background: #f9fafb;
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
        }

        .field-input:focus {
          border-color: #dc2626;
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(220,38,38,0.08);
        }

        .field-input::placeholder {
          color: #c4c9d4;
        }

        /* Error */
        .error-box {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 9px;
          padding: 11px 14px;
          margin-bottom: 20px;
          font-size: 13px;
          font-weight: 500;
          color: #dc2626;
        }

        /* Login button */
        .login-btn {
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
          transition: background 0.2s, transform 0.1s, box-shadow 0.2s;
          box-shadow: 0 4px 14px rgba(220,38,38,0.30);
          position: relative;
          overflow: hidden;
        }

        .login-btn:hover:not(:disabled) {
          background: #b91c1c;
          box-shadow: 0 6px 20px rgba(220,38,38,0.38);
          transform: translateY(-1px);
        }

        .login-btn:active:not(:disabled) {
          transform: translateY(0);
        }

        .login-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .btn-spinner {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2.5px solid rgba(255,255,255,0.4);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          vertical-align: middle;
          margin-right: 8px;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Footer */
        .card-footer {
          margin-top: 28px;
          text-align: center;
          font-size: 12px;
          color: #9ca3af;
        }

        /* Responsive */
        @media (max-width: 700px) {
          .login-left { display: none; }
          .login-root { background: #f0f2f5; }
        }
      `}</style>

      <div className="login-root">
        {/* Left decorative panel */}
        <div className="login-left">
          <div className="grid-lines" />
          <div className="left-content">
            {/* Logo — pure red triangle, no background box */}
            <div className="logo-wrap">
              <svg
                className="logo-icon"
                viewBox="0 0 40 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ filter: 'drop-shadow(0 2px 8px rgba(220,38,38,0.55))' }}
              >
                <polygon points="20,2 38,34 2,34" fill="#dc2626" />
              </svg>
              <span className="logo-name">Store Sync</span>
            </div>

            {/* Mini dashboard illustration */}
            <div className="illustration">
              <div className="ill-card ill-card-main">
                <div className="ill-card-label">Total Revenue</div>
                <div className="ill-card-value">NRS 1,24,560</div>
                <div className="ill-card-badge">▲ +12.5%</div>
                <div className="ill-bars">
                  {[55, 75, 45, 80, 65, 90, 70].map((h, i) => (
                    <div key={i} className="ill-bar" style={{ height: `${h}%`, opacity: 0.4 + i * 0.08 }} />
                  ))}
                </div>
              </div>
              <div className="ill-card ill-card-mini">
                <div className="ill-card-label">
                  <span className="ill-dot" />Net Profit
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'white' }}>NRS 45,830</div>
                <div className="ill-card-badge">▲ +8.2%</div>
              </div>
            </div>

            <div className="left-tagline">
              Manage your store<br />with <span>precision</span>
            </div>
            <div className="left-sub">
              Real-time sales, inventory &amp; reports<br />all in one place.
            </div>
          </div>
        </div>

        {/* Right login form */}
        <div className="login-right">
          <div className="login-card">
            <div className="card-header">
              <div className="card-title">Welcome back </div>
              <div className="card-subtitle">Sign in to your  Store  Sync account</div>
            </div>

            <div className="field-group">
              <div>
                <label className="field-label">Email address</label>
                <div className="field-input-wrap">
                  <svg className="field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  <input
                    className="field-input"
                    type="email"
                    placeholder="you@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="field-label">Password</label>
                <div className="field-input-wrap">
                  <svg className="field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  <input
                    className="field-input"
                    type="password"
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {errorMsg && (
              <div className="error-box">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {errorMsg}
              </div>
            )}

            <button className="login-btn" onClick={handleLogin} disabled={isLoading}>
              {isLoading ? (
                <><span className="btn-spinner" />Signing in...</>
              ) : (
                "Sign In"
              )}
            </button>

            <div className="card-footer">
              © {new Date().getFullYear()} Store Sync · All rights reserved
            </div>
          </div>
        </div>
      </div>
    </>
  );
}