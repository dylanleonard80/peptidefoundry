import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Truck, Clock, ThermometerSnowflake, Package, ShieldCheck } from "lucide-react";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

const ShippingPolicy = () => {
  useDocumentMeta("Shipping Policy | Peptide Foundry");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-16">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-display font-bold mb-4">Shipping Policy</h1>
          <p className="text-muted-foreground mb-8">Effective Date: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

          {/* Shipping Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
            <div className="p-4 bg-primary/5 rounded-xl text-center">
              <Truck className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium">Free Shipping</p>
              <p className="text-xs text-muted-foreground">Orders $150+</p>
            </div>
            <div className="p-4 bg-primary/5 rounded-xl text-center">
              <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium">Fast Processing</p>
              <p className="text-xs text-muted-foreground">Ships in 1-2 days</p>
            </div>
            <div className="p-4 bg-primary/5 rounded-xl text-center">
              <ThermometerSnowflake className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium">Cold Chain</p>
              <p className="text-xs text-muted-foreground">Temperature controlled</p>
            </div>
            <div className="p-4 bg-primary/5 rounded-xl text-center">
              <Package className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium">Discreet</p>
              <p className="text-xs text-muted-foreground">Plain packaging</p>
            </div>
            <div className="p-4 bg-primary/5 rounded-xl text-center col-span-2 md:col-span-1">
              <ShieldCheck className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium">Insured</p>
              <p className="text-xs text-muted-foreground">Full coverage</p>
            </div>
          </div>

          <div className="prose prose-stone max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Overview</h2>
              <p className="text-muted-foreground leading-relaxed">
                This Shipping Policy ("Policy") outlines the terms and conditions for shipping products purchased from Peptide Foundry LLC ("Company," "we," "us," or "our"). Due to the temperature-sensitive nature of peptides and research chemicals, we have implemented specialized shipping procedures to ensure product integrity. By placing an order, you agree to the terms of this Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Processing Time</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Orders are processed within <strong className="text-foreground">1-2 business days</strong> of payment confirmation. Processing times do not include weekends or federal holidays.
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Orders placed before 12:00 PM EST on business days are typically processed same-day</li>
                <li>Orders placed after 12:00 PM EST or on weekends/holidays will be processed the next business day</li>
                <li>High-volume periods may result in extended processing times</li>
                <li>Custom or special orders may require additional processing time</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                You will receive an email confirmation with tracking information once your order has shipped.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Shipping Methods and Rates</h2>

              <h3 className="text-xl font-medium mb-3 mt-6">3.1 Domestic Shipping (United States)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse mb-4">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 pr-4 font-semibold">Method</th>
                      <th className="text-left py-3 pr-4 font-semibold">Estimated Delivery</th>
                      <th className="text-left py-3 font-semibold">Cost</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-3 pr-4">Standard Shipping</td>
                      <td className="py-3 pr-4">5-7 business days</td>
                      <td className="py-3">$9.99 (Free on orders $150+)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 pr-4">Expedited Shipping</td>
                      <td className="py-3 pr-4">2-3 business days</td>
                      <td className="py-3">$19.99</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4">Overnight Shipping</td>
                      <td className="py-3 pr-4">Next business day</td>
                      <td className="py-3">$39.99</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-muted-foreground text-sm">
                * Delivery times are estimates and not guaranteed. Actual delivery times may vary based on carrier, destination, weather, and other factors.
              </p>

              <h3 className="text-xl font-medium mb-3 mt-6">3.2 Free Shipping Threshold</h3>
              <p className="text-muted-foreground leading-relaxed">
                Free standard shipping is available on orders totaling $150 or more (before tax) within the continental United States. Free shipping applies to standard delivery only; expedited and overnight options are available at additional cost.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Cold Chain and Temperature Control</h2>

              <h3 className="text-xl font-medium mb-3 mt-6">4.1 Temperature-Sensitive Products</h3>
              <p className="text-muted-foreground leading-relaxed">
                Peptides and certain research chemicals are temperature-sensitive and may degrade if exposed to excessive heat or temperature fluctuations. We implement cold chain shipping protocols to maintain product integrity during transit.
              </p>

              <h3 className="text-xl font-medium mb-3 mt-6">4.2 Cold Chain Packaging</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">Our cold chain shipping includes:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Insulated shipping containers designed to maintain temperature</li>
                <li>Gel ice packs or dry ice (as appropriate for the product)</li>
                <li>Temperature indicators on select shipments</li>
                <li>Expedited shipping during extreme weather conditions</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Cold chain packaging is included at no additional cost for temperature-sensitive products.
              </p>

              <h3 className="text-xl font-medium mb-3 mt-6">4.3 Weather Delays</h3>
              <p className="text-muted-foreground leading-relaxed">
                During periods of extreme heat or cold, we may delay shipments or require upgraded shipping methods to ensure product integrity. We will notify you if weather conditions affect your order and provide options for proceeding.
              </p>

              <h3 className="text-xl font-medium mb-3 mt-6">4.4 Customer Responsibility</h3>
              <p className="text-muted-foreground leading-relaxed">
                Upon delivery, you are responsible for promptly retrieving your package and storing products according to specifications. Products left in extreme temperatures for extended periods after delivery may be compromised, and claims for such damage may be denied.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Shipping Destinations</h2>

              <h3 className="text-xl font-medium mb-3 mt-6">5.1 Domestic Shipping</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">We ship to all 50 United States, including:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Continental United States (standard rates apply)</li>
                <li>Alaska and Hawaii (additional shipping charges may apply)</li>
                <li>U.S. Territories (Puerto Rico, Guam, etc.) – contact us for availability and rates</li>
                <li>APO/FPO addresses – contact us for availability</li>
              </ul>

              <h3 className="text-xl font-medium mb-3 mt-6">5.2 International Shipping</h3>
              <p className="text-muted-foreground leading-relaxed">
                We do not currently offer international shipping. Products are available for purchase and delivery within the United States only. We are not responsible for orders placed with international shipping addresses; such orders will be cancelled and refunded.
              </p>

              <h3 className="text-xl font-medium mb-3 mt-6">5.3 Restricted Destinations</h3>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to refuse shipment to any address or jurisdiction where the sale or possession of our products may be restricted or prohibited by law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Packaging and Labeling</h2>

              <h3 className="text-xl font-medium mb-3 mt-6">6.1 Discreet Packaging</h3>
              <p className="text-muted-foreground leading-relaxed">
                All orders are shipped in plain, unmarked packaging with no external indication of contents. The return address will display our company name without product descriptions.
              </p>

              <h3 className="text-xl font-medium mb-3 mt-6">6.2 Product Labeling</h3>
              <p className="text-muted-foreground leading-relaxed">
                All products are labeled "FOR RESEARCH USE ONLY – NOT FOR HUMAN OR VETERINARY USE" in compliance with applicable regulations. Each product includes batch/lot numbers for traceability and a Certificate of Analysis (COA).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Order Tracking</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Tracking information is provided for all shipments. You can track your order by:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Clicking the tracking link in your shipping confirmation email</li>
                <li>Logging into your account and viewing order status</li>
                <li>Contacting our support team with your order number</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Please allow up to 24 hours after receiving your shipping confirmation for tracking information to become active in the carrier's system.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Signature Requirements</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Signature confirmation may be required for orders based on the following criteria:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Orders over $250 in value</li>
                <li>Orders shipped to certain geographic areas</li>
                <li>Orders containing high-value or controlled items</li>
                <li>At the customer's request (no additional charge)</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                If you are not available to sign, the carrier will typically make additional delivery attempts or leave a notice for pickup.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Shipping Address</h2>

              <h3 className="text-xl font-medium mb-3 mt-6">9.1 Address Accuracy</h3>
              <p className="text-muted-foreground leading-relaxed">
                You are responsible for providing a complete and accurate shipping address. We are not responsible for orders shipped to incorrect addresses provided by the customer. Address corrections after shipment may result in delays and additional fees.
              </p>

              <h3 className="text-xl font-medium mb-3 mt-6">9.2 Address Changes</h3>
              <p className="text-muted-foreground leading-relaxed">
                Address changes must be requested before the order ships. Once an order has shipped, we cannot guarantee address changes, and any redirects must be arranged directly with the carrier at your expense.
              </p>

              <h3 className="text-xl font-medium mb-3 mt-6">9.3 P.O. Boxes</h3>
              <p className="text-muted-foreground leading-relaxed">
                We can ship to P.O. Boxes via USPS for standard shipping only. Expedited and overnight shipping require a physical street address.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Lost, Damaged, or Stolen Packages</h2>

              <h3 className="text-xl font-medium mb-3 mt-6">10.1 Insurance</h3>
              <p className="text-muted-foreground leading-relaxed">
                All shipments are insured against loss or damage during transit. Insurance coverage is included at no additional cost.
              </p>

              <h3 className="text-xl font-medium mb-3 mt-6">10.2 Reporting Issues</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If your package is lost, damaged, or stolen, please contact us within:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Damaged packages:</strong> Within 48 hours of delivery, with photos of damage</li>
                <li><strong>Lost packages:</strong> If tracking shows no movement for 7+ days, or 3 days after expected delivery</li>
                <li><strong>Stolen packages:</strong> Within 48 hours of confirmed delivery, with a police report if requested</li>
              </ul>

              <h3 className="text-xl font-medium mb-3 mt-6">10.3 Resolution</h3>
              <p className="text-muted-foreground leading-relaxed">
                We will work with the carrier to investigate the issue and, if appropriate, provide a replacement or refund. Resolution is subject to carrier investigation and our Refund Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">11. Title and Risk of Loss</h2>
              <p className="text-muted-foreground leading-relaxed">
                Title to products and risk of loss pass to you upon delivery of the products to the carrier. While we assist with claims for lost or damaged shipments, ultimate responsibility for the products transfers at the point of carrier pickup.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">12. Policy Modifications</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify this Shipping Policy at any time. Changes will be effective upon posting to the Site. The Policy in effect at the time of your order governs that shipment.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">13. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                For shipping questions, tracking assistance, or to report delivery issues, please contact:
              </p>
              <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                <p className="text-foreground font-medium">Peptide Foundry LLC - Shipping Support</p>
                <p className="text-muted-foreground">Email: support@peptidefoundry.com</p>
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

export default ShippingPolicy;
