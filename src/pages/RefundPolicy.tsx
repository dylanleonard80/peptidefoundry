import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Info } from "lucide-react";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-16">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-display font-bold mb-4">Refund & Return Policy</h1>
          <p className="text-muted-foreground mb-8">Effective Date: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

          {/* Policy Summary Box */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <Info className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-2">Our Commitment to Quality</h3>
                <p className="text-sm text-muted-foreground">
                  Every Peptide Foundry product ships with a Certificate of Analysis (COA) verifying purity and composition. We stand behind the quality of our research-grade peptides and are committed to resolving any legitimate quality concerns.
                </p>
              </div>
            </div>
          </div>

          <div className="prose prose-stone max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Overview</h2>
              <p className="text-muted-foreground leading-relaxed">
                This Refund & Return Policy ("Policy") governs returns, refunds, and exchanges for products purchased from Peptide Foundry LLC ("Company," "we," "us," or "our"). Due to the nature of research chemicals and the importance of maintaining product integrity for scientific applications, we have specific requirements for returns and refunds. By placing an order, you agree to the terms of this Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Eligibility for Refunds</h2>

              <h3 className="text-xl font-medium mb-3 mt-6">2.1 Qualifying Conditions</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">You may be eligible for a refund or replacement if:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Damaged in Transit:</strong> Product arrives visibly damaged, compromised, or with broken seals</li>
                <li><strong>Incorrect Product:</strong> You received a different product than what was ordered</li>
                <li><strong>Quantity Discrepancy:</strong> The quantity received does not match the order</li>
                <li><strong>Quality Issue:</strong> Product does not meet the purity or specifications stated on the Certificate of Analysis (COA)</li>
                <li><strong>Shipping Error:</strong> Order was shipped to an incorrect address due to our error</li>
              </ul>

              <h3 className="text-xl font-medium mb-3 mt-6">2.2 Documentation Requirements</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">To process a refund request, you must provide:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Order number and date of purchase</li>
                <li>Detailed description of the issue</li>
                <li>Photographic evidence of damage or defect (if applicable)</li>
                <li>Original packaging and product (for quality claims requiring return)</li>
                <li>Independent laboratory analysis (for purity disputes, if requested)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Request Timeline</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">Refund and return requests must be submitted within the following timeframes:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Damaged/Incorrect Product:</strong> Within 48 hours of delivery</li>
                <li><strong>Quality/Purity Concerns:</strong> Within 14 days of delivery</li>
                <li><strong>All Other Issues:</strong> Within 14 days of delivery</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Requests submitted after these deadlines may be denied at our sole discretion. The request date is determined by when you contact our support team, not when the issue was discovered.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Non-Refundable Items and Conditions</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">The following are NOT eligible for refunds or returns:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Opened Products:</strong> Products with broken seals or that have been reconstituted, unless the issue existed prior to opening</li>
                <li><strong>Improper Storage:</strong> Products damaged due to customer storage conditions inconsistent with provided specifications (e.g., exposure to heat, light, or moisture)</li>
                <li><strong>Buyer's Remorse:</strong> Change of mind, ordering errors by customer, or products no longer needed</li>
                <li><strong>Research Results:</strong> Unsatisfactory research outcomes or results not meeting expectations</li>
                <li><strong>Expired Timeline:</strong> Requests submitted after the applicable deadline</li>
                <li><strong>Modified Products:</strong> Products that have been altered, diluted, or combined with other substances</li>
                <li><strong>Missing Documentation:</strong> Claims without required supporting documentation</li>
                <li><strong>Foundry Club Fees:</strong> Membership fees once the billing cycle has begun (see Section 8)</li>
                <li><strong>Promotional/Clearance Items:</strong> Products marked as final sale</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Refund Process</h2>

              <h3 className="text-xl font-medium mb-3 mt-6">5.1 Submitting a Request</h3>
              <p className="text-muted-foreground leading-relaxed">
                Contact our support team at support@peptidefoundry.com with your order number, description of the issue, and any required documentation. We will respond within 2 business days to acknowledge your request and provide next steps.
              </p>

              <h3 className="text-xl font-medium mb-3 mt-6">5.2 Review and Investigation</h3>
              <p className="text-muted-foreground leading-relaxed">
                We will review your request and may require additional information, photographs, or return of the product for inspection. For purity disputes, we may request that you obtain independent laboratory analysis at your expense, which may be reimbursed if the claim is validated.
              </p>

              <h3 className="text-xl font-medium mb-3 mt-6">5.3 Resolution</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">If your claim is approved, we will offer one of the following resolutions:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Replacement:</strong> A replacement product shipped at no additional cost</li>
                <li><strong>Store Credit:</strong> Credit applied to your account for future purchases</li>
                <li><strong>Refund:</strong> Refund to your original payment method</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                The resolution method is at our sole discretion based on the nature of the issue, product availability, and other factors.
              </p>

              <h3 className="text-xl font-medium mb-3 mt-6">5.4 Refund Timing</h3>
              <p className="text-muted-foreground leading-relaxed">
                Approved refunds will be processed within 5-7 business days of approval. Depending on your financial institution, it may take an additional 5-10 business days for the refund to appear on your statement. Refunds are issued to the original payment method only.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Returns and Exchanges</h2>

              <h3 className="text-xl font-medium mb-3 mt-6">6.1 Return Authorization</h3>
              <p className="text-muted-foreground leading-relaxed">
                Do not return any product without first obtaining a Return Merchandise Authorization (RMA) number from our support team. Unauthorized returns will not be processed and may be discarded.
              </p>

              <h3 className="text-xl font-medium mb-3 mt-6">6.2 Return Shipping</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">Return shipping costs are handled as follows:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Our Error:</strong> We provide a prepaid shipping label for returns due to our error (wrong product, damaged in transit, quality issue)</li>
                <li><strong>Customer Request:</strong> Customer is responsible for return shipping costs in all other cases</li>
              </ul>

              <h3 className="text-xl font-medium mb-3 mt-6">6.3 Return Condition</h3>
              <p className="text-muted-foreground leading-relaxed">
                Products must be returned in their original, unopened packaging with all seals intact (unless the issue requires opening for inspection). Products must be shipped with appropriate cold chain packaging if temperature-sensitive.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Order Cancellations</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Orders may be cancelled under the following conditions:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Before Processing:</strong> Orders cancelled before processing begins will receive a full refund</li>
                <li><strong>After Processing:</strong> Once an order has entered processing or shipped, it cannot be cancelled and standard return policies apply</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                To request cancellation, contact support@peptidefoundry.com immediately with your order number. Due to fast processing times, we cannot guarantee cancellation requests will be fulfilled.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Foundry Club Membership</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Foundry Club membership subscriptions are subject to the following refund terms:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Membership fees are non-refundable once the billing cycle has begun</li>
                <li>You may cancel your membership at any time through your account dashboard or by contacting support</li>
                <li>Upon cancellation, you will continue to receive membership benefits until the end of your current paid billing period</li>
                <li>No prorated refunds are provided for partial billing periods</li>
                <li>If you believe you were charged in error, contact support within 7 days of the charge</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Disputes and Chargebacks</h2>
              <p className="text-muted-foreground leading-relaxed">
                We strongly encourage you to contact our support team to resolve any issues before initiating a payment dispute or chargeback with your financial institution. Filing a chargeback without first attempting to resolve the issue with us may result in account suspension and denial of future orders. We reserve the right to dispute chargebacks that we believe are fraudulent or made in bad faith.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our liability for any refund, return, or exchange is limited to the purchase price of the affected product(s). We are not liable for any indirect, consequential, incidental, or special damages arising from product issues, including but not limited to research delays, lost data, or additional expenses incurred.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">11. Policy Modifications</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify this Policy at any time. Changes will be effective upon posting to the Site. The Policy in effect at the time of your purchase governs that transaction.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">12. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                For refund requests, return authorizations, or questions about this Policy, please contact:
              </p>
              <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                <p className="text-foreground font-medium">Peptide Foundry LLC - Customer Support</p>
                <p className="text-muted-foreground">Email: support@peptidefoundry.com</p>
                <p className="text-muted-foreground">Phone: 1-800-PEPTIDE</p>
                <p className="text-muted-foreground text-sm mt-2">Support Hours: Monday - Friday, 9:00 AM - 5:00 PM EST</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RefundPolicy;
