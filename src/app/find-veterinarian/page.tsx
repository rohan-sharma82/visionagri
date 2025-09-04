
'use client';

import Header from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Phone,
  User,
  MapPin,
  Mail,
  Book,
} from 'lucide-react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const vetData = [
  { district: 'Amritsar', officerName: 'Dr. Navraj Singh Sandhu', telNo: '0183-2536283', mobile: '81465-24999' },
  { district: 'Barnala', officerName: 'Dr. Lakhvir Singh', telNo: '0167-9241290', mobile: '98154-19600' },
  { district: 'Bathinda', officerName: 'Dr. Jatinderpal Singh', telNo: '0164-2212767', mobile: '8146525380' },
  { district: 'Ferozepur', officerName: 'Dr. Himanshu Syal', telNo: '01632-246089', mobile: '9478054485' },
  { district: 'Faridkot', officerName: 'Dr. Parveen Kumar', telNo: '01639-250176', mobile: '9676520718' },
  { district: 'Fatehgarh Sahib', officerName: 'Dr. Ravinder Singh', telNo: '01763-232712', mobile: '9815728047' },
  { district: 'Fazilka', officerName: 'Dr. Gursharanjit Singh Bedi', telNo: '01638-260128', mobile: '8847413512' },
  { district: 'Gurdaspur', officerName: 'Dr. Jaspreet Singh', telNo: '01874-241160', mobile: '9878177491' },
  { district: 'Hoshiarpur', officerName: 'Dr. Haroon Ratan', telNo: '01882-253574', mobile: '89681-20686' },
  { district: 'Jalandhar', officerName: 'Dr. Ram Murti', telNo: '0181-2457337', mobile: '9872440551' },
  { district: 'Kapurthala', officerName: 'Dr. Rajinderpal Singh', telNo: '01822-233515', mobile: '98155-76832' },
  { district: 'Ludhiana', officerName: 'Dr. Amrik Singh', telNo: '0161-5017728', mobile: '98152-56371' },
  { district: 'Mansa', officerName: 'Dr. Karamjit Singh', telNo: '01652-235111', mobile: '9417003171' },
  { district: 'Moga', officerName: 'Dr. Harveen Kaur', telNo: '01636-236257', mobile: '9417316068' },
  { district: 'Patiala', officerName: 'Dr. Gurdarshan Singh', telNo: '—', mobile: '9417055347' },
  { district: 'Rupnagar (Ropar)', officerName: 'Dr. Gurpreet Singh', telNo: '01881-292670', mobile: '9815323688' },
  { district: 'Pathankot', officerName: 'Dr. Mukesh Kumar', telNo: '—', mobile: '9988231317' },
  { district: 'SAS Nagar (Mohali)', officerName: 'Dr. Shiv Kant Gupta', telNo: '0160-2281191', mobile: '98159-91677' },
  { district: 'Sangrur', officerName: 'Dr. Sukhwinder Singh', telNo: '01672-234093', mobile: '98725-01482' },
  { district: 'Shaheed Bhagat Singh Nagar', officerName: 'Dr. Rajesh Gupta', telNo: '01823-222180', mobile: '7889136823' },
  { district: 'Sri Muktsar Sahib', officerName: 'Dr. Gurdit Singh', telNo: '01633-263948', mobile: '9814148632' },
  { district: 'Tarn Taran', officerName: 'Dr. Manish Kumar Gupta', telNo: '—', mobile: '9815788663' },
];

export default function FindVeterinarianPage() {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8 relative">
        <Link href="/animal-classification" className="absolute top-8 left-4">
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Classification
          </Button>
        </Link>
        <div className="text-center pt-16">
          <h1 className="text-4xl font-bold font-headline text-foreground">
            Find a Veterinarian
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Contact information for District Animal Husbandry Officers in Punjab.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {vetData.map((vet, index) => (
            <Card key={index} className="vet-card">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <User className="h-8 w-8 text-primary" />
                  <div>
                    <CardTitle className="text-xl">{vet.officerName}</CardTitle>
                    <p className="text-sm text-muted-foreground">District Animal Husbandry Officer</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{vet.district}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>Office: {vet.telNo}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>Mobile: {vet.mobile}</span>
                    </div>
                </div>
              </CardContent>
              <CardFooter className="vet-card-footer">
                <a href={`tel:${vet.mobile}`} className="vet-action-button">
                  <Phone className="h-4 w-4" />
                  Call Mobile
                </a>
                 <a href={`tel:${vet.telNo}`} className="vet-action-button">
                  <Phone className="h-4 w-4" />
                  Call Office
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
