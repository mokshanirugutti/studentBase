import {Card, CardBody, CardFooter, Image} from "@heroui/react";

export default function DataShowCard() {
  const list = [
    {
      title: "WEB",
      img: "/WEB.jpg",
      count: "5",
    },
    {
      title: "ML",
      img: "/ML.jpg",
      count: "3",
    },
    {
      title: "AI",
      img: "/AI.jpg",
      count: "6",
    },
    {
      title: "Cyber Sec",
      img: "/CS.jpg",
      count: "2",
    },
  ];

  return (
    <div className="gap-4 grid grid-cols-2 sm:grid-cols-4 ">
      {list.map((item, index) => (
        /* eslint-disable no-console */
        <Card key={index} isPressable shadow="sm" onPress={() => console.log("item pressed")}>
          <CardBody className="overflow-visible p-0">
            <Image
              alt={item.title}
              className="w-full object-cover h-[200px]"
              radius="lg"
              shadow="sm"
              src={item.img}
              width="100%"
              
              
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{item.title}</b>
            <p className="text-default-500">{item.count}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
