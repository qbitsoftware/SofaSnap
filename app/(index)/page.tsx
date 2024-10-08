import { Benefits } from "./components/benefits";
import { Categories } from "./components/categories";
import { Cta } from "./components/cta-picture";
import { LandingPage } from "./components/landing-page";
import { PopularProducts } from "./components/popular-products";
import { Reviews } from "./components/reviews";
import { Globe } from "./components/globe";
import { RecentProducts } from "./components/recent-products";
import { fetchAllProducts } from "@/utils/supabase/queries/products";
import { FetchCategories } from "@/utils/supabase/queries/categories";
import { ServerError } from "@/components/server-error";

export default async function Index() {
  const { data: products, error: productError } = await fetchAllProducts()
  const { data: categories, error: categoryError } = await FetchCategories()
  console.log(productError)

  if (productError || categoryError && (productError == "Server error" || categoryError == "Server error")) {
    return (
      <ServerError />
    )
  }

  return (
    <div>
      <main className="w-full">
        <LandingPage />
        <Categories data={categories} error={categoryError} />
        <Reviews />
        <Cta />
        <RecentProducts data={products} error={productError} />
        <Benefits />
        <PopularProducts data={products} error={productError} />
        <Globe />
      </main>
    </div>
  );
}