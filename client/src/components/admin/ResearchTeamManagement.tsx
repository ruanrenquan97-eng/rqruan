
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Loader2, Plus, Pencil, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";

export default function ResearchTeamManagement() {
    const utils = trpc.useUtils();
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editingMember, setEditingMember] = useState<any>(null);

    const teamQuery = trpc.homepage.getTeam.useQuery();

    const createMember = trpc.homepage.addTeamMember.useMutation({
        onSuccess: () => {
            toast.success("Team member added");
            setIsCreateOpen(false);
            utils.homepage.getTeam.invalidate();
        },
        onError: (err) => toast.error(`Failed to add member: ${err.message}`),
    });

    const updateMember = trpc.homepage.updateTeamMember.useMutation({
        onSuccess: () => {
            toast.success("Team member updated");
            setEditingMember(null);
            utils.homepage.getTeam.invalidate();
        },
        onError: (err) => toast.error(`Failed to update member: ${err.message}`),
    });

    const deleteMember = trpc.homepage.deleteTeamMember.useMutation({
        onSuccess: () => {
            toast.success("Team member deleted");
            utils.homepage.getTeam.invalidate();
        },
        onError: (err) => toast.error(`Failed to delete member: ${err.message}`),
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>, isEdit: boolean) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name") as string,
            title: formData.get("title") as string,
            bio: formData.get("bio") as string,
            initials: formData.get("initials") as string,
            image: (formData.get("image") as string) || undefined,
        };

        if (isEdit && editingMember) {
            updateMember.mutate({ id: editingMember.id, data });
        } else {
            createMember.mutate(data);
        }
    };

    if (teamQuery.isPending) return <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>;

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Research Team</CardTitle>
                <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                    <DialogTrigger asChild>
                        <Button className="gap-2"><Plus size={16} /> Add Member</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader><DialogTitle>Add Team Member</DialogTitle></DialogHeader>
                        <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-4">
                            <div className="space-y-2">
                                <Label>Name</Label>
                                <Input name="name" required placeholder="Dr. Name Surname" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Initials</Label>
                                    <Input name="initials" required placeholder="NS" maxLength={3} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Image URL (Optional)</Label>
                                    <Input name="image" placeholder="/images/team-1.jpg" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Title</Label>
                                <Input name="title" required placeholder="Chief Scientific Officer" />
                            </div>
                            <div className="space-y-2">
                                <Label>Bio</Label>
                                <Textarea name="bio" required placeholder="Short biography..." />
                            </div>
                            <Button type="submit" disabled={createMember.isPending} className="w-full">
                                {createMember.isPending && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
                                Add Member
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {teamQuery.data?.map((member) => (
                        <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg bg-card/50">
                            <div className="flex items-center gap-4">
                                {member.image ? (
                                    <img src={member.image} alt={member.name} className="w-10 h-10 rounded-full object-cover" />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                                        {member.initials}
                                    </div>
                                )}
                                <div>
                                    <div className="font-semibold">{member.name}</div>
                                    <div className="text-sm text-muted-foreground">{member.title}</div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="ghost" size="icon" onClick={() => setEditingMember(member)}>
                                    <Pencil size={16} />
                                </Button>
                                <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10"
                                    onClick={() => deleteMember.mutate(member.id)} disabled={deleteMember.isPending}>
                                    <Trash2 size={16} />
                                </Button>
                            </div>
                        </div>
                    ))}
                    {(!teamQuery.data || teamQuery.data.length === 0) && (
                        <div className="text-center text-muted-foreground py-8">No team members found</div>
                    )}
                </div>

                <Dialog open={!!editingMember} onOpenChange={(open) => !open && setEditingMember(null)}>
                    <DialogContent>
                        <DialogHeader><DialogTitle>Edit Team Member</DialogTitle></DialogHeader>
                        {editingMember && (
                            <form onSubmit={(e) => handleSubmit(e, true)} className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Name</Label>
                                    <Input name="name" defaultValue={editingMember.name} required />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Initials</Label>
                                        <Input name="initials" defaultValue={editingMember.initials} required maxLength={3} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Image URL (Optional)</Label>
                                        <Input name="image" defaultValue={editingMember.image || ""} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Title</Label>
                                    <Input name="title" defaultValue={editingMember.title} required />
                                </div>
                                <div className="space-y-2">
                                    <Label>Bio</Label>
                                    <Textarea name="bio" defaultValue={editingMember.bio} required />
                                </div>
                                <Button type="submit" disabled={updateMember.isPending} className="w-full">
                                    {updateMember.isPending && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
                                    Save Changes
                                </Button>
                            </form>
                        )}
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    );
}
