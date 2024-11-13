<template>
  <UContainer class="py-12">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold mb-8">Privacy Policy</h1>
      <p class="text-gray-600 dark:text-gray-400 mb-8">
        Last updated: {{ new Date().toLocaleDateString() }}
      </p>

      <div class="prose dark:prose-invert max-w-none">
        <!-- Introduction -->
        <h2>1. Introduction</h2>
        <p>
          At WithWords ("we", "our", or "us"), we respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you use our website and services.
        </p>

        <!-- Data Collection -->
        <h2>2. Information We Collect</h2>
        <h3>2.1 Information You Provide</h3>
        <ul>
          <li>Account information (name, email address)</li>
          <li>Profile information</li>
          <li>Communication preferences</li>
          <li>Payment information (processed securely through Stripe)</li>
          <li>Chat conversations and queries</li>
        </ul>

        <h3>2.2 Automatically Collected Information</h3>
        <ul>
          <li>Device information (browser type, IP address)</li>
          <li>Usage data (features accessed, time spent)</li>
          <li>Cookies and similar technologies</li>
          <li>Performance and error data</li>
        </ul>

        <!-- Data Usage -->
        <h2>3. How We Use Your Information</h2>
        <p>We use your information for the following purposes:</p>
        <ul>
          <li>Providing and improving our services</li>
          <li>Processing your transactions</li>
          <li>Personalizing your experience</li>
          <li>Communicating with you about our services</li>
          <li>Ensuring security and preventing fraud</li>
          <li>Complying with legal obligations</li>
        </ul>

        <!-- Data Storage -->
        <h2>4. Data Storage and Security</h2>
        <p>
          We store your data securely using industry-standard encryption and security measures. Your data is primarily stored and processed using:
        </p>
        <ul>
          <li>Supabase for user data and authentication</li>
          <li>Stripe for payment information</li>
          <li>Secure cloud infrastructure for chat data</li>
        </ul>

        <!-- Data Sharing -->
        <h2>5. Information Sharing</h2>
        <p>We share your information only in the following circumstances:</p>
        <ul>
          <li>With your consent</li>
          <li>With service providers (e.g., payment processors)</li>
          <li>To comply with legal obligations</li>
          <li>To protect our rights and prevent abuse</li>
        </ul>

        <!-- User Rights -->
        <h2>6. Your Rights and Choices</h2>
        <p>Under applicable privacy laws, you have the following rights:</p>
        <ul>
          <li>Access your personal data</li>
          <li>Correct inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Object to processing of your data</li>
          <li>Data portability</li>
          <li>Withdraw consent</li>
        </ul>

        <!-- GDPR Compliance -->
        <h2>7. GDPR Compliance</h2>
        <p>
          For users in the European Economic Area (EEA), we comply with GDPR requirements:
        </p>
        <ul>
          <li>Legal basis for processing data</li>
          <li>Data minimization principles</li>
          <li>Data protection measures</li>
          <li>Rights of EU residents</li>
          <li>International data transfers</li>
        </ul>

        <!-- CCPA Compliance -->
        <h2>8. California Privacy Rights (CCPA)</h2>
        <p>
          California residents have additional rights under the CCPA:
        </p>
        <ul>
          <li>Right to know what personal information is collected</li>
          <li>Right to delete personal information</li>
          <li>Right to opt-out of the sale of personal information</li>
          <li>Right to non-discrimination for exercising CCPA rights</li>
        </ul>

        <!-- Cookies -->
        <h2>9. Cookies and Tracking</h2>
        <p>
          We use cookies and similar tracking technologies to improve your experience:
        </p>
        <ul>
          <li>Essential cookies for site functionality</li>
          <li>Analytics cookies to understand usage</li>
          <li>Preference cookies to remember your settings</li>
        </ul>

        <!-- Children's Privacy -->
        <h2>10. Children's Privacy</h2>
        <p>
          Our services are not intended for children under 13. We do not knowingly collect or maintain information from children under 13.
        </p>

        <!-- Changes -->
        <h2>11. Changes to This Policy</h2>
        <p>
          We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
        </p>

        <!-- Contact -->
        <h2>12. Contact Us</h2>
        <p>
          If you have any questions about this privacy policy or our practices, please contact us:
        </p>
        <ul>
          <li>Email: privacy@example.com</li>
          <li>Address: [Your Business Address]</li>
        </ul>

        <div class="mt-8">
          <UButton
            to="/contact"
            color="black"
            variant="solid"
          >
            Contact Us
          </UButton>
        </div>
      </div>
    </div>
  </UContainer>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})
</script>