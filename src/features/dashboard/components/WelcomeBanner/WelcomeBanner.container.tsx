import { WelcomeBannerComponent } from "./WelcomeBanner.component";
import { WelcomeBannerProps } from "./WelcomeBanner.types";

export const WelcomeBannerContainer = ({newLeadsCount}: WelcomeBannerProps) => {
    return <WelcomeBannerComponent newLeadsCount={newLeadsCount} />
}