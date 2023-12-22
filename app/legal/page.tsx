import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"
import {Tabs, TabsContent, TabsList, TabsTrigger,} from "@/components/ui/tabs"
import {allLegalDocs} from "contentlayer/generated";
import type {LegalDoc} from 'contentlayer/generated'
import { Mdx } from "@/components/pages/mdx-components"

export const generateStaticParams = async () => {
    return allLegalDocs.map((p) => ({slug: p.slug.split('/')}))
}

export default async function Legal({ params }: { params: { slug: string[] } }) {
    const german = allLegalDocs.find((p) => p.title.includes('German')) as LegalDoc
    const english = allLegalDocs.find((p) => p.title.includes('English')) as LegalDoc

  return (
      <div className="flex flex-col items-center justify-center gap-2 sm:gap-4 md:gap-8 lg:gap-16 py-2 md:py-4 lg:py-8">
          <Tabs defaultValue="english" className="w-[400px] w-full">
              <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="german">German</TabsTrigger>
                  <TabsTrigger value="english">English</TabsTrigger>
              </TabsList>
              <TabsContent value="german">
                  <Card>
                      <CardHeader>
                          <CardTitle>{german.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-start prose">
                          <Mdx code={german.body.code}/>
                      </CardContent>
                  </Card>
              </TabsContent>
              <TabsContent value="english">
                  <Card>
                      <CardHeader>
                          <CardTitle>{english.title}</CardTitle>
                          <CardDescription>
                              (Automatically translated from German)
                          </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2 text-start prose">
                          <Mdx code={english.body.code}/>
                      </CardContent>
                  </Card>
              </TabsContent>
          </Tabs>
      </div>
  )
}

