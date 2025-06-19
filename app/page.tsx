import Layout from "@/components/Layout";
import ProfileHeader from "@/components/ProfileHeader";
import ExperienceTabs from "@/components/ExperienceTabs";
import { User, Post, ExperienceItem } from "@/types";

async function getUser(): Promise<User> {
  const res = await fetch("https://jsonplaceholder.typicode.com/users/1", {
    cache: "no-store",
  });
  return res.json();
}

async function getPosts(): Promise<Post[]> {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts?userId=1",
    {
      cache: "no-store",
    }
  );
  return res.json();
}

export default async function Home() {
  const [user, posts] = await Promise.all([getUser(), getPosts()]);
  if (!user || !posts) {
    return <div className="p-6">Loading...</div>;
  }
  const experiences: ExperienceItem[] = posts.map((post, index) => ({
    id: post.id,
    position: post.title.split(" ").slice(0, 3).join(" "),
    organization: `Organization ${index + 1}`,
    location: `${user.address.city}, ${user.address.street}`,
    date: `Jun ${2025 + (index % 3)}`,
    type: [
      "performance",
      "training",
      "accolades",
      "education",
      "job",
      "commissions",
      "masterclass",
    ][index % 7] as ExperienceItem["type"],
    description: post.body,
    tags: ["Church Singer", `Program ${index + 1}`],
  }));

  return (
    <Layout>
      <ProfileHeader user={user} />
      <ExperienceTabs experiences={experiences} />
    </Layout>
  );
}
