
document.addEventListener("DOMContentLoaded", () => {

    const modal = document.getElementById("designPreviewModal");
    const previewImage = document.getElementById("previewDesignImage");
    const previewTitle = document.getElementById("previewDesignTitle");
    const closeButton = document.getElementById("closeDesignPreview");
    const downloadButton = document.getElementById("downloadDesignImage");

    const viewButtons = document.querySelectorAll(".design-view-btn");

    if (!modal || !previewImage || !closeButton) return;

    function openDesign(button) {
        const image = button.dataset.image;
        const title = button.dataset.title;

        previewImage.src = image;
        previewTitle.textContent = title;

        downloadButton.href = image;
        downloadButton.download = title
            .replace(/[^a-z0-9]/gi, "-")
            .toLowerCase() + ".png";

        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function closeDesign() {
        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";

        previewImage.src = "";
    }

    viewButtons.forEach(button => {
        button.addEventListener("click", () => {
            openDesign(button);
        });
    });

    closeButton.addEventListener("click", closeDesign);

    modal.addEventListener("click", event => {
        if (event.target === modal) {
            closeDesign();
        }
    });

    document.addEventListener("keydown", event => {
        if (
            event.key === "Escape" &&
            modal.classList.contains("active")
        ) {
            closeDesign();
        }
    });

});
