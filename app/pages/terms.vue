<template>
  <UContainer class="py-12">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold mb-8">Terms of Service</h1>
      <p class="text-gray-600 dark:text-gray-400 mb-8">
        Last updated: {{ new Date().toLocaleDateString() }}
      </p>

      <div class="prose dark:prose-invert max-w-none">
        <!-- Agreement -->
        <h2>1. Agreement to Terms</h2>
        <p>
          By accessing or using WithWords ("Service"), you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access the Service.
        </p>

        <!-- Definitions -->
        <h2>2. Definitions</h2>
        <ul>
          <li><strong>Service:</strong> The WithWords AI code generation platform and related features</li>
          <li><strong>User:</strong> Any individual or entity accessing or using the Service</li>
          <li><strong>Generated Content:</strong> Code, suggestions, and other outputs produced by our AI system</li>
          <li><strong>User Content:</strong> Any input, code, or information provided by users to the Service</li>
        </ul>

        <!-- AI Code Generation -->
        <h2>3. AI Code Generation Service</h2>
        <h3>3.1 Service Description</h3>
        <p>
          WithWords provides AI-powered code generation and assistance for UI development. While we strive for accuracy and quality, users acknowledge that:
        </p>
        <ul>
          <li>AI-generated code may require human review and modification</li>
          <li>The Service may not be suitable for all development needs</li>
          <li>Results may vary based on input quality and complexity</li>
        </ul>

        <h3>3.2 Usage Limits</h3>
        <p>
          Your subscription plan determines your usage limits. We reserve the right to:
        </p>
        <ul>
          <li>Monitor and enforce usage limits</li>
          <li>Throttle or suspend accounts exceeding limits</li>
          <li>Modify limits with reasonable notice</li>
        </ul>

        <!-- Intellectual Property -->
        <h2>4. Intellectual Property Rights</h2>
        <h3>4.1 Generated Code</h3>
        <p>
          Users retain rights to code generated through the Service, subject to the following conditions:
        </p>
        <ul>
          <li>Generated code may be used in both commercial and non-commercial projects</li>
          <li>Attribution is not required but appreciated</li>
          <li>Users may not claim AI capabilities as their own</li>
        </ul>

        <h3>4.2 Service Rights</h3>
        <p>
          WithWords retains all rights to:
        </p>
        <ul>
          <li>The AI model and underlying technology</li>
          <li>Service features and improvements</li>
          <li>Platform interface and design</li>
        </ul>

        <!-- User Responsibilities -->
        <h2>5. User Responsibilities</h2>
        <h3>5.1 Acceptable Use</h3>
        <p>Users agree not to:</p>
        <ul>
          <li>Generate malicious or harmful code</li>
          <li>Attempt to reverse engineer the AI system</li>
          <li>Share accounts or access credentials</li>
          <li>Automate or bulk process requests without permission</li>
          <li>Use the Service for illegal purposes</li>
        </ul>

        <h3>5.2 Content Guidelines</h3>
        <p>Users must ensure their inputs:</p>
        <ul>
          <li>Do not violate intellectual property rights</li>
          <li>Do not contain sensitive or personal data</li>
          <li>Comply with applicable laws and regulations</li>
        </ul>

        <!-- Privacy and Data -->
        <h2>6. Privacy and Data Handling</h2>
        <p>
          Our data practices are governed by our Privacy Policy. Key points include:
        </p>
        <ul>
          <li>User inputs may be used to improve the Service</li>
          <li>Generated code is not shared with other users</li>
          <li>We implement industry-standard security measures</li>
          <li>Users control their data retention preferences</li>
        </ul>

        <!-- Subscriptions -->
        <h2>7. Subscriptions and Payments</h2>
        <p>
          Subscription terms and conditions:
        </p>
        <ul>
          <li>Payments are processed securely through Stripe</li>
          <li>Subscriptions auto-renew unless cancelled</li>
          <li>Refunds are handled case-by-case</li>
          <li>Pricing may change with notice</li>
        </ul>

        <!-- Disclaimers -->
        <h2>8. Disclaimers and Limitations</h2>
        <h3>8.1 Service Disclaimer</h3>
        <p>
          The Service is provided "as is" without warranties of any kind. We do not guarantee:
        </p>
        <ul>
          <li>Uninterrupted or error-free service</li>
          <li>Perfect accuracy of generated code</li>
          <li>Suitability for specific purposes</li>
        </ul>

        <h3>8.2 Limitation of Liability</h3>
        <p>
          WithWords shall not be liable for:
        </p>
        <ul>
          <li>Direct or indirect damages from using generated code</li>
          <li>Business losses or interruptions</li>
          <li>Data loss or security breaches</li>
          <li>Third-party claims</li>
        </ul>

        <!-- Termination -->
        <h2>9. Termination</h2>
        <p>
          We may suspend or terminate accounts that:
        </p>
        <ul>
          <li>Violate these terms</li>
          <li>Engage in fraudulent activity</li>
          <li>Pose security risks</li>
          <li>Have prolonged inactivity</li>
        </ul>

        <!-- Changes -->
        <h2>10. Changes to Terms</h2>
        <p>
          We reserve the right to modify these terms at any time. Users will be notified of significant changes. Continued use of the Service constitutes acceptance of updated terms.
        </p>

        <!-- Contact -->
        <h2>11. Contact Information</h2>
        <p>
          For questions about these terms, contact us at:
        </p>
        <ul>
          <li>Email: legal@example.com</li>
          <li>Address: [Your Business Address]</li>
        </ul>

        <div class="mt-8 flex gap-4">
          <UButton
            to="/privacy"
            color="black"
            variant="solid"
          >
            Privacy Policy
          </UButton>
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
  layout: 'default',
  auth: false
})
</script>