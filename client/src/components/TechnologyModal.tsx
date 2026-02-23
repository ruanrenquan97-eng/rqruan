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
import RichTextEditor from "./RichTextEditor";
import ImageUpload from "./ImageUpload";
import { toast } from "sonner";

interface TechnologyModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    technologyId?: number;
    initialData?: {
        slug: string;
        title: string;
        description?: string;
        content: string;
        imageUrl?: string;
        published?: number;
    };
    onSuccess?: () => void;
}

export default function TechnologyModal({
    open,
    onOpenChange,
    technologyId,
    initialData,
    onSuccess,
}: TechnologyModalProps) {
    const [formData, setFormData] = useState({
        slug: "",
        title: "",
        description: "",
        content: "",
        imageUrl: "",
        published: 1,
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                slug: initialData.slug || "",
                title: initialData.title || "",
                description: initialData.description || "",
                content: initialData.content || "",
                imageUrl: initialData.imageUrl || "",
                published: initialData.published ?? 1,
            });
        }
    }, [initialData, open]);

    const createMutation = trpc.technologies.create.useMutation({
        onSuccess: () => {
            toast.success("Technology created successfully!");
            resetForm();
            onOpenChange(false);
            onSuccess?.();
        },
        onError: (error) => {
            toast.error(error.message || "Failed to create technology");
        },
    });

    const updateMutation = trpc.technologies.update.useMutation({
        onSuccess: () => {
            toast.success("Technology updated successfully!");
            resetForm();
            onOpenChange(false);
            onSuccess?.();
        },
        onError: (error) => {
            toast.error(error.message || "Failed to update technology");
        },
    });

    const resetForm = () => {
        setFormData({
            slug: "",
            title: "",
            description: "",
            content: "",
            imageUrl: "",
            published: 1,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.slug || !formData.title || !formData.content) {
            toast.error("Please fill in all required fields");
            return;
        }

        const payload = {
            ...formData,
            published: formData.published ? 1 : 0,
        };

        if (technologyId) {
            updateMutation.mutate({ id: technologyId, ...payload });
        } else {
            createMutation.mutate(payload);
        }
    };

    const isLoading = createMutation.isPending || updateMutation.isPending;
    const isEditing = !!technologyId;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{isEditing ? "Edit Technology" : "Add Technology"}</DialogTitle>
                    <DialogDescription>
                        {isEditing ? "Update" : "Create"} a technology article or competency
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title *</Label>
                            <Input
                                id="title"
                                placeholder="e.g., Cyclic Peptide Technology"
                                value={formData.title}
                                onChange={(e) =>
                                    setFormData({ ...formData, title: e.target.value })
                                }
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="slug">Slug (URL) *</Label>
                            <Input
                                id="slug"
                                placeholder="e.g., cyclic-peptide-tech"
                                value={formData.slug}
                                onChange={(e) =>
                                    setFormData({ ...formData, slug: e.target.value })
                                }
                                disabled={isEditing}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Input
                            id="description"
                            placeholder="Brief summary (optional)"
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({ ...formData, description: e.target.value })
                            }
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="imageUrl">Technology Image</Label>
                        <ImageUpload
                            value={formData.imageUrl}
                            onChange={(url) =>
                                setFormData({ ...formData, imageUrl: url })
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
                            placeholder="Write about this technology..."
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
                            Publish
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
                            {isLoading ? (isEditing ? "Updating..." : "Creating...") : (isEditing ? "Update Technology" : "Create Technology")}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
