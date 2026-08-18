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
    // MÚSICA DE FONDO
    // =========================================

    const backgroundMusic = document.getElementById("backgroundMusic");
    const musicToggle = document.getElementById("musicToggle");
    const musicVolume = document.getElementById("musicVolume");


    // =========================================
    // FUNCIÓN PARA ACTUALIZAR EL BOTÓN
    // =========================================

    function updateMusicButton() {

        if (!musicToggle || !backgroundMusic) {
            return;
        }

        if (backgroundMusic.paused) {
            musicToggle.textContent = "▶";
            musicToggle.setAttribute(
                "aria-label",
                "Reproducir música"
            );
        } else {
            musicToggle.textContent = "Ⅱ";
            musicToggle.setAttribute(
                "aria-label",
                "Pausar música"
            );
        }

    }


    // =========================================
    // FUNCIÓN PARA REPRODUCIR LA MÚSICA
    // =========================================

    function playBackgroundMusic() {

        if (!backgroundMusic) {
            return;
        }

        backgroundMusic.volume =
            musicVolume ? Number(musicVolume.value) : 0.25;

        const playPromise = backgroundMusic.play();

        if (playPromise !== undefined) {

            playPromise
                .then(() => {

                    updateMusicButton();

                    console.log(
                        "AL'IS — Música de fondo reproduciéndose."
                    );

                })
                .catch((error) => {

                    updateMusicButton();

                    console.error(
                        "AL'IS — No se pudo reproducir la música:",
                        error
                    );

                    console.error(
                        "Comprueba que existe: assets/audio/musica-fondo.mpeg"
                    );

                });

        }

    }


    // =========================================
    // FUNCIÓN PARA PAUSAR LA MÚSICA
    // =========================================

    function pauseBackgroundMusic() {

        if (!backgroundMusic) {
            return;
        }

        backgroundMusic.pause();

        updateMusicButton();

    }


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
    // CONFIGURACIÓN INICIAL DEL AUDIO
    // =========================================

    if (backgroundMusic) {

        backgroundMusic.volume =
            musicVolume ? Number(musicVolume.value) : 0.25;

        backgroundMusic.addEventListener(
            "play",
            updateMusicButton
        );

        backgroundMusic.addEventListener(
            "pause",
            updateMusicButton
        );

        backgroundMusic.addEventListener(
            "ended",
            updateMusicButton
        );

        backgroundMusic.addEventListener(
            "error",
            () => {

                console.error(
                    "AL'IS — ERROR EN EL AUDIO DE FONDO."
                );

                console.error(
                    "Ruta utilizada: assets/audio/musica-fondo.mpeg"
                );

                console.error(
                    "Revisa que el archivo exista y que su formato sea compatible."
                );

            }
        );

        backgroundMusic.addEventListener(
            "loadeddata",
            () => {

                console.log(
                    "AL'IS — Audio de fondo cargado correctamente."
                );

            }
        );

        updateMusicButton();

    }


    // =========================================
    // COMENZAR
    // Portada → Introducción
    // =========================================

    if (startButton) {

        startButton.addEventListener("click", () => {

            /*
             * IMPORTANTE:
             * play() se ejecuta directamente dentro
             * del evento click del usuario.
             *
             * Esto permite que el navegador considere
             * la reproducción como iniciada por el usuario.
             */

            playBackgroundMusic();

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

            const word =
                button.textContent.trim();

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

                moranButton.textContent =
                    "Ya sabes por qué 😂";

            } else {

                moranButton.textContent =
                    "¿Qué tiene de especial?";

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

                ringReveal.textContent =
                    "Cerrar ❤️";

            } else {

                ringReveal.textContent =
                    "Hay algo más aquí ❤️";

            }

        });

    }


    // =========================================
    // MEDIA PLACEHOLDERS
    // Si todavía no existe una foto/video,
    // se muestra el espacio reservado.
    // =========================================

    document.querySelectorAll(".media-frame").forEach((frame) => {

        const image =
            frame.querySelector("img");

        const video =
            frame.querySelector("video");

        const placeholder =
            frame.querySelector(".media-placeholder");


        // -----------------------------------------
        // IMÁGENES
        // -----------------------------------------

        if (image) {

            image.addEventListener("load", () => {

                frame.classList.add("has-media");

            });


            image.addEventListener("error", () => {

                image.style.display = "none";

                if (placeholder) {

                    placeholder.style.display =
                        "flex";

                }

            });

        }


        // -----------------------------------------
        // VIDEOS
        // -----------------------------------------

        if (video) {

            video.addEventListener(
                "loadeddata",
                () => {

                    frame.classList.add(
                        "has-media"
                    );

                }
            );


            video.addEventListener(
                "error",
                () => {

                    video.style.display = "none";

                    if (placeholder) {

                        placeholder.style.display =
                            "flex";

                    }

                }
            );

        }

    });


    // =========================================
    // REVEAL SUAVE AL HACER SCROLL
    // =========================================

    const revealElements =
        document.querySelectorAll(
            ".memory-card, .memory-block, .park-memory, " +
            ".our-language, .inside-joke, .chapter-quote, " +
            ".honest-story, .honest-quote, .family-grid, " +
            ".admiration-card, .song-card, .turbo-card, " +
            ".food-card, .rings-inner, .final-letter"
        );


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(

                (entries, obs) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                            obs.unobserve(
                                entry.target
                            );

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


    // =========================================
    // BOTÓN DE MÚSICA
    // =========================================

    if (musicToggle && backgroundMusic) {

        musicToggle.addEventListener(
            "click",
            () => {

                if (backgroundMusic.paused) {

                    playBackgroundMusic();

                } else {

                    pauseBackgroundMusic();

                }

            }
        );

    }


    // =========================================
    // CONTROL DE VOLUMEN
    // =========================================

    if (musicVolume && backgroundMusic) {

        musicVolume.addEventListener(
            "input",
            () => {

                backgroundMusic.volume =
                    Number(musicVolume.value);

            }
        );

    }


    // =========================================
    // VIDEOS
    // La música se pausa mientras
    // se reproduce cualquier video.
    // =========================================

    const videos =
        document.querySelectorAll("video");


    videos.forEach((video) => {


        // -------------------------------------
        // CUANDO EMPIEZA UN VIDEO
        // -------------------------------------

        video.addEventListener(
            "play",
            () => {

                if (
                    backgroundMusic &&
                    !backgroundMusic.paused
                ) {

                    backgroundMusic.pause();

                    updateMusicButton();

                }

            }
        );


        // -------------------------------------
        // CUANDO TERMINA UN VIDEO
        // -------------------------------------

        video.addEventListener(
            "ended",
            () => {

                /*
                 * No intentamos reproducir automáticamente
                 * desde aquí si el usuario no había iniciado
                 * previamente la música.
                 */

                if (
                    backgroundMusic &&
                    backgroundMusic.currentTime > 0
                ) {

                    playBackgroundMusic();

                }

            }
        );

    });


    // =========================================
    // FIN
    // =========================================

    console.log(
        "AL'IS — JavaScript funcionando ❤️"
    );

});