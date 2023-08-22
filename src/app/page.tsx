import { CreateCommunityAction } from "@components";
import MyCommunities from "@components/home/MyCommunities";
import { User2 } from "lucide-react";

const Home = () => {
  return (
    <div className="container lg:flex gap-6">
      {/* Actions bar */}
      <aside className="hidden lg:block basis-[25rem] bg-white rounded-t-md overflow-hidden">
        <CreateCommunityAction />
        <hr className="border-gray-300 my-4" />
        <MyCommunities />
      </aside>

      {/* Feed */}
      <section className="h-screen bg-blue-500 flex-1">feed</section>
    </div>
  );
};

export default Home;
