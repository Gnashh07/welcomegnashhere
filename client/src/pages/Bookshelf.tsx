import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Book } from "@shared/schema";

const bookCovers = [
  "https://images.unsplash.com/photo-1589829085413-56de8ae18c73",
  "https://images.unsplash.com/photo-1555252586-d77e8c828e41",
  "https://images.unsplash.com/photo-1612969308146-066d55f37ccb",
  "https://images.unsplash.com/photo-1592496431122-2349e0fbc666",
];

export default function Bookshelf() {
  const { data: books, isLoading } = useQuery<Book[]>({
    queryKey: ["/api/books"],
  });

  if (isLoading) {
    return <div>Loading books...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">My Bookshelf</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {books?.map((book, index) => (
          <Card key={book.id} className="overflow-hidden">
            <div className="aspect-[3/4] relative">
              <img
                src={bookCovers[index % bookCovers.length]}
                alt={book.title}
                className="object-cover w-full h-full"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-lg">{book.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{book.author}</p>
            </CardHeader>
            {book.review && (
              <CardContent>
                <p className="text-sm">{book.review}</p>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
