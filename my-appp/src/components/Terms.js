import React from "react";
import "./Style/PrivacyPolicy.css"; // Optional styling

const Terms = () => {
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-10 col-md-12">
          <div className="privacy-policy p-4 bg-white rounded shadow-sm">
            <h1 className="text-center mb-3">Terms and Conditions</h1>
            <p className="text-center text-muted mb-4">
            </p>

            <p>
              Welcome to <strong>A&M PRINTS</strong>! By accessing or using our website and services, you agree to be bound by the following terms and conditions. Please read them carefully before placing an order.
            </p>

            <h5 className="mt-4">1. Services Offered</h5>
            <p>
              A&M PRINTS provides customized printing solutions including T-shirt printing, digital printing, laser engraving, and corporate gift printing services.
            </p>

            <h5 className="mt-4">2. Orders and Payments</h5>
            <ul>
              <li>All orders must be paid in full before they are processed, if they are customized.</li>
              <li>Cash on Delivery (COD) is applicable only to non-customized products.</li>
              <li>For custom orders, final approval of the design by the client is mandatory.</li>
              <li>Prices are subject to change without prior notice.</li>
            </ul>

            <h5 className="mt-4">3. Designs and Intellectual Property</h5>
            <ul>
              <li>Customers must ensure they have the legal rights to use any logos, images, or content submitted for printing.</li>
              <li>A&M PRINTS will not be held responsible for copyright infringement caused by the customer.</li>
              <li>We reserve the right to reject any design that is offensive, inappropriate, or violates any law.</li>
            </ul>

            <h5 className="mt-4">4. Turnaround Time</h5>
            <ul>
              <li>Production times vary depending on the type and quantity of the order.</li>
              <li>Estimated delivery timelines will be shared during order confirmation and are subject to change due to external factors.</li>
            </ul>

            <h5 className="mt-4">5. Limitation of Liability</h5>
            <ul>
              <li>A&M PRINTS shall not be held liable for any indirect, incidental, or consequential damages resulting from the use of our services.</li>
              <li>In the case of production errors attributable to A&M PRINTS, our liability is limited to reprinting or refunding the order value.</li>
            </ul>

            <h5 className="mt-4">6. Changes to Terms</h5>
            <p>
              We reserve the right to amend these Terms and Conditions at any time without prior notice. Continued use of our services constitutes acceptance of any updated terms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
