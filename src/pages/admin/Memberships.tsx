import { useEffect, useState, useCallback, useMemo } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAdminGuard } from "@/hooks/useAdminGuard";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Users, Search, Hexagon, UserCheck, UserX } from "lucide-react";
import { format } from "date-fns";

interface ProfileRow {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  created_at: string | null;
}

interface MembershipData {
  id: string;
  user_id: string;
  status: string;
  current_period_start: string | null;
  current_period_end: string | null;
}

interface UserRow extends ProfileRow {
  membership: MembershipData | null;
}

const AdminMemberships = () => {
  const { isAdmin, loading: guardLoading } = useAdminGuard();
  const { toast } = useToast();
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [togglingIds, setTogglingIds] = useState<Set<string>>(new Set());

  const fetchData = useCallback(async () => {
    const [profilesRes, membershipsRes] = await Promise.all([
      supabase
        .from("profiles")
        .select("id, first_name, last_name, email, created_at")
        .order("created_at", { ascending: false }),
      supabase
        .from("memberships")
        .select("id, user_id, status, current_period_start, current_period_end"),
    ]);

    if (profilesRes.error) {
      toast({ title: "Error loading accounts", description: profilesRes.error.message, variant: "destructive" });
      setLoading(false);
      return;
    }

    const profiles = (profilesRes.data as unknown as ProfileRow[]) || [];
    const memberships = (membershipsRes.data as unknown as MembershipData[]) || [];

    const membershipMap = new Map(memberships.map((m) => [m.user_id, m]));

    const merged: UserRow[] = profiles.map((p) => ({
      ...p,
      membership: membershipMap.get(p.id) || null,
    }));

    setUsers(merged);
    setLoading(false);
  }, [toast]);

  useEffect(() => {
    if (isAdmin) fetchData();
  }, [isAdmin, fetchData]);

  const filtered = useMemo(() => {
    if (!search) return users;
    const q = search.toLowerCase();
    return users.filter((u) => {
      const name = `${u.first_name || ""} ${u.last_name || ""}`.toLowerCase();
      const email = (u.email || "").toLowerCase();
      return name.includes(q) || email.includes(q);
    });
  }, [users, search]);

  const counts = useMemo(() => {
    const active = users.filter((u) => u.membership?.status === "active").length;
    return { total: users.length, active, nonMember: users.length - active };
  }, [users]);

  const isMemberActive = (u: UserRow) => u.membership?.status === "active";

  const handleToggle = async (user: UserRow) => {
    const userId = user.id;
    setTogglingIds((prev) => new Set(prev).add(userId));

    const wasActive = isMemberActive(user);

    if (wasActive) {
      // Deactivate
      const { error } = await supabase
        .from("memberships")
        .update({ status: "inactive" })
        .eq("user_id", userId);

      if (error) {
        toast({ title: "Error revoking membership", description: error.message, variant: "destructive" });
      } else {
        toast({ title: `Membership revoked for ${user.first_name || user.email}` });
        setUsers((prev) =>
          prev.map((u) =>
            u.id === userId
              ? { ...u, membership: u.membership ? { ...u.membership, status: "inactive" } : null }
              : u
          )
        );
      }
    } else {
      // Activate — upsert membership
      const now = new Date();
      const periodEnd = new Date(now);
      periodEnd.setDate(periodEnd.getDate() + 30);

      const { data, error } = await supabase
        .from("memberships")
        .upsert(
          {
            user_id: userId,
            status: "active",
            current_period_start: now.toISOString(),
            current_period_end: periodEnd.toISOString(),
          },
          { onConflict: "user_id" }
        )
        .select()
        .single();

      if (error) {
        toast({ title: "Error granting membership", description: error.message, variant: "destructive" });
      } else {
        toast({ title: `Membership granted to ${user.first_name || user.email}` });
        const newMembership: MembershipData = data as unknown as MembershipData;
        setUsers((prev) =>
          prev.map((u) => (u.id === userId ? { ...u, membership: newMembership } : u))
        );
      }
    }

    setTogglingIds((prev) => {
      const next = new Set(prev);
      next.delete(userId);
      return next;
    });
  };

  if (guardLoading || loading) {
    return (
      <AdminLayout title="Memberships">
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-20 w-full" />
            ))}
          </div>
          <Skeleton className="h-64 w-full" />
        </div>
      </AdminLayout>
    );
  }

  if (!isAdmin) return null;

  return (
    <AdminLayout title="Memberships">
      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-100">
                <Users className="h-5 w-5 text-purple-700" />
              </div>
              <div>
                <p className="text-2xl font-bold">{counts.total}</p>
                <p className="text-xs text-muted-foreground">Total Accounts</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100">
                <UserCheck className="h-5 w-5 text-green-700" />
              </div>
              <div>
                <p className="text-2xl font-bold">{counts.active}</p>
                <p className="text-xs text-muted-foreground">Active Members</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gray-100">
                <UserX className="h-5 w-5 text-gray-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{counts.nonMember}</p>
                <p className="text-xs text-muted-foreground">Non-Members</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="mb-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Users table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Account</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Expires</TableHead>
                <TableHead className="text-center">Member</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((u) => {
                const name = [u.first_name, u.last_name].filter(Boolean).join(" ") || "—";
                const email = u.email || "—";
                const active = isMemberActive(u);
                const isExpired =
                  u.membership?.current_period_end &&
                  new Date(u.membership.current_period_end) < new Date();
                const toggling = togglingIds.has(u.id);

                return (
                  <TableRow key={u.id}>
                    <TableCell>
                      <div>
                        <div className="flex items-center gap-2">
                          {active && <Hexagon className="h-4 w-4 text-primary flex-shrink-0" />}
                          <span className="font-medium">{name}</span>
                        </div>
                        <p className="text-sm text-muted-foreground ml-6">{email}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {u.created_at
                        ? format(new Date(u.created_at), "MMM d, yyyy")
                        : "—"}
                    </TableCell>
                    <TableCell>
                      {active ? (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Active
                        </Badge>
                      ) : u.membership?.status === "canceled" ? (
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                          Canceled
                        </Badge>
                      ) : u.membership?.status === "inactive" ? (
                        <Badge variant="secondary" className="bg-gray-100 text-gray-500">
                          Inactive
                        </Badge>
                      ) : (
                        <span className="text-sm text-muted-foreground">—</span>
                      )}
                      {active && isExpired && (
                        <span className="text-xs text-red-500 ml-2">Expired</span>
                      )}
                    </TableCell>
                    <TableCell className="text-sm">
                      {u.membership?.current_period_end
                        ? format(new Date(u.membership.current_period_end), "MMM d, yyyy")
                        : "—"}
                    </TableCell>
                    <TableCell className="text-center">
                      <Switch
                        checked={active}
                        disabled={toggling}
                        onCheckedChange={() => handleToggle(u)}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No accounts found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AdminMemberships;
