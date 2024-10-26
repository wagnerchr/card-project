import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import AdminClient from "@/components/AdminClient";

export default async function Admin() {
    const session = await getServerSession();
    if (!session) {
        redirect("/admin/login");
    }

    return (
        <div>
            <h1 className="text-2xl font-bold my-4">Admin - Gerenciar Cards</h1>
            <AdminClient />
        </div>
    );
}