import { Locator } from "@playwright/test";

export type Viewport = {
  innerWidth: number;
  innerHeight: number;
};

export async function isInViewport(element: Locator, window: Viewport) {
  const VIEW_WIDTH = window.innerWidth;
  const VIEW_HEIGHT = window.innerHeight;
  const coords = await element.boundingBox().catch((exception) => {
    throw exception;
  });

  if (
    coords &&
    coords.x >= 0 &&
    coords.y >= 0 &&
    coords.x <= VIEW_WIDTH &&
    coords.y <= VIEW_HEIGHT
  ) {
    return true;
  } else {
    return false;
  }
}
