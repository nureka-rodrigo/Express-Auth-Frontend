import { DashboardLayout } from "@/components";
import { Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Separator,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { apiClient } from "@/api";
import { toast } from "@/hooks";
import { useEffect, useState } from "react";

type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  __v: number;
};

export const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const retrieveAllUsers = async () => {
    setIsLoading(true);
    try {
      const client = apiClient();
      const response = await client.get("/admin/users");

      setUsers(response.data.data);
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
    retrieveAllUsers().then((r) => r);
  }, []);

  const handleDelete = (userId: string) => async () => {
    try {
      const client = apiClient();
      await client.delete(`/admin/users/${userId}`);

      toast({
        title: "Success",
        description: "User deleted successfully",
      });

      retrieveAllUsers().then((r) => r);
    } catch (error) {
      const response = error.response;
      toast({
        title: "Error",
        description: response.data.message,
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Users</h1>
      </div>
      <div className="flex flex-1 justify-center">
        <div className="flex flex-col w-full text-center">
          <Card>
            <CardHeader>
              <CardDescription className="text-start">
                Manage users in your organization.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="block md:hidden space-y-4">
                {isLoading ? (
                  <>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Card key={index}>
                        <CardHeader className="flex flex-row text-center items-center justify-center pb-2">
                          <CardTitle className="text-sm font-medium text-center">
                            <Skeleton className="w-[150px] h-[16px] rounded-full" />
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm space-y-2">
                          <Skeleton className="w-[200px] h-[16px] rounded-full mx-auto" />
                          <Skeleton className="w-[50px] h-[16px] rounded-full mx-auto" />
                          <Separator />
                          <Button
                            size="icon"
                            variant="ghost"
                            disabled={isLoading}
                          >
                            <Trash className="h-4 w-4 text-destructive" />
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </>
                ) : (
                  <>
                    {users.map((user) => (
                      <Card key={user._id}>
                        <CardHeader className="flex flex-row text-center items-center justify-center pb-2">
                          <CardTitle className="text-sm font-medium text-center">
                            {user.firstName} {user.lastName}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm space-y-2">
                          <p>{user.email}</p>
                          <Badge variant="outline" className="uppercase">
                            {user.role}
                          </Badge>
                          <Separator />
                          <Button size="icon" variant="ghost">
                            <Trash className="h-4 w-4 text-destructive" />
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </>
                )}
              </div>

              <div className="hidden md:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-bold">First Name</TableHead>
                      <TableHead className="font-bold">Last Name</TableHead>
                      <TableHead className="font-bold">Email</TableHead>
                      <TableHead className="font-bold">Role</TableHead>
                      <TableHead className="font-bold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <>
                        {Array.from({ length: 5 }).map((_, index) => (
                          <TableRow key={index} className="text-start">
                            <TableCell>
                              <Skeleton className="w-full h-[16px] rounded-full" />
                            </TableCell>
                            <TableCell>
                              <Skeleton className="w-full h-[16px] rounded-full" />
                            </TableCell>
                            <TableCell>
                              <Skeleton className="w-full h-[16px] rounded-full" />
                            </TableCell>
                            <TableCell>
                              <Skeleton className="w-full h-[16px] rounded-full" />
                            </TableCell>
                            <TableCell>
                              <Button
                                size="icon"
                                variant="ghost"
                                disabled={isLoading}
                              >
                                <Trash className="h-4 w-4 text-destructive" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </>
                    ) : (
                      <>
                        {users.map((user) => (
                          <TableRow key={user._id} className="text-start">
                            <TableCell>{user.firstName}</TableCell>
                            <TableCell>{user.lastName}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                              <Badge className="uppercase" variant="outline">
                                {user.role}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button size="icon" variant="ghost">
                                    <Trash className="h-4 w-4 text-destructive" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Are you absolutely sure?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This action cannot be undone. This will
                                      permanently delete the selected user
                                      account and all associated data.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={handleDelete(user._id)}
                                    >
                                      Continue
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </TableCell>
                          </TableRow>
                        ))}
                      </>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};
