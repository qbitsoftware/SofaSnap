// import { Benefits } from "./components/benefits";
import { Categories } from "./components/categories";
import { Cta } from "./components/cta-picture";
import { LandingPage } from "./components/landing-page";
import { PopularProducts } from "./components/popular-products";
import { Reviews } from "./components/reviews";
import { Globe } from "./components/globe";
import { RecentProducts } from "./components/recent-products";
import { fetchAllProducts, fetchLastSeenProducts, fetchPopularProducts } from "@/utils/supabase/queries/products";
import { FetchCategories } from "@/utils/supabase/queries/categories";
import { ServerError } from "@/components/server-error";
import { Benefits } from "./components/benefits";

export default async function Index() {
  const { data: popularProducts, error: popularProductError } = await fetchPopularProducts()
  const { data: latestProducts, error: latestProductError } = await fetchLastSeenProducts()
  const { data: categories, error: categoryError } = await FetchCategories()
  const { data: allProducts } = await fetchAllProducts(1, "", 300)

  if (popularProductError || latestProductError || categoryError && (popularProductError == "Server error" || categoryError == "Server error" || latestProductError == "Server error")) {
    return (
      <ServerError />
    )
  }

  return (
    <div>
      <main className="w-full">
        <LandingPage products={allProducts} />
        <Categories data={categories} error={categoryError} />
        <Reviews />
        <RecentProducts data={latestProducts} error={latestProductError} />
        <div className="overflow-hidden">
          <Cta />
        </div>
        <Benefits />
        <PopularProducts data={popularProducts} error={popularProductError} />
        <Globe />
      </main>
    </div>
  );
}