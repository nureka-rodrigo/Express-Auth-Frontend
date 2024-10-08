import { DashboardLayout } from "@/components";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Skeleton,
} from "@/components/ui";
import { User } from "lucide-react";
import { useEffect, useState } from "react";
import { apiClient } from "@/api";
import { toast } from "@/hooks";

type Counts = {
  users: number;
};

export const AdminDashboard = () => {
  const [countData, setCountData] = useState<Counts>({ users: 0 });
  const [isLoading, setIsLoading] = useState(false);

  const retrieveCounts = async () => {
    setIsLoading(true);
    try {
      const client = apiClient();
      const response = await client.get("/admin/dashboard");

      setCountData(response.data.data);
    } catch (error) {
      const response = error.response;
      toast({
        title: "Error",
        description: response.data.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    retrieveCounts().then((r) => r);
  }, []);

  return (
    <DashboardLayout>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
      </div>
      <div className="flex flex-1 justify-center">
        <div className="flex flex-col w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {isLoading ? (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    <Skeleton className="w-[100px] h-[16px] rounded-full" />
                  </CardTitle>
                  <User className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    <Skeleton className="w-[50px] h-[16px] rounded-full" />
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Users
                  </CardTitle>
                  <User className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{countData.users}</div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
