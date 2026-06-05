import {Activity} from "@/hooks/types"

export interface ActivityTimelineProps{
    leadId: string
}

export interface ActivityTimelineComponentProps{
    activities: Activity[],
    isLoading: boolean

}