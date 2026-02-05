import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-16">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-display font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Effective Date: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

          <div className="prose prose-stone max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                Peptide Foundry LLC ("Company," "we," "us," or "our") respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you visit our website peptidefoundry.com (the "Site") or make a purchase from us. By accessing or using our Site, you consent to the practices described in this Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>

              <h3 className="text-xl font-medium mb-3 mt-6">2.1 Personal Information</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">We may collect personal information that you voluntarily provide, including but not limited to:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Full legal name</li>
                <li>Email address</li>
                <li>Telephone number</li>
                <li>Billing and shipping addresses</li>
                <li>Payment card information (processed securely via third-party payment processors)</li>
                <li>Institutional or organizational affiliation</li>
                <li>Research credentials or certifications</li>
                <li>Account login credentials</li>
              </ul>

              <h3 className="text-xl font-medium mb-3 mt-6">2.2 Automatically Collected Information</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">When you access our Site, we may automatically collect:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>IP address and geolocation data</li>
                <li>Browser type and version</li>
                <li>Device type and operating system</li>
                <li>Pages visited and time spent on pages</li>
                <li>Referring website addresses</li>
                <li>Clickstream data</li>
              </ul>

              <h3 className="text-xl font-medium mb-3 mt-6">2.3 Cookies and Tracking Technologies</h3>
              <p className="text-muted-foreground leading-relaxed">
                We use cookies, web beacons, and similar tracking technologies to enhance your browsing experience, analyze Site traffic, and personalize content. You may disable cookies through your browser settings; however, doing so may limit certain functionality of our Site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Use of Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">We use the information we collect for the following purposes:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>To process and fulfill orders, including shipping and payment processing</li>
                <li>To verify purchaser eligibility and compliance with our Terms of Service</li>
                <li>To create and manage your account</li>
                <li>To communicate with you regarding orders, account updates, and customer service inquiries</li>
                <li>To send promotional communications (where you have opted in)</li>
                <li>To improve our Site, products, and services</li>
                <li>To detect and prevent fraud, unauthorized access, and other illegal activities</li>
                <li>To comply with legal obligations and enforce our policies</li>
                <li>To maintain records as required by applicable law</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Disclosure of Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">We may share your information in the following circumstances:</p>

              <h3 className="text-xl font-medium mb-3 mt-6">4.1 Service Providers</h3>
              <p className="text-muted-foreground leading-relaxed">
                We engage third-party vendors to perform services on our behalf, including payment processing (Stripe), shipping and logistics, email communications, data analytics, and customer support. These providers have access to personal information only as necessary to perform their functions and are contractually obligated to maintain confidentiality.
              </p>

              <h3 className="text-xl font-medium mb-3 mt-6">4.2 Legal Compliance</h3>
              <p className="text-muted-foreground leading-relaxed">
                We may disclose your information if required by law, regulation, legal process, or governmental request, or when we believe disclosure is necessary to protect our rights, your safety, or the safety of others, investigate fraud, or respond to a government request.
              </p>

              <h3 className="text-xl font-medium mb-3 mt-6">4.3 Business Transfers</h3>
              <p className="text-muted-foreground leading-relaxed">
                In the event of a merger, acquisition, reorganization, bankruptcy, or sale of assets, your information may be transferred as part of that transaction. We will notify you of any such change in ownership or control of your personal information.
              </p>

              <h3 className="text-xl font-medium mb-3 mt-6">4.4 No Sale of Personal Information</h3>
              <p className="text-muted-foreground leading-relaxed">
                We do not sell, rent, or trade your personal information to third parties for their marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement commercially reasonable administrative, technical, and physical security measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction. All payment transactions are encrypted using Secure Socket Layer (SSL) technology and processed through PCI-DSS compliant payment processors. However, no method of transmission over the Internet or electronic storage is completely secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Data Retention</h2>
              <p className="text-muted-foreground leading-relaxed">
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. Order records and transaction data may be retained for a minimum of seven (7) years for tax, legal, and compliance purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Your Rights and Choices</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">Depending on your jurisdiction, you may have the following rights:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information, subject to legal retention requirements</li>
                <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications at any time</li>
                <li><strong>Data Portability:</strong> Request your data in a structured, machine-readable format</li>
                <li><strong>Withdraw Consent:</strong> Where processing is based on consent, withdraw that consent at any time</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                To exercise any of these rights, please contact us at the information provided below. We will respond to your request within the timeframe required by applicable law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. California Privacy Rights</h2>
              <p className="text-muted-foreground leading-relaxed">
                California residents may have additional rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information is collected, the right to request deletion, and the right to opt-out of the sale of personal information. As stated above, we do not sell personal information. To exercise your CCPA rights, contact us using the information below.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Children's Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our Site is not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected personal information from a child under 18, we will take steps to delete such information promptly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Third-Party Links</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our Site may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">11. Changes to This Privacy Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify this Privacy Policy at any time. Changes will be effective immediately upon posting to the Site. The "Effective Date" at the top of this policy indicates when it was last revised. Your continued use of the Site after any changes constitutes your acceptance of the revised Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">12. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                <p className="text-foreground font-medium">Peptide Foundry LLC</p>
                <p className="text-muted-foreground">Email: legal@peptidefoundry.com</p>
                <p className="text-muted-foreground">Phone: 1-800-PEPTIDE</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
