import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { trpc } from "@/lib/trpc";
import { Loader2 } from "lucide-react";

export default function ResearchTeam() {
    const teamQuery = trpc.homepage.getTeam.useQuery();

    if (teamQuery.isPending) {
        return (
            <section className="py-24 bg-muted/50">
                <div className="container flex justify-center">
                    <Loader2 className="animate-spin text-primary" />
                </div>
            </section>
        );
    }

    const team = (teamQuery.data && teamQuery.data.length > 0) ? teamQuery.data : [
        {
            name: "Dr. Hans Müller",
            title: "Chief Scientific Officer",
            bio: "Ph.D. in Molecular Biology from ETH Zurich. 20+ years of experience in transdermal delivery systems.",
            initials: "HM",
            image: undefined
        },
        {
            name: "Dr. Sarah Weber",
            title: "Head of Synthetic Biology",
            bio: "Leading expert in green synthesis and fermentation technologies. Formerly at leading Swiss biotech firms.",
            initials: "SW",
            image: undefined
        },
        {
            name: "Prof. David Chen",
            title: "Dermatology Research Lead",
            bio: "Specializes in clinical efficacy testing and skin barrier repair mechanisms.",
            initials: "DC",
            image: undefined
        },
        {
            name: "Dr. Elena Rossi",
            title: "AI Drug Discovery",
            bio: "Pioneering the AlphaDrug™ AI platform for novel peptide discovery.",
            initials: "ER",
            image: undefined
        }
    ];

    return (
        <section className="py-24 bg-muted/50">
            <div className="container">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-[family-name:var(--font-heading)]">
                        Our Research Team
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                        World-class scientists and researchers driving innovation in Switzerland
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {team.map((member, index) => (
                        <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow bg-card">
                            <CardHeader className="text-center pb-2">
                                <div className="flex justify-center mb-4">
                                    <Avatar className="w-24 h-24 border-4 border-primary/10">
                                        <AvatarImage src={member.image || `/images/team-${index + 1}.jpg`} alt={member.name} />
                                        <AvatarFallback className="text-xl font-bold bg-primary/10 text-primary">{member.initials}</AvatarFallback>
                                    </Avatar>
                                </div>
                                <CardTitle className="text-xl font-bold font-[family-name:var(--font-heading)]">
                                    {member.name}
                                </CardTitle>
                                <div className="text-sm font-medium text-primary uppercase tracking-wide mt-1">
                                    {member.title}
                                </div>
                            </CardHeader>
                            <CardContent className="text-center">
                                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-4">
                                    {member.bio}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
