import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import api from "../api/axios";

const SOCKET_URL = import.meta.env.VITE_API_URL
    ? import.meta.env.VITE_API_URL.replace(/\/api\/?$/, "")
    : "http://localhost:8081";

function Chat() {
    const { requestId } = useParams();
    const [messages, setMessages] = useState([]);
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState("");
    const [connectionStatus, setConnectionStatus] = useState("connecting");
    const [currentUserId, setCurrentUserId] = useState(null);

    const socketRef = useRef(null);
    const bottomRef = useRef(null);

    const addMessage = useCallback((message) => {
        if (!message?._id) return;

        setMessages((current) => {
            if (current.some((item) => item._id === message._id)) {
                return current;
            }

            return [...current, message].sort(
                (a, b) =>
                    new Date(a.createdAt).getTime() -
                    new Date(b.createdAt).getTime()
            );
        });
    }, []);


    useEffect(() => {
        let active = true;
        let socket;

        const loadChat = async () => {
            try {
                setLoading(true);
                setError("");
                setConnectionStatus("connecting");

                // Load the current user before creating the socket.
                const userResponse = await api.get("/auth/me");

                if (!active) return;

                setCurrentUserId(userResponse.data.user._id);

                // Load existing messages.
                const response = await api.get(`/messages/${requestId}`);

                if (!active) return;

                setMessages(response.data.messages || []);

                // Create the socket only after authentication succeeds.
                socket = io(SOCKET_URL, {
                    withCredentials: true,
                });

                socketRef.current = socket;

                socket.on("connect", () => {
                    if (!active) return;

                    setConnectionStatus("connecting");

                    // Join the room before allowing messages to be sent.
                    socket.emit("chat:join", requestId, (result) => {
                        if (!active) return;

                        if (result?.success) {
                            setConnectionStatus("connected");
                            setError("");
                        } else {
                            setConnectionStatus("error");
                            setError(
                                result?.message || "Unable to join this chat."
                            );
                        }
                    });
                });

                socket.on("connect_error", (err) => {
                    if (!active) return;

                    setConnectionStatus("error");
                    setError(
                        err.message || "Unable to connect to the chat server."
                    );
                });

                socket.on("disconnect", () => {
                    if (active) {
                        setConnectionStatus("connecting");
                    }
                });

                socket.on("chat:new", (message) => {
                    if (active) addMessage(message);
                });
            } catch (err) {
                if (active) {
                    setConnectionStatus("error");
                    setError(
                        err.response?.data?.message ||
                        "Unable to load this conversation. Please try again."
                    );
                }
            } finally {
                if (active) setLoading(false);
            }
        };

        loadChat();

        return () => {
            active = false;

            if (socket) {
                socket.disconnect();
            }

            socketRef.current = null;
        };
    }, [requestId, addMessage]);


    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = (event) => {
        event.preventDefault();

        const trimmed = content.trim();
        const socket = socketRef.current;

        if (!trimmed || sending) return;

        if (trimmed.length > 2000) {
            setError("Messages cannot exceed 2000 characters.");
            return;
        }

        if (!socket?.connected || connectionStatus !== "connected") {
            setError("Chat is disconnected. Please wait for reconnection.");
            return;
        }

        setSending(true);
        setError("");

        socket.emit(
            "chat:send",
            {
                requestId,
                content: trimmed,
            },
            (result) => {
                setSending(false);

                if (!result?.success) {
                    setError(result?.message || "Unable to send message.");
                    return;
                }

                setContent("");
            }
        );
    };

    return (
        <main className="min-h-screen bg-[#F7F6F0] px-4 py-8 text-[#252923] sm:px-6 sm:py-12">
            <div className="mx-auto max-w-3xl">
                <Link
                    to="/requests"
                    className="text-sm font-medium text-[#66734D] hover:text-[#252923]"
                >
                    ← Back to requests
                </Link>

                <header className="mt-7">
                    <p className="text-sm font-medium uppercase tracking-widest text-[#727D55]">
                        SkillSync conversations
                    </p>

                    <h1 className="mt-2 text-3xl font-semibold tracking-tight">
                        Service chat
                    </h1>

                    <div className="mt-3 flex items-center gap-2 text-sm text-[#77796F]">
                        <span
                            className={`h-2 w-2 rounded-full ${connectionStatus === "connected"
                                ? "bg-[#667D4B]"
                                : connectionStatus === "error"
                                    ? "bg-red-500"
                                    : "bg-[#C5A65A]"
                                }`}
                        />
                        {connectionStatus === "connected"
                            ? "Connected"
                            : connectionStatus === "error"
                                ? "Connection issue"
                                : "Connecting..."}
                    </div>
                </header>

                {error && (
                    <div
                        role="alert"
                        className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                    >
                        {error}
                    </div>
                )}

                <section className="mt-6 flex h-[65vh] min-h-[420px] flex-col overflow-hidden rounded-2xl border border-[#E4E3D8] bg-white shadow-sm">
                    <div className="border-b border-[#EAE9E0] bg-[#FBFAF6] px-5 py-4">
                        <h2 className="font-semibold">Messages</h2>
                        <p className="mt-1 text-xs text-[#77796F]">
                            Messages are saved so you can return to this
                            conversation later.
                        </p>
                    </div>

                    <div className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-6">
                        {loading ? (
                            <p className="py-8 text-center text-sm text-[#77796F]">
                                Loading conversation...
                            </p>
                        ) : messages.length === 0 ? (
                            <div className="py-12 text-center">
                                <p className="font-medium">
                                    Start the conversation
                                </p>
                                <p className="mt-2 text-sm text-[#77796F]">
                                    Send a message to discuss the service.
                                </p>
                            </div>
                        ) : (
                            messages.map((message) => {
                                const isMine =
                                    String(message.sender?._id || message.sender) ===
                                    String(currentUserId);

                                return (
                                    <div
                                        key={message._id}
                                        className={`flex w-full ${isMine ? "justify-end" : "justify-start"}`}
                                    >
                                        <article
                                            className={`max-w-[82%] rounded-2xl px-4 py-3 shadow-sm sm:max-w-[70%] ${isMine
                                                ? "rounded-br-md bg-[#5F6946] text-white"
                                                : "rounded-bl-md border border-[#E4E3D8] bg-[#F7F6F0] text-[#252923]"
                                                }`}
                                        >
                                            <p
                                                className={`mb-1 text-xs font-semibold ${isMine ? "text-[#E9EBDD]" : "text-[#66734D]"
                                                    }`}
                                            >
                                                {isMine
                                                    ? "You"
                                                    : message.sender?.fullName ||
                                                    message.sender?.name ||
                                                    "SkillSync member"}
                                            </p>

                                            <p className="whitespace-pre-wrap break-words text-sm leading-6">
                                                {message.content}
                                            </p>

                                            <p
                                                className={`mt-1 text-right text-[10px] ${isMine ? "text-[#E9EBDD]" : "text-[#77796F]"
                                                    }`}
                                            >
                                                {message.createdAt
                                                    ? new Date(message.createdAt).toLocaleTimeString(
                                                        "en-IN",
                                                        {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        }
                                                    )
                                                    : ""}
                                            </p>
                                        </article>
                                    </div>
                                );
                            })

                        )}

                        <div ref={bottomRef} />
                    </div>

                    <form
                        onSubmit={handleSend}
                        className="border-t border-[#EAE9E0] bg-white p-4 sm:p-5"
                    >
                        <label
                            htmlFor="chat-message"
                            className="mb-2 block text-sm font-medium text-[#45483F]"
                        >
                            Your message
                        </label>

                        <div className="flex items-end gap-3">
                            <textarea
                                id="chat-message"
                                value={content}
                                onChange={(event) =>
                                    setContent(event.target.value)
                                }
                                placeholder="Write a message..."
                                maxLength={2000}
                                rows={2}
                                disabled={loading}
                                className="min-h-[52px] flex-1 resize-y rounded-xl border border-[#DCDDCF] bg-[#FDFCFA] px-4 py-3 text-sm outline-none transition focus:border-[#727D55] focus:ring-2 focus:ring-[#E9EBDD] disabled:opacity-60"
                            />

                            <button
                                type="submit"
                                disabled={
                                    loading ||
                                    sending ||
                                    !content.trim() ||
                                    connectionStatus !== "connected"
                                }
                                className="rounded-xl bg-[#5F6946] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#4E5739] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {sending ? "Sending..." : "Send"}
                            </button>
                        </div>

                        <p className="mt-2 text-xs text-[#77796F]">
                            Maximum 2000 characters.
                        </p>
                    </form>
                </section>
            </div>
        </main>
    );
}

export default Chat;