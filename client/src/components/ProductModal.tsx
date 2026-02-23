import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { RefreshCw } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import RichTextEditor from "./RichTextEditor";
import { toast } from "sonner";

interface ProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productId?: number;
  onSuccess?: () => void;
}

export default function ProductModal({
  open,
  onOpenChange,
  productId,
  onSuccess,
}: ProductModalProps) {
  const [formData, setFormData] = useState({
    slug: "",
    name: "",
    series: "collagen-peptides",
    description: "",
    content: "",
    inci: "",
    specifications: "",
    imageUrl: "",
    published: 0,
  });

  const productSeriesQuery = trpc.productSeries.listAll.useQuery();

  // Fetch product data if editing
  const { data: productData, isLoading: isFetchingProduct } = trpc.products.getById.useQuery(
    { id: productId! },
    {
      enabled: !!productId,
      refetchOnWindowFocus: false
    }
  );

  useEffect(() => {
    if (productData) {
      setFormData({
        slug: productData.slug,
        name: productData.name,
        series: productData.series,
        description: productData.description || "",
        content: productData.content || "",
        inci: productData.inci || "",
        specifications: productData.specifications || "",
        imageUrl: productData.imageUrl || "",
        published: productData.published,
      });
    } else if (!productId) {
      resetForm();
    }
  }, [productData, productId]);

  const createProductMutation = trpc.products.create.useMutation({
    onSuccess: () => {
      toast.success("Product created successfully!");
      resetForm();
      onOpenChange(false);
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create product");
    },
  });

  const updateProductMutation = trpc.products.update.useMutation({
    onSuccess: () => {
      toast.success("Product updated successfully!");
      resetForm();
      onOpenChange(false);
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update product");
    },
  });

  const resetForm = () => {
    setFormData({
      slug: "",
      name: "",
      series: "collagen-peptides",
      description: "",
      content: "",
      inci: "",
      specifications: "",
      imageUrl: "",
      published: 0,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.slug || !formData.name || !formData.content) {
      toast.error("Please fill in all required fields");
      return;
    }

    const payload = {
      ...formData,
      published: formData.published ? 1 : 0,
    };

    if (productId) {
      updateProductMutation.mutate({ id: productId, ...payload });
    } else {
      createProductMutation.mutate(payload);
    }
  };

  const isLoading = createProductMutation.isPending || updateProductMutation.isPending;
  const isEditing = !!productId;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Product" : "Add Product"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Update" : "Create"} a product for the Mellpro Swiss Innovation Center
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="slug">Slug *</Label>
              <Input
                id="slug"
                placeholder="product-name"
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                required
              />
            </div>



            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="series">Series *</Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2 text-xs"
                  onClick={() => productSeriesQuery.refetch()}
                >
                  <RefreshCw size={12} className="mr-1" />
                  Refresh
                </Button>
              </div>
              <Select
                value={formData.series}
                onValueChange={(value) =>
                  setFormData({ ...formData, series: value })
                }
              >
                <SelectTrigger id="series">
                  <SelectValue placeholder="Select a series" />
                </SelectTrigger>
                <SelectContent>
                  {productSeriesQuery.data?.map((series) => (
                    <SelectItem key={series.id} value={series.name}>
                      {series.name}
                    </SelectItem>
                  ))}
                  {(!productSeriesQuery.data || productSeriesQuery.data.length === 0) && (
                    <SelectItem value="default" disabled>No series found. Create one first.</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Product Name *</Label>
            <Input
              id="name"
              placeholder="Product name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Brief description (optional)"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="inci">INCI Name</Label>
            <Textarea
              id="inci"
              placeholder="INCI nomenclature (optional)"
              value={formData.inci}
              onChange={(e) =>
                setFormData({ ...formData, inci: e.target.value })
              }
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="specifications">Specifications</Label>
            <Textarea
              id="specifications"
              placeholder="Technical specifications (optional)"
              value={formData.specifications}
              onChange={(e) =>
                setFormData({ ...formData, specifications: e.target.value })
              }
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              id="imageUrl"
              placeholder="https://example.com/image.jpg"
              value={formData.imageUrl}
              onChange={(e) =>
                setFormData({ ...formData, imageUrl: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Content *</Label>
            <RichTextEditor
              value={formData.content}
              onChange={(content) =>
                setFormData({ ...formData, content })
              }
              placeholder="Write product details here..."
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="published"
              checked={formData.published === 1}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  published: e.target.checked ? 1 : 0,
                })
              }
              className="rounded"
            />
            <Label htmlFor="published" className="cursor-pointer">
              Publish immediately
            </Label>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (isEditing ? "Updating..." : "Creating...") : (isEditing ? "Update Product" : "Create Product")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
