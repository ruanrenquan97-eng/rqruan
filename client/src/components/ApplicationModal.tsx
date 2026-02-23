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
import RichTextEditor from "./RichTextEditor";
import { toast } from "sonner";

interface ApplicationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  applicationId?: number;
  onSuccess?: () => void;
}

export default function ApplicationModal({
  open,
  onOpenChange,
  applicationId,
  onSuccess,
}: ApplicationModalProps) {
  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    description: "",
    content: "",
    icon: "Droplet",
    imageUrl: "",
    published: 0,
  });

  const createApplicationMutation = trpc.applications.create.useMutation({
    onSuccess: () => {
      toast.success("Application created successfully!");
      resetForm();
      onOpenChange(false);
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create application");
    },
  });

  const updateApplicationMutation = trpc.applications.update.useMutation({
    onSuccess: () => {
      toast.success("Application updated successfully!");
      resetForm();
      onOpenChange(false);
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update application");
    },
  });

  const resetForm = () => {
    setFormData({
      slug: "",
      title: "",
      description: "",
      content: "",
      icon: "Droplet",
      imageUrl: "",
      published: 0,
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

    if (applicationId) {
      updateApplicationMutation.mutate({ id: applicationId, ...payload });
    } else {
      createApplicationMutation.mutate(payload);
    }
  };

  const isLoading = createApplicationMutation.isPending || updateApplicationMutation.isPending;
  const isEditing = !!applicationId;

  const iconOptions = [
    "Droplet",
    "Zap",
    "Shield",
    "Heart",
    "Leaf",
    "Beaker",
    "Sparkles",
    "Target",
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Application" : "Add Application"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Update" : "Create"} a skincare application solution
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="slug">Slug *</Label>
              <Input
                id="slug"
                placeholder="application-name"
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="icon">Icon</Label>
              <select
                id="icon"
                value={formData.icon}
                onChange={(e) =>
                  setFormData({ ...formData, icon: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-md bg-background"
              >
                {iconOptions.map((icon) => (
                  <option key={icon} value={icon}>
                    {icon}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              placeholder="Application title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
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
              placeholder="Write application details here..."
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
              {isLoading ? (isEditing ? "Updating..." : "Creating...") : (isEditing ? "Update Application" : "Create Application")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
