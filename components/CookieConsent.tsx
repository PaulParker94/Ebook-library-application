// Render the component client-side
"use client";

// Import Necessary modules
import CookieConsent from "react-cookie-consent";

// CookieConsentBanner component that displays a banner asking users to consent to cookie usage
const CookieConsentBanner = () => {
  return (
    <CookieConsent
      location="bottom"
      buttonText="I agree"
      cookieName="user-consent"
      style={{
        background: "#021728",
        color: "#fff",
        fontSize: "14px",
        padding: "6px",
        textAlign: "center",
      }}
      buttonStyle={{
        background: "#ff0000",
        color: "#fff",
        fontSize: "13px",
        borderRadius: "5px",
        padding: "8px 14px",
      }}
      expires={182}
    >
      This website uses cookies to ensure you get the best experience on our website.{" "}
      <a href="/privacy" className="underline hover:text-gray-300 hover:focus:text-gray-300">
        Learn more
      </a>
    </CookieConsent>
  );
};

export default CookieConsentBanner; // Export the CookieConsentBanner component
