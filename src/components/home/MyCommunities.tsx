import { getSession } from "@lib/api/nextAuth";
import axios from "axios";
import MyCommunitiesList from "./MyCommunitiesList";
import { User2 } from "lucide-react";

const MyCommunities = async () => {
  const session = await getSession();
  let subscriptions;

  try {
    const { data } = await axios.get(
      `http://localhost:3000/api/v1/subscriptions?user=${session?.user?._id}`
    );
    subscriptions = data.subscriptions;
  } catch (error) {
    console.log(error);
  }

  return (
    <section className="pl-4 mt-4">
      <div className="flex gap-1.5 items-center mb-4">
        <User2 />
        <h2>My Communities</h2>
      </div>
      <MyCommunitiesList subscriptions={subscriptions} />
    </section>
  );
};

export default MyCommunities;
