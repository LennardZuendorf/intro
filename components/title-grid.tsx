import {Card, CardBody, CardHeader, Image} from "@nextui-org/react";
import {header} from "@/components/primitives";

export const TitleGrid = () => {
    return (
        <div className="gap-6 grid grid-cols-12">
            <Card className="col-span-12 sm:col-span-6">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <p className="text-tiny uppercase font-bold">col-span-12</p>
                    <h4 className="font-bold text-large">col-span-6</h4>
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                    <Image
                        alt="Card background"
                        className="object-cover rounded-xl"
                        src="/images/hero-card-complete.jpeg"
                        width={270}
                    />
                </CardBody>
            </Card>
            <Card className="col-span-6 sm:col-span-3">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <p className="text-tiny uppercase font-bold">col-span-6</p>
                    <h4 className="font-bold text-large">col-span-3</h4>
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                    <Image
                        alt="Card background"
                        className="object-cover rounded-xl"
                        src="/images/hero-card-complete.jpeg"
                        width={270}
                    />
                </CardBody>
            </Card>
            <Card className="col-span-6 sm:col-span-3">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <p className="text-tiny uppercase font-bold">col-span-6</p>
                    <h4 className="font-bold text-large">col-span-3</h4>
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                    <Image
                        alt="Card background"
                        className="object-cover rounded-xl"
                        src="/images/hero-card-complete.jpeg"
                        width={270}
                    />
                </CardBody>
            </Card>
            <Card className="col-span-3 sm:col-span-1">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <p className="text-tiny uppercase font-bold">col-span-3</p>
                    <h4 className="font-bold text-large">col-span-3</h4>
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                    <Image
                        alt="Card background"
                        className="object-cover rounded-xl"
                        src="/images/hero-card-complete.jpeg"
                        width={270}
                    />
                </CardBody>
            </Card>
            <Card className="col-span-3 sm:col-span-6">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <p className="text-tiny uppercase font-bold">col-span-3</p>
                    <h4 className="font-bold text-large">col-span-6</h4>
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                    <Image
                        alt="Card background"
                        className="object-cover rounded-xl"
                        src="/images/hero-card-complete.jpeg"
                        width={270}
                    />
                </CardBody>
            </Card>
            <Card className="col-span-3 sm:col-span-5">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <p className="text-tiny uppercase font-bold">col-span-3</p>
                    <h4 className="font-bold text-large">col-span-6</h4>
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                    <Image
                        alt="Card background"
                        className="object-cover rounded-xl"
                        src="/images/hero-card-complete.jpeg"
                        width={270}
                    />
                </CardBody>
            </Card>
        </div>
    )
}