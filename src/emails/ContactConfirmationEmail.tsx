import { Body, Container, Head, Html, Preview, Text } from "@react-email/components";

export function ContactConfirmationEmail({ name }: { name: string }) {
  const firstName = name.trim().split(/\s+/)[0] || name;

  return (
    <Html>
      <Head />
      <Preview>Got your message — talk soon</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={paragraph}>Hi {firstName},</Text>
          <Text style={paragraph}>
            Thanks for reaching out — I got your message and will get back to you within a day
            or two.
          </Text>
          <Text style={paragraph}>Talk soon,</Text>
          <Text style={paragraph}>Marcos</Text>
        </Container>
      </Body>
    </Html>
  );
}

export default ContactConfirmationEmail;

const main = { backgroundColor: "#f5f5f4", fontFamily: "Helvetica, Arial, sans-serif" };

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "32px",
  maxWidth: "560px",
  borderRadius: "8px",
};

const paragraph = { fontSize: "15px", color: "#333333", lineHeight: "1.6", margin: "0 0 16px" };
