import { LinkedinCover } from '@/components/sections/linkedin-cover';
import { Section } from '@/components/ui/section';

export const dynamic = 'force-static';

export default function CoverPage() {
  return (
    <Section
      background='default'
      fullHeight
      centerContent
      containerClassName='mx-auto items-center justify-center'
      padding='py-12'
      gap='gap-6'
    >
      <div className='w-[1584px] h-[396px] flex items-center justify-center'>
        <LinkedinCover />
      </div>
    </Section>
  );
}
