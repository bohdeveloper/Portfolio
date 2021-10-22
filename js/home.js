document.addEventListener("DOMContentLoaded", function () {

  const inicio = document.getElementById('inicio');
  const proyectos = document.getElementById('proyectos');
  const contacto = document.getElementById('contacto');

  const actu = document.getElementById('actu');
  const actuchecker = document.getElementById('actuchecker');
  actuchecker.addEventListener('click', actuCookie);

  function actuCookie() {
    var actucheck = true;
    document.cookie = "actucheck=" + encodeURIComponent(actucheck);
  }

  var cookies = document.cookie;
  if (cookies) {
    actu.style.display = 'none';
  }

  if (inicio) {

    // ——————————————————————————————————————————————————
    // TextDev
    // ——————————————————————————————————————————————————

    const el = document.querySelector('.dev')
    class TextScramble {
      constructor(el) {
        this.el = el
        this.chars = '!<>-_\\/[]{}—=+*^?#________'
        this.update = this.update.bind(this)
      }
      setText(newText) {
        const oldText = this.el.innerText
        const length = Math.max(oldText.length, newText.length)
        const promise = new Promise((resolve) => this.resolve = resolve)
        this.queue = []
        for (let i = 0; i < length; i++) {
          const from = oldText[i] || ''
          const to = newText[i] || ''
          const start = Math.floor(Math.random() * 40)
          const end = start + Math.floor(Math.random() * 40)
          this.queue.push({
            from,
            to,
            start,
            end
          })
        }
        cancelAnimationFrame(this.frameRequest)
        this.frame = 0
        this.update()
        return promise
      }
      update() {
        let output = ''
        let complete = 0
        for (let i = 0, n = this.queue.length; i < n; i++) {
          let {
            from,
            to,
            start,
            end,
            char
          } = this.queue[i]
          if (this.frame >= end) {
            complete++
            output += to
          } else if (this.frame >= start) {
            if (!char || Math.random() < 0.28) {
              char = this.randomChar()
              this.queue[i].char = char
            }
            output += `<span class="dud">${char}</span>`
          } else {
            output += from
          }
        }
        this.el.innerHTML = output
        if (complete === this.queue.length) {
          this.resolve()
        } else {
          this.frameRequest = requestAnimationFrame(this.update)
          this.frame++
        }
      }
      randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)]
      }
    }

    /* FRASE */

    const phrases = [
      '· DESARROLLADOR',
      '· FULL STACK',
    ]

    const fx = new TextScramble(el)

    let counter = 0
    const next = () => {
      fx.setText(phrases[counter]).then(() => {
        setTimeout(next, 1000)
      })
      counter = (counter + 1) % phrases.length
    }

    next()

    function scrollToTop() {
      $(window).scrollTop(0);
    }

  }

  if (contacto) {

    // ——————————————————————————————————————————————————
    // Mapa contacto
    // ——————————————————————————————————————————————————

    /* Mapbox script */
    mapboxgl.accessToken = 'pk.eyJ1IjoiYm9oZGV2ZWxvcGVyIiwiYSI6ImNrc244aDA5bTFtajEyd294amVnaXpmYXEifQ.nxG1rsTwVVVIgTK5z8qa5A';
    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/bohdeveloper/cksnb160f0pu617lqtcaxl9wa', // style URL
      center: [-1.780, 43.336], // starting position [lng, lat]
      /* Ubicación exacta: -1.799, 43.336 */
      zoom: 12 // starting zoom
    });

    /* Eventos interactivos */

    /* Referencias */
    const mapReset = document.getElementById('map-reset');
    const capaAntiEventos = document.getElementById('capa-anti-eventos');
    const capaBloqueoMapa = document.getElementById('capa-bloqueo-mapa');
    const capaCarga = document.getElementById('capa-carga');
    const mapOff = document.getElementById('map-off');
    const mapOn = document.getElementById('map-on');
    const mapa = document.getElementById('map');

    /* Estado inicial */
    mapReset.style.display = 'none';
    mapOff.style.display = 'none';
    mapOn.style.display = 'none';
    capaBloqueoMapa.style.display = 'none';
    capaCarga.style.display = 'block';

    setTimeout(function () {
      capaCarga.style.display = 'none';
      capaAntiEventos.style.display = 'block';
    }, 1000);

    /* Eventos */
    capaAntiEventos.addEventListener('mouseover', hoverInCapa);
    capaAntiEventos.addEventListener('mouseout', hoverOutCapa);
    capaAntiEventos.addEventListener('click', quitarCapa);
    mapReset.addEventListener('click', ponerCapa);
    mapOn.addEventListener('click', bloquearMapa);
    mapOff.addEventListener('click', desbloquearMapa);

    /* Funciones */
    function hoverInCapa() {
      mapa.classList.add('filter-map');
      mapa.style.transition = '0.3s';
    }

    function hoverOutCapa() {
      mapa.classList.remove('filter-map');
      mapa.style.transition = '0.3s';
    }

    function quitarCapa() {
      capaAntiEventos.style.display = 'none';
      mapReset.style.display = 'block';
      mapOn.style.display = 'block';
    }

    function ponerCapa() {
      capaCarga.style.display = 'block';
      mapOn.style.display = 'none';
      mapReset.style.display = 'none';
      mapOff.style.display = 'none';
      mapOn.style.display = 'none';

      const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/bohdeveloper/cksnb160f0pu617lqtcaxl9wa', // style URL
        center: [-1.780, 43.336], // starting position [lng, lat]
        /* Ubicación exacta: -1.799, 43.336 */
        zoom: 12 // starting zoom
      });

      setTimeout(function () {
        capaCarga.style.display = 'none';
        capaAntiEventos.style.display = 'block';
      }, 1000);

    }


    function bloquearMapa() {
      capaBloqueoMapa.style.display = 'block';
      mapOff.style.display = 'block';
      mapOn.style.display = 'none';
    }

    function desbloquearMapa() {
      capaBloqueoMapa.style.display = 'none';
      mapOff.style.display = 'none';
      mapOn.style.display = 'block';
    }
  }

});