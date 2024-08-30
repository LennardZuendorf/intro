import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { H2, H4 } from "@/components/ui/typography";

export default async function Legal() {
  return (
    <div className="flex flex-col gap-2 sm:gap-4 md:gap-8 lg:gap-16 py-2 md:py-4 lg:py-8">
      <H4>Legal</H4>
      <Tabs defaultValue="english" className="w-[400px] w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="german">German</TabsTrigger>
          <TabsTrigger value="english">English</TabsTrigger>
        </TabsList>
        <TabsContent value="german">
          <Card>
            <CardHeader>
              <CardTitle>German</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-start prose"></CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="english">
          <Card>
            <CardHeader>
              <CardTitle>English</CardTitle>
              <CardDescription>
                (Automatically translated from German)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-start prose"></CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
