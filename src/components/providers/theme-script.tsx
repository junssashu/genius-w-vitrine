const SCRIPT = `(function(){try{
  var c=document.cookie;
  function k(n){var m=c.match(new RegExp('(?:^|; )'+n+'=([^;]*)'));return m?decodeURIComponent(m[1]):null;}
  var t=k('gw_theme'); var l=k('gw_lang');
  var pref=(t==='light'||t==='dark'||t==='auto')?t:'auto';
  var h=new Date().getHours();
  var eff=pref==='auto'?(h>=5&&h<18?'light':'dark'):pref;
  var d=document.documentElement;
  d.dataset.theme=eff; d.dataset.themePref=pref;
  d.lang=(l==='fr'||l==='en')?l:(navigator.language||'fr').slice(0,2)==='en'?'en':'fr';
  d.classList.add('js-on');
}catch(e){document.documentElement.dataset.theme='dark';}})();`;

export const ThemeScript = () => (
  <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />
);
