import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Check, Eye, EyeOff } from "lucide-react";
import "../styles/reset-password.css";

const rules = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { label: "Uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { label: "Lowercase letter", test: (p: string) => /[a-z]/.test(p) },
  { label: "Number", test: (p: string) => /[0-9]/.test(p) },
  { label: "Special character", test: (p: string) => /[^A-Za-z0-9]/.test(p) },
];

const isValid = (p: string) => rules.every((r) => r.test(p));
const isLongEnough = (p: string) => p.length >= 8;

function GreenCheck() {
  return (
    <span
      style={{
        position: "absolute",
        right: 40,
        top: "50%",
        transform: "translateY(-50%)",
        color: "#4ade80",
        display: "flex",
        alignItems: "center",
        animation: "checkPop .3s cubic-bezier(.34,1.56,.64,1) both",
        pointerEvents: "none",
      }}
    >
      <Check size={15} strokeWidth={2.5} />
    </span>
  );
}

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showCf, setShowCf] = useState(false);
  const [pwFocused, setPwFocused] = useState(false);
  const [cfFocused, setCfFocused] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const pwValid = isValid(password);
  const cfValid = confirm.length > 0 && confirm === password;
  const canSubmit = pwValid && cfValid;

  const showRules = pwFocused || (password.length > 0 && !pwValid);
  const showCfHint = cfFocused || (confirm.length > 0 && !cfValid);

  useEffect(() => {
    if (isLongEnough(password)) setShowConfirm(true);
    else {
      setShowConfirm(false);
      setConfirm("");
    }
  }, [password]);

  const handleReset = async () => {
    setError("");
    if (!canSubmit) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.properform.app/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        },
      );
      const data = await res.json();
      if (!res.ok) setError(data.message || data.error || "Reset failed.");
      else setSuccess(true);
    } catch {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  };

  // border color helper
  const getBorder = (value: string, valid: boolean, focused: boolean) => {
    if (value.length > 0 && !valid) return "1.5px solid rgba(239,68,68,.6)";
    if (valid) return "1.5px solid rgba(74,222,128,.5)";
    if (focused) return "1.5px solid rgba(31,58,138,.7)";
    return "1.5px solid rgba(255,255,255,.08)";
  };

  const getGlow = (value: string, valid: boolean, focused: boolean) => {
    if (value.length > 0 && !valid) return "0 0 0 3px rgba(239,68,68,.08)";
    if (valid) return "0 0 0 3px rgba(74,222,128,.07)";
    if (focused) return "0 0 0 3px rgba(31,58,138,.18)";
    return "none";
  };

  const getBg = (value: string, valid: boolean) => {
    if (value.length > 0 && !valid) return "rgba(239,68,68,.04)";
    if (valid) return "rgba(74,222,128,.04)";
    return "rgba(255,255,255,.03)";
  };

  if (success) {
    return (
      <>
        <div className="rp-page">
          <Grain />
          <div
            className="rp-card rp-card-enter"
            style={{ textAlign: "center", gap: 0 }}
          >
            <div className="rp-success-ring">
              <div className="rp-success-icon">
                <Check size={22} strokeWidth={2.5} color="#fff" />
              </div>
            </div>
            <h1 className="rp-heading" style={{ marginTop: 24 }}>
              Password updated
            </h1>
            <p className="rp-sub" style={{ marginBottom: 0 }}>
              Your password has been successfully reset.
            </p>
            <p>
              <a href="/login">Go back to Login</a>
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="rp-page">
        <Grain />

        <div className="rp-card rp-card-enter">
          {/* Brand */}
          <div className="rp-brand-row">
            <span className="rp-dot" />
            <span className="rp-brand-name">ProPerform</span>
          </div>

          {/* Heading */}
          <div style={{ marginBottom: 32 }}>
            <h1 className="rp-heading">Reset password</h1>
            <p className="rp-sub">
              Choose a strong new password for your account.
            </p>
          </div>

          {/* ── Password input ── */}
          <div className="rp-field">
            <label className="rp-label">New password</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPw ? "text" : "password"}
                className="rp-input"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPwFocused(true)}
                onBlur={() => setPwFocused(false)}
                style={{
                  border: getBorder(password, pwValid, pwFocused),
                  boxShadow: getGlow(password, pwValid, pwFocused),
                  background: getBg(password, pwValid),
                  paddingRight: 72,
                }}
              />
              <button
                className="rp-eye"
                onClick={() => setShowPw((v) => !v)}
                tabIndex={-1}
              >
                {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
              {pwValid && <GreenCheck />}
            </div>

            {/* Rules panel */}
            <div
              className={`rp-rules-wrap ${showRules ? "rp-rules-open" : ""}`}
            >
              <div className="rp-rules-box rp-rules-error">
                {rules.map((r) => {
                  const ok = r.test(password);
                  return (
                    <div
                      key={r.label}
                      className={`rp-rule ${ok ? "rp-rule-ok" : ""}`}
                    >
                      <span className="rp-rule-bullet" />
                      {r.label}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Confirm input (slides in) ── */}
          <div className={`rp-slide ${showConfirm ? "rp-slide-open" : ""}`}>
            <div className="rp-field">
              <label className="rp-label">Retype password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showCf ? "text" : "password"}
                  className="rp-input"
                  placeholder="Repeat your password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  onFocus={() => setCfFocused(true)}
                  onBlur={() => setCfFocused(false)}
                  style={{
                    border: getBorder(confirm, cfValid, cfFocused),
                    boxShadow: getGlow(confirm, cfValid, cfFocused),
                    background: getBg(confirm, cfValid),
                    paddingRight: 72,
                  }}
                />
                <button
                  className="rp-eye"
                  onClick={() => setShowCf((v) => !v)}
                  tabIndex={-1}
                >
                  {showCf ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
                {cfValid && <GreenCheck />}
              </div>

              {/* Match hint */}
              <div
                className={`rp-rules-wrap ${showCfHint ? "rp-rules-open" : ""}`}
              >
                <div className="rp-rules-box rp-rules-error">
                  <div className={`rp-rule ${cfValid ? "rp-rule-ok" : ""}`}>
                    <span className="rp-rule-bullet" />
                    Passwords must match
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Error */}
          {error && <div className="rp-error">{error}</div>}

          {/* Button */}
          <button
            className="rp-btn"
            onClick={handleReset}
            disabled={loading || !canSubmit}
            style={{ opacity: !canSubmit && !loading ? 0.35 : 1 }}
          >
            {loading ? <span className="rp-spinner" /> : "Reset password"}
          </button>
        </div>
      </div>
    </>
  );
}

function Grain() {
  return (
    <svg
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity: 0.03,
        zIndex: 0,
      }}
    >
      <filter id="grain">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.65"
          numOctaves="3"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
  );
}
