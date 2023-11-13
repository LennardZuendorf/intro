import {Card, CardBody, CardHeader, Image} from "@nextui-org/react";
import {header} from "@/components/primitives";

export const TitleGrid = () => {
    return (
        <div className="gap-4 grid grid-cols-12">
            <div className="col-span-12 row-span-1">
                <h2 className={header()}>
                    What I do
                </h2>
            </div>
            <Card className="col-span-12 sm:col-span-6">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <p className="text-tiny uppercase font-bold">Daily Mix</p>
                    <small className="text-default-500">12 Tracks</small>
                    <h4 className="font-bold text-large">Frontend Radio</h4>
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
                    <p className="text-tiny uppercase font-bold">Daily Mix</p>
                    <small className="text-default-500">12 Tracks</small>
                    <h4 className="font-bold text-large">Frontend Radio</h4>
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
            <Card className="col-span-9 sm:col-span-6">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <p className="text-tiny uppercase font-bold">Daily Mix</p>
                    <small className="text-default-500">12 Tracks</small>
                    <h4 className="font-bold text-large">Frontend Radio</h4>
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
            <Card className="col-span-3 sm:col-span-3">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <p className="text-tiny uppercase font-bold">Daily Mix</p>
                    <small className="text-default-500">12 Tracks</small>
                    <h4 className="font-bold text-large">Frontend Radio</h4>
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
                    <p className="text-tiny uppercase font-bold">Daily Mix</p>
                    <small className="text-default-500">12 Tracks</small>
                    <h4 className="font-bold text-large">Frontend Radio</h4>
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