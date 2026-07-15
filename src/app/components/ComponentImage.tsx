import { useState, useEffect } from "react";
import { ComponentMetadata } from "./data/types";

interface ComponentImageProps {
  component: ComponentMetadata;
  className?: string;
}

/**
 * Renders a component's real product photo (component.image) when available,
 * falling back to its hand-drawn placeholder icon if no image is set or the
 * file fails to load (e.g. it hasn't been added to /public/images yet).
 */
export function ComponentImage({ component, className = "size-16" }: ComponentImageProps) {
  const [failed, setFailed] = useState(false);

  // Reset failure state when switching to a different component.
  useEffect(() => setFailed(false), [component.image]);

  if (component.image && !failed) {
    return (
      <img
        src={component.image}
        alt={component.name}
        className={`${className} object-contain`}
        onError={() => setFailed(true)}
      />
    );
  }

  return <>{component.renderSvg(className)}</>;
}
