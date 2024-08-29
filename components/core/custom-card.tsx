import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import { Button } from "../ui/button";
import {
  Clock12,
  EllipsisVertical,
  LocateIcon,
  MapPin,
  MessageSquareShare,
  Share,
  Tangent,
  User,
} from "lucide-react";

import image from "@/public/assets/card-image.png";
import Image from "next/image";

const Box = () => {
  return (
    <>
      <div
        className="bg-[#ededf9] w-full px-1 py-1 rounded-lg flex justify-start items-start gap-2 h-full"
        style={{ border: "0.5px solid #5F5ED0" }}
      >
        <div className="">
          <Image
            src={image}
            alt="image"
            className="rounded-lg"
            style={{ height: "106px", maxWidth: "106.33px" }}
          />
        </div>
        <div className="flex flex-col justify-between h-[106px] py-1">
          <div className="">
            <p className="text-[#676767] text-[12px]">Men’s T20 - Under 18</p>
            <p className="text-[14px] font-semibold">
              Join us for an exciting 20-day cricket fest featuring top teams
              from around the world.
            </p>
          </div>
          <div className="mt-3 flex justify-between items-center pr-6">
            <p
              className="flex justify-between items-center gap-1 text-[12px] pr-6"
              style={{ borderRight: "1px solid #c2c2cb" }}
            >
              <Tangent className="text-[#676767] h-3 w-3" /> Male
            </p>

            <p
              className="flex justify-between items-center gap-1 text-[12px] pr-6"
              style={{ borderRight: "1px solid #c2c2cb" }}
            >
              <User className="text-[#676767] h-3 w-3" /> Age : 21
            </p>

            <p className="flex justify-between items-center gap-1 text-[12px]">
              <Clock12 className="text-[#676767] h-3 w-3" /> From 01:30 PM to
              7:00 PM
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

const ProgressBar = () => {
  return (
    <div
      className=" bg-white rounded-md px-4 py-2 w-full flex justify-between items-center"
      style={{ outline: "0.5px solid #D9D9D9" }}
    >
      <div className="flex justify-between items-center">
        <p className="text-sm text-[#676767] mr-2">Starts</p>
        <p className="text-[#111111] text-sm">20th Jul, 2024</p>
      </div>
      <div className="w-[35%]">
        <Progress value={2} />
      </div>
      <div className="flex justify-between items-center">
        <p className="text-sm text-[#676767] mr-2">Ends</p>
        <p className="text-[#111111] text-sm">20th Jul, 2024</p>
      </div>
    </div>
  );
};

const SmallCards = () => {
  return (
    <div className="flex justify-between items-center gap-4 w-full">
      <div
        className=" bg-white rounded-md px-4 py-2 w-full flex justify-center items-center"
        style={{ outline: "0.5px solid #D9D9D9" }}
      >
        <div className="text-[#676767] text-[14px]">
          <span className="text-[16px] text-[#111] font-semibold mr-2">
            24 days
          </span>
          left <br />
          Reg. Deadline
        </div>
      </div>
      <div
        className=" bg-white rounded-md px-4 py-2 w-full flex justify-center items-center"
        style={{ outline: "0.5px solid #D9D9D9" }}
      >
        <div className="text-[#676767] text-[14px] ">
          <span className="text-[16px] text-[#111] font-semibold mr-2">
            35 days
          </span>
          left <br />
          To Start Play
        </div>
      </div>
      <div
        className=" bg-white rounded-md px-4 py-2 text-sm flex justify-between gap-1 w-[60rem]"
        style={{ outline: "0.5px solid #D9D9D9" }}
      >
        <div className="text-[#676767] text-[14px] ">
          <span className="text-[16px] text-[#111] font-semibold"> 15/24</span>
          <br /> Reg. Teams slots
        </div>
        <div
          className=" bg-white rounded-md p-2  flex justify-center items-center"
          style={{ outline: "0.5px solid #D9D9D9" }}
        >
          <MessageSquareShare className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

const CustomCard = ({ view }: { view?: boolean }) => {
  return (
    <>
      <Card
        // className="w-[515px]"
        style={{
          boxShadow: "0px 4px 18px 0px rgba(0, 0, 0, 0.1)",
        }}
      >
        <CardHeader className="flex flex-row justify-between items-center pb-0">
          <div className="">
            <p className="text-[12px] text-[#676767] mb-1">CRICKET</p>
            <CardTitle className="mb-0">Aplha Dog Arena</CardTitle>
            <Button
              variant="link"
              className="text-start flex justify-start p-0 m-0 text-[#676767]"
            >
              <MapPin className="text-[#676767] h-4 w-4 mr-2" /> Andheri
              lonkhandwala...
            </Button>
          </div>
          <div className="">
            <EllipsisVertical />
          </div>
        </CardHeader>
        <CardContent className="px-4">
          <div className=" flex items-center space-y-3 flex-col w-full">
            <Box />
            <ProgressBar />
            <SmallCards />

            {view ? (
              <div className="flex justify-between items-center w-full gap-2">
                <Button variant="outline" className="w-[50%]">
                  PREVIEW
                </Button>
                <Button className="w-[50%]"> EDIT</Button>
                <Button variant="orange" className="w-full">
                  PUBLISH
                </Button>
              </div>
            ) : (
              <Button className="w-full">VIEW</Button>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default CustomCard;
