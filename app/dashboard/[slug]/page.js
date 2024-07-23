import React from "react";
import UserDashboard from "../../components/DashBoard/UserDashBoard/UserDashboard";

export async function generateStaticParams() {
  const posts = [
    { slug: "my-orders" },
    // { slug: "dashboard" },
    { slug: "information" },
    { slug: "wishlist" },
    { slug: "tracksDetail" },
    { slug: "addaddress" },
    { slug: "reward" },
  ];

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

const Page = ({ params }) => {
  const { slug } = params;

  return <UserDashboard slug={slug} />;
};

export default Page;
