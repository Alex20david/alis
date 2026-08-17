// =========================================
// AL'IS
// Interacciones
// =========================================

document.addEventListener("DOMContentLoaded", () => {

    const startButton = document.getElementById("startButton");
    const nextButton = document.getElementById("nextButton");
    const yesButton = document.getElementById("yesButton");
    const yesAnswer = document.getElementById("yesAnswer");

    const nicknameButtons = document.querySelectorAll(".nickname");
    const nicknameDisplay = document.getElementById("nickname-display");

    const moranButton = document.getElementById("moran-button");
    const moranAnswer = document.getElementById("moran-answer");

    const ringReveal = document.getElementById("ringReveal");
    const ringContent = document.getElementById("ringContent");


    // =========================================
    // SCROLL SUAVE
    // =========================================

    function goTo(id) {
        const element = document.getElementById(id);

        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    }


    // =========================================
    // COMENZAR
    // Portada → Introducción
    // =========================================

    if (startButton) {
        startButton.addEventListener("click", () => {
            goTo("intro");
        });
    }


    // =========================================
    // CONTINUAR
    // Introducción → Capítulo I
    // =========================================

    if (nextButton) {
        nextButton.addEventListener("click", () => {
            goTo("chapter-start");
        });
    }


    // =========================================
    // RESPUESTA DEL COMIENZO
    // =========================================

    if (yesButton && yesAnswer) {
        yesButton.addEventListener("click", () => {
            yesAnswer.classList.add("show");
            yesButton.textContent = "❤️";
            yesButton.classList.add("answered");
        });
    }


    // =========================================
    // APODOS
    // =========================================

    nicknameButtons.forEach((button) => {
        button.addEventListener("click", () => {

            nicknameButtons.forEach((item) => {
                item.classList.remove("active");
            });

            button.classList.add("active");

            const word = button.textContent.trim();

            if (nicknameDisplay) {
                nicknameDisplay.innerHTML = `
                    <span>♡</span>
                    <p>${word}</p>
                `;

                nicknameDisplay.classList.add("selected");
            }
        });
    });


    // =========================================
    // MORAN DE LA VALVERDE
    // =========================================

    if (moranButton && moranAnswer) {
        moranButton.addEventListener("click", () => {

            moranAnswer.classList.toggle("show");

            if (moranAnswer.classList.contains("show")) {
                moranButton.textContent = "Ya sabes por qué 😂";
            } else {
                moranButton.textContent = "¿Qué tiene de especial?";
            }
        });
    }


    // =========================================
    // ANILLOS
    // =========================================

    if (ringReveal && ringContent) {
        ringReveal.addEventListener("click", () => {

            ringContent.classList.toggle("show");

            if (ringContent.classList.contains("show")) {
                ringReveal.textContent = "Cerrar ❤️";
            } else {
                ringReveal.textContent = "Hay algo más aquí ❤️";
            }
        });
    }


    // =========================================
    // MEDIA PLACEHOLDERS
    // Si todavía no existe una foto/video,
    // se muestra el espacio reservado.
    // =========================================

    document.querySelectorAll(".media-frame").forEach((frame) => {

        const image = frame.querySelector("img");
        const video = frame.querySelector("video");
        const placeholder = frame.querySelector(".media-placeholder");

        if (image) {
            image.addEventListener("load", () => {
                frame.classList.add("has-media");
            });

            image.addEventListener("error", () => {
                image.style.display = "none";
                if (placeholder) {
                    placeholder.style.display = "flex";
                }
            });
        }

        if (video) {
            video.addEventListener("loadeddata", () => {
                frame.classList.add("has-media");
            });

            video.addEventListener("error", () => {
                video.style.display = "none";
                if (placeholder) {
                    placeholder.style.display = "flex";
                }
            });
        }
    });


    // =========================================
    // REVEAL SUAVE AL HACER SCROLL
    // =========================================

    const revealElements = document.querySelectorAll(
        ".memory-card, .memory-block, .park-memory, " +
        ".our-language, .inside-joke, .chapter-quote, " +
        ".honest-story, .honest-quote, .family-grid, " +
        ".admiration-card, .song-card, .turbo-card, " +
        ".food-card, .rings-inner, .final-letter"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            (entries, obs) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        obs.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach((element) => {
            element.classList.add("reveal");
            observer.observe(element);
        });

    }


    console.log("AL'IS — JavaScript funcionando ❤️");
});
