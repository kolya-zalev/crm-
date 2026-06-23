import {Activity} from "@/types"

export interface ActivityTimelineProps{
    leadId: string
}

export interface ActivityTimelineComponentProps{
    activities: Activity[],
    isLoading: boolean

}