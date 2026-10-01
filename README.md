# ENPLAN Comunicación · Web

Web de **enplancomunicacion.online**, publicada con GitHub Pages.

## Archivos

| Archivo | Qué es |
|---|---|
| `index.html` | Página principal |
| `guia.html` | Guía gratuita «Lo sabes hacer. Ahora, cuéntalo» |
| `aviso-legal.html` | Aviso legal (LSSI) |
| `privacidad.html` | Política de privacidad (RGPD) |
| `404.html` | Página de error |
| `styles.css` | Estilos de todas las páginas |
| `main.js` | Menú móvil, formulario y enlaces de contacto |
| `fonts/` | Tipografías Fredoka e Instrument Sans (licencia SIL OFL) |
| `logo.png`, `favicon.svg`, `apple-touch-icon.png`, `og-image.png` | Imágenes de marca |
| `CNAME` | Dominio de la web. No borrar |
| `robots.txt`, `sitemap.xml` | Para Google |

## Cambiar datos de contacto

En `main.js`, al principio:

```js
window.ENPLAN_CONFIG = {
  email: "enplancomunicacion.online@gmail.com",
  whatsapp: "34641577061",
  instagram: "https://www.instagram.com/enplan.comunicacion/"
};
```

Si cambian, actualízalos también en el pie de página de cada `.html` y en `aviso-legal.html` y `privacidad.html`.

## DNS (DonDominio)

| Tipo | Nombre | Valor |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | USUARIO.github.io |
