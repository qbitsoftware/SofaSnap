import { Categories } from "./components/categories";
import { LandingPage } from "./components/landing-page";
import { Reviews } from "./components/reviews";
import { Globe } from "./components/globe";
import { fetchAllProducts } from "@/utils/supabase/queries/products";
import { FetchCategories } from "@/utils/supabase/queries/categories";
import { ServerError } from "@/components/server-error";
import { AllProducts } from "./components/all-products";

export default async function Index() {
  // const { data: popularProducts, error: popularProductError } = await fetchPopularProducts()
  // const { data: latestProducts, error: latestProductError } = await fetchLastSeenProducts()
  const { data: categories, error: categoryError } = await FetchCategories()
  const { data: allProducts } = await fetchAllProducts(1, "", 300)

  if (categoryError && categoryError == "Server error") {
    return (
      <ServerError />
    )
  }

  return (
    <div>
      <main className="w-full">
        <LandingPage products={allProducts} />
        <Categories data={categories} error={categoryError} />
        <AllProducts products={allProducts} />
        <Reviews />
        {/* <RecentProducts data={latestProducts} error={latestProductError} />
        <div className="overflow-hidden">
          <Cta />
        </div>
        <Benefits />
        <PopularProducts data={popularProducts} error={popularProductError} /> */}
        <Globe />
      </main>
    </div>
  );
}