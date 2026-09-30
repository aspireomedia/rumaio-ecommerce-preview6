import { ErrorExperience } from "@/components/ErrorExperience";

export default async function StatusPage({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;
  return <ErrorExperience state={state} />;
}
