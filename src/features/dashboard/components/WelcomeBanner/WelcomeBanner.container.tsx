import { WelcomeBannerComponents } from "./WelcomeBanner.component";
import { WelcomeBannerProps } from "./WelcomeBanner.types";

export function WelcomeBannerContainer({newLeadsCount}: WelcomeBannerProps){
    return <WelcomeBannerComponents newLeadsCount={newLeadsCount} />
}