import { useEffect, useState, useCallback } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAdminGuard } from "@/hooks/useAdminGuard";
import { supabase } from "@/integrations/supabase/client";
import { format, subDays } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ClipboardList, Clock, ChevronDown, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

interface AuditLogEntry {
  id: string;
  admin_user_id: string;
  action: string;
  table_name: string;
  record_id: string;
  before_data: Record<string, any> | null;
  after_data: Record<string, any> | null;
  created_at: string;
}

const DATE_RANGE_OPTIONS = [
  { value: "7", label: "Last 7 days" },
  { value: "30", label: "Last 30 days" },
  { value: "90", label: "Last 90 days" },
];

const actionLabel = (action: string): string => {
  const labels: Record<string, string> = {
    INSERT: "Created record",
    UPDATE: "Updated record",
    DELETE: "Deleted record",
  };
  return labels[action?.toUpperCase()] || action;
};

const tableLabel = (table: string): string => {
  const labels: Record<string, string> = {
    products: "Products",
    product_variants: "Variants",
    orders: "Orders",
    profiles: "Profiles",
    categories: "Categories",
    user_roles: "User Roles",
  };
  return labels[table] || table;
};

const actionColor = (action: string): string => {
  switch (action?.toUpperCase()) {
    case "INSERT":
      return "bg-green-100 text-green-800";
    case "UPDATE":
      return "bg-blue-100 text-blue-800";
    case "DELETE":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const AdminActivity = () => {
  const { isAdmin, loading: guardLoading } = useAdminGuard();
  const [entries, setEntries] = useState<AuditLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState("30");
  const [actionFilter, setActionFilter] = useState("all");
  const [tableFilter, setTableFilter] = useState("all");
  const [adminEmails, setAdminEmails] = useState<Record<string, string>>({});
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  // Collect unique action types and table names for filter dropdowns
  const [actionTypes, setActionTypes] = useState<string[]>([]);
  const [tableNames, setTableNames] = useState<string[]>([]);

  const fetchActivity = useCallback(async () => {
    setLoading(true);
    const since = subDays(new Date(), parseInt(dateRange)).toISOString();

    let query = (supabase as any)
      .from("admin_audit_log")
      .select("*")
      .gte("created_at", since)
      .order("created_at", { ascending: false })
      .limit(200);

    if (actionFilter !== "all") {
      query = query.eq("action", actionFilter);
    }
    if (tableFilter !== "all") {
      query = query.eq("table_name", tableFilter);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching audit log:", error.message);
      setLoading(false);
      return;
    }

    const logs = (data as AuditLogEntry[]) || [];
    setEntries(logs);

    // Extract unique action types and table names for filter options
    // (fetch unfiltered to populate dropdowns)
    const { data: allData } = await (supabase as any)
      .from("admin_audit_log")
      .select("action, table_name")
      .gte("created_at", since);

    if (allData) {
      const actions = [...new Set((allData as any[]).map((d) => d.action))].filter(Boolean) as string[];
      const tables = [...new Set((allData as any[]).map((d) => d.table_name))].filter(Boolean) as string[];
      setActionTypes(actions.sort());
      setTableNames(tables.sort());
    }

    // Batch-fetch admin emails
    const adminIds = [...new Set(logs.map((l) => l.admin_user_id).filter(Boolean))];
    if (adminIds.length > 0) {
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, email")
        .in("id", adminIds);

      if (profiles) {
        const emailMap: Record<string, string> = {};
        (profiles as any[]).forEach((p) => {
          emailMap[p.id] = p.email || p.id;
        });
        setAdminEmails(emailMap);
      }
    }

    setLoading(false);
  }, [dateRange, actionFilter, tableFilter]);

  useEffect(() => {
    if (isAdmin) fetchActivity();
  }, [isAdmin, fetchActivity]);

  const toggleExpanded = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  if (guardLoading || loading) {
    return (
      <AdminLayout title="Activity Log">
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </AdminLayout>
    );
  }

  if (!isAdmin) return null;

  const hasDiffData = (entry: AuditLogEntry) =>
    entry.before_data || entry.after_data;

  return (
    <AdminLayout title="Activity Log">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Filter className="h-4 w-4" />
          <span className="hidden sm:inline">Filters:</span>
        </div>

        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Date range" />
          </SelectTrigger>
          <SelectContent>
            {DATE_RANGE_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={actionFilter} onValueChange={setActionFilter}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Action type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Actions</SelectItem>
            {actionTypes.map((a) => (
              <SelectItem key={a} value={a}>
                {actionLabel(a)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={tableFilter} onValueChange={setTableFilter}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Table" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tables</SelectItem>
            {tableNames.map((t) => (
              <SelectItem key={t} value={t}>
                {tableLabel(t)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Empty state */}
      {entries.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-muted-foreground">
            <ClipboardList className="h-12 w-12 mb-4 opacity-40" />
            <p className="text-lg font-medium">No activity recorded yet</p>
            <p className="text-sm mt-1">Admin actions will appear here as they happen.</p>
          </CardContent>
        </Card>
      ) : (
        /* Timeline feed */
        <div className="space-y-3">
          {entries.map((entry) => (
            <Card key={entry.id}>
              <Collapsible
                open={expandedIds.has(entry.id)}
                onOpenChange={() => toggleExpanded(entry.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      {/* Top row: action + table */}
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <Badge
                          variant="secondary"
                          className={actionColor(entry.action)}
                        >
                          {actionLabel(entry.action)}
                        </Badge>
                        <Badge variant="outline">
                          {tableLabel(entry.table_name)}
                        </Badge>
                      </div>

                      {/* Admin email + timestamp */}
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mt-2">
                        <span className="truncate">
                          {adminEmails[entry.admin_user_id] || entry.admin_user_id?.slice(0, 8) + "..."}
                        </span>
                        <span className="flex items-center gap-1 whitespace-nowrap">
                          <Clock className="h-3 w-3" />
                          {format(new Date(entry.created_at), "MMM d, yyyy h:mm a")}
                        </span>
                      </div>

                      {/* Record ID */}
                      <p className="text-xs text-muted-foreground mt-1 font-mono">
                        Record: {entry.record_id}
                      </p>
                    </div>

                    {/* Expand button */}
                    {hasDiffData(entry) && (
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 transition-transform",
                              expandedIds.has(entry.id) && "rotate-180"
                            )}
                          />
                        </Button>
                      </CollapsibleTrigger>
                    )}
                  </div>

                  {/* Expandable diff section */}
                  {hasDiffData(entry) && (
                    <CollapsibleContent>
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {entry.before_data && (
                          <div>
                            <p className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wider">
                              Before
                            </p>
                            <pre className="text-xs bg-red-50 border border-red-200 rounded-lg p-3 overflow-x-auto max-h-60">
                              {JSON.stringify(entry.before_data, null, 2)}
                            </pre>
                          </div>
                        )}
                        {entry.after_data && (
                          <div>
                            <p className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wider">
                              After
                            </p>
                            <pre className="text-xs bg-green-50 border border-green-200 rounded-lg p-3 overflow-x-auto max-h-60">
                              {JSON.stringify(entry.after_data, null, 2)}
                            </pre>
                          </div>
                        )}
                      </div>
                    </CollapsibleContent>
                  )}
                </CardContent>
              </Collapsible>
            </Card>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminActivity;
