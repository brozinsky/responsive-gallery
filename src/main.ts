import "./scss/main.scss";
import { setupModal } from "./modal";

window.addEventListener("DOMContentLoaded", () => {
  setupModal("modalWrapper", "openModalBtn", "closeModalBtn", "modalIframe");
});
