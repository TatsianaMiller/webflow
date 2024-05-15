
  const cache = {};
  let clicked = false;

  function leazyRender() {
    const container = "seamless-replace";
    const content = "content-replace";
    const containerElement = document.getElementById(container);

    containerElement.addEventListener("click", (event) => {
      if (clicked) return;
      clicked = true;

      const link = event.target.closest("a");
      if (!link) return;

      event.preventDefault();
      const param = link.getAttribute("href").replace("?", "");
      const [urlKey, urlValue] = param.split("=");
      const fetchUrl = getUrlWithParam(urlKey, urlValue);
      console.log(cache);

      function apply(html) {
        const htmlClone = document.createElement("div");
        htmlClone.innerHTML = html;
        const newContent = htmlClone.querySelector(`#${content}`);

        containerElement.innerHTML = "";
        containerElement.appendChild(newContent);

        cache[fetchUrl] = html;
        clicked = false;
      }

      if (cache[fetchUrl]) {
        apply(cache[fetchUrl]);
        return;
      }

      fetchPage(fetchUrl, apply);
    });
  }

  function getUrlWithParam(param, value) {
    var url = new URL(window.location.href);
    url.searchParams.set(param, value);

    return url.toString();
  }

  function fetchPage(url, callback) {
    fetch(url)
      .then((response) => response.text())
      .then(callback);
  }

  leazyRender();

