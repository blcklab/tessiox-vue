<script setup lang="ts">
import { computed, ref } from 'vue';
import { ElementTiles } from '@blcklab/tessiox-vue';
import '@blcklab/tessiox-vue/style.css';
import fixture from './portfolio-collection.json';

// Your Vue app owns the hero panel, links, layout, and page controls.
const projects = ref(fixture.items);
const selectedId = ref<string | null>(projects.value[0]?.id ?? null);
const previewId = ref<string | null>(null);
const page = ref(0);
const pageSize = 12;
const pageCount = computed(() => Math.max(1, Math.ceil(projects.value.length / pageSize)));
const tiles = ref<{ controller?: { setQuery(v: { page: number }): void } } | null>(null);
const featured = computed(() => projects.value.find(p => p.id === (previewId.value ?? selectedId.value)) ?? null);
const options = {
  theme: 'classic-minimal',
  layout: 'auto-grid',
  layoutOptions: { columns: 4, rows: 3, overflow: 'paginate' },
  browser: { pagination: 'pages', pageSize },
  tile: { minSizePx: 88, aspectRatio: 1 },
};
function setPage(next: number) { page.value = Math.max(0, Math.min(pageCount.value - 1, next)); tiles.value?.controller?.setQuery({page:page.value}); }
</script>
<template>
  <section class="portfolio">
    <div class="portfolio-hero">
      <div class="hero-art" aria-hidden="true">{{ featured?.symbol ?? '—' }}</div>
      <p class="hero-category">{{ featured?.categoryIds?.[0] }}</p>
      <h2>{{ featured?.label }}</h2>
      <p>{{ featured?.description }}</p>
      <a v-if="featured?.links?.[0]" :href="featured.links[0].href" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
    </div>
    <div class="portfolio-tiles">
      <h2 class="watermark">BLCKLAB</h2>
      <ElementTiles
        ref="tiles"
        v-model:selected-id="selectedId"
        :items="projects"
        :options="options"
        @preview="(item) => previewId = item?.id ?? null"
        @query="(query) => page = query.page"
      />
      <nav class="pager" aria-label="Projects pages">
        <button :disabled="page === 0" @click="setPage(page - 1)">Previous</button>
        <span>{{ page + 1 }} / {{ pageCount }}</span>
        <button :disabled="page + 1 >= pageCount" @click="setPage(page + 1)">Next</button>
      </nav>
    </div>
  </section>
</template>
<style scoped>
.portfolio{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:36px;align-items:start}
.portfolio-hero{min-width:0}.hero-art{min-height:220px;display:grid;place-items:center;font-size:76px;color:#8467ec;border:1px solid #e6e6ed;border-radius:22px;background:#f7f6ff}
.hero-category{font:700 10px monospace;letter-spacing:.1em;text-transform:uppercase;color:#9876e9}
.portfolio-hero h2{font-size:clamp(36px,5vw,60px);margin:8px 0}.portfolio-hero p{color:#78829c}
.watermark{font:900 clamp(38px,6vw,88px)/1 sans-serif;color:#e8eaf0;letter-spacing:-.09em;margin:0 0 10px}
.pager{display:flex;justify-content:flex-end;align-items:center;gap:14px;margin-top:12px}
.pager button{border:1px solid #d8dce5;border-radius:8px;background:transparent;padding:6px 12px;cursor:pointer}.pager button:disabled{opacity:.3}
@media(max-width:800px){.portfolio{grid-template-columns:1fr}}
</style>
