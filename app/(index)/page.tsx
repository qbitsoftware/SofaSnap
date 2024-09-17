import { Benefits } from "./components/benefits";
import { Categories } from "./components/categories";
import { Cta } from "./components/cta-picture";
import { LandingPage } from "./components/landing-page";
import { PopularProducts } from "./components/popular-products";
import RecentProducts from "./components/recent-products";
import { Reviews } from "./components/reviews";
import { Globe } from "./components/globe";

export default async function Index() {
  return (
    <>
      <main className="w-full">
        <LandingPage />
        <Categories />
        <Reviews />
        <Cta />
        <RecentProducts />
        <Benefits />
        <PopularProducts />
        <Globe />
      </main>
    </>
  );
}

{/* <div className="border-[1px] w-[60px] h-[30px] bg-background"> bg-background</div>
<div className="border-[1px] w-[60px] h-[30px] bg-accent">bg-accent</div>
<div className="border-[1px] w-[60px] h-[30px] bg-accent-foreground">bg-accent-foreground</div>
<div className="border-[1px] w-[60px] h-[30px] bg-foreground"> bg-foreground</div>
<div className="border-[1px] w-[60px] h-[30px] bg-secondary">bg-secondary</div>
<div className="border-[1px] w-[60px] h-[30px] bg-secondary-foreground">bg-secondary-foreground</div>
<div className="border-[1px] w-[60px] h-[30px] bg-card">bg-card</div> */}