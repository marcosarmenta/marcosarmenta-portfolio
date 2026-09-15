import Link from "next/link";

export function FooterStartProjectLink() {
  return (
    <Link href="/start-a-project" className="text-left transition-colors hover:text-accent">
      Start a Project
    </Link>
  );
}
