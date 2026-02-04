import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

export const TermsContent: React.FC = () => {
  return (
    <ScrollArea className="h-[400px] w-full rounded-md border p-4 bg-muted/30">
      <div className="space-y-6 text-sm text-muted-foreground">
        <header className="text-center border-b border-border pb-4">
          <h2 className="font-semibold text-foreground text-lg">PEPTIDE FOUNDRY – TERMS AND CONDITIONS</h2>
          <p className="text-xs mt-1">Last Updated: Aug 22, 2025</p>
        </header>

        <section>
          <h3 className="font-semibold text-foreground mb-2">AGREEMENT TO TERMS</h3>
          <p className="leading-relaxed">
            The telehealth services provided by Peptide Foundry LLC ("Peptide Foundry," "we," "us," or "our") are strictly limited to safety assessments and peptide recommendations conducted by a licensed physician in the State of New York. Telehealth consultations are provided solely for health optimization purposes and do not include diagnosis, treatment, or management of general medical conditions. The physician may review additional health data voluntarily uploaded by members, but strictly for the purpose of assessing peptide safety and making adjustments to peptide recommendations. The physician is not the member's primary care provider and does not establish a traditional doctor-patient relationship.
          </p>
        </section>

        <section>
          <h3 className="font-semibold text-foreground mb-2">ELIGIBILITY</h3>
          <p className="leading-relaxed">
            You must be at least 18 years of age to access or use our Services. By accessing or using the Services, you represent and warrant that you are legally competent to enter into this Agreement and that you meet the eligibility requirements.
          </p>
        </section>

        <section>
          <h3 className="font-semibold text-foreground mb-2">SERVICES PROVIDED, PRODUCT LIABILITY, AND THIRD-PARTY MANUFACTURERS</h3>
          <p className="leading-relaxed">
            Peptide Foundry provides access to medically-prescribed peptide therapies, concierge health services, and personalized treatment plans under the supervision of licensed healthcare providers. Peptide Foundry is not a manufacturer or supplier of peptides. All peptide products are sourced from third-party manufacturers and compounded by licensed 503A and 503B pharmacies. Peptide Foundry does not assume liability for product defects, manufacturing errors, or adverse effects arising from third-party products.
          </p>
        </section>

        <section>
          <h3 className="font-semibold text-foreground mb-2">MEDICAL DISCLAIMER AND TREATMENT LIMITATIONS</h3>
          <p className="leading-relaxed">
            Peptide Foundry, its affiliated providers, and its concierge team do not act as primary care providers and do not establish a traditional doctor-patient relationship. All protocols and treatments are intended for health optimization purposes only and are not intended to diagnose, treat, cure, or prevent any disease or medical condition. Any claims regarding the potential health benefits of peptides are based on preliminary research and should not be construed as definitive or conclusive.
          </p>
          <p className="leading-relaxed mt-2">
            All services, recommendations, and protocols provided by Peptide Foundry are for informational purposes only and do not constitute medical advice, diagnosis, or treatment. Members acknowledge that Peptide Foundry is not their primary healthcare provider and that all health-related decisions are made at the member's own risk.
          </p>
        </section>

        <section>
          <h3 className="font-semibold text-foreground mb-2">VOLUNTARY PARTICIPATION AND ASSUMPTION OF RISK</h3>
          <p className="leading-relaxed">
            Members acknowledge and agree that all participation in Peptide Foundry's services and use of its products is voluntary and undertaken at the member's own risk. By engaging in services or using products offered by Peptide Foundry, members assume full responsibility for any and all outcomes, including but not limited to health-related effects, adverse reactions, or unintended consequences.
          </p>
        </section>

        <section>
          <h3 className="font-semibold text-foreground mb-2">MEMBERSHIP, BILLING, AND PRODUCT PURCHASES</h3>
          <p className="leading-relaxed">
            Membership is subject to approval and may include an application process, health assessment, and payment of applicable fees. The acceptance of a membership application does not establish a traditional doctor-patient relationship. Membership is billed as a recurring monthly fee, which grants access to Peptide Foundry's services, protocols, and platform features. Peptide products are sold separately.
          </p>
          <p className="leading-relaxed mt-2">
            Members may purchase peptides on an as-needed basis without a recurring product subscription. However, Peptide Foundry reserves the right to introduce optional recurring product subscriptions in the future, subject to prior notice and the member's consent. Any changes to billing structures will be clearly communicated to members. Refunds are not provided for unused services or early cancellation, except in cases of billing errors or at Peptide Foundry's discretion.
          </p>
        </section>

        <section>
          <h3 className="font-semibold text-foreground mb-2">INTELLECTUAL PROPERTY, PROPRIETARY PROTOCOLS, AND DATA PRIVACY</h3>
          <p className="leading-relaxed">
            All proprietary content, including but not limited to treatment protocols, concierge frameworks, digital tools, and AI-driven health recommendations, are owned exclusively by Peptide Foundry. Unauthorized reproduction, dissemination, or commercial use of such content is strictly prohibited and may result in legal action. Peptide Foundry implements reasonable measures to protect personal health information in compliance with applicable state and federal privacy laws. However, Peptide Foundry does not guarantee the security of data transmitted via email, SMS, or other unencrypted communication channels. Sensitive information should be communicated through secure methods whenever possible.
          </p>
        </section>

        <section>
          <h3 className="font-semibold text-foreground mb-2">LIMITATION OF LIABILITY, THIRD-PARTY PRODUCTS, AND FORCE MAJEURE</h3>
          <p className="leading-relaxed">
            To the maximum extent permitted by law, Peptide Foundry, its affiliates, officers, directors, employees, contractors, and agents shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of or related to the Services, including but not limited to medical recommendations or advice provided by healthcare providers affiliated with Peptide Foundry, acts or omissions of contractors or service providers, and unauthorized use of Services by third parties. Peptide Foundry expressly disclaims all liability for actions taken by independent contractors that exceed the scope of their contractual obligations or deviate from prescribed protocols. Additionally, Peptide Foundry shall not be liable for service disruptions, product shortages, regulatory changes, or other delays caused by circumstances beyond its control, including but not limited to natural disasters, pandemics, supply chain disruptions, or acts of government authorities.
          </p>
          <p className="leading-relaxed mt-2">
            Additionally, Peptide Foundry is not liable for the efficacy, safety, or quality of peptide products provided by third-party manufacturers or pharmacies. Members must notify Peptide Foundry immediately of any issues, defects, or adverse reactions related to peptide products. Peptide Foundry will then notify the respective manufacturer or pharmacy. Peptide Foundry does not assume liability for product defects or adverse reactions resulting from third-party products but will facilitate communication with the supplier as necessary.
          </p>
        </section>

        <section>
          <h3 className="font-semibold text-foreground mb-2">INDEMNIFICATION, INSURANCE REQUIREMENTS, AND EMPLOYEE OR CONTRACTOR PROTECTION</h3>
          <p className="leading-relaxed">
            You agree to indemnify, defend, and hold harmless Peptide Foundry, its affiliates, officers, directors, employees, contractors, and agents from and against any claims, liabilities, damages, losses, or expenses, including reasonable attorneys' fees, arising out of or related to your violation of these Terms, any claim of unauthorized medical advice or misrepresentation by contractors or affiliates, any breach of data privacy obligations, and any claim against Peptide Foundry arising from the negligence, misconduct, or unauthorized actions of independent contractors or service providers. All contractors and affiliates must maintain appropriate insurance coverage for liability and professional negligence.
          </p>
        </section>

        <section>
          <h3 className="font-semibold text-foreground mb-2">INDEMNIFICATION AND HOLD HARMLESS</h3>
          <p className="leading-relaxed">
            By using Peptide Foundry's services or products, members agree to indemnify, defend, and hold harmless Peptide Foundry LLC, its owners, officers, employees, contractors, and affiliates from and against any and all claims, liabilities, damages, losses, costs, or expenses, including reasonable attorneys' fees, arising from or related to misuse, unauthorized use, or unintended application of products, failure to follow product instructions or recommended guidelines, member's failure to disclose relevant health information, or member's breach of any terms outlined in this agreement or applicable disclaimers. This indemnification obligation applies to all claims, whether asserted by the member, third parties, or government agencies.
          </p>
        </section>

        <section>
          <h3 className="font-semibold text-foreground mb-2">GOVERNING LAW, TELEHEALTH COMPLIANCE, DISPUTE RESOLUTION, AND CLASS ACTION WAIVER</h3>
          <p className="leading-relaxed">
            These Terms shall be governed by and construed in accordance with the laws of the State of New York, without regard to its conflict of law principles. For disputes related to telehealth services, Peptide Foundry requires that all affiliated healthcare providers adhere to state-specific telehealth regulations in New York, California, and Florida, including licensure, informed consent, and patient confidentiality obligations. Any claims or disputes arising under these Terms shall be resolved through binding arbitration on an individual basis. Members waive the right to participate in class actions, collective claims, or any other representative action. Members must first attempt to resolve disputes through Peptide Foundry's internal dispute resolution process before initiating arbitration. Any disputes arising under these Terms shall be resolved exclusively in the state or federal courts located in New York County, New York.
          </p>
        </section>

        {/* Telehealth Disclaimer */}
        <Separator className="my-8" />

        <header className="text-center border-b border-border pb-4">
          <h2 className="font-semibold text-foreground text-lg">TELEHEALTH DISCLAIMER</h2>
          <p className="text-xs mt-1">Last Updated: January 12th, 2025</p>
        </header>

        <section>
          <h3 className="font-semibold text-foreground mb-2">PURPOSE AND SCOPE</h3>
          <p className="leading-relaxed">
            The telehealth services provided by Peptide Foundry LLC ("Peptide Foundry," "we," "us," or "our") are strictly limited to safety assessments and peptide recommendations conducted by a licensed physician in the State of New York. Telehealth consultations are provided solely for health optimization purposes and do not include diagnosis, treatment, or management of general medical conditions. The physician may review additional health data voluntarily uploaded by members, but strictly for the purpose of assessing peptide safety and making adjustments to peptide recommendations. The physician is not the member's primary care provider and does not establish a traditional doctor-patient relationship.
          </p>
        </section>

        <section>
          <h3 className="font-semibold text-foreground mb-2">CONSENT AND RISK ACCEPTANCE</h3>
          <p className="leading-relaxed">
            By scheduling a telehealth consultation or selecting an asynchronous review, the member consents to the telehealth services provided by Peptide Foundry. Members acknowledge and accept all risks associated with the use of peptides based on disclosed medical history and health information. Peptide Foundry does not assume responsibility for adverse effects arising from undisclosed medical conditions, medication interactions, or incomplete or inaccurate health information provided by the member. Members are solely responsible for the accuracy and completeness of any health data they choose to upload. Peptide Foundry and its affiliates do not verify the accuracy of such data and shall not be liable for adverse outcomes resulting from incomplete or inaccurate disclosures. Members are required to disclose all current medications, supplements, and relevant health conditions to ensure accurate peptide recommendations.
          </p>
          <p className="leading-relaxed mt-2">
            Telehealth services provided by Peptide Foundry are based solely on the information disclosed by members. Peptide Foundry is not liable for adverse outcomes resulting from incomplete, inaccurate, or undisclosed health information.
          </p>
        </section>

        <section>
          <h3 className="font-semibold text-foreground mb-2">STATE-SPECIFIC TELEHEALTH LIMITATIONS</h3>
          <p className="leading-relaxed">
            Telehealth services are strictly limited to residents of New York. Members must confirm their physical location in New York at the start of each telehealth session or asynchronous review. If a member is located outside of New York, the session will be terminated immediately and rescheduled for a later date. Peptide Foundry reserves the right to terminate telehealth services if a member fails to disclose relevant health information, misrepresents their health status, or attempts to misuse telehealth services for purposes beyond peptide safety assessments. Peptide Foundry does not provide telehealth services to members temporarily residing outside of New York or in states where the physician is not licensed.
          </p>
        </section>

        <section>
          <h3 className="font-semibold text-foreground mb-2">EMERGENCY AND URGENT CARE DISCLAIMER</h3>
          <p className="leading-relaxed">
            Peptide Foundry does not provide urgent care, emergency services, ongoing medical management, or primary medical care through telehealth. However, members are entitled to quarterly check-ins with the concierge team to review peptide protocols and overall health optimization progress. The concierge team may provide peptide recommendations based on member feedback and general health optimization goals; however, such recommendations are not to be construed as medical advice, diagnosis, or treatment. All peptide protocols must be confirmed by the physician solely for safety and dosing purposes. These check-ins are not medical consultations but may result in a request for further analysis by the physician, strictly limited to peptide safety assessments and potential adjustments to peptide protocols. The physician does not establish a traditional doctor-patient relationship and will not provide follow-up care beyond the scope of peptide safety assessments and recommendations. In the event of a suspected adverse reaction to a peptide protocol, members are advised to discontinue use immediately and seek emergency medical care. Peptide Foundry does not provide emergency support or urgent care for adverse reactions or complications arising from peptide use. Members are instructed to call 911 or contact their primary care provider for immediate assistance.
          </p>
        </section>

        <section>
          <h3 className="font-semibold text-foreground mb-2">QUARTERLY CHECK-INS AND FOLLOW-UP REQUESTS</h3>
          <p className="leading-relaxed">
            Members are entitled to quarterly check-ins with the concierge team to review peptide protocols and overall health optimization progress. These check-ins are not medical consultations and do not establish a doctor-patient relationship. If the concierge team identifies a need for further analysis by the physician, a telehealth session may be requested, strictly limited to peptide safety assessments and protocol adjustments.
          </p>
        </section>

        <section>
          <h3 className="font-semibold text-foreground mb-2">PAYMENT AND INSURANCE</h3>
          <p className="leading-relaxed">
            Telehealth consultations are included in the membership fee and are not billed separately. Peptide Foundry does not accept insurance for telehealth services. All telehealth services are self-pay only.
          </p>
        </section>

        <section>
          <h3 className="font-semibold text-foreground mb-2">DATA PRIVACY AND COMMUNICATION</h3>
          <p className="leading-relaxed">
            Telehealth consultations are not recorded, and all communications are conducted through secure, encrypted channels. However, Peptide Foundry cannot guarantee the security of data transmitted through unencrypted methods, such as email or SMS. Members are advised to use secure channels for sharing sensitive health information. However, Peptide Foundry cannot guarantee the security of data transmitted via email, SMS, or other unencrypted communication methods. Members are advised to use secure methods for sharing sensitive health information.
          </p>
        </section>

        <section>
          <h3 className="font-semibold text-foreground mb-2">LIMITATION OF LIABILITY</h3>
          <p className="leading-relaxed">
            Peptide Foundry, its physicians, employees, and affiliates shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use of telehealth services, including but not limited to adverse reactions to peptides, miscommunication of health information, or missed diagnoses. By accessing telehealth services, members expressly waive any claims against Peptide Foundry arising from the use or misuse of telehealth services, including but not limited to claims related to missed diagnoses, incomplete or inaccurate health disclosures, delays in care, or miscommunication of health information.
          </p>
        </section>

        {/* Product Disclaimer */}
        <Separator className="my-8" />

        <header className="text-center border-b border-border pb-4">
          <h2 className="font-semibold text-foreground text-lg">PRODUCT DISCLAIMER</h2>
          <p className="text-xs mt-1">Last Updated: Aug 22, 2025</p>
          <p className="text-xs mt-2">
            For questions regarding this Product Disclaimer, please contact Peptide Foundry LLC at:{" "}
            <a href="mailto:support@peptidefoundry.com" className="text-primary hover:underline">
              support@peptidefoundry.com
            </a>
          </p>
        </header>

        <section>
          <h3 className="font-semibold text-foreground mb-2">HEALTH OPTIMIZATION PURPOSE ONLY</h3>
          <p className="leading-relaxed">
            All products offered by Peptide Foundry LLC ("Peptide Foundry") are intended solely for health optimization purposes and are not intended to diagnose, treat, cure, or prevent any disease or medical condition. The information provided on Peptide Foundry's website, marketing materials, or consultations is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment.
          </p>
        </section>

        <section>
          <h3 className="font-semibold text-foreground mb-2">ASSUMPTION OF RISK</h3>
          <p className="leading-relaxed">
            By purchasing and using any product offered by Peptide Foundry, members acknowledge and agree that they are voluntarily choosing to use such products and assume all risks associated with their use, including but not limited to potential adverse effects, allergic reactions, or interactions with other medications or supplements. Members are solely responsible for consulting with a qualified healthcare provider regarding the appropriateness of product use based on their individual health circumstances.
          </p>
          <p className="leading-relaxed mt-2">
            Peptide Foundry disclaims liability for adverse effects resulting from product interactions with other medications, supplements, or underlying health conditions. Members are solely responsible for consulting with their primary licensed healthcare provider to assess potential risks associated with product use.
          </p>
        </section>

        <section>
          <h3 className="font-semibold text-foreground mb-2">VOLUNTARY PARTICIPATION</h3>
          <p className="leading-relaxed">
            Members acknowledge and agree that all participation in Peptide Foundry's services and use of its products is voluntary and undertaken at the member's own risk. By engaging in services or using products offered by Peptide Foundry, members assume full responsibility for any and all outcomes, including but not limited to health-related effects, adverse reactions, or unintended consequences.
          </p>
          <p className="leading-relaxed mt-2">
            Peptide Foundry disclaims liability for any damages, injuries, or losses resulting from voluntary participation, misuse, or failure to follow product instructions.
          </p>
        </section>

        <section>
          <h3 className="font-semibold text-foreground mb-2">INDEMNIFICATION AND HOLD HARMLESS</h3>
          <p className="leading-relaxed">
            By using Peptide Foundry's services or products, members agree to indemnify, defend, and hold harmless Peptide Foundry LLC, its owners, officers, employees, contractors, and affiliates from and against any and all claims, liabilities, damages, losses, costs, or expenses, including reasonable attorneys' fees, arising from or related to:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1 leading-relaxed">
            <li>Misuse, unauthorized use, or unintended application of products</li>
            <li>Failure to follow product instructions or recommended guidelines</li>
            <li>Member's failure to disclose relevant health information</li>
            <li>Member's breach of any terms outlined in this agreement or applicable disclaimers</li>
          </ul>
          <p className="leading-relaxed mt-2">
            This indemnification obligation applies to all claims, whether asserted by the member, third parties, or government agencies.
          </p>
        </section>

        <section>
          <h3 className="font-semibold text-foreground mb-2">MANUFACTURER RESPONSIBILITY AND PRODUCT QUALITY</h3>
          <p className="leading-relaxed">
            Peptide Foundry is not the manufacturer of the products offered and disclaims any liability for product defects, contamination, sterility, or manufacturing inconsistencies. All products are sourced from a licensed distributor operating under Texas State Prescription Drug Distributor and DEA regulations. The distributor complies with federal and state standards, including DSCSA product traceability, storage, and verification requirements. All products are third-party tested; however, Peptide Foundry does not independently verify testing results.
          </p>
        </section>

        <section>
          <h3 className="font-semibold text-foreground mb-2">CONTRAINDICATIONS AND SAFETY PRECAUTIONS</h3>
          <p className="leading-relaxed">
            Products offered by Peptide Foundry are not recommended for use by individuals who are pregnant, nursing, under the age of 18, or with known health conditions without prior consultation with their primary licensed healthcare provider. Members are advised to review product ingredients and potential contraindications prior to use. Peptide Foundry disclaims any liability for adverse effects resulting from misuse, overdose, or failure to follow recommended guidelines.
          </p>
        </section>

        <section>
          <h3 className="font-semibold text-foreground mb-2">NO MEDICAL OVERSIGHT OR MEDICAL ADVICE</h3>
          <p className="leading-relaxed">
            Peptide Foundry is not the primary healthcare provider for members and does not provide emergency medical services. All products offered by Peptide Foundry are intended solely as health optimization tools and are not intended to diagnose, treat, cure, or prevent any medical condition. Peptide Foundry does not provide medical advice, diagnosis, or treatment, and any information provided is for informational purposes only. Members acknowledge that product use is voluntary and that Peptide Foundry disclaims liability for any health-related outcomes arising from product use. No statements or claims made by Peptide Foundry or its representatives should be construed as medical advice.
          </p>
        </section>

        <section>
          <h3 className="font-semibold text-foreground mb-2">JURISDICTION AND LIMITATION OF LIABILITY</h3>
          <p className="leading-relaxed">
            All products offered by Peptide Foundry are intended for use solely within the United States. Peptide Foundry disclaims any liability for the use of its products outside the U.S. or for any unauthorized applications. Peptide Foundry shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from product use, misuse, or adverse reactions. Members waive their right to pursue any claims related to product use through class action lawsuits.
          </p>
        </section>

        <footer className="text-center border-t border-border pt-4 text-xs">
          <p>© 2026 Peptide Foundry. All rights reserved.</p>
          <p className="mt-1">
            Peptide Foundry is not affiliated with any government agency. While we collaborate with medical professionals and advisors, our products and information are provided for educational and research purposes only.
          </p>
        </footer>
      </div>
    </ScrollArea>
  );
};

export default TermsContent;
