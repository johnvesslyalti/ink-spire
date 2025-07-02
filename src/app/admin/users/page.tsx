import { Badge } from "@/styles/components/ui/badge";
import { Card, CardContent } from "@/styles/components/ui/card";
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/styles/components/ui/table";
import { Table, UserIcon } from "lucide-react";

type User = {
    id: string;
    name: string;
    email: string;
    role: "admin" | "user";
    createdAt: string;
};

async function getUsers(): Promise<User[]> {
    return [
        {
            id: "1",
            name: "Alice Johnson",
            email: "alice@example.com",
            role: "admin",
            createdAt: "2024-01-15",
        },
        {
            id: "2",
            name: "Bob Smith",
            email: "bob@example.com",
            role: "user",
            createdAt: "2024-02-10",
        },
    ];
}

export default async function UsersPage() {
    const users = await getUsers();

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold flex items-center gap-2">
                <UserIcon className="w-6 h-6" />
                Users
            </h1>

            <Card>
                <CardContent className="p-4">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Joined</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <Badge variant={user.role === "admin" ? "destructive" : "secondary"}>
                                            {user.role}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
