import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AlertTriangle } from "lucide-react";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-16">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-display font-bold mb-4">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Effective Date: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

          {/* Critical RUO Warning Box */}
          <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <AlertTriangle className="h-6 w-6 text-destructive flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-destructive mb-2">IMPORTANT: RESEARCH USE ONLY</h3>
                <p className="text-sm text-muted-foreground">
                  All products sold by Peptide Foundry are labeled "FOR RESEARCH USE ONLY" and are not approved for human or veterinary use, not intended for food or cosmetic use, and not intended to diagnose, treat, cure, or prevent any disease. By purchasing, you certify that you are a qualified researcher and will use products only for legitimate in-vitro research purposes.
                </p>
              </div>
            </div>
          </div>

          <div className="prose prose-stone max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms of Service ("Terms") constitute a legally binding agreement between you ("Purchaser," "you," or "your") and Peptide Foundry LLC ("Company," "we," "us," or "our") governing your access to and use of the peptidefoundry.com website (the "Site") and purchase of products. By accessing the Site, creating an account, or placing an order, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree to these Terms, you must not use the Site or purchase products from us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Research Use Only – Intended Use Restrictions</h2>

              <h3 className="text-xl font-medium mb-3 mt-6">2.1 Product Classification</h3>
              <p className="text-muted-foreground leading-relaxed">
                All peptides, compounds, and related materials sold by Peptide Foundry (collectively, "Products") are classified as Research Use Only (RUO) chemicals. Products are intended solely for in-vitro laboratory research conducted by qualified researchers in controlled settings. Products are NOT drugs, biologics, medical devices, or dietary supplements and have not been evaluated, approved, or cleared by the U.S. Food and Drug Administration (FDA) or any other regulatory agency.
              </p>

              <h3 className="text-xl font-medium mb-3 mt-6">2.2 Prohibited Uses</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">You expressly agree that Products shall NOT be used for:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Human consumption, injection, ingestion, inhalation, or any form of human use</li>
                <li>Veterinary or animal use, including administration to any animal</li>
                <li>Food, beverage, or dietary supplement manufacturing or formulation</li>
                <li>Cosmetic manufacturing or personal care product formulation</li>
                <li>Diagnostic purposes in humans or animals</li>
                <li>Therapeutic purposes, including the treatment, cure, mitigation, or prevention of any disease or medical condition</li>
                <li>Any clinical, medical, or healthcare application</li>
                <li>Resale to end consumers or non-research entities</li>
                <li>Any use prohibited by federal, state, local, or international law</li>
              </ul>

              <h3 className="text-xl font-medium mb-3 mt-6">2.3 Purchaser Certification</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">By placing an order, you certify and represent that:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>You are at least 18 years of age and legally capable of entering into binding contracts</li>
                <li>You are a qualified researcher, scientist, or authorized representative of a legitimate research institution, laboratory, or educational organization</li>
                <li>You possess the necessary expertise, training, and facilities to handle research chemicals safely</li>
                <li>Products will be used exclusively for lawful in-vitro research purposes in a controlled laboratory environment</li>
                <li>Products will be stored, handled, and disposed of in accordance with applicable safety regulations and best practices</li>
                <li>You will not transfer, sell, or provide Products to any third party for prohibited uses</li>
                <li>You understand and accept all risks associated with research chemical handling</li>
              </ul>

              <h3 className="text-xl font-medium mb-3 mt-6">2.4 Compliance Responsibility</h3>
              <p className="text-muted-foreground leading-relaxed">
                You are solely responsible for ensuring that your purchase, possession, and use of Products complies with all applicable federal, state, local, and international laws, regulations, and institutional policies. You agree to maintain all required licenses, permits, and approvals necessary for your research activities.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Account Registration</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                To place orders, you may be required to create an account. You agree to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Provide accurate, current, and complete information during registration</li>
                <li>Maintain and promptly update your account information</li>
                <li>Maintain the confidentiality of your account credentials</li>
                <li>Accept responsibility for all activities occurring under your account</li>
                <li>Notify us immediately of any unauthorized access or security breach</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                We reserve the right to suspend or terminate accounts that contain false information, are used for prohibited purposes, or violate these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Orders and Payment</h2>

              <h3 className="text-xl font-medium mb-3 mt-6">4.1 Order Acceptance</h3>
              <p className="text-muted-foreground leading-relaxed">
                All orders are subject to acceptance by Peptide Foundry. We reserve the right to refuse, cancel, or limit any order for any reason, including but not limited to product availability, errors in pricing or product information, suspected fraud, or concerns regarding intended use. Order confirmation does not constitute acceptance; acceptance occurs only upon shipment.
              </p>

              <h3 className="text-xl font-medium mb-3 mt-6">4.2 Pricing</h3>
              <p className="text-muted-foreground leading-relaxed">
                All prices are listed in U.S. dollars and are subject to change without notice. We strive for pricing accuracy but reserve the right to correct errors. If an error affects your order, we will notify you and provide the option to proceed at the correct price or cancel.
              </p>

              <h3 className="text-xl font-medium mb-3 mt-6">4.3 Payment</h3>
              <p className="text-muted-foreground leading-relaxed">
                Payment is due in full at the time of order. We accept major credit cards and other payment methods as displayed at checkout. All payments are processed securely through third-party payment processors. You represent that you are authorized to use the selected payment method.
              </p>

              <h3 className="text-xl font-medium mb-3 mt-6">4.4 Taxes</h3>
              <p className="text-muted-foreground leading-relaxed">
                Applicable sales tax, use tax, or other taxes will be added to your order as required by law. Tax-exempt organizations must provide valid exemption documentation prior to order placement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Shipping and Delivery</h2>
              <p className="text-muted-foreground leading-relaxed">
                Shipping terms, methods, and costs are detailed in our Shipping Policy, which is incorporated herein by reference. Title and risk of loss pass to you upon delivery to the carrier. We are not responsible for delays caused by carriers, weather, customs, or other circumstances beyond our control.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Product Quality and Documentation</h2>

              <h3 className="text-xl font-medium mb-3 mt-6">6.1 Certificate of Analysis</h3>
              <p className="text-muted-foreground leading-relaxed">
                Each Product ships with a Certificate of Analysis (COA) documenting purity, identity, and composition as determined by our quality control testing. COAs are available upon request for previously purchased Products.
              </p>

              <h3 className="text-xl font-medium mb-3 mt-6">6.2 Storage and Handling</h3>
              <p className="text-muted-foreground leading-relaxed">
                You are responsible for proper storage and handling of Products in accordance with provided specifications. Improper storage may affect Product quality and void any applicable guarantees.
              </p>

              <h3 className="text-xl font-medium mb-3 mt-6">6.3 Quality Claims</h3>
              <p className="text-muted-foreground leading-relaxed">
                Claims regarding Product quality or purity must be submitted within fourteen (14) days of receipt and may require return of the Product and/or supporting documentation for investigation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Foundry Club Membership</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The Foundry Club is an optional subscription membership program offering discounted pricing and other benefits. By enrolling, you agree that:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Membership fees are billed on a recurring basis (monthly or annually as selected)</li>
                <li>You authorize automatic charges to your payment method</li>
                <li>Membership benefits are non-transferable and apply only to the account holder</li>
                <li>You may cancel at any time; benefits continue through the end of the paid billing period</li>
                <li>Membership fees are non-refundable once the billing cycle has begun</li>
                <li>We may modify membership terms, benefits, or pricing with reasonable notice</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                All content on the Site, including text, graphics, logos, images, software, and compilation thereof, is the property of Peptide Foundry or its licensors and is protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, display, or create derivative works without our express written permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Disclaimer of Warranties</h2>
              <p className="text-muted-foreground leading-relaxed uppercase font-medium mb-4">
                PRODUCTS ARE PROVIDED "AS IS" AND "AS AVAILABLE" FOR RESEARCH USE ONLY.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, PEPTIDE FOUNDRY EXPRESSLY DISCLAIMS ALL WARRANTIES, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING BUT NOT LIMITED TO:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT</li>
                <li>WARRANTIES ARISING FROM COURSE OF DEALING, COURSE OF PERFORMANCE, OR TRADE USAGE</li>
                <li>WARRANTIES REGARDING THE ACCURACY, RELIABILITY, OR COMPLETENESS OF PRODUCT INFORMATION</li>
                <li>WARRANTIES THAT PRODUCTS WILL MEET YOUR SPECIFIC RESEARCH REQUIREMENTS OR EXPECTATIONS</li>
                <li>WARRANTIES THAT THE SITE WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                No advice or information obtained from Peptide Foundry shall create any warranty not expressly stated herein. Some jurisdictions do not allow warranty exclusions, so some limitations may not apply to you.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>PEPTIDE FOUNDRY SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES, INCLUDING BUT NOT LIMITED TO DAMAGES FOR LOSS OF PROFITS, GOODWILL, DATA, OR OTHER INTANGIBLE LOSSES</li>
                <li>PEPTIDE FOUNDRY'S TOTAL CUMULATIVE LIABILITY FOR ALL CLAIMS ARISING FROM OR RELATED TO THESE TERMS OR YOUR USE OF PRODUCTS SHALL NOT EXCEED THE AMOUNT PAID BY YOU FOR THE SPECIFIC PRODUCT GIVING RISE TO THE CLAIM</li>
                <li>PEPTIDE FOUNDRY SHALL NOT BE LIABLE FOR ANY DAMAGES ARISING FROM YOUR MISUSE OF PRODUCTS, INCLUDING ANY USE CONTRARY TO THE RESEARCH USE ONLY RESTRICTIONS</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                These limitations apply regardless of the theory of liability (contract, tort, strict liability, or otherwise) and even if Peptide Foundry has been advised of the possibility of such damages.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">11. Indemnification</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You agree to indemnify, defend, and hold harmless Peptide Foundry and its officers, directors, employees, agents, successors, and assigns from and against any and all claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys' fees) arising from or related to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Your use or misuse of Products</li>
                <li>Your violation of these Terms, including the Research Use Only restrictions</li>
                <li>Your violation of any applicable law, regulation, or third-party right</li>
                <li>Any claims by third parties related to your research activities</li>
                <li>Any false representations or certifications made by you</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">12. Governing Law and Dispute Resolution</h2>

              <h3 className="text-xl font-medium mb-3 mt-6">12.1 Governing Law</h3>
              <p className="text-muted-foreground leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to conflict of law principles.
              </p>

              <h3 className="text-xl font-medium mb-3 mt-6">12.2 Arbitration</h3>
              <p className="text-muted-foreground leading-relaxed">
                Any dispute, controversy, or claim arising from or relating to these Terms or Products shall be resolved by binding arbitration administered by the American Arbitration Association in accordance with its Commercial Arbitration Rules. Arbitration shall take place in Wilmington, Delaware, and judgment on the award may be entered in any court of competent jurisdiction.
              </p>

              <h3 className="text-xl font-medium mb-3 mt-6">12.3 Class Action Waiver</h3>
              <p className="text-muted-foreground leading-relaxed">
                You agree that any arbitration or proceeding shall be conducted only on an individual basis and not as a class, consolidated, or representative action. You waive any right to participate in class actions against Peptide Foundry.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">13. Termination</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may suspend or terminate your account and access to the Site at any time, with or without cause, with or without notice. Upon termination, your right to use the Site ceases immediately. Provisions regarding Research Use Only restrictions, Disclaimer of Warranties, Limitation of Liability, Indemnification, and Governing Law shall survive termination.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">14. Modifications</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these Terms at any time. Changes will be effective upon posting to the Site. Your continued use of the Site or purchase of Products after changes constitutes acceptance of the modified Terms. Material changes will be communicated via email or prominent Site notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">15. Severability</h2>
              <p className="text-muted-foreground leading-relaxed">
                If any provision of these Terms is held invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect. The invalid provision shall be modified to the minimum extent necessary to make it valid and enforceable while preserving the parties' intent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">16. Entire Agreement</h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms, together with our Privacy Policy, Shipping Policy, and Refund Policy, constitute the entire agreement between you and Peptide Foundry regarding the subject matter hereof and supersede all prior agreements, understandings, and communications.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">17. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                For questions regarding these Terms of Service, please contact:
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

export default TermsOfService;
