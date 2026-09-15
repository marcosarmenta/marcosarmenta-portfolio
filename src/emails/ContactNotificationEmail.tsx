import { Body, Container, Head, Heading, Hr, Html, Preview, Section, Text } from "@react-email/components";
import type { ContactSubmission } from "@/lib/contact";

export function ContactNotificationEmail({ name, email, message }: ContactSubmission) {
  return (
    <Html>
      <Head />
      <Preview>New message from {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>New contact message</Heading>

          <Section>
            <Text style={field}>
              <span style={label}>Name: </span>
              {name}
            </Text>
            <Text style={field}>
              <span style={label}>Email: </span>
              {email}
            </Text>
          </Section>

          <Hr style={hr} />

          <Section>
            <Text style={label}>Message</Text>
            <Text style={message_}>{message}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default ContactNotificationEmail;

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

const message_ = {
  fontSize: "14px",
  color: "#333333",
  whiteSpace: "pre-wrap" as const,
  lineHeight: "1.6",
};

const hr = { borderColor: "#e5e5e4", margin: "20px 0" };
