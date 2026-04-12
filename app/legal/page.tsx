import type { Metadata } from 'next';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/retroui/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/retroui/Button';
import Link from 'next/link';
import { siteMetadata } from '@/data/site';
import { legal } from '@/lib/source';

export const metadata: Metadata = {
  title: 'Legal & Privacy',
  description:
    'Legal information, privacy policy, and data protection declaration for zuendorf.me - GDPR compliant data protection information.',
  alternates: {
    canonical: `${siteMetadata.siteUrl}/legal`
  },
  robots: {
    index: true,
    follow: false
  }
};

export default function Legal() {
  const dePage = legal.find((p) => p.language === 'de');
  const enPage = legal.find((p) => p.language === 'en');

  const DeBody = dePage?.body;
  const EnBody = enPage?.body;

  return (
    <div className='flex flex-col gap-2 sm:gap-4 md:gap-8 lg:gap-16 py-2 md:py-4 lg:py-8'>
      <div className='flex items-center justify-between'>
        <h4 className='scroll-m-20 text-xl font-semibold tracking-tight lg:text-2xl'>Legal</h4>
        <Link href='/'>
          <Button variant='outline'>Back to Main</Button>
        </Link>
      </div>
      <Tabs defaultValue='english' className='w-full'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='german'>German</TabsTrigger>
          <TabsTrigger value='english'>English</TabsTrigger>
        </TabsList>
        <TabsContent value='german'>
          <Card>
            <CardHeader>
              <CardTitle>{dePage?.title}</CardTitle>
            </CardHeader>
            <CardContent className='prose prose-sm dark:prose-invert max-w-none'>
              {DeBody && <DeBody />}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='english'>
          <Card>
            <CardHeader>
              <CardTitle>{enPage?.title}</CardTitle>
              <CardDescription>
                (Machine translated from German - the German version is legally binding)
              </CardDescription>
            </CardHeader>
            <CardContent className='prose prose-sm dark:prose-invert max-w-none'>
              {EnBody && <EnBody />}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
