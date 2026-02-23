
import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, Save, Edit2 } from "lucide-react";
import ResearchTeamManagement from "./ResearchTeamManagement";

export default function HomepageManagement() {
    return (
        <div className="space-y-6">
            <HeroSectionEditor />
            <StatsEditor />
            <CompetenciesEditor />
            <ProductSeriesEditor />
            <div className="pt-6 border-t">
                <ResearchTeamManagement />
            </div>
        </div>
    );
}

function HeroSectionEditor() {
    const [heading, setHeading] = useState("");
    const [subheading, setSubheading] = useState("");

    const utils = trpc.useContext();
    const getHeading = trpc.homepage.getSetting.useQuery("hero_heading");
    const getSubheading = trpc.homepage.getSetting.useQuery("hero_subheading");

    useEffect(() => {
        if (getHeading.data) setHeading(getHeading.data);
    }, [getHeading.data]);

    useEffect(() => {
        if (getSubheading.data) setSubheading(getSubheading.data);
    }, [getSubheading.data]);

    const updateSetting = trpc.homepage.updateSetting.useMutation({
        onSuccess: () => {
            toast.success("Hero section saved");
            utils.homepage.getSetting.invalidate();
        },
        onError: () => toast.error("Failed to save hero section"),
    });

    const handleSave = () => {
        updateSetting.mutate({ key: "hero_heading", value: heading });
        updateSetting.mutate({ key: "hero_subheading", value: subheading });
    };

    const isLoading = getHeading.isPending || getSubheading.isPending;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Hero Section</CardTitle>
                <CardDescription>Manage the main banner text on the homepage.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {isLoading ? (
                    <div className="flex justify-center p-4"><Loader2 className="animate-spin" /></div>
                ) : (
                    <>
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">Main Heading</label>
                            <input
                                className="flex h-10 w-full rounded-md border border-input px-3"
                                value={heading}
                                onChange={(e) => setHeading(e.target.value)}
                                placeholder="e.g. Innovating for Health"
                            />
                        </div>
                        <div className="grid gap-2">
                            <label className="text-sm font-medium">Subheading</label>
                            <textarea
                                className="flex min-h-[80px] w-full rounded-md border border-input px-3 py-2 text-sm"
                                value={subheading}
                                onChange={(e) => setSubheading(e.target.value)}
                                placeholder="Description..."
                            />
                        </div>
                        <Button onClick={handleSave} disabled={updateSetting.isPending}>
                            {updateSetting.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save Hero Section
                        </Button>
                    </>
                )}
            </CardContent>
        </Card>
    );
}

function StatsEditor() {
    const utils = trpc.useContext();
    const statsQuery = trpc.homepage.getStats.useQuery();
    const createStat = trpc.homepage.createStat.useMutation({ onSuccess: () => utils.homepage.getStats.invalidate() });
    const deleteStat = trpc.homepage.deleteStat.useMutation({ onSuccess: () => utils.homepage.getStats.invalidate() });

    const [isAdding, setIsAdding] = useState(false);
    const [newStat, setNewStat] = useState({ number: "", label: "", description: "" });

    const handleAdd = async () => {
        if (!newStat.number || !newStat.label) return;
        await createStat.mutateAsync(newStat);
        setNewStat({ number: "", label: "", description: "" });
        setIsAdding(false);
        toast.success("Stat added");
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Key Statistics</CardTitle>
                <CardDescription>Display key numbers about the company.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    {statsQuery.isPending ? <Loader2 className="animate-spin" /> : statsQuery.data?.map(stat => (
                        <div key={stat.id} className="flex items-center justify-between border p-3 rounded-md">
                            <div>
                                <p className="font-bold">{stat.number}</p>
                                <p className="text-sm text-muted-foreground">{stat.label}</p>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => {
                                if (confirm("Delete this stat?")) deleteStat.mutate(stat.id);
                            }}>
                                <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                        </div>
                    ))}
                </div>

                {isAdding ? (
                    <div className="border p-4 rounded-md space-y-3 bg-muted/20">
                        <input
                            className="flex h-9 w-full rounded-md border border-input px-3 text-sm"
                            placeholder="Number (e.g. 50+)"
                            value={newStat.number}
                            onChange={e => setNewStat({ ...newStat, number: e.target.value })}
                        />
                        <input
                            className="flex h-9 w-full rounded-md border border-input px-3 text-sm"
                            placeholder="Label (e.g. Countries)"
                            value={newStat.label}
                            onChange={e => setNewStat({ ...newStat, label: e.target.value })}
                        />
                        <div className="flex gap-2">
                            <Button size="sm" onClick={handleAdd} disabled={!newStat.number || !newStat.label}>Save</Button>
                            <Button size="sm" variant="ghost" onClick={() => setIsAdding(false)}>Cancel</Button>
                        </div>
                    </div>
                ) : (
                    <Button variant="outline" size="sm" onClick={() => setIsAdding(true)}>
                        <Plus className="h-4 w-4 mr-2" /> Add Stat
                    </Button>
                )}
            </CardContent>
        </Card>
    );
}

function CompetenciesEditor() {
    const utils = trpc.useContext();
    const query = trpc.homepage.getCompetencies.useQuery();
    const create = trpc.homepage.createCompetency.useMutation({ onSuccess: () => utils.homepage.getCompetencies.invalidate() });
    const remove = trpc.homepage.deleteCompetency.useMutation({ onSuccess: () => utils.homepage.getCompetencies.invalidate() });

    const [isAdding, setIsAdding] = useState(false);
    const [newItem, setNewItem] = useState({ title: "", description: "" });

    const handleAdd = async () => {
        if (!newItem.title) return;
        await create.mutateAsync(newItem);
        setNewItem({ title: "", description: "" });
        setIsAdding(false);
        toast.success("Competency added");
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Core Competencies</CardTitle>
                <CardDescription>Manage the competencies list.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    {query.isPending ? <Loader2 className="animate-spin" /> : query.data?.map(item => (
                        <div key={item.id} className="flex items-center justify-between border p-3 rounded-md">
                            <div>
                                <p className="font-medium">{item.title}</p>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => {
                                if (confirm("Delete this?")) remove.mutate(item.id);
                            }}>
                                <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                        </div>
                    ))}
                </div>

                {isAdding ? (
                    <div className="border p-4 rounded-md space-y-3 bg-muted/20">
                        <input
                            className="flex h-9 w-full rounded-md border border-input px-3 text-sm"
                            placeholder="Title"
                            value={newItem.title}
                            onChange={e => setNewItem({ ...newItem, title: e.target.value })}
                        />
                        <textarea
                            className="flex min-h-[60px] w-full rounded-md border border-input px-3 py-2 text-sm"
                            placeholder="Description"
                            value={newItem.description}
                            onChange={e => setNewItem({ ...newItem, description: e.target.value })}
                        />
                        <div className="flex gap-2">
                            <Button size="sm" onClick={handleAdd} disabled={!newItem.title}>Save</Button>
                            <Button size="sm" variant="ghost" onClick={() => setIsAdding(false)}>Cancel</Button>
                        </div>
                    </div>
                ) : (
                    <Button variant="outline" size="sm" onClick={() => setIsAdding(true)}>
                        <Plus className="h-4 w-4 mr-2" /> Add Competency
                    </Button>
                )}
            </CardContent>
        </Card>
    );
}

function ProductSeriesEditor() {
    const utils = trpc.useContext();
    const query = trpc.homepage.getProductSeries.useQuery();
    const create = trpc.homepage.createProductSeries.useMutation({ onSuccess: () => utils.homepage.getProductSeries.invalidate() });
    const remove = trpc.homepage.deleteProductSeries.useMutation({ onSuccess: () => utils.homepage.getProductSeries.invalidate() });

    const [isAdding, setIsAdding] = useState(false);
    const [newItem, setNewItem] = useState({ title: "", countLabel: "", description: "" });

    const handleAdd = async () => {
        if (!newItem.title) return;
        await create.mutateAsync(newItem);
        setNewItem({ title: "", countLabel: "", description: "" });
        setIsAdding(false);
        toast.success("Series added");
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Product Series Preview</CardTitle>
                <CardDescription>Manage the product series highlights.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    {query.isPending ? <Loader2 className="animate-spin" /> : query.data?.map(item => (
                        <div key={item.id} className="flex items-center justify-between border p-3 rounded-md">
                            <div>
                                <p className="font-medium">{item.title}</p>
                                <p className="text-xs text-muted-foreground">{item.countLabel}</p>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => {
                                if (confirm("Delete this?")) remove.mutate(item.id);
                            }}>
                                <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                        </div>
                    ))}
                </div>

                {isAdding ? (
                    <div className="border p-4 rounded-md space-y-3 bg-muted/20">
                        <input
                            className="flex h-9 w-full rounded-md border border-input px-3 text-sm"
                            placeholder="Title (e.g. Skin Care)"
                            value={newItem.title}
                            onChange={e => setNewItem({ ...newItem, title: e.target.value })}
                        />
                        <input
                            className="flex h-9 w-full rounded-md border border-input px-3 text-sm"
                            placeholder="Label (e.g. 5 Products)"
                            value={newItem.countLabel}
                            onChange={e => setNewItem({ ...newItem, countLabel: e.target.value })}
                        />
                        <textarea
                            className="flex min-h-[60px] w-full rounded-md border border-input px-3 py-2 text-sm"
                            placeholder="Description"
                            value={newItem.description}
                            onChange={e => setNewItem({ ...newItem, description: e.target.value })}
                        />
                        <div className="flex gap-2">
                            <Button size="sm" onClick={handleAdd} disabled={!newItem.title}>Save</Button>
                            <Button size="sm" variant="ghost" onClick={() => setIsAdding(false)}>Cancel</Button>
                        </div>
                    </div>
                ) : (
                    <Button variant="outline" size="sm" onClick={() => setIsAdding(true)}>
                        <Plus className="h-4 w-4 mr-2" /> Add Series
                    </Button>
                )}
            </CardContent>
        </Card>
    );
}
