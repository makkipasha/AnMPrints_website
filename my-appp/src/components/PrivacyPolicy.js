import React from "react";
import "./Style/PrivacyPolicy.css"; // Optional for additional styling

const PrivacyPolicy = () => {
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-10 col-md-12">
          <div className="privacy-policy p-4 bg-white rounded shadow-sm">
            <h1 className="text-center mb-3">Privacy Policy</h1>
            <p className="text-center text-muted mb-4">
              <small>Effective Date: April 11, 2025</small>
            </p>

            <p>
              At <strong>A&M PRINTS</strong>, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your personal information when you use our website or services.
            </p>

            <h5 className="mt-4">1. Information We Collect</h5>
            <p>When you interact with A&M PRINTS, we may collect the following types of information:</p>
            <ul>
              <li><strong>Personal Information:</strong> Name, email address, phone number, shipping/billing address.</li>
              <li><strong>Order Information:</strong> Product preferences, design files, and payment information.</li>
              <li><strong>Website Usage Data:</strong> IP address, browser type, pages visited, and other usage data via cookies or analytics tools.</li>
            </ul>

            <h5 className="mt-4">2. How We Use Your Information</h5>
            <ul>
              <li>Process and fulfill your orders.</li>
              <li>Communicate with you regarding your order status or inquiries.</li>
              <li>Improve our website and services.</li>
              <li>Send promotional offers (only if you opt in).</li>
              <li>Ensure the security and integrity of our services.</li>
            </ul>

            <h5 className="mt-4">3. Sharing Your Information</h5>
            <p>We do not sell, rent, or trade your personal information to third parties. However, we may share your information with:</p>
            <ul>
              <li>Courier and shipping partners to deliver your orders.</li>
              <li>Payment gateways for secure transaction processing.</li>
              <li>Service providers that help us maintain and improve our website (e.g., analytics tools).</li>
              <li>Legal authorities if required by law or to protect our rights.</li>
            </ul>

            <h5 className="mt-4">4. Data Security</h5>
            <p>
              We implement strict security measures to protect your personal information from unauthorized access, misuse, or disclosure. While we strive to use commercially acceptable means to protect your data, no method of transmission over the internet is 100% secure.
            </p>

            <h5 className="mt-4">5. Your Rights</h5>
            <ul>
              <li>Access or update your personal information.</li>
              <li>Request the deletion of your personal data.</li>
              <li>Opt out of promotional emails at any time.</li>
            </ul>
            <p>To exercise your rights, please contact us at: <a href="mailto:anmprints01@gmail.com">anmprints01@gmail.com</a></p>

            <h5 className="mt-4">6. Cookies and Tracking Technologies</h5>
            <p>
              Our website uses cookies to enhance your browsing experience and analyze traffic. By using our website, you consent to the use of cookies. You can disable cookies in your browser settings.
            </p>

            <h5 className="mt-4">7. Third-Party Links</h5>
            <p>
              Our website may contain links to third-party sites. We are not responsible for the privacy practices or content of those websites.
            </p>

            <h5 className="mt-4">8. Changes to This Policy</h5>
            <p>
              We reserve the right to modify this Privacy Policy at any time. Any changes will be posted on this page with an updated effective date. We encourage you to review this policy periodically.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
