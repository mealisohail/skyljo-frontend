import CustomCard from "@/components/core/custom-card";

const page = () => {
  return (
    <>
      <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-2 ">
        <CustomCard />
        <CustomCard view />
        <CustomCard />
        <CustomCard />
        <CustomCard view />
      </div>
    </>
  );
};

export default page;
