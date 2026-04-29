// Submitted confirmation screen — shown after the user clicks "Submit application".

function HFSubmitted({ onGoHome }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 24px', textAlign: 'center' }}>

      {/* Success icon */}
      <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 28 }}>
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="#16a34a" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 17l8 8L28 8" />
        </svg>
      </div>

      <div style={{ fontSize: 26, fontWeight: 700, color: '#0a0a0a', marginBottom: 12, letterSpacing: '-0.3px' }}>
        Detailed Application Submitted
      </div>

      <div style={{ fontSize: 15, color: '#525252', marginBottom: 40, maxWidth: 460, lineHeight: 1.6 }}>
        Your detailed application has been successfully submitted. Proceed to fill in the System Plan to continue with your certification.
      </div>

      <button
        style={{ ...hfStyles.btn, ...hfStyles.btnPrimary, padding: '12px 28px', fontSize: 15, gap: 8 }}
        onClick={onGoHome}
      >
        Go to Home <HFArrowRight />
      </button>
    </div>
  );
}

window.HFSubmitted = HFSubmitted;
