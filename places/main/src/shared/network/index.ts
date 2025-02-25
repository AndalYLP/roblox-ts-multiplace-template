import { Networking } from "@flamework/networking";

/** Fired by client to server. */
interface ClientToServerEvents {
	example(): void;
}

/** Fired by server to client. */
interface ServerToClientEvents {
	example(): void;
}

/** Fired by client to server. */
interface ClientToServerFunctions {
	example(): void;
}

/** Fired by server to client. */
interface ServerToClientFunctions {
	example(): void;
}

export const globalEvents = Networking.createEvent<ClientToServerEvents, ServerToClientEvents>();
export const globalFunctions = Networking.createFunction<
	ClientToServerFunctions,
	ServerToClientFunctions
>();
