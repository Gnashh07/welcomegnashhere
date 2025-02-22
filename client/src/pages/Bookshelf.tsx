import { useQuery } from "@tanstack/react-query";
import type { Book } from "@shared/schema";

export default function Bookshelf() {
  const { data: books, isLoading } = useQuery<Book[]>({
    queryKey: ["/api/books"],
  });

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
      <div className="space-y-4">
        {books?.map((book) => (
          <div key={book.id} className="text-xl">
            {book.title}
            <div className="text-sm text-muted-foreground mt-1">
              by {book.author}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}