// client/src/pages/Bookshelf.tsx

import { useQuery } from "@tanstack/react-query";
import type { Book } from "@shared/schema";

export default function Bookshelf() {
  const { data: books, isLoading } = useQuery<Book[]>({
    queryKey: ["/api/books"],
    queryFn: async () => {
      const response = await fetch("/api/books");
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!books || books.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-destructive">No books found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-16">
      <h1 className="text-4xl font-mono mb-8">Bookshelf</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {books.map((book) => (
          <div
            key={book.id}
            className="p-4 border border-gray-700 rounded-lg shadow-lg bg-gray-900"
          >
            <h2 className="text-2xl font-mono">{book.title}</h2>
            <p className="text-muted-foreground font-mono">{book.author}</p>
            {book.imageUrl && (
              <img
                src={book.imageUrl}
                alt={book.title}
                className="w-full h-48 object-cover rounded-md mt-4"
              />
            )}
            {book.review && (
              <p className="text-muted-foreground mt-2">{book.review}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
