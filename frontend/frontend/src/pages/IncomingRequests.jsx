import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

function IncomingRequests() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [updatingId, setUpdatingId] = useState(null);
    const [notice, setNotice] = useState("");

    const fetchRequests = async () => {
        try {
            setError("");

            const response = await api.get(
                "/service-requests"
            );

            setRequests(response.data.requests || []);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Unable to load incoming requests."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleStatusUpdate = async (requestId, status) => {
        setUpdatingId(requestId);
        setError("");
        setNotice("");

        try {
            const response = await api.patch(
                `/service-requests/${requestId}/status`,
                { status }
            );

            setRequests((currentRequests) =>
                currentRequests.map((request) =>
                    request._id === requestId
                        ? {
                            ...request,
                            status: response.data.request.status,
                        }
                        : request
                )
            );

            setNotice(response.data.message);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Unable to update this request."
            );
        } finally {
            setUpdatingId(null);
        }
    };

    if (loading) {
        return (
            <main className="min-h-screen bg-[#F7F6F0] px-6 py-16 text-center text-[#77796F]">
                Loading incoming requests...
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#F7F6F0] px-6 py-12 text-[#252923]">
            <div className="mx-auto max-w-5xl">
                <Link
                    to="/services"
                    className="text-sm font-medium text-[#66734D] hover:text-[#252923]"
                >
                    ← Back to services
                </Link>

                <div className="mt-8">
                    <p className="text-sm font-medium uppercase tracking-widest text-[#727D55]">
                        Your marketplace activity
                    </p>

                    <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                        Incoming requests
                    </h1>

                    <p className="mt-3 max-w-2xl leading-7 text-[#77796F]">
                        Review people interested in your services.
                        Accept requests you'd like to proceed with, or
                        reject requests that aren't a fit.
                    </p>
                </div>

                {error && (
                    <div
                        role="alert"
                        className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                    >
                        {error}
                    </div>
                )}

                {notice && (
                    <div
                        role="status"
                        className="mt-6 rounded-xl border border-[#D8DDCB] bg-[#EEF0E7] p-4 text-sm text-[#4E5739]"
                    >
                        {notice}
                    </div>
                )}

                {requests.length === 0 ? (
                    <section className="mt-8 rounded-2xl border border-[#E4E3D8] bg-white px-6 py-16 text-center">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EEF0E7] text-2xl">
                            ♧
                        </div>

                        <h2 className="mt-5 text-xl font-semibold">
                            No requests yet
                        </h2>

                        <p className="mx-auto mt-2 max-w-md leading-6 text-[#77796F]">
                            When someone requests one of your services,
                            their message will appear here.
                        </p>

                        <Link
                            to="/services/new"
                            className="mt-6 inline-flex rounded-xl bg-[#5F6946] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#4E5739]"
                        >
                            Offer a service
                        </Link>
                    </section>
                ) : (
                    <div className="mt-8 space-y-5">
                        {requests.map((request) => (
                            <article
                                key={request._id}
                                className="rounded-2xl border border-[#E4E3D8] bg-white p-6 sm:p-8"
                            >
                                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                                    <div>
                                        <p className="text-xs font-medium uppercase tracking-wider text-[#727D55]">
                                            {request.service?.category ||
                                                "Service"}
                                        </p>

                                        <h2 className="mt-2 text-xl font-semibold">
                                            {request.service?.title ||
                                                "Unavailable service"}
                                        </h2>

                                        <p className="mt-2 text-sm text-[#77796F]">
                                            Requested by{" "}
                                            <span className="font-medium text-[#45483F]">
                                                {request.requester?.fullName ||
                                                    "SkillSync member"}
                                            </span>
                                        </p>
                                    </div>

                                    <span
                                        className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold capitalize ${request.status === "accepted"
                                            ? "bg-[#E5EEDF] text-[#45613B]"
                                            : request.status === "rejected"
                                                ? "bg-[#F6E8E3] text-[#99513D]"
                                                : request.status === "completed"
                                                    ? "bg-[#E8EAE7] text-[#50564D]"
                                                    : "bg-[#F3EEDC] text-[#8A7136]"
                                            }`}
                                    >
                                        {request.status}
                                    </span>
                                </div>

                                <div className="mt-5 rounded-xl bg-[#F7F6F0] p-4">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-[#77796F]">
                                        Message
                                    </p>

                                    <p className="mt-2 whitespace-pre-line text-sm leading-6 text-[#45483F]">
                                        {request.message ||
                                            "No message was included."}
                                    </p>
                                </div>

                                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                    <p className="text-xs text-[#77796F]">
                                        Submitted{" "}
                                        {new Date(
                                            request.createdAt
                                        ).toLocaleDateString("en-IN", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </p>

                                    {request.status === "pending" && (
                                        <div className="flex gap-3">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleStatusUpdate(
                                                        request._id,
                                                        "rejected"
                                                    )
                                                }
                                                disabled={
                                                    updatingId === request._id
                                                }
                                                className="rounded-xl border border-[#DCDDCF] px-4 py-2.5 text-sm font-medium text-[#45483F] transition hover:bg-[#F2F1EB] disabled:opacity-60"
                                            >
                                                Reject
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleStatusUpdate(
                                                        request._id,
                                                        "accepted"
                                                    )
                                                }
                                                disabled={
                                                    updatingId === request._id
                                                }
                                                className="rounded-xl bg-[#5F6946] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#4E5739] disabled:opacity-60"
                                            >
                                                {updatingId === request._id
                                                    ? "Updating..."
                                                    : "Accept"}
                                            </button>
                                        </div>
                                    )}
                                    {request.status === "accepted" && (
                                        <Link
                                            to={`/chat/${request._id}`}
                                            className="inline-flex items-center justify-center rounded-xl bg-[#5F6946] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#4E5739]"
                                        >
                                            Open chat →
                                        </Link>
                                    )}
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}

export default IncomingRequests;
