import { useState } from "react";
import { TasksSectionComponentProps } from "./TasksSection.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

export function TasksSectionComponent({
  tasks,
  isLoading,
  onToggle,
  onAdd,
  onDelete,
}: TasksSectionComponentProps) {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");

  if (isLoading)
    return (
      <div className="flex items-center justify-center p-6 text-muted-foreground">
        Loading tasks...
      </div>
    );

  const priorityColors: Record<string, string> = {
    high: "text-red-600 bg-red-50",
    medium: "text-yellow-600 bg-yellow-50",
    low: "text-green-600 bg-green-50",
  };

  const handleAdd = () => {
    if (title.trim() === "") return;
    if (dueDate === "") return;

    onAdd({ title, priority, dueDate });
    
    setTitle("");
    setPriority("medium");
    setDueDate("");
    setShowForm(false);
  };

  return (
    <Card className="border border-gray-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl font-bold">
          Tasks ({tasks.length})
        </CardTitle>
        <Button size="sm" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "Add Task"}
        </Button>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {showForm && (
          <div className="flex flex-col gap-3 p-3 border rounded-lg bg-slate-50/50">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title..."
            />
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <Input
              type="date" 
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
            <Button onClick={handleAdd}>Create Task</Button>
          </div>
        )}

        <div className="flex flex-col divide-y">
          {tasks.length === 0 ? (
            <p className="text-sm text-muted-foreground py-3 text-center">No tasks yet</p>
          ) : (
            tasks.map((task) => {
              const isOverdue =
                task.status === "pending" &&
                new Date(task.dueDate) < new Date();
                
              return (
                <div
                  key={task.id}
                  className="flex items-center justify-between py-3 gap-4"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <Checkbox
                    className="border border-black"
                      id={`task-${task.id}`}
                      checked={task.status === "completed"}
                      onCheckedChange={(checked) =>
                        onToggle(task.id, !!checked)
                      }
                    />

                    <span
                      className={`truncate text-sm ${
                        task.status === "completed"
                          ? "line-through text-muted-foreground"
                          : isOverdue 
                          ? "text-red-500 font-medium"
                          : ""
                      }`}
                    >
                      {task.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${priorityColors[task.priority]}`}
                    >
                      {task.priority}
                    </span>
                    <span
                      className={`text-xs w-20 text-right ${isOverdue ? "text-red-500 font-bold" : "text-muted-foreground"}`}
                    >
                      {task.status === "completed"
                        ? "Done"
                        : new Date(task.dueDate).toLocaleDateString()}
                    </span>
                    <Button variant="ghost" size="sm" onClick={() => onDelete(task.id)}>
                      Delete
                    </Button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}