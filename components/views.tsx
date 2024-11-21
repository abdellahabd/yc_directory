import { client } from "@/sanity/lib/client";
import Ping from "./Ping";
import { Startup_Query_Views } from "@/sanity/lib/queries";
import { Startup } from "@/sanity/types";

async function Views({ id }: { id: string | undefined }) {
  const { views: TotalViews } = await client
    .withConfig({ useCdn: false })
    .fetch(Startup_Query_Views, {
      id: id,
    });
  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>

      <p className="view-text">
        <span className="font-black">Views:{TotalViews}</span>
      </p>
    </div>
  );
}

export default Views;
