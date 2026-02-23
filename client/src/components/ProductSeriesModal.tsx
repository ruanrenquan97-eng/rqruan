import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import ImageUpload from "./ImageUpload";

interface ProductSeriesModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    seriesId?: number;
    initialData?: any;
    onSuccess?: () => void;
}

export default function ProductSeriesModal({
    open,
    onOpenChange,
    seriesId,
    initialData,
    onSuccess,
}: ProductSeriesModalProps) {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        imageUrl: "",
        order: 0,
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || "",
                description: initialData.description || "",
                imageUrl: initialData.imageUrl || "",
                order: initialData.order || 0,
            });
        } else {
            setFormData({
                name: "",
                description: "",
                imageUrl: "",
                order: 0,
            });
        }
    }, [initialData, open]);

    const createSeriesMutation = trpc.productSeries.create.useMutation({
        onSuccess: () => {
            toast.success("Series created successfully!");
            onOpenChange(false);
            onSuccess?.();
        },
        onError: (error) => {
            toast.error(error.message || "Failed to create series");
        },
    });

    const updateSeriesMutation = trpc.productSeries.update.useMutation({
        onSuccess: () => {
            toast.success("Series updated successfully!");
            onOpenChange(false);
            onSuccess?.();
        },
        onError: (error) => {
            toast.error(error.message || "Failed to update series");
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name) {
            toast.error("Please fill in all required fields");
            return;
        }

        if (seriesId) {
            updateSeriesMutation.mutate({ id: seriesId, ...formData });
        } else {
            createSeriesMutation.mutate(formData);
        }
    };

    const isLoading = createSeriesMutation.isPending || updateSeriesMutation.isPending;
    const isEditing = !!seriesId;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>{isEditing ? "Edit Product Categories" : "Add Product Categories"}</DialogTitle>
                    <DialogDescription>
                        {isEditing ? "Update" : "Create"} a product category for better organization.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Series Name *</Label>
                        <Input
                            id="name"
                            placeholder="e.g. Collagen Peptides"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                            }
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description (Optional)</Label>
                        <Textarea
                            id="description"
                            placeholder="Brief description of this series"
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({ ...formData, description: e.target.value })
                            }
                            rows={3}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="imageUrl">Series Image (Optional)</Label>
                        <ImageUpload
                            value={formData.imageUrl}
                            onChange={(url) =>
                                setFormData({ ...formData, imageUrl: url })
                            }
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="order">Display Order</Label>
                        <Input
                            id="order"
                            type="number"
                            value={formData.order}
                            onChange={(e) =>
                                setFormData({ ...formData, order: parseInt(e.target.value) || 0 })
                            }
                        />
                        <p className="text-xs text-muted-foreground">Lower numbers appear first</p>
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
                            {isLoading ? (isEditing ? "Updating..." : "Creating...") : (isEditing ? "Update Series" : "Create Series")}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
