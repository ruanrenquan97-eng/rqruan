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
import { toast } from "sonner";
import ImageUpload from "./ImageUpload";

interface AboutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contentId?: number;
  initialData?: {
    section: string;
    title?: string;
    content: string;
    imageUrl?: string;
    order?: number;
    published?: number;
  };
  onSuccess?: () => void;
}

export default function AboutModal({
  open,
  onOpenChange,
  contentId,
  initialData,
  onSuccess,
}: AboutModalProps) {
  const [formData, setFormData] = useState({
    section: "",
    title: "",
    content: "",
    imageUrl: "",
    order: 0,
    published: 1,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        section: initialData.section || "",
        title: initialData.title || "",
        content: initialData.content || "",
        imageUrl: initialData.imageUrl || "",
        order: initialData.order || 0,
        published: initialData.published || 1,
      });
    }
  }, [initialData, open]);

  const createMutation = trpc.about.create.useMutation({
    onSuccess: () => {
      toast.success("About content created successfully!");
      resetForm();
      onOpenChange(false);
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create content");
    },
  });

  const updateMutation = trpc.about.update.useMutation({
    onSuccess: () => {
      toast.success("About content updated successfully!");
      resetForm();
      onOpenChange(false);
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update content");
    },
  });

  const resetForm = () => {
    setFormData({
      section: "",
      title: "",
      content: "",
      imageUrl: "",
      order: 0,
      published: 1,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.section || !formData.content) {
      toast.error("Please fill in all required fields");
      return;
    }

    const payload = {
      ...formData,
      published: formData.published ? 1 : 0,
    };

    if (contentId) {
      updateMutation.mutate({ id: contentId, ...payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const isLoading = createMutation.isPending || updateMutation.isPending;
  const isEditing = !!contentId;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit About Content" : "Add About Content"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Update" : "Create"} about page content section
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="section">Section Key *</Label>
              <Input
                id="section"
                placeholder="e.g., hero, who-we-are, mission"
                value={formData.section}
                onChange={(e) =>
                  setFormData({ ...formData, section: e.target.value })
                }
                disabled={isEditing}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="order">Display Order</Label>
              <Input
                id="order"
                type="number"
                value={formData.order}
                onChange={(e) =>
                  setFormData({ ...formData, order: parseInt(e.target.value) })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Section Title</Label>
            <Input
              id="title"
              placeholder="Section title (optional)"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl">Section Image (Optional)</Label>
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
              placeholder="Write about content here..."
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
              {isLoading ? (isEditing ? "Updating..." : "Creating...") : (isEditing ? "Update Content" : "Create Content")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
