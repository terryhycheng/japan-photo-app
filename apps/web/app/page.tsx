export const dynamic = "force-dynamic";

const fetchHelloWorld = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/hello-world`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { message: "Error fetching hello world" };
  }
};

export default async function Home() {
  const data = await fetchHelloWorld();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-4xl">{data.message}</h1>
        <p className="text-gray-600">This project is quite fun</p>
      </div>
    </div>
  );
}
