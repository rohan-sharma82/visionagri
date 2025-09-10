
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { veterinarianData, Veterinarian } from '@/lib/veterinarian-data';
import { useTranslation } from '@/hooks/use-translation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, MapPin, Phone, Star, MessageSquare, Search } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

function formatStateName(slug: string | string[] | undefined): string {
    if (!slug) return '';
    const stateStr = Array.isArray(slug) ? slug[0] : slug;
    return stateStr
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

export default function VeterinarianStatePage() {
    const params = useParams();
    const { t } = useTranslation();
    const stateSlug = params.state as string;
    const stateName = formatStateName(stateSlug);

    const stateData = veterinarianData[stateSlug] || [];
    
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredVets, setFilteredVets] = useState<Veterinarian[]>(stateData);

    useEffect(() => {
        const lowercasedFilter = searchTerm.toLowerCase();
        const filteredData = stateData.filter(item => {
            return (
                item.name.toLowerCase().includes(lowercasedFilter) ||
                item.location.toLowerCase().includes(lowercasedFilter) ||
                item.type.toLowerCase().includes(lowercasedFilter)
            );
        });
        setFilteredVets(filteredData);
    }, [searchTerm, stateData]);

    return (
        <>
            <div className="container mx-auto px-4 py-8 relative">
                <Link href="/find-veterinarian" className="absolute top-8 left-4 z-10">
                    <Button variant="ghost">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to States
                    </Button>
                </Link>
                <div className="text-center pt-16 mb-8">
                    <h1 className="text-4xl font-bold font-headline text-foreground">
                        Veterinary Clinics in {stateName}
                    </h1>
                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                        {stateData.length > 0
                            ? `Find contact information for veterinary clinics and hospitals in ${stateName}.`
                            : `Data for ${stateName} is not yet available. Please check back later.`}
                    </p>
                </div>
                 <div className="mb-8 max-w-lg mx-auto">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder="Search by name, city, or type..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </div>

                {filteredVets.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredVets.map((vet, index) => (
                            <Card key={index} className="vet-card">
                                <CardContent className="p-6 space-y-4">
                                    <h2 className="text-xl font-bold text-primary">{vet.name}</h2>
                                    <div className="space-y-2 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <Badge variant="secondary">{vet.type}</Badge>
                                            {vet.experience && <Badge variant="outline">{vet.experience} Exp</Badge>}
                                        </div>
                                        {vet.rating && (
                                            <div className="flex items-center gap-1">
                                                <Star className="h-4 w-4 text-yellow-500" />
                                                <span>{vet.rating}</span>
                                            </div>
                                        )}
                                        <div className="flex items-start gap-2">
                                            <MapPin className="h-4 w-4 mt-0.5" />
                                            <span>{vet.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4" />
                                            <span>{vet.hours}</span>
                                        </div>
                                    </div>
                                    <div className="vet-card-footer">
                                        {vet.phone && (
                                            <a href={`tel:${vet.phone}`} className="vet-action-button">
                                                <Phone />
                                                Call
                                            </a>
                                        )}
                                    </div>
                                    {vet.comment && (
                                         <div className="flex items-start gap-2 text-sm italic border-t pt-4">
                                            <MessageSquare className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                            <p>&ldquo;{vet.comment}&rdquo;</p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="text-center mt-16">
                        <p className="text-xl text-muted-foreground">
                           {stateData.length > 0 ? 'No clinics found matching your search.' : 'No clinics listed for this state yet.'}
                        </p>
                    </div>
                )}
            </div>
        </>
    );
}

