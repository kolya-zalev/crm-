import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
import {
  LeadAddModal,
  FormStatus,
} from "@/features/leads/components/LeadAddModal";
import { NoteSection } from "@/features/leads/components/NotesSection";
import { ActivityTimeline } from "@/features/leads/components/ActivityTimeline";
import { TasksSection } from "@/features/leads/components/TasksSection";
import { LeadStatuses } from "./utils/leadStatus";
import { LeadDetailComponentProps } from "./LeadDetail.types";

export function LeadDetailComponent({
  leadId,
  lead,
  currentStatusIndex,
  isEditOpen,
  onEditOpen,
  onEditClose,
  onUpdate,
  onStatusChange,
  onMarkAsLost,
}: LeadDetailComponentProps) {
  return (
    <div className="mx-auto max-w-4xl p-4">
      <Card className="border shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <Link href="/lead">
            <Button
              variant="ghost"
              className="text-muted-foreground hover:text-foreground h-auto cursor-pointer p-0 font-normal"
            >
              ← Back to Leads
            </Button>
          </Link>
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-foreground h-auto cursor-pointer p-0 font-normal"
            onClick={onEditOpen}
          >
            Edit
          </Button>
        </CardHeader>

        <hr className="border-muted" />
        <CardContent className="flex flex-col gap-8 pt-6">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold tracking-tight">
                {lead.name}
              </h1>
              <p className="text-muted-foreground text-sm">{lead.email}</p>
            </div>
            <LeadsStatusBadge status={lead.status} />
          </div>
          <div className="flex items-center gap-4">
            <Stepper
              className="w-full"
              value={currentStatusIndex}
              onValueChange={onStatusChange}
              indicators={{
                completed: <Check className="size-3.5" />,
                loading: <Loader className="size-3.5 animate-spin" />,
              }}
            >
              <StepperNav>
                {LeadStatuses.map((step, index) => (
                  <StepperItem
                    key={step}
                    step={index + 1}
                    className="relative flex-1 items-start"
                  >
                    <StepperTrigger className="flex flex-col items-center gap-2.5">
                      <StepperIndicator className="rounded-full">
                        {index + 1}
                      </StepperIndicator>
                      <StepperTitle className="text-xs capitalize md:text-sm">
                        {step}
                      </StepperTitle>
                    </StepperTrigger>

                    {LeadStatuses.length > index + 1 && (
                      <StepperSeparator className="group-data-[state=completed]/step:bg-primary absolute inset-x-0 top-3 left-[calc(50%+0.875rem)] m-0 group-data-[orientation=horizontal]/stepper-nav:w-[calc(100%-2rem+0.225rem)] group-data-[orientation=horizontal]/stepper-nav:flex-none" />
                    )}
                  </StepperItem>
                ))}
              </StepperNav>
            </Stepper>
          </div>
          {lead.status !== "lost" && (
            <Button variant="destructive" size="sm" onClick={onMarkAsLost}>
              Mark as Lost
            </Button>
          )}
          {lead.status === "lost" && (
            <div className="flex flex-col items-center gap-1">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                X
              </div>
              <span className="text-xs font-medium text-red-500">Lost</span>
            </div>
          )}
          <div className="grid grid-cols-1 gap-8 border-t pt-6 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
                Contact Info
              </h3>
              <div className="space-y-3">
                <div className="text-muted-foreground mb-1 flex items-center gap-2 text-xs">
                  <Mail className="size-3.5" />
                  <span className="text-xs">Email</span>
                </div>
                <p className="text-sm font-medium">{lead.email}</p>

                <div className="text-muted-foreground mb-1 flex items-center gap-2 text-xs">
                  <Phone className="size-3.5" />
                  <span className="text-xs">Phone</span>
                </div>
                <p className="text-sm font-medium">{lead.phone}</p>

                <div className="text-muted-foreground mb-1 flex items-center gap-2 text-xs">
                  <Building2 className="size-3.5" />
                  <span className="text-xs">Company</span>
                </div>
                <p className="text-sm font-medium">{lead.company}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
                Details
              </h3>
              <div className="space-y-3">
                <div className="text-muted-foreground mb-1 flex items-center gap-2 text-xs">
                  <NotebookPen className="size-3.5" />
                  <span>Notes</span>
                </div>
                <p className="text-sm font-medium whitespace-pre-wrap">
                  {lead.notes || "—"}
                </p>
              </div>

              <div>
                <div className="text-muted-foreground mb-1 flex items-center gap-2 text-xs">
                  <SquareArrowRightEnter className="size-3.5" />
                  <span>Source</span>
                </div>
                <p className="text-sm font-medium">{lead.source || "—"}</p>
              </div>

              <div>
                <div className="text-muted-foreground mb-1 flex items-center gap-2 text-xs">
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

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <NoteSection leadId={leadId} />
        <ActivityTimeline leadId={leadId} />
      </div>
      <div className="mt-6">
        <TasksSection leadId={leadId} />
      </div>

      <LeadAddModal
        key={lead.id}
        open={isEditOpen}
        onClose={onEditClose}
        onSubmit={() => {}}
        onEdit={onUpdate}
        formStatus={FormStatus.EDIT}
        lead={lead}
      />
    </div>
  );
}
