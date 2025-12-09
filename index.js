import{a as w,S as R,i}from"./assets/vendor-CNqCr-V-.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&a(d)}).observe(document,{childList:!0,subtree:!0});function e(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(t){if(t.ep)return;t.ep=!0;const s=e(t);fetch(t.href,s)}})();const m=15;async function p(r,o){return(await w.get("https://pixabay.com/api/",{params:{key:"53545737-19e7b42de62d4244a4b01f9cf",q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:m}})).data}const g=document.querySelector(".gallery"),h=document.querySelector(".load-more"),y=document.querySelector(".loader");let S=new R(".gallery a",{captionsData:"alt",captionDelay:250});function b(r){const o=r.map(e=>`
    <li class="gallery-item">
      <a class="gallery-link" href="${e.largeImageURL}">
        <img
          class="gallery-image"
          src="${e.webformatURL}"
          alt="${e.tags}"
          loading="lazy"
        />
      </a>
      <div class="info">
        <p class="info-item"><b>Likes:</b> ${e.likes}</p>
        <p class="info-item"><b>Views:</b> ${e.views}</p>
        <p class="info-item"><b>Comments:</b> ${e.comments}</p>
        <p class="info-item"><b>Downloads:</b> ${e.downloads}</p>
      </div>
    </li>`).join("");g.insertAdjacentHTML("beforeend",o),S.refresh()}function q(){g.innerHTML=""}function L(){y.classList.add("is-visible")}function l(){y.classList.remove("is-visible")}function v(){h.classList.add("is-visible")}function c(){h.classList.remove("is-visible")}const B=document.querySelector("#search-form"),E=document.querySelector(".load-more");let u="",n=1,f=0;c();B.addEventListener("submit",async r=>{r.preventDefault();const o=r.currentTarget.elements.search.value.trim();if(!o){i.warning({message:"Search field must be filled",position:"topRight"});return}u=o,n=1,q(),c(),L();try{const e=await p(u,n);if(f=e.totalHits,l(),e.hits.length===0){i.info({message:"Images do not found. Try search something else.",position:"topRight"});return}if(b(e.hits),i.success({message:`Find ${f} images`,position:"topRight"}),e.hits.length<m){i.info({message:"You've reached the end of search results.",position:"topRight"}),c();return}v()}catch{l(),i.error({message:"Error image load",position:"topRight"})}});E.addEventListener("click",async()=>{n+=1,L(),c();try{const r=await p(u,n);b(r.hits),l();const o=document.querySelector(".gallery a");if(o){const a=o.getBoundingClientRect().height;window.scrollBy({top:a*2,behavior:"smooth"})}if(n*m>=f){c(),i.info({message:"You've reached the end of search results.",position:"topRight"});return}v()}catch{l(),i.error({message:"Error image load",position:"topRight"})}});
//# sourceMappingURL=index.js.map
