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
          By accessing or using NuxtUI Chat ("the Service"), you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you do not have permission to access the Service.
        </p>

        <!-- Definitions -->
        <h2>2. Definitions</h2>
        <ul>
          <li><strong>Service:</strong> Refers to the NuxtUI Chat application.</li>
          <li><strong>User:</strong> Any individual or entity that accesses or uses the Service.</li>
          <li><strong>Content:</strong> All information, data, text, or other materials uploaded or generated through the Service.</li>
        </ul>

        <!-- User Obligations -->
        <h2>3. User Obligations</h2>
        <p>
          Users of the Service agree to:
        </p>
        <ul>
          <li>Provide accurate and complete registration information</li>
          <li>Maintain the security of their account credentials</li>
          <li>Use the Service in compliance with all applicable laws and regulations</li>
          <li>Not engage in any activity that interferes with or disrupts the Service</li>
          <li>Not attempt to gain unauthorized access to any part of the Service</li>
        </ul>

        <!-- Privacy -->
        <h2>4. Privacy Policy</h2>
        <p>
          Our Privacy Policy describes how we handle the information you provide to us when you use our Service. By using the Service, you agree to the collection and use of information in accordance with our Privacy Policy.
        </p>

        <!-- Subscriptions -->
        <h2>5. Subscriptions and Payments</h2>
        <p>
          Some aspects of the Service are provided on a subscription basis. By selecting a subscription plan, you agree to:
        </p>
        <ul>
          <li>Pay all applicable fees as they become due</li>
          <li>Provide valid payment information</li>
          <li>Accept responsibility for all charges incurred under your account</li>
        </ul>

        <!-- Intellectual Property -->
        <h2>6. Intellectual Property Rights</h2>
        <p>
          The Service and its original content, features, and functionality are owned by NuxtUI Chat and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
        </p>

        <!-- Limitation of Liability -->
        <h2>7. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, NuxtUI Chat shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from:
        </p>
        <ul>
          <li>Your use or inability to use the Service</li>
          <li>Any unauthorized access to or use of our servers and/or any personal information stored therein</li>
          <li>Any interruption or cessation of transmission to or from the Service</li>
          <li>Any bugs, viruses, trojan horses, or the like that may be transmitted to or through the Service</li>
        </ul>

        <!-- Termination -->
        <h2>8. Termination</h2>
        <p>
          We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever, including but not limited to a breach of the Terms.
        </p>

        <!-- Changes to Terms -->
        <h2>9. Changes to Terms</h2>
        <p>
          We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
        </p>

        <!-- Contact -->
        <h2>10. Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us at:
        </p>
        <ul>
          <li>Email: support@example.com</li>
          <li>Address: [Your Business Address]</li>
        </ul>

        <!-- Governing Law -->
        <h2>11. Governing Law</h2>
        <p>
          These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.
        </p>

        <!-- Severability -->
        <h2>12. Severability</h2>
        <p>
          If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
        </p>
      </div>

      <div class="mt-12 flex justify-center">
        <UButton
          to="/"
          variant="ghost"
        >
          Return to Home
        </UButton>
      </div>
    </div>
  </UContainer>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})
</script>