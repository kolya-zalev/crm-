jest.mock("@/features/leads/api/notesApi");

import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import notesApi from "@/features/leads/api/notesApi";
import { useNotes } from "../hooks/useNotes";

const leadId = "1";

const fakeNote = {
  id: "note-1",
  leadId,
  text: "Note content",
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
};

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useNotes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (notesApi.getNotesByLead as jest.Mock).mockResolvedValue([]);
  });

  it("fetch notes from API", async () => {
    (notesApi.getNotesByLead as jest.Mock).mockResolvedValue([fakeNote]);

    const { result } = renderHook(() => useNotes(leadId), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.notes).toEqual([fakeNote]);
    expect(notesApi.getNotesByLead).toHaveBeenCalledTimes(1);
    expect(notesApi.getNotesByLead).toHaveBeenCalledWith(leadId);
  });

  it("createNote calls API and refetches notes", async () => {
    (notesApi.getNotesByLead as jest.Mock)
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([fakeNote]);
    (notesApi.createNote as jest.Mock).mockResolvedValue(fakeNote);

    const { result } = renderHook(() => useNotes(leadId), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    await result.current.createNote(fakeNote.text);

    await waitFor(() => expect(result.current.notes).toEqual([fakeNote]));
    expect(notesApi.createNote).toHaveBeenCalledWith(leadId, {
      text: fakeNote.text,
    });
    expect(notesApi.getNotesByLead).toHaveBeenCalledTimes(2);
  });

  it("deleteNote calls API and refetches notes", async () => {
    (notesApi.getNotesByLead as jest.Mock)
      .mockResolvedValueOnce([fakeNote])
      .mockResolvedValueOnce([]);
    (notesApi.deleteNote as jest.Mock).mockResolvedValue(undefined);

    const { result } = renderHook(() => useNotes(leadId), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    await result.current.deleteNote(fakeNote.id);

    await waitFor(() => expect(result.current.notes).toEqual([]));
    expect(notesApi.deleteNote).toHaveBeenCalledWith(leadId, fakeNote.id);
    expect(notesApi.getNotesByLead).toHaveBeenCalledTimes(2);
  });
});
