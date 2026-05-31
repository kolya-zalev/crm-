'use client'


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LeadsStatusBadge } from "@/app/_features/leads/components/LeadsStatusBadge";



interface RecentLeadsProps {
  leads: any[]; 
}

export function RecentLeads({leads}: RecentLeadsProps) {
    const recentLeads = leads.slice(-5).reverse();
   return (


<Card className="animate-in fade-in slide-in-from-bottom-4 duration-2000  fill-mode-forwards  shadow-sm hover:shadow-xl transition-shadow shadow-red-200">
         <CardHeader>
           <CardTitle className="text-lg font-semibold text-slate-900">
             Recent Leads
           </CardTitle>
         </CardHeader>
         <CardContent>
           <div className="flex flex-col divide-y">
             {recentLeads.length === 0 ? (
               <p>No leads yet</p>
             ) : (
               recentLeads.map((lead: any) => (
                 <div
                   key={lead.id}
                   className="flex items-center justify-between py-3"
                 >
                   <div className="flex flex-col w-1/3">
                     <span className="text-sm font-medium">{lead.name}</span>
                     <span className="text-xs text-muted-foreground">
                       {lead.email}
                     </span>
                   </div>
                   <span className="w-1/3 text-center">{lead.company}</span>
                   <LeadsStatusBadge status={lead.status} />
                 </div>
               ))
             )}
           </div>
         </CardContent>
       </Card>
    
   )
}

