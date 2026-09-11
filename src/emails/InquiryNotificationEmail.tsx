import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import type { InquirySubmission } from "@/lib/inquiry";

export function InquiryNotificationEmail({
  name,
  email,
  projectType,
  budgetRange,
  timeline,
  description,
  referenceLink,
}: InquirySubmission) {
  return (
    <Html>
      <Head />
      <Preview>New project inquiry from {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>New project inquiry</Heading>

          <Section>
            <Field label="Name" value={name} />
            <Field label="Email" value={email} />
            <Field label="Project type" value={projectType.join(", ")} />
            <Field label="Budget range" value={budgetRange} />
            <Field label="Timeline" value={timeline} />
            {referenceLink && <Field label="Reference link" value={referenceLink} />}
          </Section>

          <Hr style={hr} />

          <Section>
            <Text style={label}>Description</Text>
            <Text style={description_}>{description}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

function Field({ label: fieldLabel, value }: { label: string; value: string }) {
  return (
    <Text style={field}>
      <span style={label}>{fieldLabel}: </span>
      {value}
    </Text>
  );
}

export default InquiryNotificationEmail;

const main = { backgroundColor: "#f5f5f4", fontFamily: "Helvetica, Arial, sans-serif" };

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "32px",
  maxWidth: "560px",
  borderRadius: "8px",
};

const heading = { fontSize: "18px", fontWeight: 600, color: "#111111", marginBottom: "16px" };

const field = { fontSize: "14px", color: "#333333", margin: "0 0 8px" };

const label = { fontWeight: 600, color: "#111111" };

const description_ = {
  fontSize: "14px",
  color: "#333333",
  whiteSpace: "pre-wrap" as const,
  lineHeight: "1.6",
};

const hr = { borderColor: "#e5e5e4", margin: "20px 0" };
