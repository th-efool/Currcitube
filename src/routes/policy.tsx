import { createFileRoute, Link } from "@tanstack/react-router";
import { Layers } from "lucide-react";

export const Route = createFileRoute("/policy")({
  component: PrivacyPolicyPage,
  head: () => ({
    meta: [
      { title: "Privacy Policy — SideQuestHQ" },
      {
        name: "description",
        content:
          "Review how SideQuestHQ collects, uses, protects, and shares information.",
      },
    ],
  }),
});

const policySections = [
  {
    title: "Information We Collect",
    content: [
      {
        heading: "Information You Provide",
        body: "When you create or use a SideQuestHQ account, you may provide:",
        items: [
          "Name or display name",
          "Email address",
          "Profile photo",
          "Account credentials",
          "Learning interests and goals",
          "Notes and reflections",
          "Cohort participation information",
          "Messages, comments, or content shared within the platform",
          "Learning resources you submit (including URLs, playlists, videos, articles, and other content sources)",
        ],
      },
      {
        heading: "Information Generated Through Your Use",
        body: "While using SideQuestHQ, we may collect:",
        items: [
          "Learning progress",
          "Completion history",
          "Session activity",
          "Cohort participation data",
          "Time spent learning",
          "Streaks and milestones",
          "Saved content",
          "Preferences and settings",
          "Feedback submissions",
        ],
      },
      {
        heading: "Device and Technical Information",
        body: "We may automatically collect:",
        items: [
          "Device type",
          "Operating system version",
          "App version",
          "Language settings",
          "Time zone",
          "IP address",
          "Crash reports",
          "Diagnostic information",
          "Usage analytics",
        ],
      },
    ],
  },
  {
    title: "How We Use Your Information",
    content: [
      {
        body: "We use information to:",
        items: [
          "Provide and operate SideQuestHQ",
          "Create personalized learning paths",
          "Generate adaptive learning recommendations",
          "Track learning progress and completion",
          "Enable cohort and community features",
          "Improve user experience",
          "Maintain account security",
          "Detect abuse, fraud, or misuse",
          "Analyze platform performance",
          "Provide customer support",
          "Comply with legal obligations",
        ],
      },
    ],
  },
  {
    title: "AI and Content Processing",
    content: [
      {
        body: "SideQuestHQ uses artificial intelligence and automated systems to analyze learning resources submitted by users.",
      },
      {
        body: "This may include:",
        items: [
          "Videos",
          "Playlists",
          "Articles",
          "Web pages",
          "Learning materials",
          "User-provided content",
        ],
      },
      {
        body: "The purpose of this processing is to:",
        items: [
          "Identify learning structure",
          "Generate lesson breakdowns",
          "Create learning paths",
          "Personalize pacing",
          "Recommend next learning steps",
          "Improve continuity and learning progression",
        ],
      },
      {
        body: "Automated recommendations are intended to assist users and do not replace user choice. Users remain in control of their learning goals and decisions.",
      },
    ],
  },
  {
    title: "Cohorts and Community Features",
    content: [
      {
        body: "SideQuestHQ may allow users to participate in public or private cohorts.",
      },
      {
        body: "Information visible to other users may include:",
        items: [
          "Display name",
          "Profile image",
          "Progress indicators",
          "Shared notes",
          "Messages",
          "Community activity",
        ],
      },
      {
        body: "Users should avoid sharing sensitive personal information within public areas of the platform.",
      },
    ],
  },
  {
    title: "Analytics and Performance Monitoring",
    content: [
      {
        body: "We may use analytics and monitoring tools to understand how users interact with SideQuestHQ.",
      },
      {
        body: "This information may include:",
        items: [
          "Feature usage",
          "Session duration",
          "Device information",
          "Error reports",
          "Navigation patterns",
        ],
      },
      {
        body: "Analytics data helps us improve performance, reliability, and user experience.",
      },
    ],
  },
  {
    title: "Third-Party Services",
    content: [
      {
        body: "We may use trusted third-party service providers to operate portions of the platform, including:",
        items: [
          "Authentication providers",
          "Cloud hosting providers",
          "Database providers",
          "Analytics providers",
          "AI infrastructure providers",
          "Customer support providers",
          "Notification services",
        ],
      },
      {
        body: "These providers may process information solely for the purpose of providing services to SideQuestHQ and are contractually required to protect your information.",
      },
    ],
  },
  {
    title: "Data Sharing",
    content: [
      { body: "We do not sell your personal information." },
      {
        body: "We may share information only in the following circumstances:",
      },
      {
        heading: "Service Providers",
        body: "With vendors and partners that help operate the platform.",
      },
      {
        heading: "Legal Requirements",
        body: "If required by law, regulation, legal process, or government request.",
      },
      {
        heading: "Protection of Rights",
        body: "To protect the safety, rights, property, or security of SideQuestHQ, our users, or others.",
      },
      {
        heading: "Business Transfers",
        body: "If SideQuestHQ is involved in a merger, acquisition, financing, or sale of assets.",
      },
    ],
  },
  {
    title: "Data Retention",
    content: [
      {
        body: "We retain information only for as long as reasonably necessary to:",
        items: [
          "Provide services",
          "Maintain account functionality",
          "Comply with legal obligations",
          "Resolve disputes",
          "Enforce agreements",
        ],
      },
      {
        body: "When information is no longer required, it may be deleted, anonymized, or aggregated.",
      },
    ],
  },
  {
    title: "Data Security",
    content: [
      {
        body: "We implement reasonable administrative, technical, and organizational safeguards designed to protect information against:",
        items: [
          "Unauthorized access",
          "Loss",
          "Misuse",
          "Disclosure",
          "Alteration",
          "Destruction",
        ],
      },
      {
        body: "However, no method of electronic transmission or storage can be guaranteed to be completely secure.",
      },
    ],
  },
  {
    title: "Your Rights and Choices",
    content: [
      {
        body: "Depending on your jurisdiction, you may have the right to:",
        items: [
          "Access your information",
          "Correct inaccurate information",
          "Request deletion of your information",
          "Request export of your information",
          "Object to certain processing activities",
          "Withdraw consent where applicable",
        ],
      },
      { body: "Requests may be submitted using the contact information below." },
    ],
  },
  {
    title: "Account Deletion",
    content: [
      { body: "Users may request deletion of their account and associated personal information." },
      {
        body: "When an account deletion request is received:",
        items: [
          "Personal information will be removed or anonymized where feasible",
          "Certain records may be retained if required by law or legitimate business purposes",
          "Public content may remain anonymized where technically necessary",
        ],
      },
      { body: "For account deletion requests, contact us using the information below." },
    ],
  },
  {
    title: "Children's Privacy",
    content: [
      {
        body: "SideQuestHQ is not directed toward children under the age of 13 (or the minimum age required by applicable law).",
      },
      {
        body: "We do not knowingly collect personal information from children without appropriate legal authorization.",
      },
      {
        body: "If you believe a child has provided personal information, please contact us and we will take appropriate steps to remove the information.",
      },
    ],
  },
  {
    title: "International Data Transfers",
    content: [
      {
        body: "Your information may be processed and stored in countries other than your country of residence.",
      },
      {
        body: "By using SideQuestHQ, you acknowledge that your information may be transferred and processed in locations where privacy laws may differ from those in your jurisdiction.",
      },
    ],
  },
  {
    title: "Changes to This Privacy Policy",
    content: [
      { body: "We may update this Privacy Policy periodically." },
      {
        body: "Changes become effective when the updated version is posted within the application or on our website.",
      },
      {
        body: "Continued use of SideQuestHQ after changes are posted constitutes acceptance of the revised policy.",
      },
    ],
  },
  {
    title: "Contact Us",
    content: [
      {
        body: "If you have questions, concerns, or requests regarding this Privacy Policy, please contact:",
      },
    ],
  },
  {
    title: "Consent",
    content: [
      {
        body: "By creating an account or using SideQuestHQ, you acknowledge that you have read and understood this Privacy Policy and agree to its terms.",
      },
    ],
  },
];

function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-neutral-900">
      <header className="border-b border-neutral-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 sm:px-6">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-100 transition-colors group-hover:bg-neutral-200">
              <Layers className="h-4 w-4 text-neutral-800" />
            </div>
            <span className="text-sm font-medium tracking-tight">SideQuestHQ</span>
          </Link>
          <Link
            to="/"
            className="rounded-full border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-950"
          >
            Back home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-12 sm:px-6 lg:py-16">
        <section className="mb-10 rounded-[2rem] border border-neutral-200 bg-white p-8 shadow-sm sm:p-10">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
            Last Updated: June 2026
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-neutral-950 sm:text-5xl">
            Privacy Policy
          </h1>
          <div className="mt-6 space-y-4 text-base leading-7 text-neutral-600">
            <p>Welcome to SideQuestHQ (&quot;SideQuestHQ&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;).</p>
            <p>
              SideQuestHQ helps learners organize, structure, and complete long-form learning content through personalized learning paths, adaptive pacing, and optional community-based cohorts.
            </p>
            <p>
              This Privacy Policy explains what information we collect, how we use it, how we protect it, and the choices available to you regarding your information.
            </p>
            <p>
              By using SideQuestHQ, you agree to the collection and use of information as described in this Privacy Policy.
            </p>
          </div>
        </section>

        <div className="space-y-6">
          {policySections.map((section) => (
            <section
              key={section.title}
              className="rounded-[1.5rem] border border-neutral-200 bg-white p-6 shadow-sm sm:p-8"
            >
              <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
                {section.title}
              </h2>
              <div className="mt-5 space-y-5 text-base leading-7 text-neutral-600">
                {section.content.map((block, index) => (
                  <div key={`${section.title}-${index}`} className="space-y-3">
                    {block.heading && (
                      <h3 className="text-lg font-semibold text-neutral-900">
                        {block.heading}
                      </h3>
                    )}
                    <p>{block.body}</p>
                    {block.items && (
                      <ul className="list-disc space-y-2 pl-6">
                        {block.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
                {section.title === "Contact Us" && (
                  <address className="not-italic text-neutral-700">
                    <strong className="text-neutral-950">SideQuestHQ</strong>
                    <br />
                    Email:{" "}
                    <a className="font-medium text-neutral-950 underline underline-offset-4" href="mailto:privacy@sidequesthq.com">
                      privacy@sidequesthq.com
                    </a>
                    <br />
                    Support Email:{" "}
                    <a className="font-medium text-neutral-950 underline underline-offset-4" href="mailto:support@sidequesthq.com">
                      support@sidequesthq.com
                    </a>
                    <br />
                    Website:{" "}
                    <a className="font-medium text-neutral-950 underline underline-offset-4" href="https://sidequesthq.com">
                      https://sidequesthq.com
                    </a>
                  </address>
                )}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
