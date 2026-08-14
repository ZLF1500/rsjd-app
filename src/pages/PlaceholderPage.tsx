import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 p-6 text-center">
      <p className="text-sm text-muted-foreground">Halaman ini belum dibangun</p>
      <h1 className="text-2xl font-semibold">{title}</h1>
      <Button asChild variant="outline" className="mt-2">
        <Link to="/">Kembali ke Dashboard</Link>
      </Button>
    </div>
  );
}
