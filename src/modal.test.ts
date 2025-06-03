// __tests__/modal.test.ts
import { describe, it, beforeEach, expect } from "vitest";
import { setupModal } from "../src/modal";

describe("Modal", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <button id="openModalBtn">Open Modal</button>
      <div
        id="modalWrapper"
        class="modal__wrapper"
        tabindex="-1"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modalTitle"
        aria-describedby="modalDesc"
      >
        <div class="modal__backdrop"></div>
        <div class="modal">
          <button id="closeModalBtn" class="modal__close">Close</button>
          <h2 id="modalTitle">Modal Heading</h2>
          <p id="modalDesc">Modal description</p>
          <iframe
            id="modalIframe"
            data-src="https://www.youtube.com/embed/x6iyz1AQhuU?autoplay=1"
          ></iframe>
        </div>
      </div>
    `;
  });

  it("opens the modal and sets iframe src", () => {
    setupModal("modalWrapper", "openModalBtn", "closeModalBtn", "modalIframe");

    const openBtn = document.getElementById("openModalBtn")!;
    const modal = document.getElementById("modalWrapper")!;
    const iframe = document.getElementById("modalIframe") as HTMLIFrameElement;

    openBtn.click();

    expect(modal).toHaveClass("modal__wrapper--active");
    expect(iframe.src).toContain("https://www.youtube.com/embed/x6iyz1AQhuU");
  });

  it("closes the modal", () => {
    setupModal("modalWrapper", "openModalBtn", "closeModalBtn", "modalIframe");

    const openBtn = document.getElementById("openModalBtn")!;
    const closeBtn = document.getElementById("closeModalBtn")!;
    const modal = document.getElementById("modalWrapper")!;

    openBtn.click();
    closeBtn.click();

    expect(modal).not.toHaveClass("modal__wrapper--active");
  });

  it("closes the modal on Escape key", () => {
    setupModal("modalWrapper", "openModalBtn", "closeModalBtn", "modalIframe");

    const openBtn = document.getElementById("openModalBtn")!;
    const modal = document.getElementById("modalWrapper")!;

    openBtn.click();

    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));

    expect(modal).not.toHaveClass("modal__wrapper--active");
  });
});
