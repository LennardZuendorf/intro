import * as React from "react";
import {SubTitle, Title, Header} from "@/components/ui/typography";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";

export default function About() {
  return (
      <div className="space-y-12 flex flex-col gap-2 sm:gap-4 md:gap-8 lg:gap-16 py-2 md:py-4 lg:py-8">
          <div className="space-y-4">
              <Title>My Projects </Title>
              <SubTitle>Learn more about me, my skills and experiences.</SubTitle>
          </div>
          <Card key="intro">
              <CardHeader>

              </CardHeader>
              <CardContent className="grid grid-cols-3">

              </CardContent>
              <CardFooter>

              </CardFooter>
          </Card>
          <Card key="experiences">
                <CardHeader>
                    <CardTitle>
                        <Header>Experiences</Header>
                    </CardTitle>
                </CardHeader>
                <CardContent>

                </CardContent>
          </Card>

      </div>
  )
}
