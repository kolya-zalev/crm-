"use client";
import { NoteSection } from "@/features/leads/components/NotesSection";
import { useLeads } from "@/features/hooks/UseLeads";
import { use, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LeadsStatusBadge } from "@/features/leads/components/LeadsStatusBadge";
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/reui/stepper";
import {
  Check,
  Loader,
  Mail,
  Phone,
  Building2,
  NotebookPen,
  SquareArrowRightEnter,
  Tags,
} from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import {
  LeadAddModal,
  FormStatus,
} from "@/features/leads/components/LeadsModal/LeadAddModal";
import { ActivityTimeline } from "@/features/leads/components/ActivityTimeline";

export default function LeadDetailPage({
  params,
}: {
  params: Promise<{ leadId: string }>;
}) {
  const { leadId } = use(params);
  const { leads, isLoading, updateLead } = useLeads();
  const lead = leads.find((l) => l.id === leadId);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleUpdate = async (id: string, data: any) => {
    await updateLead(id, data);
    setIsEditOpen(false);
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-full w-full">
        <Spinner className="size-8" />
      </div>
    );

  if (!lead) return <div>Lead not found</div>;

  const statuses = ["new", "contacted", "qualified", "won"];
  const currentStatusIndex = statuses.indexOf(lead.status) + 1 || 1;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="shadow-sm border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <Link href="/lead">
            <Button
              variant="ghost"
              className="text-muted-foreground hover:text-foreground p-0 h-auto font-normal cursor-pointer"
            >
              ← Back to Leads
            </Button>
          </Link>
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-foreground p-0 h-auto font-normal cursor-pointer"
            onClick={() => setIsEditOpen(true)}
          >
            Edit
          </Button>
        </CardHeader>

        <hr className="border-muted" />
        <CardContent className="pt-6 flex flex-col gap-8">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold tracking-tight">
                {lead.name}
              </h1>
              <p className="text-sm text-muted-foreground">{lead.email}</p>
            </div>
            <LeadsStatusBadge status={lead.status} />
          </div>
          <div className="flex items-center gap-4">
            <Stepper
              className="w-full"
              value={currentStatusIndex}
              indicators={{
                completed: <Check className="size-3.5" />,
                loading: <Loader className="size-3.5 animate-spin" />,
              }}
            >
              <StepperNav>
                {statuses.map((step, index) => (
                  <StepperItem
                    key={index}
                    step={index + 1}
                    className="relative flex-1 items-start "
                  >
                    <StepperTrigger className="flex flex-col gap-2.5 items-center">
                      <StepperIndicator className="rounded-full">
                        {index + 1}
                      </StepperIndicator>

                      <StepperTitle className="capitalize text-xs md:text-sm">
                        {step}
                      </StepperTitle>
                    </StepperTrigger>

                    {statuses.length > index + 1 && (
                      <StepperSeparator className="group-data-[state=completed]/step:bg-primary absolute inset-x-0 top-3 left-[calc(50%+0.875rem)] m-0 group-data-[orientation=horizontal]/stepper-nav:w-[calc(100%-2rem+0.225rem)] group-data-[orientation=horizontal]/stepper-nav:flex-none" />
                    )}
                  </StepperItem>
                ))}
              </StepperNav>
            </Stepper>
          </div>
          {lead.status === "lost" && (
            <div className="flex flex-col items-center gap-1">
              <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold">
                X
              </div>
              <span className="text-xs text-red-500 font-medium">Lost</span>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t pt-6">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Contact Info
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                  <Mail className="size-3.5" />
                  <span className="text-xs">Email</span>
                </div>
                <p className="text-sm font-medium">{lead.email}</p>

                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                  <Phone className="size-3.5" />
                  <span className="text-xs">Phone</span>
                </div>
                <p className="text-sm font-medium">{lead.phone}</p>

                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                  <Building2 className="size-3.5" />
                  <span className="text-xs">Company</span>
                </div>
                <p className="text-sm font-medium">{lead.company}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Details
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                  <NotebookPen className="size-3.5" />
                  <span>Notes</span>
                </div>
                <p className="text-sm font-medium whitespace-pre-wrap">
                  {lead.notes || "—"}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                  <SquareArrowRightEnter className="size-3.5" />
                  <span>Source</span>
                </div>
                <p className="text-sm font-medium">{lead.source || "—"}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                  <Tags className="size-3.5" />
                  <span>Tags</span>
                </div>
                <p className="text-sm font-medium">
                  {lead.tags?.length > 0 ? lead.tags.join(", ") : "—"}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 hap-6 mt-6">
        <NoteSection leadId={leadId}/>
        <ActivityTimeline leadId={leadId}/>

      </div>

      <LeadAddModal
        key={lead.id}
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSubmit={() => {}}
        onEdit={(id, data) => handleUpdate(id, data)}
        formStatus={FormStatus.EDIT}
        lead={lead}
      />
    </div>
  );
}
