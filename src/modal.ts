export function setupModal(
  modalId: string,
  openBtnId: string,
  closeBtnId: string,
  iframeId: string
) {
  const modalWrapper = document.getElementById(modalId)!;
  const openBtn = document.getElementById(openBtnId)!;
  const closeBtn = document.getElementById(closeBtnId)!;
  const backdrop = modalWrapper.querySelector(".modal__backdrop")!;
  const iframe = document.getElementById(iframeId) as HTMLIFrameElement;
  const videoSrc = iframe.dataset.src ?? "";
  const focusableSelectors =
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

  let lastFocusedElement: HTMLElement | null = null;

  function openModal() {
    modalWrapper.setAttribute("aria-hidden", "false");
    modalWrapper.setAttribute("aria-modal", "true");
    lastFocusedElement = document.activeElement as HTMLElement;
    modalWrapper.classList.add("modal__wrapper--active");

    iframe.src = videoSrc;
    document.body.classList.add("no-scroll");

    modalWrapper.querySelectorAll<HTMLElement>(focusableSelectors)[0]?.focus();
  }

  function closeModal() {
    modalWrapper.setAttribute("aria-hidden", "true");
    modalWrapper.removeAttribute("aria-modal");
    modalWrapper.classList.remove("modal__wrapper--active");
    iframe.src = "";
    document.body.classList.remove("no-scroll");

    lastFocusedElement?.focus();
  }

  function trapFocus(e: KeyboardEvent) {
    if (
      e.key !== "Tab" ||
      !modalWrapper.classList.contains("modal__wrapper--active")
    )
      return;

    const focusables =
      modalWrapper.querySelectorAll<HTMLElement>(focusableSelectors);
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  openBtn.addEventListener("click", openModal);
  closeBtn.addEventListener("click", closeModal);
  backdrop.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
    trapFocus(e);
  });
}
