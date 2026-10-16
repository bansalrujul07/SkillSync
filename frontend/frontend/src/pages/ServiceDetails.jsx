import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api/axios";

function ServiceDetails() {
    const { id } = useParams();

    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [requestMessage, setRequestMessage] = useState("");
    const [requestStatus, setRequestStatus] = useState("");
    const [requestStatusType, setRequestStatusType] = useState("");
    const [sendingRequest, setSendingRequest] = useState(false);

    const handleRequestSubmit = async (event) => {
        event.preventDefault();

        setRequestStatus("");
        setRequestStatusType("");
        setSendingRequest(true);

        try {
            const response = await api.post(
                `/service-requests/${id}`,
                { message: requestMessage }
            );

            setRequestStatus(
                response.data.message ||
                "Service request submitted successfully!"
            );
            setRequestStatusType("success");
            setRequestMessage("");
        } catch (err) {
            setRequestStatus(
                err.response?.data?.message ||
                "Unable to send your request. Please try again."
            );
            setRequestStatusType("error");
        } finally {
            setSendingRequest(false);
        }
    };

    useEffect(() => {
        const fetchService = async () => {
            try {
                const response = await api.get(`/services/${id}`);
                setService(response.data.service);
            } catch (err) {
                setError(
                    err.response?.data?.message ||
                    "Unable to load this service."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchService();
    }, [id]);

    if (loading) {
        return (
            <main className="min-h-screen bg-[#F7F6F0] px-6 py-16 text-center text-[#77796F]">
                Loading service details...
            </main>
        );
    }

    if (error || !service) {
        return (
            <main className="min-h-screen bg-[#F7F6F0] px-6 py-16 text-center text-[#252923]">
                <h1 className="text-2xl font-semibold">
                    Service not found
                </h1>

                <p className="mt-3 text-[#77796F]">
                    {error || "This service may no longer be available."}
                </p>

                <Link
                    to="/services"
                    className="mt-6 inline-flex rounded-lg bg-[#727D55] px-5 py-3 text-sm font-medium text-white hover:bg-[#5F6946]"
                >
                    Back to services
                </Link>
            </main>
        );
    }

    const arrangement =
        service.exchangeType === "skill-exchange"
            ? "Skill Exchange"
            : service.exchangeType === "free"
                ? "Free Service"
                : "Paid Service";

    return (
        <main className="min-h-screen bg-[#F7F6F0] px-6 py-12 text-[#252923]">
            <div className="mx-auto max-w-3xl">
                <Link
                    to="/services"
                    className="text-sm font-medium text-[#66734D] hover:text-[#252923]"
                >
                    ← Back to services
                </Link>

                <article className="mt-8 rounded-2xl border border-[#E4E3D8] bg-white p-8 sm:p-10">
                    <span className="inline-flex rounded-full bg-[#EEF0E7] px-3 py-1 text-xs font-medium text-[#66734D]">
                        {service.category}
                    </span>

                    <h1 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
                        {service.title}
                    </h1>

                    <p className="mt-5 whitespace-pre-line text-base leading-7 text-[#77796F]">
                        {service.description}
                    </p>

                    <div className="mt-8 border-t border-[#E7E5DC] pt-6">
                        <p className="text-sm text-[#77796F]">
                            Service arrangement
                        </p>

                        <p className="mt-1 font-semibold">
                            {arrangement}
                        </p>

                        <p className="mt-5 text-sm text-[#77796F]">
                            {service.exchangeType === "paid" ||
                            Number(service.price) > 0
                                ? "Price"
                                : "Cost"}
                        </p>

                        <p className="mt-1 text-xl font-semibold">
                            {Number(service.price) > 0
                                ? `₹${Number(service.price).toLocaleString("en-IN")}`
                                : "No monetary charge"}
                        </p>

                        <p className="mt-5 text-sm text-[#77796F]">
                            Offered by
                        </p>

                        <p className="mt-1 font-medium">
                            {service.owner?.fullName ||
                                "SkillSync member"}
                        </p>

                        {service.owner?.bio && (
                            <p className="mt-2 text-sm leading-6 text-[#77796F]">
                                {service.owner.bio}
                            </p>
                        )}
                    </div>
                </article>

                <section className="mt-8 rounded-2xl border border-[#E4E3D8] bg-white p-8 sm:p-10">
                    <h2 className="text-xl font-semibold">
                        Interested in this service?
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-[#77796F]">
                        Send the service owner a request to start a
                        conversation or arrange a skill exchange.
                    </p>

                    <form
                        onSubmit={handleRequestSubmit}
                        className="mt-6 space-y-4"
                    >
                        <label
                            htmlFor="requestMessage"
                            className="block text-sm font-medium"
                        >
                            Message to the service owner
                            <span className="font-normal text-[#77796F]">
                                {" "}(optional)
                            </span>
                        </label>

                        <textarea
                            id="requestMessage"
                            value={requestMessage}
                            onChange={(event) =>
                                setRequestMessage(event.target.value)
                            }
                            maxLength={500}
                            rows={4}
                            placeholder="Introduce yourself and explain what you'd like to collaborate on..."
                            className="w-full rounded-xl border border-[#D8D9CE] bg-[#FDFDF9] p-3 text-sm outline-none transition focus:border-[#727D55] focus:ring-2 focus:ring-[#727D55]/20"
                        />

                        <p className="text-right text-xs text-[#77796F]">
                            {requestMessage.length}/500 characters
                        </p>

                        <button
                            type="submit"
                            disabled={sendingRequest}
                            className="rounded-xl bg-[#5F6946] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#4E5739] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {sendingRequest
                                ? "Sending request..."
                                : "Send service request"}
                        </button>

                        {requestStatus && (
                            <p
                                role="status"
                                aria-live="polite"
                                className={`text-sm ${
                                    requestStatusType === "success"
                                        ? "text-[#5F6946]"
                                        : "text-red-600"
                                }`}
                            >
                                {requestStatus}
                            </p>
                        )}
                    </form>
                </section>
            </div>
        </main>
    );
}

export default ServiceDetails;
