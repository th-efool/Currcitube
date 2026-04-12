import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.100.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const lovableKey = Deno.env.get("LOVABLE_API_KEY");

    if (!lovableKey) {
      return new Response(JSON.stringify({ error: "AI service not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Verify user
    const supabase = createClient(supabaseUrl, supabaseKey);
    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: authError } = await supabase.auth.getUser(token);
    if (authError || !userData.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { message, history } = await req.json();

    // Fetch all assets with categories and current assignments
    const [assetsRes, employeesRes, assignmentsRes, categoriesRes] = await Promise.all([
      supabase.from("assets").select("*").eq("is_archived", false),
      supabase.from("employees").select("*"),
      supabase
        .from("asset_assignments")
        .select("*, employees(name)")
        .is("returned_date", null),
      supabase.from("asset_categories").select("*"),
    ]);

    const assets = assetsRes.data ?? [];
    const employees = employeesRes.data ?? [];
    const assignments = assignmentsRes.data ?? [];
    const categories = categoriesRes.data ?? [];

    const categoryMap = new Map(categories.map((c: any) => [c.id, c.name]));
    const assignmentMap = new Map(
      assignments.map((a: any) => [a.asset_id, a.employees?.name ?? "Unknown"])
    );

    // Build context
    let context = "## Assets\n\n";
    for (const a of assets) {
      const cat = a.category_id ? categoryMap.get(a.category_id) ?? "Uncategorized" : "Uncategorized";
      const assignedTo = assignmentMap.get(a.id) ?? "Unassigned";
      context += `- **${a.name}** | Category: ${cat} | Condition: ${a.condition} | Purchase cost: $${a.purchase_cost} | Purchase date: ${a.purchase_date} | Location: ${a.location ?? "N/A"} | Serial: ${a.serial_number ?? "N/A"} | Assigned to: ${assignedTo} | Useful life: ${a.useful_life_years} years\n`;
    }

    context += "\n## Employees\n\n";
    for (const e of employees) {
      const assignedAssets = assignments
        .filter((a: any) => a.employee_id === e.id)
        .map((a: any) => {
          const asset = assets.find((as: any) => as.id === a.asset_id);
          return asset?.name ?? "Unknown";
        });
      context += `- **${e.name}** | Department: ${e.department ?? "N/A"} | Email: ${e.email ?? "N/A"} | Assets assigned: ${assignedAssets.length > 0 ? assignedAssets.join(", ") : "None"}\n`;
    }

    const systemPrompt = `You are an AI assistant for an asset and equipment tracking system. You have access to the organization's complete asset and employee data below. Answer questions about assets, employees, assignments, depreciation, and equipment status based on this data. Be concise and helpful. Use markdown formatting.

${context}

Summary: ${assets.length} total assets, ${employees.length} employees, ${assignments.length} currently assigned assets.`;

    const messages = [
      { role: "system", content: systemPrompt },
      ...(history ?? []),
      { role: "user", content: message },
    ];

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${lovableKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages,
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add funds in workspace settings." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "AI service error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("ai-chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
