import { CreateCommunityAction } from "@components";
import { User2 } from "lucide-react";

const Home = () => {
  return (
    <div className="container lg:flex gap-6">
      {/* Actions bar */}
      <section className="hidden lg:block basis-[25rem] bg-white rounded-t-md overflow-hidden">
        <CreateCommunityAction />
        <hr className="border-gray-300 my-4" />
        <div className="flex gap-1.5 items-center pl-4">
          <User2 />
          <h2>Communities</h2>
        </div>
      </section>

      {/* Feed */}
      <section className="h-screen bg-blue-500 flex-1">feed</section>
    </div>
  );
};

export default Home;
