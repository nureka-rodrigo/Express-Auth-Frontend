import {DashboardLayout} from "@/components";
import {Trash} from "lucide-react"
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Separator,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui"

export const AdminUsers = () => {
  return (
    <DashboardLayout>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Users</h1>
      </div>
      <div
        className="flex flex-1 justify-center rounded-lg"
      >
        <div className="flex flex-col w-full text-center">
          {/* Add your content here */}
          <Card>
            <CardHeader>
              <CardDescription className="text-start">
                Manage users in your organization.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="block md:hidden">
                <Card>
                  <CardHeader className="flex flex-row text-center items-center justify-center pb-2">
                    <CardTitle className="text-sm font-medium text-center">Nureka Rodrigo</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-2">
                    <p>Email: cst20069@std.uwu.ac.lk</p>
                    <Badge variant="outline">Admin</Badge>
                    <Separator/>
                    <Button size="icon" variant="ghost">
                      <Trash className="h-4 w-4 text-destructive"/>
                    </Button>
                  </CardContent>
                </Card>
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
                    <TableRow className="text-start">
                      <TableCell>
                        Nureka
                      </TableCell>
                      <TableCell>
                        Rodrigo
                      </TableCell>
                      <TableCell>cst20069@std.uwu.ac.lk</TableCell>
                      <TableCell>
                        <Badge variant="outline">Admin</Badge>
                      </TableCell>
                      <TableCell>
                        <Button size="icon" variant="ghost">
                          <Trash className="h-4 w-4 text-destructive"/>
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>1-10</strong> of <strong>32</strong> Users
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}