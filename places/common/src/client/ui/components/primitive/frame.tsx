import type { Ref } from "@rbxts/react";
import React, { forwardRef } from "@rbxts/react";

import type { BindingValue } from "types/utils/react";

export interface FrameProps<T extends Instance = Frame> extends React.PropsWithChildren {
	/** An optional helper that rounds the corners of the frame. */
	CornerRadius?: BindingValue<UDim>;
	/** The default properties of the component. */
	Native?: Partial<React.InstanceProps<T>>;
}

/**
 * A wrapper around the `Frame` component, a GuiObject that renders as a plain
 * rectangle with no other content. If you intend to use this component as a
 * container for other components, consider using the `Group` component
 * instead.
 *
 * @example
 *
 * ```tsx
 * <Frame CornerRadius={new UDim(0, 8)} Native={{ Size: new UDim2(0, 100, 0, 100) }}>
 * ```
 *
 * @note A frame defaults to being centered in the parent container (anchor point and
 * position are set to 0.5).
 * @component
 * @see https://create.roblox.com/docs/reference/engine/classes/Frame
 */
export const Frame = forwardRef(
	({ CornerRadius, Native, children }: Readonly<FrameProps>, ref: Ref<Frame>) => {
		return (
			<frame
				ref={ref}
				AnchorPoint={new Vector2(0.5, 0.5)}
				BorderSizePixel={0}
				Position={new UDim2(0.5, 0, 0.5, 0)}
				Size={new UDim2(1, 0, 1, 0)}
				{...Native}
			>
				{children}
				{CornerRadius ? <uicorner CornerRadius={CornerRadius} /> : undefined}
			</frame>
		);
	},
);
