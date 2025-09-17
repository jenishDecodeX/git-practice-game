import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/AuthContext";
import { Mail, User, MessageSquare, Calendar } from "lucide-react";

export default function AdminContacts() {
    const { user } = useContext(AuthContext);
    const [contacts, setContacts] = useState([]);
    const router = useRouter();

    useEffect(() => {
        fetch("/api/contact")
            .then(res => res.json())
            .then(data => {
                const sortedData = data.sort((a, b) => {
                    if (a.status !== b.status) return a.status === "new" ? -1 : 1;
                    return new Date(b.date) - new Date(a.date);
                });
                setContacts(sortedData);

                // Mark all new as read
                fetch("/api/mark-contacts-read", { method: "POST" })
                    .then(res => res.json())
                    .then(result => {
                        console.log("Updated newCount:", result.newCount);
                    });
            });
    }, []);

    if (!user || user.role !== "admin") {
        return (
            <p className="p-6 sm:p-10 min-w-full text-center pt-20 sm:pt-32 text-xl sm:text-3xl text-red-500">
                Access Denied. Admins only.
            </p>
        );
    }

    return (
        <div className="px-4 sm:px-6 py-16 sm:py-24 min-h-screen bg-[#0e0e10] text-white">
            <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-green-400">
                Admin - Contact Submissions
            </h1>

            {contacts.length === 0 ? (
                <p className="text-center text-gray-400">No contacts yet.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                    {contacts.map((c, index) => (
                        <div
                            key={index}
                            className="bg-[#161618] border border-gray-800 rounded-2xl p-4 sm:p-5 shadow-md hover:shadow-lg transition-shadow"
                        >
                            <div className="flex items-center mb-3">
                                <User className="w-5 h-5 text-purple-400 mr-2 flex-shrink-0" />
                                <span className="font-semibold break-words">{c.name}</span>
                            </div>

                            <div className="flex items-center mb-3">
                                <Mail className="w-5 h-5 text-blue-400 mr-2 flex-shrink-0" />
                                <span className="text-gray-300 break-words">{c.email}</span>
                            </div>

                            <div className="flex items-start mb-3">
                                <MessageSquare className="w-5 h-5 text-yellow-400 mr-2 mt-1 flex-shrink-0" />
                                <p className="text-gray-300 break-words">{c.message}</p>
                            </div>

                            <div className="flex items-center text-xs sm:text-sm text-gray-500">
                                <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                                {new Date(c.date).toLocaleString()}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="flex justify-center mt-10">
                <button
                    onClick={() => router.back()}
                    className="px-4 sm:px-5 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors text-sm sm:text-base"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
}
