import React from "@rbxts/react";

import ErrorBoundary from "common/client/ui/components/error-handler/error-boundary";
import ErrorPage from "common/client/ui/components/error-handler/error-page";

type ErrorHandlerProps = React.PropsWithChildren;

export default function ErrorHandler({ children }: Readonly<ErrorHandlerProps>): React.ReactNode {
	return (
		<ErrorBoundary
			Fallback={err => {
				return <ErrorPage Message={tostring(err)} />;
			}}
		>
			{children}
		</ErrorBoundary>
	);
}
