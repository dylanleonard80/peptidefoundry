import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const DashboardWishlist = () => {
  // Wishlist functionality can be implemented later
  // For now, show a placeholder state

  return (
    <DashboardLayout title="Wishlist">
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="p-4 rounded-full bg-primary/10 mb-4">
            <Heart className="h-12 w-12 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Your wishlist is empty</h3>
          <p className="text-muted-foreground text-center max-w-sm mb-6">
            Save peptides you're interested in for quick access later.
            Browse our catalog to start building your wishlist.
          </p>
          <Link to="/all-peptides">
            <Button>Browse Peptides</Button>
          </Link>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default DashboardWishlist;
