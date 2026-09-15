import { MagneticButton } from "@/components/ui/MagneticButton";

export function StartProjectButton({ className = "" }: { className?: string }) {
  return (
    <MagneticButton href="/start-a-project" variant="primary" className={className}>
      Start a Project
    </MagneticButton>
  );
}
