import React, { StrictMode } from "@rbxts/react";
import { ReflexProvider } from "@rbxts/react-reflex";

import { commonStore as store } from "common/client/store";
import type { RemProviderProps } from "common/client/ui/providers/rem";
import { RemProvider } from "common/client/ui/providers/rem";

export interface MountProps extends RemProviderProps {
	/** The key for the UI component. */
	key?: string;
}

export function RootProvider({
	baseRem,
	remOverride,
	children,
}: Readonly<MountProps>): React.ReactNode {
	return (
		<StrictMode>
			<RemProvider
				key="rem-provider"
				baseRem={baseRem}
				minimumRem={0}
				remOverride={remOverride}
			>
				<ReflexProvider key="reflex-provider" producer={store}>
					{children}
				</ReflexProvider>
			</RemProvider>
		</StrictMode>
	);
}
