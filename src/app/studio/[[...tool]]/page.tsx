import Studio from "./Studio";

export const dynamic = "force-static";

export async function generateStaticParams() {
  return [{ tool: [] }];
}

export default function StudioPage() {
  return <Studio />;
}
