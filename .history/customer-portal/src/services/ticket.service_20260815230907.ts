import { supabase } from "./supabase";
import type { SupportTicket, NewTicketInput } from "../types/ticket";

export const ticketService = {
  async getTickets(): Promise<SupportTicket[]> {
    const { data, error } = await supabase
      .from("support_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return (data || []) as SupportTicket[];
  },

  async createTicket(input: NewTicketInput, customerId: string) {
    const { data, error } = await supabase
      .from("support_requests")
      .insert([
        {
          title: input.title.trim(),
          description: input.description.trim(),
          priority: input.priority,
          category: input.category,
          customer_id: customerId,
          status: "open",
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data as SupportTicket;
  },
};
