import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Text,
} from "@react-email/components";

export function InquiryConfirmationEmail({
  name,
  calUrl,
}: {
  name: string;
  calUrl: string;
}) {
  const firstName = name.trim().split(/\s+/)[0] || name;

  return (
    <Html>
      <Head />
      <Preview>Thanks for reaching out — here&apos;s what happens next</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={paragraph}>Hi {firstName},</Text>
          <Text style={paragraph}>
            Thanks for telling me about your project — I got it, and I&apos;m looking forward to
            reading through the details. I read every inquiry myself and usually reply within a
            day or two.
          </Text>
          <Text style={paragraph}>
            If you&apos;d rather skip the back-and-forth, feel free to grab a time on my calendar
            and we can talk it through directly.
          </Text>
          <Button href={calUrl} style={button}>
            Book a time
          </Button>
          <Text style={paragraph}>Talk soon,</Text>
          <Text style={paragraph}>Marcos</Text>
        </Container>
      </Body>
    </Html>
  );
}

export default InquiryConfirmationEmail;

const main = { backgroundColor: "#f5f5f4", fontFamily: "Helvetica, Arial, sans-serif" };

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "32px",
  maxWidth: "560px",
  borderRadius: "8px",
};

const paragraph = { fontSize: "15px", color: "#333333", lineHeight: "1.6", margin: "0 0 16px" };

const button = {
  backgroundColor: "#111111",
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: 600,
  textDecoration: "none",
  padding: "12px 24px",
  borderRadius: "9999px",
  display: "inline-block",
  margin: "8px 0 24px",
};
