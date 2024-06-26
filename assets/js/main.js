/*
	Paradigm Shift by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {
  var $window = $(window),
    $body = $("body");

  // Breakpoints.
  breakpoints({
    default: ["1681px", null],
    xlarge: ["1281px", "1680px"],
    large: ["981px", "1280px"],
    medium: ["737px", "980px"],
    small: ["481px", "736px"],
    xsmall: ["361px", "480px"],
    xxsmall: [null, "360px"],
  });

  // Play initial animations on page load.
  $window.on("load", function () {
    window.setTimeout(function () {
      $body.removeClass("is-preload");
    }, 100);
  });

  // Hack: Enable IE workarounds.
  if (browser.name == "ie") $body.addClass("is-ie");

  // Mobile?
  if (browser.mobile) $body.addClass("is-mobile");

  // Scrolly.
  $(".scrolly").scrolly({
    offset: 100,
  });

  // Polyfill: Object fit.
  if (!browser.canUse("object-fit")) {
    $(".image[data-position]").each(function () {
      var $this = $(this),
        $img = $this.children("img");

      // Apply img as background.
      $this
        .css("background-image", 'url("' + $img.attr("src") + '")')
        .css("background-position", $this.data("position"))
        .css("background-size", "cover")
        .css("background-repeat", "no-repeat");

      // Hide img.
      $img.css("opacity", "0");
    });

    $(".gallery > a").each(function () {
      var $this = $(this),
        $img = $this.children("img");

      // Apply img as background.
      $this
        .css("background-image", 'url("' + $img.attr("src") + '")')
        .css("background-position", "center")
        .css("background-size", "cover")
        .css("background-repeat", "no-repeat");

      // Hide img.
      $img.css("opacity", "0");
    });
  }

  // Gallery.
  $(".gallery")
    .on("click", "a", function (event) {
      var $a = $(this),
        $gallery = $a.parents(".gallery"),
        $modal = $gallery.children(".modal"),
        $modalImg = $modal.find("img"),
        href = $a.attr("href");

      // Not an image? Bail.
      if (!href.match(/\.(webp|gif|png|mp4)$/)) return;

      // Prevent default.
      event.preventDefault();
      event.stopPropagation();

      // Locked? Bail.
      if ($modal[0]._locked) return;

      // Lock.
      $modal[0]._locked = true;

      // Set src.
      $modalImg.attr("src", href);

      // Set visible.
      $modal.addClass("visible");

      // Focus.
      $modal.focus();

      // Delay.
      setTimeout(function () {
        // Unlock.
        $modal[0]._locked = false;
      }, 600);
    })
    .on("click", ".modal", function (event) {
      var $modal = $(this),
        $modalImg = $modal.find("img");

      // Locked? Bail.
      if ($modal[0]._locked) return;

      // Already hidden? Bail.
      if (!$modal.hasClass("visible")) return;

      // Stop propagation.
      event.stopPropagation();

      // Lock.
      $modal[0]._locked = true;

      // Clear visible, loaded.
      $modal.removeClass("loaded");

      // Delay.
      setTimeout(function () {
        $modal.removeClass("visible");

        setTimeout(function () {
          // Clear src.
          $modalImg.attr("src", "");

          // Unlock.
          $modal[0]._locked = false;

          // Focus.
          $body.focus();
        }, 475);
      }, 125);
    })
    .on("keypress", ".modal", function (event) {
      var $modal = $(this);

      // Escape? Hide modal.
      if (event.keyCode == 27) $modal.trigger("click");
    })
    .on("mouseup mousedown mousemove", ".modal", function (event) {
      // Stop propagation.
      event.stopPropagation();
    })
    .prepend(
      '<div class="modal" tabIndex="-1"><div class="inner"><img src="" alt="Gallery image"/></div></div>',
    )
    .find("img")
    .on("load", function (event) {
      var $modalImg = $(this),
        $modal = $modalImg.parents(".modal");

      setTimeout(function () {
        // No longer visible? Bail.
        if (!$modal.hasClass("visible")) return;

        // Set loaded.
        $modal.addClass("loaded");
      }, 275);
    });
})(jQuery);
const toggleSwitch = document.querySelector("#theme-toggle");
const body = document.querySelector("body");
const image = document.getElementById("myimage");
const themeKey = "marcadrian-theme";

let cookies = document.cookie
  .split(";")
  .map((cookie) => cookie.trim().split("="));
const savedTheme = cookies.find((cookie) => cookie[0] === themeKey)?.[1];
if (savedTheme) {
  body.classList.add(savedTheme);
  if (savedTheme === "night-theme") {
    toggleSwitch.checked = true;
    image.src = "images/picd02.svg";
  }
} else {
  // Set the default theme to 'night-theme'
  body.classList.add("night-theme");
  image.src = "images/picd02.svg";
  document.cookie = `${themeKey}=night-theme; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
}

toggleSwitch.addEventListener("change", function () {
  if (this.checked) {
    body.classList.add("night-theme");
    image.src = "images/picd02.svg";
    document.cookie = `${themeKey}=night-theme; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
  } else {
    body.classList.remove("night-theme");
    image.src = "images/picd01.svg";
    document.cookie = `${themeKey}=day-theme; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
  }
});

const languageKey = "marcadrian-language";
const languageSelector = document.querySelector("#language-selector");

cookies = document.cookie.split(";").map((cookie) => cookie.trim().split("="));
const savedLanguage = cookies.find((cookie) => cookie[0] === languageKey)?.[1];
if (savedLanguage) {
  i18next.changeLanguage(savedLanguage);
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = i18next.t(el.dataset.i18n);
  });

  document.querySelector('[data-i18n="[value]contact-send"]').value =
    i18next.t("contact-send");
  languageSelector.value = savedLanguage;
} else {
  const browserLanguage = navigator.language || navigator.userLanguage;
  // Example: Convert "en-US" to "en"
  const defaultLanguage = browserLanguage.split("-")[0];

  // Set default language based on supported languages
  if (["en", "de", "pl"].includes(defaultLanguage)) {
    document.cookie = `${languageKey}=${defaultLanguage}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
    i18next.changeLanguage(defaultLanguage);
  } else {
    // Default to English for unsupported languages
    document.cookie = `${languageKey}=en; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
    i18next.changeLanguage(defaultLanguage);
  }
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = i18next.t(el.dataset.i18n);
  });

  document.querySelector('[data-i18n="[value]contact-send"]').value =
    i18next.t("contact-send");
  languageSelector.value = defaultLanguage;
}

languageSelector.addEventListener("change", (event) => {
  i18next.changeLanguage(event.target.value);
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = i18next.t(el.dataset.i18n);
  });

  document.querySelector('[data-i18n="[value]contact-send"]').value =
    i18next.t("contact-send");
  document.cookie = `${languageKey}=${event.target.value}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
});

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  fetch("https://formspree.io/f/xyyajzvr", {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      alert("Thank you for your submission!");
      form.reset();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
